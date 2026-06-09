import React from 'react'

export const metadata = {
  title: 'Features | Lux Agent',
  description: 'Discover how Lux Agent empowers you with powerful software tools right out of the box.'
}

export default function FeaturesPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <section className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Everything You Need, <span style={{ color: 'var(--primary)' }}>Out of the Box</span></h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            Lux Agent comes pre-loaded with a suite of professional tools. No subscriptions, no cloud latency, just powerful software ready to execute.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: 40 }}>
          
          <div className="card">
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--primary)' }}>Local CRM</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>
              Manage your customers securely. The integrated CRM allows you to track leads, manage pipelines, and automate follow-ups. Because it runs 100% offline, your sensitive customer data is never exposed to third-party cloud servers.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--primary)' }}>Social Media Manager</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>
              Automate your entire content strategy. Your AI agents can draft posts, generate images, schedule content, and analyze engagement metrics across multiple platforms directly from your dashboard.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--primary)' }}>Integrated App Builder</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>
              Build software visually without writing a single line of code. Describe your vision to LANA, and she will generate, compile, and preview React and Next.js applications in a live environment.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--primary)' }}>Agent Teams (Swarms)</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>
              Don't just use one AI. Use a team. Assign complex projects to a Swarm—a group of specialized sub-agents who collaborate, research, and execute multi-step workflows simultaneously. Track them on a visual Kanban board or a chronological Timeline view.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--primary)' }}>AI Voice Console</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>
              Talk to LANA and hear her answer. The built-in Voice Console turns typed or spoken prompts into natural, short replies spoken aloud through your system voice—running entirely offline, with no calling fees or cloud APIs.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--primary)' }}>Booking &amp; Calendar Sync</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>
              Take appointments without a SaaS subscription. Bookings are stored in your local Data Vault and export to a standard .ics file you can import into Google Calendar, Apple Calendar, or Outlook in one click—define your availability and let LANA keep the schedule.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--primary)' }}>Website &amp; Support Desk</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>
              Run a small business from one screen. Manage websites, a support ticket queue, bookings, and the voice agent from a single Website Manager—all powered by the same offline AI engine.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
