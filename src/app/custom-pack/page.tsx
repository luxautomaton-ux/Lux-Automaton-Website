'use client'

import React, { useState, FormEvent } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  phone: string
  businessName: string
  businessType: string
  location: string
  teamSize: string
  topChallenges: string
  services: string
  idealCustomer: string
  currentTools: string
  goals: string
  budget: string
  timeline: string
  notes: string
}

const INITIAL: FormData = {
  name: '', email: '', phone: '', businessName: '', businessType: '',
  location: '', teamSize: '', topChallenges: '', services: '',
  idealCustomer: '', currentTools: '', goals: '', budget: '', timeline: '', notes: '',
}

const INDUSTRIES = [
  'Electrician / Contractor', 'Clinic / Medical Office', 'Music Studio / Label',
  'Artist / Creator', 'Restaurant / Food Business', 'Real Estate',
  'AI Consultant', 'Local Service Business', 'Coach / Consultant',
  'Nonprofit', 'Salon / Barber', 'Auto / Mechanic', 'Other',
]

export default function CustomPackPage() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const update = (key: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/custom-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm(INITIAL)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
    marginBottom: 6, display: 'block', letterSpacing: 0.5,
  }

  if (status === 'sent') {
    return (
      <main style={{ paddingTop: 120, paddingBottom: 100 }}>
        <section className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: 36, marginBottom: 16 }}>Pack Request Submitted!</h1>
          <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 32 }}>
            Thank you! Our team will review your submission and get back to you within 1-2 business days with your custom Success Pack plan.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">Back to Home</Link>
            <Link href="/store" className="btn btn-secondary">View Pricing</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ position: 'absolute', top: '8%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(162,117,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

      <section className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(162,117,255,0.08)', border: '1px solid rgba(162,117,255,0.3)', borderRadius: 100, color: 'var(--primary)', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
            📦 Custom Success Pack
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 12 }}>Build a Pack for <span style={{ color: 'var(--primary)' }}>Your Business</span></h1>
          <p style={{ fontSize: 17, color: 'var(--text-dim)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Tell us about your business and our team will build a custom Success Pack — with LANA instructions, daily tasks, report templates, CRM setup, marketing prompts, and AI team workflows tailored to your industry.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-dim)', opacity: 0.6, marginTop: 12 }}>
            Custom Packs: $499–$1,500 depending on complexity
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, marginBottom: 20, color: '#A275FF' }}>👤 About You</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input required style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input required type="email" style={inputStyle} value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="(optional)" />
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input style={inputStyle} value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, State" />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, marginBottom: 20, color: '#2DD4BF' }}>🏢 About Your Business</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Business Name *</label>
                  <input required style={inputStyle} value={form.businessName} onChange={e => update('businessName', e.target.value)} placeholder="Your business name" />
                </div>
                <div>
                  <label style={labelStyle}>Industry / Business Type *</label>
                  <select required style={{ ...inputStyle, cursor: 'pointer' }} value={form.businessType} onChange={e => update('businessType', e.target.value)}>
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Team Size</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.teamSize} onChange={e => update('teamSize', e.target.value)}>
                    <option value="">Select</option>
                    <option value="solo">Just me (Solo)</option>
                    <option value="2-5">2–5 people</option>
                    <option value="6-15">6–15 people</option>
                    <option value="15+">15+ people</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Services / Products You Offer</label>
                  <input style={inputStyle} value={form.services} onChange={e => update('services', e.target.value)} placeholder="What you sell or provide" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Who Is Your Ideal Customer?</label>
                <input style={inputStyle} value={form.idealCustomer} onChange={e => update('idealCustomer', e.target.value)} placeholder="Describe your target audience" />
              </div>
              <div>
                <label style={labelStyle}>What Tools Do You Currently Use?</label>
                <input style={inputStyle} value={form.currentTools} onChange={e => update('currentTools', e.target.value)} placeholder="CRM, social media, spreadsheets, etc." />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, marginBottom: 20, color: '#FBBF24' }}>🎯 Goals & Challenges</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Top 3 Business Challenges *</label>
                <textarea required style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.topChallenges} onChange={e => update('topChallenges', e.target.value)} placeholder="What are the biggest things slowing your business down?" />
              </div>
              <div>
                <label style={labelStyle}>What Do You Want LANA to Help With?</label>
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.goals} onChange={e => update('goals', e.target.value)} placeholder="Sales, marketing, scheduling, budgeting, website, reports, etc." />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 32, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, marginBottom: 20, color: '#60A5FA' }}>💼 Budget & Timeline</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Budget Range</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.budget} onChange={e => update('budget', e.target.value)}>
                  <option value="">Select</option>
                  <option value="499">$499 — Standard Pack</option>
                  <option value="999">$999 — Detailed Pack</option>
                  <option value="1500">$1,500 — Full Custom System</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Timeline</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.timeline} onChange={e => update('timeline', e.target.value)}>
                  <option value="">Select</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-2weeks">1–2 weeks</option>
                  <option value="1month">Within a month</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={labelStyle}>Anything Else?</label>
              <textarea style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Extra details, questions, or special requests" />
            </div>
          </div>

          {/* Submit */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'sending'}
              style={{ padding: '14px 40px', fontSize: 16 }}
            >
              {status === 'sending' ? '⏳ Sending...' : '📦 Submit Pack Request'}
            </button>
            {status === 'error' && (
              <p style={{ color: '#FB7185', marginTop: 12, fontSize: 14 }}>
                Something went wrong. Please try again or email luxagent@gmail.com directly.
              </p>
            )}
            <p style={{ fontSize: 12, color: 'var(--text-dim)', opacity: 0.5, marginTop: 16, maxWidth: 500, margin: '16px auto 0' }}>
              We&apos;ll review your submission and respond within 1-2 business days. Your information is private and never shared.
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}
