import React from 'react'

export const metadata = {
  title: 'How It Works | Lux Agent',
  description: 'Understand the offline magic behind the Lux Agent AI ecosystem.'
}

export default function HowItWorksPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <section className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(74,222,128,0.1)', border: '1px solid var(--success)', borderRadius: '100px', color: 'var(--success)', fontWeight: 600, fontSize: 14, marginBottom: 16 }}>
            100% Offline Architecture
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>What is <span style={{ color: 'var(--primary)' }}>Lux AI</span>?</h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            Lux AI is not a web app. It is a fully contained, portable AI operating system living entirely on a high-speed 128GB USB drive. It requires absolutely zero internet connection to function.
          </p>
        </div>

        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60, marginBottom: 100 }}>
          <div style={{ order: 1 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>No Wi-Fi? No Problem.</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
              When you plug the Lux Agent USB drive into a Mac, Windows, or Linux machine, you are connecting a massive computational brain directly to your hardware. 
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
              Instead of sending your prompts to a cloud server (which is slow, expensive, and a privacy nightmare), Lux Agent boots up Local Large Language Models (LLMs) right on your machine's processor. 
            </p>
          </div>
          <div style={{ order: 2, padding: 40, background: 'var(--bg-elevated)', borderRadius: 24, border: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: 12 }}>✓ Complete Privacy</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: 24, fontSize: 14 }}>Your data never leaves the USB drive. No one is training on your corporate secrets.</p>
            
            <h3 style={{ color: 'var(--primary)', marginBottom: 12 }}>✓ Zero Latency</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: 24, fontSize: 14 }}>Responses are generated instantly by your local GPU/CPU, unbound by internet speeds.</p>
            
            <h3 style={{ color: 'var(--warning)', marginBottom: 12 }}>✓ Subscription Free</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>Because you aren't using someone else's cloud compute, you pay no monthly fees. Ever.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 60, background: 'rgba(162,117,255,0.05)', borderRadius: 24, border: '1px solid rgba(162,117,255,0.2)' }}>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>How The Magic Happens</h2>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            The USB drive contains an embedded server, an Electron operating environment, and a structured database called the Cognitive Vault. When you unplug the drive, the AI shuts down cleanly, storing all memories securely.
          </p>
          <a href="/#buy" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: 18 }}>
            Experience True AI Freedom
          </a>
        </div>

      </section>
    </main>
  )
}
