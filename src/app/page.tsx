import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Lux Agent USB | Your Private AI Business Team',
  description: 'Lux Agent USB gives small business owners a portable AI operator named LANA, a full AI team, Success Packs, Money Suite, and business tools that run from your own computer.'
}

const PACKS = [
  { id: 'pack_doctor', name: 'Clinic / Medical Office Pack', tag: 'Spend more time with patients, less on paperwork.', price: 499, glyph: '⚕️', img: '/lux-agent-website/pack-doctor.png', accent: '#2DD4BF' },
  { id: 'pack_music', name: 'Music & Entertainment Pack', tag: 'Run your label like a major — without the staff.', price: 499, glyph: '🎵', img: '/lux-agent-website/pack-music.png', accent: '#A275FF' },
  { id: 'pack_electric', name: 'Electrician / Contractor Pack', tag: 'More leads, more estimates, more jobs.', price: 499, glyph: '⚡', img: '/lux-agent-website/pack-electric.png', accent: '#FBBF24' },
  { id: 'pack_creator', name: 'Artist / Creator Pack', tag: 'Turn attention into a repeatable business.', price: 299, glyph: '🎨', img: '/lux-agent-website/pack-creator.png', accent: '#F472B6' },
  { id: 'pack_restaurant', name: 'Food Business Pack', tag: 'Fill tables. Build regulars. Own the block.', price: 399, glyph: '🍽️', img: '/lux-agent-website/pack-restaurant.png', accent: '#FB7185' },
  { id: 'pack_realestate', name: 'Real Estate Pack', tag: 'More listings. More leads. More closings.', price: 399, glyph: '🏠', img: '/lux-agent-website/pack-realestate.png', accent: '#38BDF8' },
  { id: 'pack_aiconsultant', name: 'AI Consultant Pack', tag: 'Sell AI systems — with the systems to deliver.', price: 599, glyph: '🧠', img: '/lux-agent-website/pack-aiconsultant.png', accent: '#34D399' },
  { id: 'pack_localservice', name: 'Local Service Business Pack', tag: 'Answer every lead. Chase every estimate.', price: 349, glyph: '🛠️', img: '/lux-agent-website/pack-localservice.jpg', accent: '#60A5FA' },
  { id: 'pack_aimarketing', name: 'AI Marketing Mastery Pack', tag: 'Hooks, ads and funnels that convert — installed.', price: 199, glyph: '🚀', img: '/lux-agent-website/pack-aimarketing.jpg', accent: '#C084FC' },
]

