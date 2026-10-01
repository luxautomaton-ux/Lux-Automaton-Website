import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Lux Foundation — Lux Automaton",
  description: "The planned Lux AI Kids Foundation initiative: AI education access, technology access, community workshops, mentorship, and future opportunity.",
};

const pillars = [
  {
    number: "01",
    title: "Access",
    copy: "Help more people get meaningful exposure to modern AI tools, practical workflows, and opportunities to build.",
  },
  {
    number: "02",
    title: "Learning",
    copy: "Support hands-on education that turns curiosity into confidence through workshops, projects, and guided practice.",
  },
  {
    number: "03",
    title: "Youth",
    copy: "Create safe, creative pathways for young builders through Lux AI Kids and community-centered learning experiences.",
  },
  {
    number: "04",
    title: "Opportunity",
    copy: "Connect education to real creation: entrepreneurship, technology skills, problem-solving, and pathways into future work.",
  },
];

export default function FoundationPage() {
  return (
    <div className="luxa-shell">
      <section className="luxa-page-hero">
        <Image
          className="luxa-video-bg"
          src={prefixPath("/images/lux-ai-kids-brand/lux-learning-team.png")}
          alt=""
          width={1600}
          height={1000}
          priority
        />
        <div className="luxa-grain" />
        <div className="luxa-container">
          <span className="luxa-kicker">Lux Foundation / Planned community initiative</span>
          <h1 className="luxa-display">Build access.<br /><span className="luxa-outline">Build confidence.</span></h1>
          <p className="luxa-copy">
            The planned Lux AI Kids Foundation is designed to expand access to human-guided AI education,
            technology, community workshops, mentorship, and future opportunity for young creators.
          </p>
          <div className="luxa-actions">
            <Link className="luxa-button primary" href="/lux-ai-kids/foundation">See the Foundation plan ↗</Link>
            <Link className="luxa-button" href="/lux-ai-kids">Explore Lux AI Kids</Link>
          </div>
        </div>
      </section>

      <section className="luxa-section">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">The mission / Make the future reachable</span>
              <h2 className="luxa-display">Technology should create<br /><span className="luxa-outline">more doors.</span></h2>
            </div>
            <p className="luxa-copy">
              This page gives the planned Foundation a clear home in the broader Lux family while the detailed
              Lux AI Kids Foundation page continues to explain the initiative, focus areas, and early-interest pathway.
            </p>
          </header>

          <div className="luxa-card-grid">
            {pillars.map((pillar) => (
              <article className="luxa-card" key={pillar.number}>
                <span className="num">{pillar.number} / FOUNDATION</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-section luxa-dark-band">
        <div className="luxa-container">
          <div className="luxa-impact-grid">
            <Link className="luxa-impact-card" href="/lux-ai-kids">
              <Image src={prefixPath("/images/lux-kids-world.png")} alt="" width={1200} height={800} />
              <div className="luxa-impact-copy">
                <span>Youth / Creative AI</span>
                <h3>Lux AI Kids</h3>
                <p>Safety-first projects, stories, labs, workshops, and creative learning for the next generation.</p>
              </div>
            </Link>
            <Link className="luxa-impact-card" href="/workshops">
              <Image src={prefixPath("/images/ai-foundations-for-founders-poster.jpg")} alt="" width={1200} height={800} />
              <div className="luxa-impact-copy">
                <span>Community / Practical learning</span>
                <h3>Workshops</h3>
                <p>Hands-on experiences that help people understand AI by building, practicing, and solving real problems.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="luxa-final">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lux-kids-team.jpg")}>
          <source src={prefixPath("/videos/Lux_Workshop_promo_montage_202607220252.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-final-copy">
          <span className="luxa-kicker">Lux Foundation</span>
          <h2 className="luxa-display">Opportunity grows<br />when access grows.</h2>
          <p className="luxa-copy">
            The Lux AI Kids Foundation is an upcoming initiative and is not yet an active nonprofit.
          </p>
          <div className="luxa-actions" style={{ justifyContent: "center" }}>
            <Link className="luxa-button primary" href="/lux-ai-kids/foundation">View the planned Foundation ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
