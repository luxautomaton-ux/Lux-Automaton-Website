import Link from "next/link";
import type { Metadata } from "next";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Services — Lux Automaton",
  description: "AI setup, deployment, workflow automation, custom builds, and practical training from Lux Automaton.",
};

const services = [
  {
    id: "deployment",
    number: "01",
    title: "AI setup & deployment",
    copy: "We help turn a collection of tools and ideas into a working AI environment with the right models, agents, permissions, workflows, and operating structure.",
    bullets: ["Lux Agent setup", "Workspace configuration", "Agent roles & permissions", "Launch planning"],
  },
  {
    id: "automation",
    number: "02",
    title: "Workflow automation",
    copy: "Map the repetitive work, connect the steps, and give the right tasks to software or agents while keeping human approvals where they matter.",
    bullets: ["Sales & follow-up", "Customer support", "Content workflows", "Operations & reporting"],
  },
  {
    id: "build",
    number: "03",
    title: "Build it for me",
    copy: "For companies that need more than setup, Lux Automaton can help design and build custom internal tools, agent workflows, portals, and business operating experiences.",
    bullets: ["Internal tools", "Agent experiences", "Business dashboards", "Custom workflow systems"],
  },
  {
    id: "training",
    number: "04",
    title: "Training & workshops",
    copy: "Learn the system with your team. We create practical, hands-on learning experiences for founders, employees, families, community groups, and young builders.",
    bullets: ["Founder workshops", "Team enablement", "AI literacy", "Custom training programs"],
  },
];

export default function ServicesPage() {
  return (
    <div className="luxa-shell">
      <section className="luxa-page-hero">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lux-business-office.jpg")}>
          <source src={prefixPath("/videos/lux-business-launch-os-launch-film.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-grain" />
        <div className="luxa-container">
          <span className="luxa-kicker">Services / Lux Automaton</span>
          <h1 className="luxa-display">Turn AI into<br /><span className="luxa-outline">working infrastructure.</span></h1>
          <p className="luxa-copy">
            We help businesses move from “we should use AI” to a system people can actually see,
            understand, operate, and improve.
          </p>
          <div className="luxa-actions">
            <Link className="luxa-button primary" href="/contact">Talk about your business ↗</Link>
            <Link className="luxa-button" href="/products">See the Lux Agent ecosystem</Link>
          </div>
        </div>
      </section>

      <section className="luxa-section">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">What we do / Practical implementation</span>
              <h2 className="luxa-display">From first workflow<br /><span className="luxa-outline">to full operating system.</span></h2>
            </div>
            <p className="luxa-copy">
              Services are built around the same systems we use ourselves: agent teams, automation,
              private context, visible workflows, testing, and continuous improvement.
            </p>
          </header>

          <div className="luxa-offer-grid">
            {services.map((service) => (
              <article className="luxa-offer" id={service.id} key={service.id}>
                <span className="tag">{service.number} / SERVICE</span>
                <h2 className="luxa-display">{service.title}</h2>
                <p>{service.copy}</p>
                <div className="luxa-specs">
                  {service.bullets.map((bullet) => (
                    <div key={bullet}><strong>{bullet}</strong><span>Configured around the business.</span></div>
                  ))}
                </div>
                <div className="luxa-actions">
                  <Link className="luxa-button primary" href="/contact">Start a conversation ↗</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-section luxa-dark-band">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">Where this shows up</span>
              <h2 className="luxa-display">Sales. Support. Content.<br /><span className="luxa-outline">Operations. Research.</span></h2>
            </div>
            <p className="luxa-copy">
              The goal is not automation for its own sake. The goal is fewer disconnected steps,
              better visibility, and more time for the work that still needs a person.
            </p>
          </header>
          <div className="luxa-simple-grid">
            {[
              ["Sales & follow-up", "Lead research, outreach support, follow-up rhythms, proposals, and pipeline visibility."],
              ["Customer experience", "Support workflows, knowledge access, handoffs, follow-up, and customer communication."],
              ["Content & marketing", "Research, content systems, scheduling, campaign workflows, and brand consistency."],
              ["Operations", "SOPs, reporting, task routing, internal coordination, and recurring business rhythms."],
              ["Research & intelligence", "Market research, source gathering, comparisons, opportunity discovery, and briefs."],
              ["Training & adoption", "Help the people using the system understand why it works and how to use it responsibly."],
            ].map(([title, copy], index) => (
              <article className="luxa-simple-card" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-final">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lana-executive-office.jpg")}>
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-final-copy">
          <span className="luxa-kicker">Bring us the problem</span>
          <h2 className="luxa-display">We’ll help design<br />the system.</h2>
          <p className="luxa-copy">Start with one painful workflow or map the whole operation.</p>
          <div className="luxa-actions" style={{ justifyContent: "center" }}>
            <Link className="luxa-button primary" href="/contact">Contact Lux Automaton ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
