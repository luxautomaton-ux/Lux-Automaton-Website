import React from 'react';
import db from '@/lib/db';
import Link from 'next/link';

export const metadata = {
  title: 'Founder Console | Lux Agent Admin',
};

export default async function AdminDashboard() {
  // 1. Fetch Stats
  const revenueStat = db.prepare("SELECT SUM(total_cents) as total FROM orders WHERE status = 'completed'").get() as { total: number | null };
  const totalRevenue = (revenueStat.total || 0) / 100;

  const ordersStat = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'completed'").get() as { count: number };
  const totalOrders = ordersStat.count;

  const licensesStat = db.prepare("SELECT COUNT(*) as count FROM licenses WHERE status = 'active'").get() as { count: number };
  const activeLicenses = licensesStat.count;

  const customersStat = db.prepare("SELECT COUNT(*) as count FROM customers").get() as { count: number };
  const totalCustomers = customersStat.count;

  // 2. Fetch Recent Orders
  const orders = db.prepare(`
    SELECT o.*, c.email, c.name as customer_name
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    ORDER BY o.created_at DESC
    LIMIT 20
  `).all() as Array<{
    id: string;
    customer_name: string;
    email: string;
    status: string;
    total_cents: number;
    created_at: string;
  }>;

  // 3. Fetch Licenses
  const licenses = db.prepare(`
    SELECT l.*, c.email, c.name as customer_name
    FROM licenses l
    JOIN customers c ON l.customer_id = c.id
    ORDER BY l.created_at DESC
    LIMIT 30
  `).all() as Array<{
    id: string;
    raw_key_plain: string;
    type: string;
    status: string;
    pack_slug: string | null;
    created_at: string;
    email: string;
    customer_name: string;
  }>;

  // 4. Fetch Customers
  const customers = db.prepare(`
    SELECT * FROM customers
    ORDER BY created_at DESC
    LIMIT 20
  `).all() as Array<{
    id: string;
    email: string;
    name: string;
    created_at: string;
  }>;

  // 5. Fetch Products (for key generator dropdown)
  const products = db.prepare(`
    SELECT id, sku, name FROM products WHERE active = 1
  `).all() as Array<{
    id: string;
    sku: string;
    name: string;
  }>;

  // Inline script for manual license generation / revoking
  const adminScript = `
    async function handleRevoke(licenseId) {
      if (!confirm('Are you sure you want to revoke this license? The customer will no longer be able to use it.')) {
        return;
      }
      try {
        const res = await fetch('/api/admin/license/revoke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ licenseId })
        });
        const data = await res.json();
        if (data.success) {
          alert('License revoked successfully.');
          window.location.reload();
        } else {
          alert('Error: ' + data.error);
        }
      } catch (e) {
        alert('Connection error.');
      }
    }

    async function handleCreateLicense(event) {
      event.preventDefault();
      const email = document.getElementById('gen-email').value;
      const sku = document.getElementById('gen-sku').value;
      
      try {
        const res = await fetch('/api/admin/license/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, sku })
        });
        const data = await res.json();
        if (data.success) {
          alert('License key generated: ' + data.licenseKey);
          window.location.reload();
        } else {
          alert('Error: ' + data.error);
        }
      } catch(e) {
        alert('Network error generating license.');
      }
    }
  `;

  return (
    <main style={{ paddingTop: 130, paddingBottom: 100, color: 'var(--text)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
          <div>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>Founder Admin Portal</div>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: '6px 0 0', color: '#fff' }}>Lux Control Room</h1>
          </div>
          <div>
            <span style={{ fontSize: 13, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 8, color: 'var(--text-dim)' }}>
              🟢 Live SQLite Local Sandbox
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-4" style={{ gap: 20, marginBottom: 40 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Revenue</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--success)' }}>${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Orders Completed</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>{totalOrders}</div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Active Licenses</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)' }}>{activeLicenses}</div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Customers</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--warning)' }}>{totalCustomers}</div>
          </div>
        </div>

        {/* Quick Tools Panel */}
        <div className="grid grid-3" style={{ gap: 30, marginBottom: 48 }}>
          
          {/* License Generator Form */}
          <div className="card" style={{ gridColumn: 'span 2', padding: 28 }}>
            <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 18 }}>Manual License Provisioning</h3>
            <form id="license-generator-form" style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, color: 'var(--text-dim)' }}>Customer Email</label>
                <input 
                  type="email" 
                  id="gen-email" 
                  placeholder="customer@email.com" 
                  required
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: 8, color: '#fff', fontSize: 13 }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, color: 'var(--text-dim)' }}>Product Type</label>
                <select 
                  id="gen-sku"
                  style={{ background: 'rgba(26,26,30,1)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: 8, color: '#fff', fontSize: 13 }}
                >
                  {products.map(p => (
                    <option key={p.id} value={p.sku}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '11px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
              >
                Generate &amp; Register Key
              </button>
            </form>
          </div>

          {/* Quick Info */}
          <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ margin: '0 0 10px', color: '#fff' }}>Developer Quick Keys</h4>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>
              Use the activation page (`/license/activate`) to test validation locally. Keys generated in the admin portal are written directly to the SQLite instance.
            </p>
          </div>

        </div>

        {/* Details Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          
          {/* Licenses Table */}
          <div className="card" style={{ padding: 28, overflow: 'hidden' }}>
            <h3 style={{ fontSize: 20, color: '#fff', marginBottom: 20 }}>License Keys Directory</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px 8px' }}>Prefix/Key</th>
                    <th style={{ padding: '12px 8px' }}>Customer</th>
                    <th style={{ padding: '12px 8px' }}>Type</th>
                    <th style={{ padding: '12px 8px' }}>Pack Slug</th>
                    <th style={{ padding: '12px 8px' }}>Status</th>
                    <th style={{ padding: '12px 8px' }}>Created</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.map(lic => (
                    <tr key={lic.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '14px 8px' }}>
                        <code style={{ fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 700 }}>
                          {lic.raw_key_plain}
                        </code>
                      </td>
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{lic.customer_name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{lic.email}</div>
                      </td>
                      <td style={{ padding: '14px 8px', textTransform: 'capitalize' }}>
                        {lic.type.replace('_', ' ')}
                      </td>
                      <td style={{ padding: '14px 8px', textTransform: 'uppercase', color: lic.pack_slug ? '#fff' : 'var(--text-muted)' }}>
                        {lic.pack_slug || '—'}
                      </td>
                      <td style={{ padding: '14px 8px' }}>
                        <span style={{ 
                          padding: '3px 8px', 
                          borderRadius: 4, 
                          fontSize: 11, 
                          fontWeight: 700, 
                          background: lic.status === 'active' ? 'rgba(45,212,191,0.1)' : 'rgba(239,68,68,0.1)', 
                          color: lic.status === 'active' ? 'var(--success)' : 'var(--error)' 
                        }}>
                          {lic.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 8px', color: 'var(--text-muted)' }}>
                        {new Date(lic.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                        {lic.status === 'active' && (
                          <button 
                            id={`btn-revoke-${lic.id}`}
                            style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Orders & Customers Double Grid */}
          <div className="grid grid-2" style={{ gap: 32 }}>
            
            {/* Orders */}
            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 16 }}>Completed Orders</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '8px' }}>Customer</th>
                      <th style={{ padding: '8px' }}>Total</th>
                      <th style={{ padding: '8px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(ord => (
                      <tr key={ord.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 8px' }}>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{ord.customer_name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{ord.email}</div>
                        </td>
                        <td style={{ padding: '12px 8px', fontWeight: 700, color: 'var(--success)' }}>
                          ${(ord.total_cents / 100).toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{ 
                            padding: '2px 6px', 
                            borderRadius: 4, 
                            fontSize: 10, 
                            fontWeight: 700,
                            background: ord.status === 'completed' ? 'rgba(45,212,191,0.1)' : 'rgba(251,191,36,0.1)',
                            color: ord.status === 'completed' ? 'var(--success)' : 'var(--warning)'
                          }}>{ord.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customers */}
            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 16 }}>Customers Registry</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '8px' }}>Name</th>
                      <th style={{ padding: '8px' }}>Email</th>
                      <th style={{ padding: '8px' }}>Signed Up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(cust => (
                      <tr key={cust.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 8px', fontWeight: 600, color: '#fff' }}>
                          {cust.name || '—'}
                        </td>
                        <td style={{ padding: '12px 8px', color: 'var(--text-dim)' }}>
                          {cust.email}
                        </td>
                        <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>
                          {new Date(cust.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>

      <script dangerouslySetInnerHTML={{ __html: adminScript }} />
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('license-generator-form').addEventListener('submit', handleCreateLicense);
      ` }} />
      {licenses.map(lic => (
        <script key={`js-revoke-${lic.id}`} dangerouslySetInnerHTML={{ __html: `
          const revokeBtn_${lic.id} = document.getElementById('btn-revoke-${lic.id}');
          if (revokeBtn_${lic.id}) {
            revokeBtn_${lic.id}.addEventListener('click', function() {
              handleRevoke('${lic.id}');
            });
          }
        ` }} />
      ))}
    </main>
  );
}
