'use client'

import Link from 'next/link'

export default function AdminPage() {
  return (
    <main style={{ paddingTop: 160, paddingBottom: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(251,191,36,0.08)', border: '2px solid rgba(251,191,36,0.3)',
          fontSize: 36, marginBottom: 24
        }}>
          🔒
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Admin Panel
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
          The admin console is available on the <strong style={{ color: '#fff' }}>Lux Agent USB app</strong> only. It requires a local SQLite database and cannot run on a static website.
        </p>
        <Link href="/" className="btn btn-secondary" style={{ display: 'inline-block' }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
