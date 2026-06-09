import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'About | Lux Automaton',
  description: 'The real story behind Lux Automaton — built by one builder for small business owners who need a team before they can afford a team.'
}

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(162,117,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

      <section className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(162,117,255,0.08)', border: '1px solid rgba(162,117,255,0.3)', borderRadius: 100, color: 'var(--primary)', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
            Our Story
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 16 }}>The Real Story Behind <span style={{ color: 'var(--primary)' }}>Lux Automaton</span></h1>
        </div>

        {/* Story */}
        <div style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.85 }}>

          <p style={{ fontSize: 19, fontWeight: 600, color: 'var(--text)', marginBottom: 32 }}>
            Lux Automaton did not start in a boardroom.
          </p>

          <p>
            It started with one builder, one Mac Mini, a pile of AI tools, long nights, broken apps, failed tests, rebuilt systems, and a vision that would not leave me alone.
          </p>

          <p>I kept seeing the same problem.</p>

          <p>
            Big companies were getting access to AI teams, automation systems, private workflows, custom apps, research tools, dashboards, and business intelligence. Meanwhile, regular small business owners were still trying to do everything by themselves.
          </p>

          {/* Problem cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '32px 0', padding: '24px 0' }}>
            {[
              { icon: '⚡', text: 'The contractor was answering calls, chasing invoices, writing estimates, posting on social media, and trying to find the next job.' },
              { icon: '⚕️', text: 'The clinic owner was buried in admin work.' },
              { icon: '🎵', text: 'The studio owner was trying to manage artists, content, bookings, marketing, and business paperwork.' },
              { icon: '🎨', text: 'The creator was trying to build a brand without a team.' },
              { icon: '🏢', text: 'The local business owner needed sales, marketing, operations, budgeting, reports, customer follow-up, and tech help — but could not afford to hire eight different people.' },
            ].map(item => (
              <div key={item.icon} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', borderLeft: '3px solid var(--primary)' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 16, lineHeight: 1.7 }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 24, margin: '40px 0' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>
              That is where Lux Automaton came from.
            </p>
            <p style={{ fontSize: 18, color: 'var(--primary)', fontWeight: 600, margin: '8px 0 0' }}>
              I wanted to build something for the people who need a team before they can afford a team.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: '32px 0', fontSize: 17 }}>
            <p>Not another chatbot.</p>
            <p>Not another complicated dashboard.</p>
            <p>Not another app that only works if you pay for ten cloud subscriptions.</p>
          </div>

          <p>I wanted something real.</p>
          <p>Something private.</p>
          <p>Something portable.</p>

          <p>Something a business owner could plug in, open up, and say:</p>

          <div style={{ margin: '24px 0 32px', padding: '20px 28px', background: 'rgba(162,117,255,0.06)', border: '1px solid rgba(162,117,255,0.2)', borderRadius: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0, fontStyle: 'italic' }}>
              &ldquo;LANA, help me run my business.&rdquo;
            </p>
          </div>

          <p style={{ fontWeight: 600, color: 'var(--text)' }}>That became Lux Agent USB.</p>

          <p>
            Lux Agent USB is a portable AI business system built around LANA, an AI business operator, and a full team of specialized agents for sales, marketing, admin, finance, research, social media, tech, reports, websites, and daily operations.
          </p>

          <p>
            The system runs from a USB drive and gives small business owners access to tools that feel like something only a big company should have.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-2" style={{ gap: 12, margin: '32px 0' }}>
            {[
              { name: 'Business HQ', desc: 'helps LANA learn the company' },
              { name: 'Success Packs', desc: 'give her industry-specific playbooks' },
              { name: 'Money Suite', desc: 'tracks budgets, write-offs, reports, and money leaks' },
              { name: 'Web Intelligence', desc: 'researches competitors, tools, and public leads' },
              { name: 'Lux Vault', desc: 'stores the business memory' },
              { name: 'Lux Coder', desc: 'gives the system technical hands for websites and workflows' },
            ].map(f => (
              <div key={f.name} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 15 }}>
                <span style={{ color: '#2DD4BF' }}>✓</span>
                <span><strong style={{ color: 'var(--text)' }}>{f.name}</strong> {f.desc}</span>
              </div>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '48px 0' }} />

          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>
            But the real mission is bigger than software.
          </p>

          <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--primary)' }}>
            Lux Automaton is about giving small business owners leverage.
          </p>

          <p>
            It is about helping the person who has the idea, the skill, the service, the food, the clinic, the studio, the company, or the dream — but not enough staff, not enough time, and not enough support.
          </p>

          <p>
            I built Lux Agent USB because I know what it feels like to have a big vision and still be doing everything yourself.
          </p>

          <div style={{ borderLeft: '3px solid #2DD4BF', paddingLeft: 24, margin: '40px 0' }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>
              The goal is simple:
            </p>
            <p style={{ fontSize: 18, color: '#2DD4BF', fontWeight: 600, margin: '8px 0 0' }}>
              Give small business owners a private AI team they can actually use.
            </p>
          </div>

          <p>
            A team that helps them plan better, follow up faster, market smarter, organize their money, create reports, build systems, and move with more confidence.
          </p>

          {/* Who it's for */}
          <div style={{ margin: '32px 0' }}>
            <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>Lux Automaton is built for:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Contractors', 'Clinics', 'Creators', 'Studios', 'Coaches', 'Food Businesses', 'Real Estate Agents', 'Nonprofits', 'Consultants', 'Local Service Providers'].map(who => (
                <span key={who} style={{ padding: '8px 16px', background: 'rgba(162,117,255,0.06)', border: '1px solid rgba(162,117,255,0.2)', borderRadius: 100, fontSize: 14, fontWeight: 500 }}>
                  {who}
                </span>
              ))}
            </div>
          </div>

          <p>It is built for people who are tired of doing business alone.</p>

          <p>It is built for the owner who says:</p>

          <div style={{ margin: '24px 0 32px', padding: '20px 28px', background: 'rgba(45,212,191,0.06)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 16, textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', margin: 0, fontStyle: 'italic' }}>
              &ldquo;I do not need hype. I need help.&rdquo;
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '48px 0' }} />

          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 19, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>That is what Lux Agent USB is.</p>
            <p style={{ fontSize: 17 }}>A private AI business team you can plug in.</p>
            <p style={{ fontSize: 17 }}>A business brain that travels with you.</p>
            <p style={{ fontSize: 17, marginBottom: 32 }}>A way to start building like a bigger company before you have big company money.</p>
            <p style={{ fontSize: 15, opacity: 0.6, marginBottom: 32 }}>
              Lux Automaton was built from real work, real testing, real struggle, and real belief.
            </p>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>
              The belief that small businesses deserve powerful AI too.
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 48, padding: '40px 28px', borderRadius: 20, border: '1px solid var(--border)', background: 'radial-gradient(500px 200px at 50% 0, rgba(162,117,255,0.12), transparent 70%)' }}>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/store" className="btn btn-primary">Get Lux Agent USB</Link>
              <Link href="/custom-pack" className="btn btn-secondary">Request Custom Pack</Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
