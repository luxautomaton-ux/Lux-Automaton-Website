import Link from "next/link";
import type { Metadata } from "next";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Lux Foundation — Lux Automaton",
  description: "The planned Lux Foundation community-impact initiative: access, learning, mentorship, opportunity, and practical AI education."
};

const pillars = [
  {
    number: "01",
    title: "Access",
    copy: "Help more people get hands-on exposure to useful AI tools, practical learning, and the systems shaping the future of work.",
  },
  {
    number: "02",
    title: "Education",
    copy: "Connect community learning with Lux AI Kids, workshops, training, and approachable experiences that turn curiosity into capability.",
  },
  {
    number: "03",
    title: "Opportunity",
    copy: "Create pathways for builders, families, entrepreneurs, and communities to use technology to create, learn, work, and grow.",
  },
];

export default function FoundationPage() {
  return (
    <div className="luxa-shell">
      <section className="luxa-page-hero">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lux-kids-team.jpg")}>
          <source src={prefixPath("/videos/Lux_Workshop_promo_montage_202607220252.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-grain" />
        <div className="luxa-container">
          <span className="luxa-kicker">Lux Foundation / Planned community-impact initiative</span>
          <h1 className="luxa-display">Build access.<br /><span className="luxa-outline">Create opportunity.</span></h1>
          <p className="luxa-copy">
            Lux Foundation is the planned impact initiative within the Lux mission: expanding access to practical AI learning,
            creative technology, mentorship, and opportunities for people and communities to build what comes next.
          </p>
        </div>
      </section>

      <section className="luxa-section">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">Impact / Education / Community</span>
              <h2 className="luxa-display">Technology should<br /><span className="luxa-outline">move people forward.</span></h2>
            </div>
            <p className="luxa-copy">
              The Foundation connects the broader Lux ecosystem to education and community impact without changing
              the commercial focus of Lux Automaton’s product business.
            </p>
          </header>
          <div className="luxa-simple-grid">
            {pillars.map((pillar) => (
              <article className="luxa-simple-card" key={pillar.number}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-section luxa-dark-band">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">Connected initiatives</span>
              <h2 className="luxa-display">Learn. Create.<br /><span className="luxa-outline">Give back.</span></h2>
            </div>
            <p className="luxa-copy">
              Lux AI Kids, workshops, training, Lux TV, and future community programs are natural bridges between
              the technology Lux builds and the people it can help.
            </p>
          </header>
          <div className="luxa-card-grid">
            {[
              ["Lux AI Kids", "Creative and safety-first AI learning for the next generation.", "/lux-ai-kids"],
              ["Workshops", "Hands-on learning for founders, teams, families, and communities.", "/workshops"],
              ["Lux TV", "Stories, explainers, build sessions, and practical AI media.", "/lux-tv"],
              ["Community", "A place to connect learning, builders, ideas, and opportunity.", "/community"],
            ].map(([title, copy, href], index) => (
              <Link className="luxa-card" href={href} key={title}>
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <b>Explore ↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-final">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lux-kids-world.png")}>
          <source src={prefixPath("/videos/lux-ai-kids-promo.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-final-copy">
          <span className="luxa-kicker">Lux Foundation</span>
          <h2 className="luxa-display">A brighter tomorrow<br />takes participation.</h2>
          <p className="luxa-copy">Lux Foundation is being developed as a future community-impact initiative and is not presented here as an active nonprofit.</p>
          <div className="luxa-actions" style={{ justifyContent: "center" }}>
            <Link className="luxa-button primary" href="/contact">Connect with Lux Automaton ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
