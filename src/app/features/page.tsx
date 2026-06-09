import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Features | Lux Agent USB',
  description: 'LANA, AI Team, Success Packs, Money Suite, Web Intelligence, CRM, Training — everything included in Lux Agent USB.'
}

export default function FeaturesPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <section className="container">

        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Everything Your Business Needs, <span style={{ color: 'var(--primary)' }}>On One USB</span></h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 760, margin: '0 auto', lineHeight: 1.6 }}>
            Lux Agent USB is not just a chatbot. It is a complete AI business operating system with an AI operator, a full team, industry playbooks, financial tools, web research, and training — all running from your own computer.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: 40, marginBottom: 80 }}>

          <div className="card" style={{ borderTop: '3px solid #A275FF' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: '#A275FF' }}>🤖 LANA — Your AI Operator</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
              LANA is your personal AI business operator. She creates daily business plans, writes customer follow-ups, builds sales scripts, creates reports, organizes your business profile, tracks leads, helps with budgeting and write-offs, researches competitors, creates social content, supports website updates, and saves important work to your Vault.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>
              Start with one question: "LANA, what should I do next in my business?"
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #2DD4BF' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: '#2DD4BF' }}>👥 Your AI Team</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
              LANA does not work alone. Your AI team includes Dre (Sales & Biz Dev), Tyrone (Marketing Coach), Andre Vaughn (Admin Assistant), Chuck Cole (Tech & Web Support), a Finance Agent, a Research Agent, and a Social Agent.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>
              Your AI team gives you role-equivalent business support across sales, marketing, admin, research, finance, operations, and tech.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #FBBF24' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: '#FBBF24' }}>📦 Success Packs</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
              Industry-specific business systems that teach LANA what your business needs. Instead of starting from scratch, choose a pack and LANA gets a business plan, daily tasks, report templates, CRM setup, marketing prompts, budgeting vision, and AI team instructions built for your industry.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>
              Available for Electricians, Clinics, Music Studios, Creators, Restaurants, Real Estate, AI Consultants, Local Services, and more.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #34D399' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: '#34D399' }}>💰 Money Suite</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
              Track income, expenses, and monthly goals with Lux Budgeter. Organize receipts and write-off categories with Lux WriteOff. Get business license checklists, money leak reports, CPA export packets, and profit snapshots.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>
              LANA can find where money is being wasted — duplicate subscriptions, unused software, expensive vendors, marketing spend with no tracked results.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #60A5FA' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: '#60A5FA' }}>🔍 Web Intelligence</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
              Give LANA public web research power. Read websites, study competitors, compare pricing, find public business leads, research tools and vendors, build market reports, save findings to Vault, and send approved leads to CRM.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>
              Designed for public business research only. Privacy-safe by design.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #F472B6' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: '#F472B6' }}>🎓 Training Workshop</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
              Built for people new to AI. The Training Workshop walks you through launching the app, how privacy works, how to talk to LANA, setting up Business HQ, choosing a Success Pack, using the AI team, tracking leads, using Money Suite, and saving work to Vault.
            </p>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>
              You do not need to be technical.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid #FB7185' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: '#FB7185' }}>📇 Local CRM</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>
              Track leads, manage customers, build pipelines, and automate follow-ups. Because it runs locally, your sensitive customer data is never exposed to third-party cloud servers. LANA can draft outreach, schedule follow-ups, and compile customer reports.
            </p>
          </div>

          <div className="card" style={{ borderTop: '3px solid rgba(255,255,255,0.2)' }}>
            <h3 style={{ fontSize: 24, marginBottom: 16 }}>🔒 Privacy First</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>
              Your business data belongs to you. Vault, CRM, reports, budgets, receipts, memory, Success Packs, and files stay local by default. Cloud AI is optional and requires your approval for any sensitive data. You control what LANA can access.
            </p>
          </div>

        </div>

        {/* WHY DIFFERENT FROM CHATGPT */}
        <div style={{ textAlign: 'center', padding: 60, background: 'rgba(162,117,255,0.05)', borderRadius: 24, border: '1px solid rgba(162,117,255,0.2)', marginBottom: 60 }}>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>Why It Is Different From ChatGPT</h2>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto 32px', lineHeight: 1.7 }}>
            ChatGPT is a general AI chat tool. Lux Agent USB is a business operating system built around your company. It includes LANA, AI team roles, Success Packs, Business HQ, CRM, Vault, Money Suite, Web Intelligence, Training Workshop, privacy-first computer access, and customer-specific business memory.
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>
            It is built to help run business tasks, not just answer questions.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link href="/store" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: 18 }}>
              Get Lux Agent USB
            </Link>
          </div>
        </div>

      </section>
    </main>
  )
}
