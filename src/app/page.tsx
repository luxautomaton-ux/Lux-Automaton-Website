import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Lux Agent USB | Your AI Team. Your Private OS.',
  description: 'Lux Agent USB gives small business owners LANA, a connected AI team, Success Packs, Memory Packs, and private local business tools on a portable USB OS.',
}

const agents = [
  {
    name: 'LANA',
    role: 'Commander',
    img: '/lux-agent-website/lana-profile.png',
    angle: 0,
    accent: '#A275FF',
    work: 'Plans the day, routes tasks, remembers the business, and coordinates every agent.',
  },
  {
    name: 'Dre',
    role: 'Sales Lead',
    img: '/lux-agent-website/agent-dre.jpeg',
    angle: 300,
    accent: '#2DD4BF',
    work: 'Finds leads, writes offers, builds follow-ups, and keeps the pipeline moving.',
  },
  {
    name: 'Tyrone',
    role: 'Marketing Chief',
    img: '/lux-agent-website/agent-tyrone.png',
    angle: 20,
    accent: '#FBBF24',
    work: 'Turns the offer into campaigns, social posts, launch plans, and brand voice.',
  },
  {
    name: 'Andre',
    role: 'Operations',
    img: '/lux-agent-website/agent-andre.png',
    angle: 95,
    accent: '#38BDF8',
    work: 'Organizes documents, reminders, checklists, support notes, and daily admin.',
  },
  {
    name: 'Chuck',
    role: 'Tech Lead',
    img: '/lux-agent-website/agent-chuck.jpeg',
    angle: 170,
    accent: '#60A5FA',
    work: 'Helps with website setup, tools, automations, troubleshooting, and workflows.',
  },
  {
    name: 'Anna',
    role: 'Finance',
    img: '/lux-agent-website/agent-finance.jpeg',
    angle: 235,
    accent: '#34D399',
    work: 'Watches budgets, write-offs, money leaks, reports, and operating decisions.',
  },
]

const workflow = [
  ['Business HQ', 'LANA learns the company, owner, customers, offer, goals, voice, and daily needs.'],
  ['Success Pack', 'The USB switches into the customer profession: contractor, clinic, creator, restaurant, real estate, consultant, and more.'],
  ['Memory Pack', 'The right knowledge packs make LANA smarter about sales, marketing, money, operations, research, and support.'],
  ['AI Team', 'LANA routes the work to specialist agents and brings the finished plan back to the owner.'],
]

const packs = [
  { name: 'Clinic Pack', img: '/lux-agent-website/pack-doctor.png', line: 'Patient communication, admin, follow-ups, and local clinic operations.' },
  { name: 'Contractor Pack', img: '/lux-agent-website/pack-electric.png', line: 'Lead follow-up, estimates, job notes, promotions, and service routes.' },
  { name: 'Creator Pack', img: '/lux-agent-website/pack-creator.png', line: 'Content calendars, offers, brand voice, launches, and audience growth.' },
  { name: 'Restaurant Pack', img: '/lux-agent-website/pack-restaurant.png', line: 'Menus, promotions, local marketing, reviews, and daily operations.' },
]

export default function MarketingPage() {
  return (
    <main className="lux-site-redesign">
      <section className="lux-hero">
        <div className="lux-hero-photo" />
        <div className="lux-hero-content">
          <div className="lux-hero-brand">
            <img src="/lux-agent-website/lus.png" alt="Lux Agent" />
            <span>Private AI Business OS</span>
          </div>
          <h1>Your AI Team. Your Private OS.</h1>
          <p>
            Lux Agent USB gives business owners LANA, specialist AI agents, Success Packs,
            Memory Packs, and daily operating tools that travel on a private USB system.
          </p>
          <div className="lux-hero-actions">
            <Link href="/store">Get Lux Agent USB</Link>
            <Link href="#agent-map">See how the agents work</Link>
          </div>
        </div>
        <aside className="lux-hero-device" aria-label="Lux Agent USB product preview">
          <img src="/lux-agent-website/banner-usb.jpg" alt="Lux Agent USB drive" />
          <div>
            <strong>Plug in the drive</strong>
            <span>Launch LANA, choose the profession, and run the business locally.</span>
          </div>
        </aside>
      </section>

      <section className="lux-story-strip">
        <img src="/lux-agent-website/brand-banner.png" alt="Lux Agent USB brand banner" />
        <div>
          <h2>Built for owners who need a team before they can afford one.</h2>
          <p>
            LANA is not just a chatbot. She acts like the operator for a small business:
            gathering context, choosing the right pack, routing tasks to agents, and turning
            scattered ideas into a daily plan.
          </p>
        </div>
      </section>

      <section id="agent-map" className="agent-map-section">
        <div className="agent-map-copy">
          <h2>One business brain. Multiple specialist agents.</h2>
          <p>
            The mind map shows how LANA coordinates the USB OS. Business HQ feeds context into
            the center, Success Packs define the profession, Memory Packs deepen the knowledge,
            and each agent handles a lane of work.
          </p>
          <div className="agent-map-legend">
            <span>Business memory</span>
            <span>Profession packs</span>
            <span>Daily execution</span>
          </div>
        </div>

        <div className="agent-orbit" aria-label="3D mind map of Lux Agent team">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-core">
            <img src="/lux-agent-website/lana-profile.png" alt="LANA" />
            <strong>LANA</strong>
            <span>Command center</span>
          </div>
          {agents.slice(1).map(agent => (
            <article
              key={agent.name}
              className="orbit-agent"
              style={{
                '--angle': `${agent.angle}deg`,
                '--accent': agent.accent,
              } as React.CSSProperties}
            >
              <img src={agent.img} alt={agent.name} />
              <div>
                <strong>{agent.name}</strong>
                <span>{agent.role}</span>
              </div>
            </article>
          ))}
          <div className="orbit-signal signal-one">Sales</div>
          <div className="orbit-signal signal-two">Money</div>
          <div className="orbit-signal signal-three">Marketing</div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="section-heading">
          <h2>How the USB OS thinks with your business.</h2>
          <p>Everything starts with context, then LANA connects the right pack, memory, and agent.</p>
        </div>
        <div className="workflow-rail">
          {workflow.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="media-showcase">
        <div>
          <h2>LANA can explain, plan, and guide the owner.</h2>
          <p>
            Training, launch support, sales guidance, and daily help are part of the customer experience.
            The website should feel like the USB already knows how to support the business.
          </p>
          <Link href="/how-it-works">How it works</Link>
        </div>
        <video src="/lux-agent-website/aiMotion.mp4" autoPlay loop muted playsInline />
      </section>

      <section className="packs-section" id="packs">
        <div className="section-heading">
          <h2>Success Packs make the system profession-ready.</h2>
          <p>Pick the customer type, then LANA recommends memory packs that make the USB smarter.</p>
        </div>
        <div className="pack-grid">
          {packs.map(pack => (
            <article key={pack.name}>
              <img src={pack.img} alt={pack.name} />
              <div>
                <h3>{pack.name}</h3>
                <p>{pack.line}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="usb-offer-section" id="buy">
        <img src="/lux-agent-website/usb-drive.jpg" alt="Lux Agent USB drive" />
        <div>
          <h2>A portable AI business team customers can understand.</h2>
          <p>
            Private. Local-first. Branded. Built for Mac and PC customers who need sales,
            marketing, money, operations, research, and tech help without cloud confusion.
          </p>
          <div className="usb-offer-actions">
            <Link href="/store">Order Lux Agent USB</Link>
            <Link href="/custom-pack">Request a custom pack</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
