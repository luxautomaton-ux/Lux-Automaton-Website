'use client'

import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main style={{ paddingTop: 160, paddingBottom: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(45,212,191,0.08)', border: '2px solid rgba(45,212,191,0.3)',
          fontSize: 36, marginBottom: 24
        }}>
          ✓
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Checkout Success
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
          This feature requires the <strong style={{ color: '#fff' }}>Lux Agent USB app</strong>. Order processing and license key delivery are handled locally on your device.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link href="/store" className="btn btn-secondary">Visit Store</Link>
          <Link href="/" className="btn btn-primary">Go to Home</Link>
        </div>
      </div>
    </main>
  )
}
