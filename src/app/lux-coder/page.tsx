import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Lux Coder | AI Tech Workbench for Websites, Apps & Business Systems',
  description: 'Lux Coder is the advanced operator workspace inside Lux Agent USB. Turn business ideas into websites, tools, automations, and technical workflows.'
}

const BUILDS = [
  'Website pages', 'Landing page copy', 'Business forms', 'Lead capture flows',
  'CRM improvements', 'Automation plans', 'Customer dashboards', 'Internal tools',
  'Reports', 'App updates', 'File organization', 'Business workflows',
  'Scripts & setup commands', 'Tool connection plans', 'AI prompt systems', 'Success Pack improvements',
]

const USE_CASES = [
  {
    title: 'Local Service Business',
    ask: '"I need a simple website that gets people to request a quote."',
    result: 'LANA creates the offer, service sections, trust points, FAQ, and lead form plan. Chuck Cole helps prepare the page structure.',
    accent: '#FBBF24',
  },
  {
    title: 'Clinic',
    ask: '"I need a patient intake page and weekly admin checklist."',
    result: 'LANA creates the business workflow. Chuck Cole helps structure the form and internal process.',
    accent: '#2DD4BF',
  },
  {
    title: 'Music Studio',
    ask: '"I need a booking page and a package page for artists."',
    result: 'LANA creates the offer copy and service packages. Lux Coder helps create the web page plan.',
    accent: '#A275FF',
  },
  {
    title: 'Creator',
    ask: '"I need a landing page for my YouTube coaching offer."',
    result: 'LANA writes the funnel. Chuck Cole helps create the technical structure.',
    accent: '#F472B6',
  },
  {
    title: 'Consultant',
    ask: '"I need a service page that explains my AI setup package."',
    result: 'LANA creates the sales copy. Lux Coder helps turn it into a page.',
    accent: '#60A5FA',
  },
]

const STEPS = [
  { num: '01', title: 'Tell LANA What You Need', desc: 'Start with a plain-language request: "I need a website for my business," "I need a landing page," or "I need a customer intake form."', icon: '💬', accent: '#A275FF' },
  { num: '02', title: 'LANA Turns the Idea Into a Plan', desc: 'LANA asks questions, organizes the goal, identifies the customer, clarifies the offer, and prepares the structure.', icon: '📋', accent: '#2DD4BF' },
  { num: '03', title: 'Chuck Cole Builds Technical Direction', desc: 'Chuck helps turn the plan into pages, components, workflows, scripts, or app instructions.', icon: '🔧', accent: '#FBBF24' },
  { num: '04', title: 'Lux Coder Helps Build the System', desc: 'Lux Coder supports the build, edits, review, file updates, tool setup, and testing.', icon: '⚡', accent: '#60A5FA' },
  { num: '05', title: 'You Review Before Anything Goes Live', desc: 'Nothing important is published, sent, deleted, installed, or changed without your permission. You stay in control.', icon: '✅', accent: '#34D399' },
]

const FAQS = [
  { q: 'Do I need to know how to code?', a: 'No. LANA helps you explain what you need in plain language.' },
  { q: 'Is Lux Coder for every customer?', a: 'Every customer can request tech help, but full Lux Coder access is usually for Operator Mode, trained users, or setup sessions.' },
  { q: 'Can Lux Coder build a full website?', a: 'Lux Coder can help plan, write, structure, improve, and support website builds. Full website setup may be included in Business or Pro packages, or sold as an add-on.' },
  { q: 'Can Lux Coder edit my app?', a: 'In Operator Mode, Lux Coder can support app and code workflows with permission and review.' },
  { q: 'Is my code private?', a: 'Yes. Code and project files are treated as sensitive by default. Nothing leaves your system without approval.' },
  { q: 'Can Lux Coder connect tools?', a: 'Lux Coder can help plan and support tool connections, automations, APIs, and workflows depending on the setup package.' },
  { q: 'Can LANA send work to Lux Coder?', a: 'Yes. LANA can prepare a technical request and route it to Lux Coder or Chuck Cole workflows when Operator Mode is available.' },
]

