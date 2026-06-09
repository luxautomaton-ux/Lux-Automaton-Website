import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { generateLicenseKey, hashLicenseKey } from '@/lib/license';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, sku } = await request.json();

    if (!email || !sku) {
      return NextResponse.json({ error: 'Email and SKU are required' }, { status: 400 });
    }

    // Get product from DB by SKU
    const product = db.prepare('SELECT * FROM products WHERE sku = ? AND active = 1').get(sku) as {
      id: string;
      sku: string;
      name: string;
      price_cents: number;
      type: string;
    } | undefined;

    if (!product) {
      return NextResponse.json({ error: 'Product SKU not found or inactive' }, { status: 404 });
    }

    // Find or create customer
    let customer = db.prepare('SELECT * FROM customers WHERE email = ?').get(email) as {
      id: string;
      email: string;
    } | undefined;

    const customerId = customer?.id || crypto.randomUUID();

    if (!customer) {
      db.prepare(`
        INSERT INTO customers (id, email, name, stripe_customer_id)
        VALUES (?, ?, ?, ?)
      `).run(customerId, email, email.split('@')[0], 'cus_manual_' + crypto.randomBytes(8).toString('hex'));
    }

    // Determine prefix and type
    let keyPrefix = 'PACK';
    let licenseType = 'digital_pack';
    let packSlug: string | null = null;

    if (sku.startsWith('CODER_')) {
      keyPrefix = 'CODER';
      licenseType = 'coder_subscription';
    } else if (sku.startsWith('USB_128_')) {
      keyPrefix = 'USB-128';
      licenseType = 'usb_starter';
    } else if (sku.startsWith('USB_256_PRO')) {
      keyPrefix = 'USB-256';
      licenseType = 'usb_pro';
    } else if (sku.startsWith('USB_256_CUSTOM')) {
      keyPrefix = 'USB-CUSTOM';
      licenseType = 'usb_custom';
    }

    // Detect pack slug
    if (sku.startsWith('PACK_') && sku !== 'PACK_DIGITAL_497') {
      const match = sku.match(/^PACK_([A-Z0-9]+)_/);
      if (match && match[1]) {
        packSlug = match[1].toLowerCase();
      }
    }

    const rawKey = generateLicenseKey(keyPrefix);
    const keyHash = hashLicenseKey(rawKey);
    const licenseId = 'lic_' + crypto.randomBytes(12).toString('hex');

    // Create license
    const createLicense = db.transaction(() => {
      db.prepare(`
        INSERT INTO licenses (id, customer_id, order_id, key_hash, key_prefix, raw_key_plain, type, status, pack_slug)
        VALUES (?, ?, NULL, ?, ?, ?, ?, 'active', ?)
      `).run(licenseId, customerId, keyHash, `LUX-${keyPrefix}-`, rawKey, licenseType, packSlug);

      // If subscription, insert into subscriptions table
      if (licenseType === 'coder_subscription') {
        const subId = 'sub_' + crypto.randomBytes(12).toString('hex');
        const stripeSubId = 'sub_mock_manual_' + crypto.randomBytes(16).toString('hex');
        const periodStart = new Date().toISOString();
        const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

        db.prepare(`
          INSERT INTO subscriptions (id, customer_id, license_id, stripe_subscription_id, plan_sku, status, current_period_start, current_period_end)
          VALUES (?, ?, ?, ?, 'active', ?, ?, ?)
        `).run(subId, customerId, licenseId, stripeSubId, sku, periodStart, periodEnd);
      }
    });

    createLicense();

    return NextResponse.json({
      success: true,
      licenseKey: rawKey,
      licenseType,
      packSlug
    });

  } catch (error: any) {
    console.error('Manual generation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
