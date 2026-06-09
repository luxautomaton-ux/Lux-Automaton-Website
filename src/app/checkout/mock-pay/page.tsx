'use client'

import Link from 'next/link'

export default function MockPayPage() {
  return (
    <main style={{ paddingTop: 160, paddingBottom: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(162,117,255,0.08)', border: '2px solid rgba(162,117,255,0.3)',
          fontSize: 36, marginBottom: 24
        }}>
          💳
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Payment Sandbox
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
          This feature requires the <strong style={{ color: '#fff' }}>Lux Agent USB app</strong>. The payment sandbox runs locally with a SQLite database and cannot operate on a static website.
        </p>
        <Link href="/" className="btn btn-secondary" style={{ display: 'inline-block' }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
