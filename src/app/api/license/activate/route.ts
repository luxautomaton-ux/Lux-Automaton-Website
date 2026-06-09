import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashLicenseKey } from '@/lib/license';
import crypto from 'crypto';

const LICENSE_SECRET = process.env.LICENSE_SECRET || 'lux-agent-offline-signing-secret-key-12345';

export async function POST(request: Request) {
  try {
    const { licenseKey, deviceId, deviceName, os } = await request.json();

    if (!licenseKey || !deviceId) {
      return NextResponse.json(
        { error: 'License key and Device ID are required' },
        { status: 400 }
      );
    }

    // Hash the input license key
    const keyHash = hashLicenseKey(licenseKey);

    // Look up license in database
    const license = db.prepare(`
      SELECT l.*, c.email, c.name as customer_name
      FROM licenses l
      JOIN customers c ON l.customer_id = c.id
      WHERE l.key_hash = ?
    `).get(keyHash) as {
      id: string;
      customer_id: string;
      order_id: string;
      key_hash: string;
      key_prefix: string;
      type: string;
      status: string;
      pack_slug: string | null;
      created_at: string;
      email: string;
      customer_name: string;
    } | undefined;

    if (!license) {
      return NextResponse.json(
        { error: 'Invalid license key' },
        { status: 404 }
      );
    }

    // Verify license status
    if (license.status !== 'active') {
      return NextResponse.json(
        { error: `License is not active (current status: ${license.status})` },
        { status: 403 }
      );
    }

    // Verify subscription if it's a coder subscription
    let plan = 'pack';
    if (license.type === 'coder_subscription') {
      const subscription = db.prepare(`
        SELECT * FROM subscriptions WHERE license_id = ?
      `).get(license.id) as { status: string; plan_sku: string } | undefined;

      if (!subscription) {
        return NextResponse.json(
          { error: 'No active subscription found for this license key' },
          { status: 403 }
        );
      }

      if (subscription.status !== 'active' && subscription.status !== 'trialing') {
        return NextResponse.json(
          { error: `Subscription is inactive (status: ${subscription.status})` },
          { status: 403 }
        );
      }

      // Extract plan (e.g. CODER_PRO_149_MO -> 'pro')
      const planMatch = subscription.plan_sku.match(/CODER_([A-Z0-9]+)_/);
      plan = planMatch ? planMatch[1].toLowerCase() : 'pro';
    }

    // Check if device is already activated for this license
    const existingActivation = db.prepare(`
      SELECT * FROM license_activations
      WHERE license_id = ? AND device_id = ?
    `).get(license.id, deviceId) as {
      id: string;
      offline_token: string;
    } | undefined;

    if (existingActivation) {
      return NextResponse.json({
        success: true,
        message: 'Device already activated',
        licenseId: license.id,
        licenseType: license.type,
        packSlug: license.pack_slug,
        offlineToken: existingActivation.offline_token,
      });
    }

    // Verify device activation limits
    const activations = db.prepare(`
      SELECT COUNT(*) as count FROM license_activations WHERE license_id = ?
    `).get(license.id) as { count: number };

    let deviceLimit = 3; // Default for digital packs
    if (license.type.startsWith('usb_') || license.type === 'coder_subscription') {
      deviceLimit = 1; // Direct USB setups and coder subscriptions are tied to 1 device
    } else if (license.type === 'ADMIN-FOUNDER') {
      deviceLimit = 99999; // Unlimited for developers/internal
    }

    if (activations.count >= deviceLimit) {
      return NextResponse.json(
        { error: `Activation limit reached (${activations.count}/${deviceLimit} devices)` },
        { status: 403 }
      );
    }

    // Generate signed offline token
    // Token structure: [licenseId].[deviceId].[timestamp].[plan].[signature]
    const timestamp = Date.now().toString();
    const payload = `${license.id}:${deviceId}:${timestamp}:${plan}`;
    const signature = crypto
      .createHmac('sha256', LICENSE_SECRET)
      .update(payload)
      .digest('hex');

    const offlineToken = `${license.id}.${deviceId}.${timestamp}.${plan}.${signature}`;

    // Record the activation
    db.prepare(`
      INSERT INTO license_activations (id, license_id, device_id, ip_address, offline_token)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      'act_' + crypto.randomBytes(12).toString('hex'),
      license.id,
      deviceId,
      request.headers.get('x-forwarded-for') || '127.0.0.1',
      offlineToken
    );

    // Update license activation timestamp if it's the first activation
    db.prepare(`
      UPDATE licenses
      SET activated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND activated_at IS NULL
    `).run(license.id);

    return NextResponse.json({
      success: true,
      message: 'Activation successful',
      licenseId: license.id,
      licenseType: license.type,
      packSlug: license.pack_slug,
      offlineToken,
    });

  } catch (error: any) {
    console.error('Activation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
