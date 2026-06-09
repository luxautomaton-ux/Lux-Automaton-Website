import React from 'react'

export const metadata = {
  title: 'About | Lux Agent',
  description: 'Developed by Lux Automaton and created by founder Asa Pritchard.'
}

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 70 }}>
      <section className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60 }}>
          <div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: 24 }}>The Story Behind <span style={{ color: 'var(--primary)' }}>Lux Automaton</span></h1>
            <p style={{ fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 24 }}>
              Lux Automaton was born out of a stark realization: true artificial intelligence should not require a subscription, nor should it mandate that your private data be sent to the cloud.
            </p>
            <p style={{ fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.8 }}>
              We set out to build an ecosystem that is 100% offline, entirely self-contained, and fundamentally portable. The result is the Lux Agent architecture—a high-speed computational environment housed entirely on a 128GB USB drive, capable of spinning up a multi-agent swarm on any OS in seconds.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Glow behind image */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'var(--primary)', filter: 'blur(80px)', opacity: 0.3, zIndex: 0 }} />
            
            <div style={{ position: 'relative', zIndex: 1, borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <img 
                src="/asa.png" 
                alt="Asa Pritchard, Founder of Lux Automaton" 
                style={{ width: '100%', display: 'block', aspectRatio: '1/1', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, background: 'linear-gradient(to top, rgba(13,13,15,1), transparent)' }}>
                <h3 style={{ fontSize: 24, fontWeight: 700 }}>Asa Pritchard</h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Founder & Lead Architect</p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