const BADGES = [
  { label: 'Private by Default', icon: '🔒' },
  { label: 'Runs from Your USB', icon: '💾' },
  { label: 'Beginner Friendly', icon: '👋' },
  { label: 'Success Packs Included', icon: '📦' },
  { label: 'Money Suite Available', icon: '💰' },
  { label: 'Local AI Ready', icon: '🧠' },
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
          <h1 className="hero-title">Your Private AI<br/>Business Team on a USB</h1>
          <p className="hero-subtitle">
            Lux Agent USB gives small business owners a portable AI operator named LANA, a full AI team, Success Packs, Money Suite, Web Intelligence, training, and business tools that run from your own computer.
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, maxWidth: 700, margin: '0 auto 28px', lineHeight: 1.6, opacity: 0.8 }}>
            Plug it in. Launch LANA. Choose your Success Pack. Start running sales, marketing, reports, budgeting, write-offs, web research, websites, customer follow-ups, and daily business tasks — with privacy first.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/store" className="btn btn-primary">
              Get Lux Agent USB
            </Link>
            <Link href="/#packs" className="btn btn-secondary">
              See Success Packs
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            {BADGES.map(b => (
              <span key={b.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO VIDEO */}
      <section id="demo" className="container" style={{ padding: '40px 20px' }}>
        <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
          <video
            src="/lux-agent-website/aiMotion.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </section>

      {/* WHAT IS LUX AGENT */}
      <section className="container" style={{ padding: '80px 20px' }}>
        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60 }}>
          <div style={{ order: 1 }}>
            <h2 style={{ fontSize: 36, marginBottom: 24 }}>What Is Lux Agent USB?</h2>
            <p style={{ fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 24 }}>
              Lux Agent USB is a portable AI business system built for small business owners, creators, contractors, clinics, studios, coaches, nonprofits, and local service providers.
            </p>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 24 }}>
              It is not just a chatbot. It gives you LANA, your AI business operator, plus an AI team that helps with sales, marketing, admin, research, finance, budgeting, write-offs, websites, reports, and daily operations.
            </p>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--primary)', lineHeight: 1.6 }}>
              Your business brain lives on the USB. Your computer gives it power.
            </p>
          </div>
          <div style={{ order: 2 }}>
            <img
              src="/lux-agent-website/banner-usb.jpg"
              alt="Lux Agent USB Drive"
              style={{ width: '100%', borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(162,117,255,0.18)' }}
            />
          </div>
        </div>
      </section>

      {/* MEET LANA */}
      <section className="container" style={{ padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="section-title">Meet LANA</h2>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 700, margin: '-30px auto 0', lineHeight: 1.6 }}>
            Your personal AI business operator. She helps you think, plan, organize, create, research, follow up, and move the business forward.
          </p>
        </div>
        <div className="grid grid-3">
          {[
            { icon: '📋', title: 'Daily Plans', desc: 'Create daily business plans and action items tailored to your goals.' },
            { icon: '📧', title: 'Follow-Ups', desc: 'Write customer follow-ups, outreach emails, and response templates.' },
            { icon: '📊', title: 'Reports', desc: 'Create reports, proposals, budget snapshots, and business briefings.' },
            { icon: '🔍', title: 'Research', desc: 'Research competitors, tools, vendors, and market opportunities.' },
            { icon: '💬', title: 'Sales Scripts', desc: 'Build sales scripts, pitch decks, and outreach sequences.' },
            { icon: '💰', title: 'Money Help', desc: 'Help with budgeting, write-offs, expense tracking, and financial planning.' },
          ].map(item => (
            <div key={item.title} className="card">
              <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontSize: 20, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: 15 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI TEAM */}
      <section className="container" style={{ padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.3)', borderRadius: 100, color: '#2DD4BF', fontWeight: 700, fontSize: 13, letterSpacing: 1.5, marginBottom: 16, textTransform: 'uppercase' }}>YOUR AI TEAM</div>
          <h2 className="section-title" style={{ marginBottom: 8 }}>LANA Does Not Work Alone</h2>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 700, margin: '-30px auto 0', lineHeight: 1.6 }}>
            Your AI team gives you role-equivalent business support across sales, marketing, admin, research, finance, operations, and tech.
          </p>
        </div>
        <div className="grid grid-3">
          {[
            { name: 'LANA', role: 'Business Operator', desc: 'Daily planning, reports, business guidance, task coordination, and memory.', accent: '#A275FF', img: '/lux-agent-website/lana-profile.png', value: '$4,500/mo' },
            { name: 'Dre', role: 'Sales & Biz Dev', desc: 'Lead finding, outreach scripts, follow-ups, offers, and pipeline support.', accent: '#2DD4BF', img: '/lux-agent-website/agent-dre.jpeg', value: '$5,000/mo' },
            { name: 'Tyrone', role: 'Marketing Coach', desc: 'Campaigns, ad hooks, social content, brand positioning, and promotion strategy.', accent: '#FBBF24', img: '/lux-agent-website/agent-tyrone.png', value: '$5,500/mo' },
            { name: 'Andre Vaughn', role: 'Admin Assistant', desc: 'Email drafts, scheduling support, document organization, reminders, and checklists.', accent: '#F472B6', img: '/lux-agent-website/agent-andre.png', value: '$3,500/mo' },
            { name: 'Chuck Cole', role: 'Tech & Web Support', desc: 'Website updates, Lux Coder support, troubleshooting, tool setup, and automation.', accent: '#60A5FA', img: '/lux-agent-website/agent-chuck.jpeg', value: '$6,000/mo' },
            { name: 'Finance Agent', role: 'Money & Operations', desc: 'Budgets, SOPs, pricing support, reports, money leaks, and operations planning.', accent: '#34D399', img: '/lux-agent-website/agent-finance.jpeg', value: '$5,500/mo' },
          ].map(agent => (
            <div key={agent.name} className="card" style={{ borderTop: `3px solid ${agent.accent}`, padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                <img src={agent.img} alt={agent.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px 14px', background: 'linear-gradient(to top, rgba(10,10,14,1) 10%, transparent)' }}>
                  <h3 style={{ fontSize: 20, marginBottom: 2 }}>{agent.name}</h3>
                  <p style={{ fontSize: 13, color: agent.accent, fontWeight: 600, margin: 0 }}>{agent.role}</p>
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 8, fontSize: 12, fontWeight: 700, color: agent.accent, border: `1px solid ${agent.accent}30` }}>
                  {agent.value}
                </div>
              </div>
              <div style={{ padding: '14px 20px 20px' }}>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: 14, margin: 0 }}>{agent.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI TEAM VALUE */}
      <section className="container" style={{ padding: '0 20px 80px' }}>
        <div style={{ borderRadius: 24, border: '1px solid var(--border)', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(45,212,191,0.04), rgba(162,117,255,0.04))' }}>
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 12 }}>What Is Your AI Team Worth?</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 720, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Hiring sales, marketing, admin, finance, research, and tech support can cost thousands every month. Lux Agent USB gives you LANA and an AI business team that helps cover those roles from one portable system.
            </p>

            {/* Value table */}
            <div style={{ maxWidth: 700, margin: '0 auto 32px', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 0, fontSize: 14, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
                {/* Header */}
                <div style={{ padding: '12px 16px', background: 'rgba(162,117,255,0.1)', fontWeight: 700, color: 'var(--primary)', borderBottom: '1px solid var(--border)' }}>AI Agent</div>
                <div style={{ padding: '12px 16px', background: 'rgba(162,117,255,0.1)', fontWeight: 700, color: 'var(--primary)', borderBottom: '1px solid var(--border)' }}>Role It Supports</div>
                <div style={{ padding: '12px 16px', background: 'rgba(162,117,255,0.1)', fontWeight: 700, color: 'var(--primary)', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>Est. Value</div>
                {/* Rows */}
                {[
                  ['LANA', 'Executive Assistant / Business Operator', '$4,500/mo'],
                  ['Dre', 'Sales Development / Lead Follow-Up', '$5,000/mo'],
                  ['Tyrone', 'Marketing Manager / Campaign Coach', '$5,500/mo'],
                  ['Andre Vaughn', 'Admin / Scheduling / Documents', '$3,500/mo'],
                  ['Chuck Cole', 'Website / Tech Support Specialist', '$6,000/mo'],
                  ['Finance Agent', 'Operations + Finance Assistant', '$5,500/mo'],
                  ['Research Agent', 'Market Research Analyst', '$4,500/mo'],
                  ['Social Agent', 'Social Media Manager', '$4,000/mo'],
                ].map(([name, role, val], i) => (
                  <React.Fragment key={i}>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600, background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>{name}</div>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text-dim)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>{role}</div>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', color: '#2DD4BF', fontWeight: 700, textAlign: 'right', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>{val}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Total callout */}
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
              <div style={{ padding: '20px 32px', background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.25)', borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4, fontWeight: 600 }}>Estimated monthly value</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#2DD4BF' }}>$38,500<span style={{ fontSize: 16, fontWeight: 500 }}>/mo</span></div>
              </div>
              <div style={{ padding: '20px 32px', background: 'rgba(162,117,255,0.08)', border: '1px solid rgba(162,117,255,0.25)', borderRadius: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4, fontWeight: 600 }}>Lux Agent USB starts at</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--primary)' }}>$299<span style={{ fontSize: 16, fontWeight: 500 }}> one-time</span></div>
              </div>
            </div>

            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
              You are not buying a USB. You are buying a private AI business team.
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', opacity: 0.6, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Agent values are role-equivalent estimates for comparison only. Lux Agent USB does not guarantee income, replace professional advice, or promise the exact output of a human employee. Value depends on how consistently you use LANA and execute the daily plan.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE BENTO */}
      <section className="container" style={{ padding: '0 20px 80px' }}>
        <h2 className="section-title">A Complete Business Ecosystem</h2>
        <div className="grid grid-3">
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>💰</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Money Suite</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Track income, expenses, and monthly goals with Lux Budgeter. Organize receipts and write-off categories with Lux WriteOff. Get business license checklists, money leak reports, CPA export packets, and tax prep summaries.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: 32, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Web Intelligence</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Give LANA public web research power. Study competitors, compare tools, research vendors, find public business leads, and turn findings into reports or CRM actions.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: 32, marginBottom: 16 }}>🔒</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Privacy First</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Your business data stays local by default. Cloud AI is optional. LANA will not send private data to cloud models unless you approve it. You control what LANA can access.
            </p>
          </div>
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🎓</div>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Training Workshop Included</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Built for people new to AI. The Training Workshop walks you through launching the app, setting up Business HQ, choosing a Success Pack, using the AI team, tracking leads, using Money Suite, and saving work to your Vault. You do not need to be technical.
            </p>
          </div>
        </div>
      </section>

      {/* SUCCESS PACKS */}
      <section id="packs" className="container" style={{ padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 12, color: 'var(--primary)', fontWeight: 700, letterSpacing: 2, fontSize: 13 }}>SUCCESS PACKS</div>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Don&apos;t Start From Scratch. Install a Business.</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-dim)', maxWidth: 720, margin: '0 auto 40px', fontSize: 18, lineHeight: 1.6 }}>
          Success Packs are industry-specific business systems that teach LANA what your business needs — daily tasks, report templates, CRM setup, marketing prompts, budgeting vision, and AI team instructions built for your industry.
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

      {/* WHO THIS IS FOR */}
      <section className="container" style={{ padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="section-title">Who This Is For</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
          {['Contractors', 'Electricians', 'Clinics', 'Coaches', 'Creators', 'Music Studios', 'Food Businesses', 'Real Estate Agents', 'Local Service Businesses', 'Consultants', 'Nonprofits', 'Small Business Owners', 'People New to AI'].map(who => (
            <span key={who} style={{ padding: '10px 20px', background: 'rgba(162,117,255,0.06)', border: '1px solid rgba(162,117,255,0.2)', borderRadius: 100, fontSize: 14, color: 'var(--text-dim)', fontWeight: 500 }}>
              {who}
            </span>
          ))}
        </div>
      </section>

      {/* BUY CTA */}
      <section id="buy" className="container" style={{ padding: '0 20px 90px' }}>
        <div style={{ textAlign: 'center', borderRadius: 28, padding: '60px 28px', border: '1px solid var(--border)', background: 'radial-gradient(700px 300px at 50% 0, rgba(162,117,255,0.18), transparent 70%)' }}>
          <h2 style={{ fontSize: 40, marginBottom: 12 }}>Ready to give your business a private AI team?</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 18, maxWidth: 640, margin: '0 auto 28px', lineHeight: 1.6 }}>
            Plug in Lux Agent USB, launch LANA, choose your Success Pack, and start moving your business forward.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/store" className="btn btn-primary">Get Lux Agent USB</Link>
            <Link href="/#packs" className="btn btn-secondary">Browse Success Packs</Link>
          </div>
        </div>
      </section>

    </main>
  )
}
