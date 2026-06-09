import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashLicenseKey } from '@/lib/license';
import crypto from 'crypto';

const LICENSE_SECRET = process.env.LICENSE_SECRET || 'lux-agent-offline-signing-secret-key-12345';

export async function POST(request: Request) {
  try {
    const { licenseKey, offlineToken, deviceId } = await request.json();

    // Case 1: Verify using raw license key + device ID
    if (licenseKey && deviceId) {
      const keyHash = hashLicenseKey(licenseKey);

      const license = db.prepare(`
        SELECT l.*, c.email
        FROM licenses l
        JOIN customers c ON l.customer_id = c.id
        WHERE l.key_hash = ?
      `).get(keyHash) as {
        id: string;
        status: string;
        type: string;
        pack_slug: string | null;
      } | undefined;

      if (!license) {
        return NextResponse.json({ valid: false, error: 'License key not found' });
      }

      if (license.status !== 'active') {
        return NextResponse.json({ valid: false, error: `License is ${license.status}` });
      }

      // Double check subscription if it's a coder subscription
      if (license.type === 'coder_subscription') {
        const subscription = db.prepare(`
          SELECT * FROM subscriptions WHERE license_id = ?
        `).get(license.id) as { status: string; plan_sku: string } | undefined;

        if (!subscription || (subscription.status !== 'active' && subscription.status !== 'trialing')) {
          return NextResponse.json({ valid: false, error: 'Subscription is inactive or expired' });
        }
      }

      // Check if this device is activated
      const activation = db.prepare(`
        SELECT * FROM license_activations
        WHERE license_id = ? AND device_id = ?
      `).get(license.id, deviceId);

      if (!activation) {
        return NextResponse.json({ valid: false, error: 'Device not activated for this license' });
      }

      return NextResponse.json({
        valid: true,
        status: license.status,
        type: license.type,
        packSlug: license.pack_slug,
      });
    }

    // Case 2: Verify using offline token signature
    if (offlineToken) {
      const parts = offlineToken.split('.');
      let licenseId: string, tokenDeviceId: string, timestamp: string, signature: string;
      let plan = 'pack';

      if (parts.length === 4) {
        [licenseId, tokenDeviceId, timestamp, signature] = parts;
        // Validate signature locally first
        const payload = `${licenseId}:${tokenDeviceId}:${timestamp}`;
        const expectedSignature = crypto
          .createHmac('sha256', LICENSE_SECRET)
          .update(payload)
          .digest('hex');

        if (signature !== expectedSignature) {
          return NextResponse.json({ valid: false, error: 'Invalid token signature' });
        }
      } else if (parts.length === 5) {
        [licenseId, tokenDeviceId, timestamp, plan, signature] = parts;
        // Validate signature locally first
        const payload = `${licenseId}:${tokenDeviceId}:${timestamp}:${plan}`;
        const expectedSignature = crypto
          .createHmac('sha256', LICENSE_SECRET)
          .update(payload)
          .digest('hex');

        if (signature !== expectedSignature) {
          return NextResponse.json({ valid: false, error: 'Invalid token signature' });
        }
      } else {
        return NextResponse.json({ valid: false, error: 'Malformed activation token' });
      }

      // If online, double check database state
      const license = db.prepare(`
        SELECT * FROM licenses WHERE id = ?
      `).get(licenseId) as {
        id: string;
        status: string;
        type: string;
        pack_slug: string | null;
      } | undefined;

      if (!license) {
        return NextResponse.json({ valid: false, error: 'Associated license not found' });
      }

      if (license.status !== 'active') {
        return NextResponse.json({ valid: false, error: `License is ${license.status}` });
      }

      // Double check subscription if it's a coder subscription
      if (license.type === 'coder_subscription') {
        const subscription = db.prepare(`
          SELECT * FROM subscriptions WHERE license_id = ?
        `).get(license.id) as { status: string; plan_sku: string } | undefined;

        if (!subscription || (subscription.status !== 'active' && subscription.status !== 'trialing')) {
          return NextResponse.json({ valid: false, error: 'Subscription is inactive or expired' });
        }
      }

      // Check if device matches
      if (deviceId && tokenDeviceId !== deviceId) {
        return NextResponse.json({ valid: false, error: 'Token device ID mismatch' });
      }

      return NextResponse.json({
        valid: true,
        status: license.status,
        type: license.type,
        packSlug: license.pack_slug,
        plan: plan,
      });
    }

    return NextResponse.json(
      { error: 'Provide licenseKey + deviceId, or offlineToken' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
