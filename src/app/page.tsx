import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Lux Agent | Offline AI Command Center',
  description: 'The world\'s first 100% offline, plug-and-play AI orchestration environment.'
}

const PACKS = [
  { id: 'pack_doctor', name: 'Doctor Success Pack', tag: 'Spend more time with patients, less on paperwork.', price: 499, glyph: '⚕️', img: '/pack-doctor.png', accent: '#2DD4BF' },
  { id: 'pack_music', name: 'Music Label Success Pack', tag: 'Run your label like a major — without the staff.', price: 499, glyph: '🎵', img: '/pack-music.png', accent: '#A275FF' },
  { id: 'pack_electric', name: 'Electrical Contractor Success Pack', tag: 'More leads, more estimates, more jobs.', price: 499, glyph: '⚡', img: '/pack-electric.png', accent: '#FBBF24' },
  { id: 'pack_creator', name: 'Creator Success Pack', tag: 'Turn attention into a repeatable business.', price: 299, glyph: '🎨', img: '/pack-creator.png', accent: '#F472B6' },
  { id: 'pack_restaurant', name: 'Restaurant Success Pack', tag: 'Fill tables. Build regulars.', price: 399, glyph: '🍽️', img: '/pack-restaurant.png', accent: '#FB7185' },
  { id: 'pack_realestate', name: 'Real Estate Success Pack', tag: 'More listings. More leads. More closings.', price: 399, glyph: '🏠', img: '/pack-realestate.png', accent: '#38BDF8' },
  { id: 'pack_aiconsultant', name: 'AI Consultant Success Pack', tag: 'Sell AI systems — with the systems to deliver.', price: 599, glyph: '🧠', img: '/pack-aiconsultant.png', accent: '#34D399' },
  { id: 'pack_localservice', name: 'Local Service Business Pack', tag: 'Answer every lead. Chase every estimate.', price: 349, glyph: '🛠️', img: '/pack-localservice.jpg', accent: '#60A5FA' },
  { id: 'pack_aimarketing', name: 'AI Marketing Mastery Pack', tag: 'Hooks, ads and funnels that convert — installed.', price: 199, glyph: '🚀', img: '/pack-aimarketing.jpg', accent: '#C084FC' },
]

export default function MarketingPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(162,117,255,0.1)', border: '1px solid var(--primary)', borderRadius: '100px', color: 'var(--primary)', fontWeight: 600, fontSize: 14, marginBottom: 24, backdropFilter: 'blur(10px)' }}>
            LANA Core v1.0 • Now Available
          </div>
          <h1 className="hero-title">The Portable AI<br/>Command Center</h1>
          <p className="hero-subtitle">
            Lux Agent is a 100% offline, self-contained AI orchestration environment that runs from a high-speed 256GB USB drive. No subscriptions, no cloud dependencies, total data privacy.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/checkout?product_id=prod_usb_pro" className="btn btn-primary">
              Order USB Pro Drive — $997
            </Link>
            <a href="#demo" className="btn btn-secondary">
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* DEMO VIDEO */}
      <section id="demo" className="container" style={{ padding: '40px 20px' }}>
        <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
          <video 
            src="/aiMotion.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </section>

      {/* HARDWARE OVERVIEW */}
      <section className="container" style={{ padding: '80px 20px' }}>
        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60 }}>
          <div style={{ order: 1 }}>
            <h2 style={{ fontSize: 36, marginBottom: 24 }}>The Hardware</h2>
            <p style={{ fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
              Lux Agent Workspace is your portable, fully localized AI command center.
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Powered by LANA (Lux Autonomous Neural Assistant), it enables you to build apps, conduct deep research, run CRM businesses, and construct specialized AI agents — all from a single USB drive with no external cloud servers or API keys required.
            </p>
          </div>
          <div style={{ order: 2 }}>
            <img 
              src="/banner-usb.jpg" 
              alt="Lux Agent USB Drive" 
              style={{ width: '100%', borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(162,117,255,0.18)' }} 
            />
          </div>
        </div>
      </section>

      {/* FEATURE BENTO GRID */}
      <section className="container">
        <h2 className="section-title">A Complete Ecosystem</h2>
        <div className="grid grid-3">
          
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🔌</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>True Plug & Play</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Whether you are on a Mac, Windows, or Linux machine, just plug in the drive and double-click the launcher. The entire Electron-based software experience, Next.js backend, and Ollama AI engine boot up instantly. 
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: 32, marginBottom: 16 }}>🧠</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Cognitive Vault</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              LANA learns from you. Preferences, workflows, and business data are permanently saved to a local JSON vault on the USB drive.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: 32, marginBottom: 16 }}>🔒</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>100% Offline</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              No internet connection required. Local language models run natively on your machine's own hardware, ensuring total privacy.
            </p>
          </div>

          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🤖</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Multi-Agent Swarm</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Don't just chat. Delegate. Assign complex, multi-step tasks to a swarm of AI sub-agents and follow their live activity logs on a visual Kanban board or chronological Timeline.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: 32, marginBottom: 16 }}>📞</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Voice Console</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Speak or type to LANA and she replies out loud through your system voice — a hands-free assistant that works completely offline.
            </p>
          </div>

          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>📅</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Offline Booking & Calendar</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Schedule appointments straight from the dashboard. Everything is stored locally and exports to a standard .ics file you can import into Google, Apple, or Outlook calendars — no booking subscription required.
            </p>
          </div>

        </div>
      </section>

      {/* SUCCESS PACKS */}
      <section id="packs" className="container" style={{ padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 12, color: 'var(--primary)', fontWeight: 700, letterSpacing: 2, fontSize: 13 }}>SUCCESS PACKS</div>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Don&apos;t sell AI. Install a business.</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', maxWidth: 720, margin: '0 auto 40px', fontSize: 18, lineHeight: 1.6 }}>
          Lux Agent is the operating system. <strong style={{ color: 'var(--text)' }}>Success Packs</strong> install a complete business into it — vision, daily playbooks, marketing, growth tactics and SOPs that LANA runs for you every day.
        </p>
        <div className="grid grid-3">
          {PACKS.map(p => (
            <div key={p.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 160, backgroundImage: `linear-gradient(180deg, rgba(10,10,12,0.15), rgba(10,10,12,0.85)), url('${p.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{p.glyph}</div>
                <h3 style={{ fontSize: 19, marginBottom: 6 }}>{p.name}</h3>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 14, minHeight: 44 }}>{p.tag}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: 20, color: p.accent }}>${p.price}</span>
                  <Link href={`/checkout?product_id=${p.id}`} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 14 }}>Get Pack</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* BUY CTA */}
      <section id="buy" className="container" style={{ padding: '90px 20px' }}>
        <div style={{ textAlign: 'center', borderRadius: 28, padding: '60px 28px', border: '1px solid var(--border)', background: 'radial-gradient(700px 300px at 50% 0, rgba(162,117,255,0.18), transparent 70%)' }}>
          <h2 style={{ fontSize: 40, marginBottom: 12 }}>Put an AI team to work today.</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 18, maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Get the Lux Agent USB — the offline AI operating system — then install the Success Packs your business needs. One-time purchase. No subscriptions. Total privacy.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/checkout?product_id=prod_usb_pro" className="btn btn-primary">Order Lux Agent USB Pro — $997</Link>
            <a href="#packs" className="btn btn-secondary">Browse Success Packs</a>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 18, opacity: 0.7 }}>Each pack installs into Lux Agent and is unlocked with a license key after purchase.</p>
        </div>
      </section>

    </main>
  )
}
