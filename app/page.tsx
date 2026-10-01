import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

const services = [
  {
    number: "01 / DEPLOY",
    title: "AI setup & deployment",
    copy: "Turn the tools you already use into one coordinated AI workspace, configured around the way your business actually runs.",
    href: "/services#deployment",
  },
  {
    number: "02 / AUTOMATE",
    title: "Workflow automation",
    copy: "Connect repetitive work across sales, operations, support, research, content, and follow-up so your team can move faster.",
    href: "/services#automation",
  },
  {
    number: "03 / BUILD",
    title: "Build it for me",
    copy: "Need a custom internal tool, workflow, agent experience, or customer-facing system? We can build the working version with you.",
    href: "/services#build",
  },
  {
    number: "04 / TRAIN",
    title: "Training & workshops",
    copy: "Practical sessions for founders, teams, families, and young builders who want to understand AI by actually using it.",
    href: "/services#training",
  },
];

const impact = [
  {
    label: "LEARN / BUILD",
    title: "Workshops",
    copy: "Hands-on AI education built around useful outcomes instead of hype.",
    image: "/images/ai-foundations-for-founders-poster.jpg",
    href: "/workshops",
  },
  {
    label: "WATCH / DISCOVER",
    title: "Lux TV",
    copy: "Build sessions, founder conversations, explainers, experiments, and stories from inside the Lux ecosystem.",
    image: "/images/lana-banner.jpg",
    href: "/lux-tv",
  },
  {
    label: "NEXT GENERATION",
    title: "Lux AI Kids",
    copy: "Creative, safety-first AI learning for kids, parents, teachers, and community programs.",
    image: "/images/lux-kids-world.png",
    href: "/lux-ai-kids",
  },
  {
    label: "ACCESS / IMPACT",
    title: "Lux Foundation",
    copy: "The community-impact side of Lux: access, learning, opportunity, and programs that help more people build with technology.",
    image: "/images/lux-ai-kids-brand/lux-learning-team.png",
    href: "/foundation",
  },
];

export default function HomePage() {
  return (
    <div className="luxa-shell">
      <section className="luxa-hero">
        <video
          className="luxa-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={prefixPath("/images/lux-world-hero.png")}
        >
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-hero-wash" />
        <div className="luxa-grain" />
        <div className="luxa-container">
          <div className="luxa-hero-copy">
            <span className="luxa-kicker">Lux Automaton / Portland, Oregon</span>
            <h1 className="luxa-display">
              Build the future.<br />
              <span className="luxa-outline">Own the system.</span>
            </h1>
            <p className="luxa-copy">
              Lux Automaton builds private AI workspaces, portable agent systems, automation,
              education, and media for people creating real businesses and real opportunities.
            </p>
            <div className="luxa-actions">
              <Link className="luxa-button primary" href="/products">Explore what we build ↗</Link>
              <Link className="luxa-button" href="/services">Put AI to work in your business</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="luxa-signal" aria-label="Lux principles">
        <span>Private by design</span><i />
        <span>Built for real work</span><i />
        <span>Local-first options</span><i />
        <span>Human-guided</span>
      </div>

      <section className="luxa-section" id="lux-agent-desktop">
        <div className="luxa-container">
          <div className="luxa-product-grid">
            <div className="luxa-product-copy">
              <span className="luxa-kicker">Flagship / Lux Agent Desktop</span>
              <h2 className="luxa-display">
                Your AI team.<br />
                <span className="luxa-outline">One command center.</span>
              </h2>
              <p className="luxa-copy">
                Lux Agent Desktop is the home-base experience: LANA at the center, specialist agents
                around her, and the business tools, context, workflows, approvals, and intelligence
                they need to help get work done.
              </p>
              <div className="luxa-specs">
                <div><strong>One workspace</strong><span>Chat, tools, files, workflows, and team context.</span></div>
                <div><strong>Specialist agents</strong><span>Bring the right AI lane into the work.</span></div>
                <div><strong>Business memory</strong><span>Build around your operating context and rules.</span></div>
                <div><strong>Human control</strong><span>Keep approvals and judgment where they belong.</span></div>
              </div>
              <div className="luxa-actions">
                <Link className="luxa-button primary" href="/products#lux-agent">Explore Lux Agent ↗</Link>
                <Link className="luxa-button" href="/services">See services</Link>
              </div>
            </div>

            <div className="luxa-screen-stack" aria-label="Lux Agent Desktop product screens">
              <div className="luxa-screen one">
                <Image src={prefixPath("/images/lux-agent-desktop/build.png")} alt="Lux Agent Desktop build workspace" width={1400} height={900} />
              </div>
              <div className="luxa-screen two">
                <Image src={prefixPath("/images/lux-agent-desktop/chat.png")} alt="Lux Agent Desktop LANA chat" width={1400} height={900} />
              </div>
              <div className="luxa-screen three">
                <Image src={prefixPath("/images/lux-agent-desktop/vitals.png")} alt="Lux Agent Desktop system vitals" width={1400} height={900} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="luxa-dark-band">
        <div className="luxa-section luxa-container">
          <div className="luxa-cinematic-card">
            <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lux-agent-usb-lana.jpg")}>
              <source src={prefixPath("/videos/lux-agent-usb-commercial.mp4")} type="video/mp4" />
            </video>
            <div className="luxa-cinematic-copy">
              <span className="luxa-kicker">Portable / Lux Agent USB</span>
              <h2 className="luxa-display">
                Take the team<br />
                <span className="luxa-outline">with you.</span>
              </h2>
              <p className="luxa-copy">
                Lux Agent USB extends the experience beyond the main computer with a portable,
                travel-ready version of your agents, selected business context, and essential workflows.
              </p>
              <div className="luxa-actions">
                <Link className="luxa-button primary" href="/products/lux-agent-usb">Explore Lux Agent USB ↗</Link>
                <Link className="luxa-button" href="/products">Compare the ecosystem</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="luxa-section" id="services">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">Services / From idea to operating system</span>
              <h2 className="luxa-display">Don’t just buy AI.<br /><span className="luxa-outline">Put it to work.</span></h2>
            </div>
            <p className="luxa-copy">
              Our services now center on the work we are already building and using: agent workspaces,
              automation, deployment, practical training, and custom systems.
            </p>
          </header>
          <div className="luxa-card-grid">
            {services.map((service) => (
              <Link href={service.href} className="luxa-card" key={service.number}>
                <span className="num">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <b>Explore service ↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-section luxa-dark-band">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">Beyond products / Learn · watch · give back</span>
              <h2 className="luxa-display">The company is bigger<br /><span className="luxa-outline">than software.</span></h2>
            </div>
            <p className="luxa-copy">
              Lux Automaton also creates education, media, youth experiences, and community programs
              that make AI more useful, understandable, and accessible.
            </p>
          </header>
          <div className="luxa-impact-grid">
            {impact.map((item) => (
              <Link className="luxa-impact-card" href={item.href} key={item.title}>
                <Image src={prefixPath(item.image)} alt="" width={1200} height={800} />
                <div className="luxa-impact-copy">
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-final">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lana-executive-office.jpg")}>
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-final-copy">
          <span className="luxa-kicker">Lux Automaton</span>
          <h2 className="luxa-display">Build what comes next.</h2>
          <p className="luxa-copy">
            Start with Lux Agent, bring us a business problem, or come learn with the community.
          </p>
          <div className="luxa-actions" style={{ justifyContent: "center" }}>
            <Link className="luxa-button primary" href="/products">Explore Lux Agent ↗</Link>
            <Link className="luxa-button" href="/contact">Talk with Lux Automaton</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
