import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import db from '@/lib/db';

interface PageProps {
  searchParams: Promise<{ product_id?: string }>;
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const { product_id } = await searchParams;

  if (!product_id) {
    redirect('/');
  }

  // Fetch product details from DB
  const product = db.prepare('SELECT * FROM products WHERE id = ? AND active = 1').get(product_id) as {
    id: string;
    sku: string;
    name: string;
    description: string;
    price_cents: number;
    type: string;
  } | undefined;

  if (!product) {
    return (
      <div style={{ paddingTop: 160, textAlign: 'center', color: '#fff' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--text-dim)' }}>The selected product could not be found.</p>
        <Link href="/" className="btn btn-secondary" style={{ marginTop: 20, display: 'inline-block' }}>Return Home</Link>
      </div>
    );
  }

  const submitScript = `
    async function handleCheckout(event) {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const name = document.getElementById('name').value;
      const btn = document.getElementById('btn-submit');
      const text = document.getElementById('btn-submit-text');
      const loader = document.getElementById('btn-submit-loader');

      if (!email || !name) {
        alert('Please fill out all fields.');
        return;
      }

      btn.disabled = true;
      text.style.opacity = '0';
      loader.style.display = 'block';

      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: '${product.id}',
            email,
            name
          })
        });

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert('Checkout initialization failed: ' + (data.error || 'Unknown error'));
          btn.disabled = false;
          text.style.opacity = '1';
          loader.style.display = 'none';
        }
      } catch (e) {
        alert('Connection error.');
        btn.disabled = false;
        text.style.opacity = '1';
        loader.style.display = 'none';
      }
    }
  `;

  return (
    <main style={{ paddingTop: 140, paddingBottom: 100, minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '10%', left: '30%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(162,117,255,0.04) 0%, transparent 60%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: 880, position: 'relative', zIndex: 1 }}>
        <div className="grid grid-2" style={{ gap: 50 }}>
          
          {/* Cart & Product details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                ← Back to catalog
              </Link>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: 0 }}>Review Your Order</h1>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Item Details</span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '4px 0 8px' }}>{product.name}</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{product.description}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16, marginTop: 8 }}>
                <span style={{ fontWeight: 600, color: 'var(--text-dim)' }}>Price</span>
                <span style={{ fontWeight: 800, fontSize: 22, color: '#fff' }}>${(product.price_cents / 100).toFixed(2)}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(162,117,255,0.03)', border: '1px solid rgba(162,117,255,0.1)', borderRadius: 16, padding: 20, fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>
              📦 <strong>Digital Success Packs</strong> are delivered immediately via email. <br/>
              🚚 <strong>Hardware USB setups</strong> are shipped within 24 hours via premium express courier (free international shipping).
            </div>
          </div>

          {/* Billing Form */}
          <div style={{ background: 'rgba(26,26,30,0.5)', border: '1px solid var(--border)', borderRadius: 24, padding: 36, display: 'flex', flexDirection: 'column', gap: 24, backdropFilter: 'blur(20px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>Billing Details</h2>
            
            <form id="checkout-form" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="name" style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  required
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="email" style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  required
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }}
                />
              </div>

              <button 
                type="submit"
                id="btn-submit"
                style={{ 
                  background: 'var(--primary)', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '14px 20px', 
                  borderRadius: 10, 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  fontSize: 15,
                  marginTop: 10,
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span id="btn-submit-text">Proceed to Payment</span>
                <span id="btn-submit-loader" style={{ display: 'none', width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              </button>
            </form>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input:focus {
          border-color: var(--primary) !important;
        }
      ` }} />
      <script dangerouslySetInnerHTML={{ __html: submitScript }} />
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
      ` }} />
    </main>
  );
}