export default function LuxCoderPage() {
  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* Decorative glows */}
      <div style={{ position: 'absolute', top: '8%', left: '3%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '35%', right: '3%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(162,117,255,0.05) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <section className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── HERO ─── */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.3)', borderRadius: 100, color: '#60A5FA', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
            ⚡ Advanced Operator Workspace
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, margin: '0 0 16px', background: 'linear-gradient(to right, #fff, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
            Your AI Tech Workbench
          </h1>
          <p style={{ fontSize: 20, color: 'var(--text-dim)', maxWidth: 800, margin: '0 auto 16px', lineHeight: 1.6 }}>
            Lux Coder is the advanced operator workspace inside Lux Agent USB. It helps turn business ideas into websites, tools, automations, app updates, scripts, reports, and technical workflows — with LANA guiding the vision and Chuck Cole helping with the build.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 680, margin: '0 auto 28px', lineHeight: 1.6, opacity: 0.8 }}>
            Most business owners know what they want, but they do not know how to build it. Lux Coder bridges that gap.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/checkout?product_id=addon_website" className="btn btn-primary">Book Website Setup</Link>
            <Link href="/store" className="btn btn-secondary">Get Lux Agent USB</Link>
          </div>
        </div>

        {/* ─── WHAT IS LUX CODER ─── */}
        <div style={{ marginBottom: 80 }}>
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div>
              <h2 style={{ fontSize: 32, marginBottom: 16 }}>What Is Lux Coder?</h2>
              <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 20 }}>
                Lux Coder is the technical workbench connected to Lux Agent USB. It is built for website updates, app planning, automation setup, code assistance, tool connections, business system building, and technical support.
              </p>
              <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 20 }}>
                For everyday customers, Lux Coder works behind the scenes through LANA. For advanced users and operators, Lux Coder unlocks a deeper workspace for building and improving digital systems.
              </p>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, fontStyle: 'italic', opacity: 0.8 }}>
                You do not need to be a coder to benefit from Lux Coder. LANA helps translate your business idea into instructions Lux Coder can use.
              </p>
            </div>

            {/* Simple Explanation */}
            <div style={{ padding: 32, background: 'var(--bg-elevated)', borderRadius: 20, border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: 'var(--text-dim)' }}>How It All Connects</h3>
              {[
                { emoji: '🤖', label: 'LANA', role: 'is the face', accent: '#A275FF' },
                { emoji: '🧠', label: 'Hermes Lite', role: 'is the team brain', accent: '#2DD4BF' },
                { emoji: '🔧', label: 'Lux Coder', role: 'is the hands', accent: '#60A5FA' },
                { emoji: '💾', label: 'The USB', role: 'is the portable business brain', accent: '#FBBF24' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 28 }}>{item.emoji}</span>
                  <div>
                    <span style={{ fontWeight: 700, color: item.accent }}>{item.label}</span>
                    <span style={{ color: 'var(--text-dim)', marginLeft: 6 }}>{item.role}</span>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 16, lineHeight: 1.6, opacity: 0.7 }}>
                When a customer asks for a website, a form, a workflow, or a business tool, LANA organizes the request and routes the technical work to Lux Coder.
              </p>
            </div>
          </div>
        </div>

        {/* ─── WHAT IT BUILDS ─── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 className="section-title">What Lux Coder Helps Build</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
            {BUILDS.map(b => (
              <span key={b} style={{ padding: '10px 18px', background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 10, fontSize: 14, color: 'var(--text-dim)', fontWeight: 500 }}>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ─── MEET CHUCK COLE ─── */}
        <div style={{ marginBottom: 80 }}>
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div style={{ position: 'relative', maxWidth: 360 }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: '#60A5FA', filter: 'blur(60px)', opacity: 0.2, zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <img src="/lux-agent-website/agent-chuck.jpeg" alt="Chuck Cole — AI Tech Specialist" style={{ width: '100%', display: 'block', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, background: 'linear-gradient(to top, rgba(10,10,14,1), transparent)' }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700 }}>Chuck Cole</h3>
                  <p style={{ color: '#60A5FA', fontWeight: 600, fontSize: 14 }}>AI Tech & Web Support Specialist</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: 'inline-block', padding: '5px 12px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.3)', borderRadius: 100, color: '#60A5FA', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, marginBottom: 14, textTransform: 'uppercase' }}>MEET YOUR TECH LEAD</div>
              <h2 style={{ fontSize: 30, marginBottom: 16 }}>Chuck Cole Is Your AI Tech Specialist</h2>
              <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 20 }}>
                Chuck is the technical support agent inside the Lux Agent team. LANA understands the business goal. Chuck helps with the technical execution.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Website planning', 'Code review & bug explanations', 'App improvement ideas', 'Tool setup & automation planning', 'Technical troubleshooting', 'Lux Coder workflows'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 15 }}>
                    <span style={{ color: '#60A5FA' }}>✓</span>
                    <span style={{ color: 'var(--text-dim)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── HOW IT WORKS ─── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">How Lux Coder Works</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 750, margin: '0 auto' }}>
            {STEPS.map(step => (
              <div key={step.num} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: 28, background: 'var(--bg-elevated)', borderRadius: 16, border: '1px solid var(--border)', borderLeft: `4px solid ${step.accent}` }}>
                <div style={{ fontSize: 36, flexShrink: 0 }}>{step.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: step.accent, letterSpacing: 1.5, marginBottom: 4 }}>STEP {step.num}</div>
                  <h3 style={{ fontSize: 19, marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: 14, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── CUSTOMER MODE vs OPERATOR MODE ─── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Two Levels of Access</h2>
          </div>
          <div className="grid grid-2" style={{ gap: 24, maxWidth: 800, margin: '0 auto' }}>
            {/* Customer Mode */}
            <div className="card" style={{ borderTop: '3px solid #2DD4BF', padding: 28 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>👤</div>
              <h3 style={{ fontSize: 22, marginBottom: 6 }}>Customer Mode</h3>
              <p style={{ fontSize: 13, color: '#2DD4BF', fontWeight: 600, marginBottom: 16 }}>Simple & Safe</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Website help', 'Landing page help', 'Business form help', 'App improvement ideas', 'Automation planning', 'Tech support guidance'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--text-dim)' }}>
                    <span style={{ color: '#2DD4BF' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 16, lineHeight: 1.6, opacity: 0.7 }}>
                LANA explains the work in plain language and helps prepare the request.
              </p>
            </div>
            {/* Operator Mode */}
            <div className="card" style={{ borderTop: '3px solid #A275FF', padding: 28 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>⚙️</div>
              <h3 style={{ fontSize: 22, marginBottom: 6 }}>Operator Mode</h3>
              <p style={{ fontSize: 13, color: '#A275FF', fontWeight: 600, marginBottom: 16 }}>Advanced & PIN-Protected</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Full Lux Coder workspace', 'Code editing & file access', 'Terminal planning', 'Tool connections & MCP tools', 'App building & debugging', 'System health checks'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--text-dim)' }}>
                    <span style={{ color: '#A275FF' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 16, lineHeight: 1.6, opacity: 0.7 }}>
                For trained users, developers, or Lux Automaton setup sessions.
              </p>
            </div>
          </div>
        </div>

        {/* ─── WHAT MAKES IT DIFFERENT ─── */}
        <div style={{ marginBottom: 80, padding: '48px 32px', borderRadius: 24, border: '1px solid var(--border)', background: 'linear-gradient(180deg, rgba(96,165,250,0.04), rgba(162,117,255,0.04))' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12 }}>What Makes Lux Coder Different?</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Most AI coding tools are built only for developers. Lux Coder is built around the business owner. It connects the business idea to the technical work.
            </p>
          </div>
          <div className="grid grid-3" style={{ gap: 16, maxWidth: 800, margin: '0 auto' }}>
            {[
              ['Business goal', 'Website plan'],
              ['Customer problem', 'Landing page'],
              ['Service offer', 'Sales page'],
              ['Lead process', 'CRM workflow'],
              ['Daily task', 'Automation idea'],
              ['Success Pack', 'Digital system'],
            ].map(([from, to]) => (
              <div key={from} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{from}</span>
                <span style={{ color: '#60A5FA', fontSize: 16 }}>→</span>
                <span style={{ fontSize: 13, color: '#60A5FA', fontWeight: 600 }}>{to}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── EXAMPLE USE CASES ─── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title">Real Examples</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 600, margin: '-30px auto 0' }}>See how different businesses use Lux Coder through LANA.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 750, margin: '0 auto' }}>
            {USE_CASES.map(uc => (
              <div key={uc.title} className="card" style={{ padding: 28, borderLeft: `4px solid ${uc.accent}` }}>
                <h3 style={{ fontSize: 18, marginBottom: 10, color: uc.accent }}>{uc.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text)', marginBottom: 8, fontStyle: 'italic' }}>{uc.ask}</p>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>{uc.result}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── PRIVACY ─── */}
        <div style={{ marginBottom: 80 }}>
          <div className="card" style={{ padding: 32, maxWidth: 700, margin: '0 auto', borderTop: '3px solid #34D399' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 36, flexShrink: 0 }}>🔒</div>
              <div>
                <h2 style={{ fontSize: 24, marginBottom: 12 }}>Privacy First</h2>
                <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
                  Lux Coder treats code, business files, customer records, API keys, and private documents as sensitive by default.
                </p>
                <div className="grid grid-2" style={{ gap: 8 }}>
                  {[
                    'Keep code local by default',
                    'No private files shared without approval',
                    'No sensitive data sent to cloud AI without permission',
                    'No API keys or tokens exposed',
                    'No changes published without review',
                    'No files deleted without confirmation',
                  ].map(rule => (
                    <div key={rule} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'var(--text-dim)' }}>
                      <span style={{ color: '#34D399', flexShrink: 0 }}>✓</span> {rule}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PRICING TIE-IN ─── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 className="section-title">Lux Coder Is Included In</h2>
          </div>
          <div className="grid grid-3" style={{ gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {[
              { name: 'Business Setup', price: '$999', desc: 'Includes starter website and CRM setup with Lux Coder.', accent: '#2DD4BF', id: 'prod_usb_business' },
              { name: 'Pro Setup', price: '$1,999', desc: 'Includes website, lead system, Money Suite, Web Intelligence, AI Team setup, and 90-day plan.', accent: '#FBBF24', id: 'prod_usb_pro' },
              { name: 'Website Add-On', price: '$499–$2,500', desc: 'Dedicated website or landing page build powered by Lux Coder.', accent: '#60A5FA', id: 'addon_website' },
            ].map(tier => (
              <div key={tier.name} className="card" style={{ borderTop: `3px solid ${tier.accent}`, padding: 28, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 20, marginBottom: 4 }}>{tier.name}</h3>
                <p style={{ fontSize: 24, fontWeight: 800, color: tier.accent, marginBottom: 12 }}>{tier.price}</p>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, flexGrow: 1, marginBottom: 16 }}>{tier.desc}</p>
                <Link href={`/checkout?product_id=${tier.id}`} className="btn btn-secondary" style={{ width: '100%', textAlign: 'center', padding: 10, fontSize: 14 }}>
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FAQ ─── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map(faq => (
              <div key={faq.q} className="card" style={{ padding: '20px 24px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FINAL CTA ─── */}
        <div style={{ textAlign: 'center', padding: '60px 28px', borderRadius: 28, border: '1px solid var(--border)', background: 'radial-gradient(600px 250px at 50% 0, rgba(96,165,250,0.12), transparent 70%)' }}>
          <h2 style={{ fontSize: 36, marginBottom: 12 }}>Need a Website, Workflow, or Business Tool?</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 17, maxWidth: 600, margin: '0 auto 8px', lineHeight: 1.6 }}>
            Your business idea should not get stuck because you are not a developer.
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.6 }}>
            You bring the business vision. LANA organizes the plan. Chuck Cole helps with the technical work. Lux Coder helps build the system.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/checkout?product_id=addon_website" className="btn btn-primary">Book Website Setup</Link>
            <Link href="/store" className="btn btn-secondary">Get Lux Agent USB</Link>
          </div>
        </div>

      </section>
    </main>
  )
}
