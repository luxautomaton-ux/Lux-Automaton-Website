import { NextResponse } from 'next/server';
import db from '@/lib/db';
import crypto from 'crypto';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const isRealStripe = stripeSecretKey && (stripeSecretKey.startsWith('sk_') || stripeSecretKey.startsWith('rk_'));

const stripe = isRealStripe ? new Stripe(stripeSecretKey) : null;

function getStripePriceId(sku: string): string | undefined {
  switch (sku) {
    case 'PACK_DIGITAL_497':
      return process.env.STRIPE_PRICE_PACK_DIGITAL_497;
    case 'USB_128_STARTER_797':
      return process.env.STRIPE_PRICE_USB_128_STARTER_797;
    case 'USB_256_PRO_997':
      return process.env.STRIPE_PRICE_USB_256_PRO_997;
    case 'USB_256_CUSTOM_1997':
      return process.env.STRIPE_PRICE_USB_256_CUSTOM_1997;
    case 'CODER_STARTER_49_MO':
      return process.env.STRIPE_PRICE_CODER_STARTER_49;
    case 'CODER_PRO_149_MO':
      return process.env.STRIPE_PRICE_CODER_PRO_149;
    case 'CODER_BUSINESS_299_MO':
      return process.env.STRIPE_PRICE_CODER_BUSINESS_299;
    case 'CODER_VIP_500_MO':
      return process.env.STRIPE_PRICE_CODER_VIP_500;
    default:
      if (sku.startsWith('PACK_')) {
        return process.env.STRIPE_PRICE_PACK_DIGITAL_497;
      }
      return undefined;
  }
}

export async function POST(request: Request) {
  try {
    const { productId, email, name } = await request.json();

    if (!productId || !email) {
      return NextResponse.json(
        { error: 'Product ID and email are required' },
        { status: 400 }
      );
    }

    // Get product from DB
    const product = db.prepare('SELECT * FROM products WHERE id = ? AND active = 1').get(productId) as {
      id: string;
      sku: string;
      name: string;
      price_cents: number;
      type: string;
    } | undefined;

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found or inactive' },
        { status: 404 }
      );
    }

    // Create customer if they don't exist
    let customer = db.prepare('SELECT * FROM customers WHERE email = ?').get(email) as {
      id: string;
      email: string;
      name: string;
    } | undefined;

    const customerId = customer?.id || crypto.randomUUID();

    if (!customer) {
      db.prepare(`
        INSERT INTO customers (id, email, name, stripe_customer_id)
        VALUES (?, ?, ?, ?)
      `).run(customerId, email, name || '', 'cus_mock_' + crypto.randomBytes(8).toString('hex'));
    }

    const orderId = 'ord_' + crypto.randomBytes(12).toString('hex');
    const origin = request.headers.get('origin') || 'http://localhost:3080';

    if (stripe) {
      const priceId = getStripePriceId(product.sku);

      if (!priceId || priceId.startsWith('price_pack_') || priceId.startsWith('price_usb_') || priceId.startsWith('price_coder_')) {
        // Failing gracefully: if it is a placeholder or missing, return a informative error
        return NextResponse.json(
          { error: `Stripe Price ID for product SKU '${product.sku}' is not configured or is a placeholder. Please configure a valid Stripe Price ID in your .env.local file.` },
          { status: 400 }
        );
      }

      // Create a real Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: product.type === 'subscription' ? 'subscription' : 'payment',
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`,
        customer_email: email,
        metadata: {
          productId: product.id,
          orderId: orderId,
          customerId: customerId,
        },
      });

      // Save order with the Stripe Checkout Session ID
      const createOrder = db.transaction(() => {
        db.prepare(`
          INSERT INTO orders (id, customer_id, stripe_session_id, status, total_cents)
          VALUES (?, ?, ?, 'pending', ?)
        `).run(orderId, customerId, session.id, product.price_cents);

        db.prepare(`
          INSERT INTO order_items (id, order_id, product_id, quantity, amount_cents)
          VALUES (?, ?, ?, 1, ?)
        `).run(crypto.randomUUID(), orderId, product.id, product.price_cents);
      });

      createOrder();

      return NextResponse.json({
        url: session.url
      });
    } else {
      // Fallback to simulated checkout sandbox
      const sessionId = 'sess_mock_' + crypto.randomBytes(16).toString('hex');

      const createOrder = db.transaction(() => {
        db.prepare(`
          INSERT INTO orders (id, customer_id, stripe_session_id, status, total_cents)
          VALUES (?, ?, ?, 'pending', ?)
        `).run(orderId, customerId, sessionId, product.price_cents);

        db.prepare(`
          INSERT INTO order_items (id, order_id, product_id, quantity, amount_cents)
          VALUES (?, ?, ?, 1, ?)
        `).run(crypto.randomUUID(), orderId, product.id, product.price_cents);
      });

      createOrder();

      return NextResponse.json({
        url: `/checkout/mock-pay?session_id=${sessionId}`
      });
    }

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
