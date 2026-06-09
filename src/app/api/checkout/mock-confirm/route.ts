import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { generateLicenseKey, hashLicenseKey } from '@/lib/license';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Get order by session ID
    const order = db.prepare(`
      SELECT o.*, c.email, c.name, c.id as customer_id
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.stripe_session_id = ?
    `).get(sessionId) as {
      id: string;
      customer_id: string;
      stripe_session_id: string;
      status: string;
      total_cents: number;
      email: string;
      name: string;
    } | undefined;

    if (!order) {
      return NextResponse.json({ error: 'Order session not found' }, { status: 404 });
    }

    // If order is already completed, just return the existing license(s)
    if (order.status === 'completed') {
      const existingLicenses = db.prepare(`
        SELECT raw_key_plain, type, pack_slug, status
        FROM licenses
        WHERE order_id = ?
      `).all(order.id) as Array<{
        raw_key_plain: string;
        type: string;
        pack_slug: string | null;
        status: string;
      }>;

      return NextResponse.json({
        success: true,
        message: 'Order already processed',
        orderId: order.id,
        licenses: existingLicenses,
      });
    }

    // Get order items and their associated products
    const items = db.prepare(`
      SELECT oi.*, p.sku, p.name as product_name, p.type as product_type
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(order.id) as Array<{
      id: string;
      product_id: string;
      sku: string;
      product_name: string;
      product_type: string;
      amount_cents: number;
    }>;

    const licensesGenerated: Array<{
      raw_key_plain: string;
      type: string;
      pack_slug: string | null;
      status: string;
    }> = [];

    // Process order in a transaction
    const processOrder = db.transaction(() => {
      // 1. Update order status
      db.prepare("UPDATE orders SET status = 'completed' WHERE id = ?").run(order.id);

      // 2. Generate license key for each item
      for (const item of items) {
        let keyPrefix = 'PACK';
        let licenseType = 'digital_pack';
        let packSlug: string | null = null;

        if (item.sku.startsWith('CODER_')) {
          keyPrefix = 'CODER';
          licenseType = 'coder_subscription';
        } else if (item.sku.startsWith('USB_128_')) {
          keyPrefix = 'USB-128';
          licenseType = 'usb_starter';
        } else if (item.sku.startsWith('USB_256_PRO')) {
          keyPrefix = 'USB-256';
          licenseType = 'usb_pro';
        } else if (item.sku.startsWith('USB_256_CUSTOM')) {
          keyPrefix = 'USB-CUSTOM';
          licenseType = 'usb_custom';
        }

        // Detect pack slug for Success Packs (e.g. PACK_DOCTOR_499 -> 'doctor')
        if (item.sku.startsWith('PACK_') && item.sku !== 'PACK_DIGITAL_497') {
          const match = item.sku.match(/^PACK_([A-Z0-9]+)_/);
          if (match && match[1]) {
            packSlug = match[1].toLowerCase();
          }
        }

        const rawKey = generateLicenseKey(keyPrefix);
        const keyHash = hashLicenseKey(rawKey);
        const licenseId = 'lic_' + crypto.randomBytes(12).toString('hex');

        // Insert license
        db.prepare(`
          INSERT INTO licenses (id, customer_id, order_id, key_hash, key_prefix, raw_key_plain, type, status, pack_slug)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?)
        `).run(licenseId, order.customer_id, order.id, keyHash, `LUX-${keyPrefix}-`, rawKey, licenseType, packSlug);

        // If subscription, insert into subscriptions table
        if (licenseType === 'coder_subscription') {
          const subId = 'sub_' + crypto.randomBytes(12).toString('hex');
          const stripeSubId = 'sub_mock_' + crypto.randomBytes(16).toString('hex');
          const periodStart = new Date().toISOString();
          const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

          db.prepare(`
            INSERT INTO subscriptions (id, customer_id, license_id, stripe_subscription_id, plan_sku, status, current_period_start, current_period_end)
            VALUES (?, ?, ?, ?, 'active', ?, ?, ?)
          `).run(subId, order.customer_id, licenseId, stripeSubId, item.sku, periodStart, periodEnd);
        }

        // Log simulated email delivery
        const emailId = 'email_' + crypto.randomBytes(12).toString('hex');
        const emailSubject = `Your Lux Agent License Key: ${rawKey}`;
        const emailBody = `
          Hi ${order.name || 'there'},

          Asa built you a tool to change your future. 
          
          Here is your license key to unlock the ${item.product_name}:
          👉 ${rawKey}

          To activate it:
          1. Insert your Lux Agent USB.
          2. Double-click the launch command.
          3. Go to the Activation Page and paste your license key above.

          Move with a plan,
          The Lux Automaton Team
        `;

        db.prepare(`
          INSERT INTO emails_sent (id, customer_id, license_id, type, to_email, subject, body, status)
          VALUES (?, ?, ?, 'license_delivery', ?, ?, ?, 'success')
        `).run(emailId, order.customer_id, licenseId, order.email, emailSubject, emailBody);

        licensesGenerated.push({
          raw_key_plain: rawKey,
          type: licenseType,
          pack_slug: packSlug,
          status: 'active'
        });
      }
    });

    processOrder();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      licenses: licensesGenerated,
    });

  } catch (error: any) {
    console.error('Confirmation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
