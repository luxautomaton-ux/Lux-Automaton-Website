import React from 'react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <main style={{ paddingTop: 140, paddingBottom: 100, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: 540 }}>
        <div style={{ background: 'rgba(26,26,30,0.5)', border: '1px solid var(--border)', borderRadius: 24, padding: '48px 32px', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '2px solid var(--error)', color: 'var(--error)', fontSize: 32, marginBottom: 24 }}>
            ✕
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Transaction Canceled</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
            Your simulated checkout transaction was canceled, and no charges were made. If you ran into an issue, please try again or contact support.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/store" className="btn btn-secondary">Return to Store</Link>
            <Link href="/" className="btn btn-primary">Go to Homepage</Link>
          </div>

        </div>
      </div>
    </main>
  );
}
