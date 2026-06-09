import React from 'react'

export const metadata = {
  title: 'Use Cases | Lux Agent',
  description: 'How to use Lux Agent to run a business, build apps, and manage daily life.'
}

export default function LuxAgentPage() {
  return (
    <main style={{ paddingTop: 120 }}>
      <section className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h1 className="section-title" style={{ marginBottom: 24 }}>What can <span style={{ color: 'var(--primary)' }}>LANA</span> do?</h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            LANA (Lux Autonomous Network Agent) is your personal orchestration lead. Through her, you deploy sub-agents, automate massive workloads, and command your digital life.
          </p>
        </div>

        {/* Use Case 1: Business */}
        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60, marginBottom: 100 }}>
          <div style={{ order: 1 }}>
            <img src="/verifying.png" alt="Business Dashboard" style={{ width: '100%', borderRadius: 20, border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
          </div>
          <div style={{ order: 2 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Run Your Business</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
              Turn the Lux Agent environment into your localized CRM and marketing hub.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--success)' }}>✓</span> <span><b>Automated Reporting:</b> Have agents scrape your business metrics and compile weekly PDFs.</span></li>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--success)' }}>✓</span> <span><b>Lead Generation:</b> Set up an outbound sales agent to draft personalized emails.</span></li>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--success)' }}>✓</span> <span><b>Offline Security:</b> Handle highly sensitive financial data without uploading it to cloud LLMs.</span></li>
            </ul>
          </div>
        </div>

        {/* Use Case 2: Apps */}
        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60, marginBottom: 100 }}>
          <div style={{ order: 2 }}>
            <img src="/squad.png" alt="App Builder" style={{ width: '100%', borderRadius: 20, border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
          </div>
          <div style={{ order: 1 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Build Software Fast</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
              The integrated App Builder turns your ideas into production code.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--primary)' }}>⚡</span> <span><b>Live Preview:</b> See your React and Next.js applications update in real-time.</span></li>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--primary)' }}>⚡</span> <span><b>Agent Swarms:</b> Delegate the backend to one agent and the frontend to another.</span></li>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--primary)' }}>⚡</span> <span><b>Terminal Access:</b> Agents can automatically install NPM packages and run build scripts.</span></li>
            </ul>
          </div>
        </div>

        {/* Use Case 3: Daily Life */}
        <div className="grid grid-2" style={{ alignItems: 'center', gap: 60, marginBottom: 100 }}>
          <div style={{ order: 1 }}>
            <img src="/squad_of_bots.png" alt="Daily Life Swarm" style={{ width: '100%', borderRadius: 20, border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
          </div>
          <div style={{ order: 2 }}>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>Master Daily Life</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
              LANA isn't just for work. She organizes your chaos.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--warning)' }}>✦</span> <span><b>The Cognitive Vault:</b> Tell LANA your diet, routines, and goals. She remembers forever.</span></li>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--warning)' }}>✦</span> <span><b>Skill Modules:</b> Add new integrations for calendar syncing or home automation.</span></li>
              <li style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--warning)' }}>✦</span> <span><b>Portable Memory:</b> Unplug the drive from your work Mac and plug it into your home PC. LANA seamlessly resumes where you left off.</span></li>
            </ul>
          </div>
        </div>

      </section>
    </main>
  )
}
