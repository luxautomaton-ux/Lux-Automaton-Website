import React from 'react';
import LinkComponent from 'next/link';
import db from '@/lib/db';
import Stripe from 'stripe';
import { generateLicenseKey, hashLicenseKey } from '@/lib/license';
import crypto from 'crypto';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const isRealStripe = stripeSecretKey && (stripeSecretKey.startsWith('sk_') || stripeSecretKey.startsWith('rk_'));
const stripe = isRealStripe ? new Stripe(stripeSecretKey) : null;

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div style={{ paddingTop: 160, textAlign: 'center', color: '#fff' }}>
        <h2>Invalid Checkout Session</h2>
        <LinkComponent href="/" className="btn btn-secondary" style={{ marginTop: 20, display: 'inline-block' }}>Return Home</LinkComponent>
      </div>
    );
  }

  // Fetch order and customer details
  let order = db.prepare(`
    SELECT o.*, c.email, c.name as customer_name
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.stripe_session_id = ?
  `).get(session_id) as {
    id: string;
    status: string;
    customer_id: string;
    total_cents: number;
    email: string;
    customer_name: string;
  } | undefined;

  // If order is pending and we have Stripe, check Stripe payment status
  if (order && order.status === 'pending' && stripe && session_id.startsWith('cs_')) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status === 'paid' || session.status === 'complete') {
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

        // Process order completion in a transaction
        const processOrder = db.transaction(() => {
          // 1. Update order status
          db.prepare("UPDATE orders SET status = 'completed' WHERE id = ?").run(order!.id);

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

            // Detect pack slug for Success Packs
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
            `).run(licenseId, order!.customer_id, order!.id, keyHash, `LUX-${keyPrefix}-`, rawKey, licenseType, packSlug);

            // If subscription, insert into subscriptions table
            if (licenseType === 'coder_subscription') {
              const subId = 'sub_' + crypto.randomBytes(12).toString('hex');
              const stripeSubId = typeof session.subscription === 'string' ? session.subscription : ('sub_mock_' + crypto.randomBytes(16).toString('hex'));
              const periodStart = new Date().toISOString();
              const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

              db.prepare(`
                INSERT INTO subscriptions (id, customer_id, license_id, stripe_subscription_id, plan_sku, status, current_period_start, current_period_end)
                VALUES (?, ?, ?, ?, ?, 'active', ?, ?)
              `).run(subId, order!.customer_id, licenseId, stripeSubId, item.sku, periodStart, periodEnd);
            }

            // Log simulated email delivery
            const emailId = 'email_' + crypto.randomBytes(12).toString('hex');
            const emailSubject = `Your Lux Agent License Key: ${rawKey}`;
            const emailBody = `
              Hi ${order!.customer_name || 'there'},

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
            `).run(emailId, order!.customer_id, licenseId, order!.email, emailSubject, emailBody);
          }
        });

        processOrder();

        // Reload the order object
        order = db.prepare(`
          SELECT o.*, c.email, c.name as customer_name
          FROM orders o
          JOIN customers c ON o.customer_id = c.id
          WHERE o.stripe_session_id = ?
        `).get(session_id) as any;
      }
    } catch (error) {
      console.error('Error completing order via Stripe redirect:', error);
    }
  }

  if (!order || order.status !== 'completed') {
    return (
      <div style={{ paddingTop: 160, textAlign: 'center', color: '#fff' }}>
        <h2>Order Pending or Not Found</h2>
        <p style={{ color: 'var(--text-dim)', marginTop: 8 }}>Please wait a moment or try again.</p>
        <LinkComponent href="/" className="btn btn-secondary" style={{ marginTop: 20, display: 'inline-block' }}>Return Home</LinkComponent>
      </div>
    );
  }

  // Fetch licenses generated for this order
  const licenses = db.prepare(`
    SELECT l.*, p.name as product_name
    FROM licenses l
    LEFT JOIN order_items oi ON l.order_id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE l.order_id = ?
  `).all(order.id) as Array<{
    id: string;
    raw_key_plain: string;
    type: string;
    pack_slug: string | null;
    product_name: string;
  }>;

  return (
    <main style={{ paddingTop: 140, paddingBottom: 100, minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 60%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: 680, position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(26,26,30,0.5)', border: '1px solid var(--border)', borderRadius: 28, padding: '48px 40px', textAlign: 'center', backdropFilter: 'blur(20px)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
          
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(45,212,191,0.1)', border: '2px solid var(--success)', color: 'var(--success)', fontSize: 32, marginBottom: 24 }}>
            ✓
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Thank you for your order!</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>
            A receipt and license key delivery confirmation email has been logged to <strong style={{ color: 'var(--text)' }}>{order.email}</strong>.
          </p>

          {/* LICENSE KEY BOX */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, textAlign: 'left', marginBottom: 32 }}>
            <h3 style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }}>
              Your License Keys
            </h3>
            
            {licenses.map(license => (
              <div key={license.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{license.product_name || 'Success Pack'}</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(162,117,255,0.05)', border: '1px solid rgba(162,117,255,0.2)', padding: '10px 14px', borderRadius: 8 }}>
                  <code style={{ flex: 1, fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 800, fontSize: 16 }}>
                    {license.raw_key_plain}
                  </code>
                  <button 
                    onClick={() => {}} // Simple fallback copy script
                    id={`btn-copy-${license.id}`}
                    style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                  >
                    Copy Key
                  </button>
                </div>
              </div>
            ))}
            <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>
              ⚠️ Store these keys in a safe place. They will only be displayed on this page once.
            </p>
          </div>

          {/* SETUP INSTRUCTIONS */}
          <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16, padding: 24, marginBottom: 32 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Next Steps to Activate:</h3>
            <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: 10, lineHeight: 1.5 }}>
              <li>Insert your <strong>Lux Agent USB drive</strong>.</li>
              <li>Launch the workspace on your machine.</li>
              <li>Navigate to the <strong>Activation Page</strong> in the sidebar.</li>
              <li>Paste your license key above and click <strong>Activate</strong>.</li>
            </ol>
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <LinkComponent href="/store" className="btn btn-secondary">Visit Store</LinkComponent>
            <LinkComponent href="/" className="btn btn-primary">Go to Home</LinkComponent>
          </div>

        </div>
      </div>

      {licenses.map(license => (
        <script key={`js-${license.id}`} dangerouslySetInnerHTML={{ __html: `
          document.getElementById('btn-copy-${license.id}').addEventListener('click', function() {
            navigator.clipboard.writeText('${license.raw_key_plain}');
            const btn = this;
            btn.textContent = 'Copied!';
            setTimeout(function() { btn.textContent = 'Copy Key'; }, 2000);
          });
        ` }} />
      ))}
    </main>
  );
}
