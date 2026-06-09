import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'How It Works | Lux Agent USB',
  description: 'Six simple steps to launch your private AI business system.'
}

const STEPS = [
  { num: '01', title: 'Plug In the USB', desc: 'Connect Lux Agent USB to your Mac, Windows, or Linux computer.', icon: '💾', accent: '#A275FF' },
  { num: '02', title: 'Launch Lux Agent OS', desc: 'Open the app and let LANA load your business command center.', icon: '🚀', accent: '#2DD4BF' },
  { num: '03', title: 'Choose Your Privacy Mode', desc: 'Use Safe Mode, Business Mode, or Operator Mode depending on what you want LANA to access.', icon: '🔒', accent: '#FBBF24' },
  { num: '04', title: 'Fill Out Business HQ', desc: 'Tell LANA your business name, services, customers, goals, pricing, and brand voice.', icon: '🏢', accent: '#F472B6' },
  { num: '05', title: 'Choose a Success Pack', desc: 'Pick the business system that matches your industry — Electrician, Clinic, Music, Creator, Restaurant, Real Estate, and more.', icon: '📦', accent: '#60A5FA' },
  { num: '06', title: 'Ask LANA What To Do Next', desc: 'LANA creates daily tasks, reports, follow-ups, marketing plans, budgets, research, and business actions.', icon: '🧠', accent: '#34D399' },
]

export default function HowItWorksPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <section className="container">

        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(74,222,128,0.1)', border: '1px solid var(--success)', borderRadius: '100px', color: 'var(--success)', fontWeight: 600, fontSize: 14, marginBottom: 16 }}>
            6 Simple Steps
          </div>
          <h1 className="section-title" style={{ marginBottom: 24 }}>How <span style={{ color: 'var(--primary)' }}>Lux Agent USB</span> Works</h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 760, margin: '0 auto', lineHeight: 1.6 }}>
            Lux Agent USB is not a web app. It is a fully contained, portable AI business system living on a high-speed USB drive. Plug it in and your AI team is ready to work.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 800, margin: '0 auto 80px' }}>
          {STEPS.map(step => (
            <div key={step.num} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: 32, background: 'var(--bg-elevated)', borderRadius: 20, border: '1px solid var(--border)', borderLeft: `4px solid ${step.accent}` }}>
              <div style={{ fontSize: 40, flexShrink: 0 }}>{step.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: step.accent, letterSpacing: 1.5, marginBottom: 6 }}>STEP {step.num}</div>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: 15 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* HOW LANA USES YOUR COMPUTER */}
        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60, marginBottom: 80 }}>
          <div>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>How LANA Uses Your Computer</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 24 }}>
              LANA lives on the USB, but with your permission she can use your computer to help you work — screen guidance, browser research, filling out forms, email organization, drafting replies, calendar planning, booking support, file organization, website help, CRM updates, and report creation.
            </p>
            <p style={{ fontSize: 15, color: 'var(--warning)', lineHeight: 1.6, fontWeight: 500 }}>
              LANA can prepare work automatically, but she must ask before sending, deleting, publishing, installing, purchasing, running commands, editing code, accessing private folders, or sharing sensitive data with cloud AI.
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginTop: 16 }}>You stay in control.</p>
          </div>
          <div style={{ padding: 40, background: 'var(--bg-elevated)', borderRadius: 24, border: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: 12 }}>✓ Complete Privacy</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: 24, fontSize: 14 }}>Your data never leaves the USB by default. Cloud AI is optional and requires your approval.</p>
            <h3 style={{ color: 'var(--primary)', marginBottom: 12 }}>✓ Works Offline</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: 24, fontSize: 14 }}>Many features work offline with local AI and local files. Internet is needed for web research, cloud AI, and connected tools.</p>
            <h3 style={{ color: 'var(--warning)', marginBottom: 12 }}>✓ No Monthly AI Fees</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>Local AI runs on your own hardware. No per-message charges or surprise bills for basic operations.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 60, background: 'rgba(162,117,255,0.05)', borderRadius: 24, border: '1px solid rgba(162,117,255,0.2)' }}>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>Ready to Start?</h2>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Plug in Lux Agent USB, launch LANA, choose your Success Pack, and start moving your business forward.
          </p>
          <Link href="/store" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: 18 }}>
            Get Lux Agent USB
          </Link>
        </div>

      </section>
    </main>
  )
}
