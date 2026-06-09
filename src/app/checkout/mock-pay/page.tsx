import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import db from '@/lib/db';

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function MockPayPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect('/');
  }

  // Fetch order details from DB
  const order = db.prepare(`
    SELECT o.*, c.email, c.name as customer_name
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.stripe_session_id = ?
  `).get(session_id) as {
    id: string;
    customer_id: string;
    stripe_session_id: string;
    status: string;
    total_cents: number;
    email: string;
    customer_name: string;
  } | undefined;

  if (!order) {
    return (
      <div style={{ paddingTop: 160, textAlign: 'center', color: '#fff' }}>
        <h2>Order Session Not Found</h2>
        <p style={{ color: 'var(--text-dim)' }}>The session ID might be invalid or expired.</p>
        <Link href="/" className="btn btn-secondary" style={{ marginTop: 20, display: 'inline-block' }}>Return Home</Link>
      </div>
    );
  }

  if (order.status === 'completed') {
    redirect(`/checkout/success?session_id=${session_id}`);
  }

  // Get order items
  const items = db.prepare(`
    SELECT oi.*, p.name as product_name, p.description as product_desc
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `).all(order.id) as Array<{
    id: string;
    product_name: string;
    product_desc: string;
    quantity: number;
    amount_cents: number;
  }>;

  // Form confirmation handler script since this is a server component
  const confirmCode = `
    async function handleConfirm() {
      const btn = document.getElementById('btn-confirm');
      const text = document.getElementById('btn-confirm-text');
      const loader = document.getElementById('btn-confirm-loader');
      
      btn.disabled = true;
      text.style.opacity = '0';
      loader.style.display = 'block';

      try {
        const res = await fetch('/api/checkout/mock-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: '${session_id}' })
        });
        const data = await res.json();
        if (data.success) {
          window.location.href = '/checkout/success?session_id=${session_id}';
        } else {
          alert('Error: ' + (data.error || 'Failed to process payment'));
          btn.disabled = false;
          text.style.opacity = '1';
          loader.style.display = 'none';
        }
      } catch (e) {
        alert('Network error confirming payment.');
        btn.disabled = false;
        text.style.opacity = '1';
        loader.style.display = 'none';
      }
    }
  `;

  return (
    <main style={{ paddingTop: 140, paddingBottom: 100, minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(162,117,255,0.05) 0%, transparent 60%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: 840, position: 'relative', zIndex: 1 }}>
        <div className="grid grid-2" style={{ gap: 40 }}>
          
          {/* Cart Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Checkout Sandbox</span>
              <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: '8px 0 0' }}>Confirm Payment</h1>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#fff' }}>Order Summary</h3>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{item.product_name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>{item.product_desc}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>
                    ${(item.amount_cents / 100).toFixed(2)}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18, color: '#fff', paddingTop: 8 }}>
                <span>Total Amount</span>
                <span>${(order.total_cents / 100).toFixed(2)}</span>
              </div>
            </div>

            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              🔒 Simulated billing environment. No real funds or credit card details are required. Pressing "Complete Simulated Payment" will write live activation credentials to the server.
            </div>
          </div>

          {/* Sandbox Payment Form */}
          <div style={{ background: 'rgba(26,26,30,0.5)', border: '1px solid var(--border)', borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, backdropFilter: 'blur(20px)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Sandbox payment details</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Customer Name</label>
              <input 
                type="text" 
                defaultValue={order.customer_name} 
                disabled 
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'var(--text-dim)', fontSize: 14 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Email Address</label>
              <input 
                type="text" 
                defaultValue={order.email} 
                disabled 
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: 'var(--text-dim)', fontSize: 14 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Test Credit Card</label>
              <input 
                type="text" 
                value="4242 •••• •••• 4242 (Stripe Sandbox)" 
                disabled 
                style={{ background: 'rgba(162,117,255,0.05)', border: '1px solid rgba(162,117,255,0.3)', padding: '12px 16px', borderRadius: 8, color: 'var(--primary)', fontSize: 14, fontWeight: 600 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
              <button 
                id="btn-confirm"
                style={{ 
                  background: 'var(--primary)', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '14px 20px', 
                  borderRadius: 10, 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  fontSize: 15,
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span id="btn-confirm-text">Complete Simulated Payment</span>
                <span id="btn-confirm-loader" style={{ display: 'none', width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              </button>
              
              <Link 
                href={`/checkout/cancel?session_id=${session_id}`}
                style={{ 
                  textAlign: 'center', 
                  color: 'var(--text-dim)', 
                  textDecoration: 'none', 
                  fontSize: 14,
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid transparent'
                }}
              >
                Cancel Transaction
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      ` }} />
      <script dangerouslySetInnerHTML={{ __html: confirmCode }} />
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('btn-confirm').addEventListener('click', handleConfirm);
      ` }} />
    </main>
  );
}
