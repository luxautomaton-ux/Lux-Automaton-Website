import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Products — Lux Automaton",
  description: "Explore Lux Agent Desktop, Lux Agent USB, the Lux Agent system, and the packs that tailor the experience to your work.",
};

const offers = [
  {
    id: "lux-agent-desktop",
    tag: "01 / HOME BASE",
    title: "Lux Agent Desktop",
    copy: "The full home and office experience. LANA, your specialist agents, business context, workflows, tools, approvals, and live operating surfaces come together in one command center.",
    image: "/images/lux-agent-desktop/build.png",
    href: "/products#lux-agent",
    cta: "Explore the Lux Agent system",
  },
  {
    id: "lux-agent-usb",
    tag: "02 / PORTABLE",
    title: "Lux Agent USB",
    copy: "A travel-ready companion to Lux Agent Desktop. Carry a lighter version of your AI team, selected business memory, and essential workflows between compatible computers.",
    image: "/images/lux-agent-usb-lana.jpg",
    href: "/products/lux-agent-usb",
    cta: "Explore Lux Agent USB",
  },
  {
    id: "lux-agent",
    tag: "03 / AI WORKFORCE",
    title: "Lux Agent",
    copy: "A private, business-ready agent system designed around identity, voice, skills, memory, tool boundaries, approvals, recovery, and evidence-aware execution.",
    image: "/images/lux-agent-hero.png",
    href: "/products/lux-agent",
    cta: "Meet Lux Agent",
  },
  {
    id: "packs",
    tag: "04 / PERSONALIZE",
    title: "Success + Memory Packs",
    copy: "Give the system a profession, a playbook, and the knowledge it needs. Packs tailor Lux Agent to an industry, role, workflow, or operating style without rebuilding the platform.",
    image: "/images/00-asset-set-preview-lux-agent-usb.png",
    href: "/products/success-packs",
    cta: "Explore Success Packs",
  },
];

export default function ProductsPage() {
  return (
    <div className="luxa-shell">
      <section className="luxa-page-hero">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lux-agent-hero-bg.jpg")}>
          <source src={prefixPath("/videos/lux-agent-usb-trailer.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-grain" />
        <div className="luxa-container">
          <span className="luxa-kicker">Products / One connected Lux Agent ecosystem</span>
          <h1 className="luxa-display">The system.<br /><span className="luxa-outline">Not the clutter.</span></h1>
          <p className="luxa-copy">
            Lux Automaton’s product story is now centered on one clear idea: Lux Agent is the platform,
            Desktop is the full experience, USB extends it on the road, and packs shape it around the work.
          </p>
        </div>
      </section>

      <div className="luxa-signal">
        <span>Desktop home base</span><i />
        <span>Portable USB companion</span><i />
        <span>Specialist AI agents</span><i />
        <span>Business-specific packs</span>
      </div>

      <section className="luxa-section">
        <div className="luxa-container">
          <header className="luxa-section-head">
            <div>
              <span className="luxa-kicker">The lineup / Built to work together</span>
              <h2 className="luxa-display">One product family.<br /><span className="luxa-outline">Different ways to move.</span></h2>
            </div>
            <p className="luxa-copy">
              We are no longer presenting every internal experiment as a separate flagship product.
              The website now leads with the experiences customers can understand, see, and use.
            </p>
          </header>
          <div className="luxa-offer-grid">
            {offers.map((offer) => (
              <article className="luxa-offer" id={offer.id} key={offer.id}>
                <Image src={prefixPath(offer.image)} alt="" width={1200} height={720} />
                <span className="tag">{offer.tag}</span>
                <h2 className="luxa-display">{offer.title}</h2>
                <p>{offer.copy}</p>
                <div className="luxa-actions">
                  <Link className="luxa-button primary" href={offer.href}>{offer.cta} ↗</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="luxa-section luxa-dark-band">
        <div className="luxa-container">
          <div className="luxa-product-grid">
            <div className="luxa-product-copy">
              <span className="luxa-kicker">Lux Agent Desktop / Full experience</span>
              <h2 className="luxa-display">See the work.<br /><span className="luxa-outline">Control the system.</span></h2>
              <p className="luxa-copy">
                The Desktop experience is where the broader Lux ecosystem becomes tangible: communication,
                workspaces, health signals, tools, agents, workflows, and business intelligence in one environment.
              </p>
              <div className="luxa-actions">
                <Link className="luxa-button primary" href="/contact">Request a walkthrough ↗</Link>
                <Link className="luxa-button" href="/services">See deployment services</Link>
              </div>
            </div>
            <div className="luxa-screen-stack">
              <div className="luxa-screen one">
                <Image src={prefixPath("/images/lux-agent-desktop/chat.png")} alt="Lux Agent Desktop chat" width={1400} height={900} />
              </div>
              <div className="luxa-screen two">
                <Image src={prefixPath("/images/lux-agent-desktop/vitals.png")} alt="Lux Agent Desktop vitals" width={1400} height={900} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="luxa-final">
        <video className="luxa-video-bg" autoPlay muted loop playsInline poster={prefixPath("/images/lux-agent-usb-lana.jpg")}>
          <source src={prefixPath("/videos/lux-agent-usb-commercial.mp4")} type="video/mp4" />
        </video>
        <div className="luxa-final-copy">
          <span className="luxa-kicker">Start with the system you need</span>
          <h2 className="luxa-display">Home base.<br />Travel companion.<br />One AI team.</h2>
          <p className="luxa-copy">Choose the experience that fits the way you work today and expand from there.</p>
          <div className="luxa-actions" style={{ justifyContent: "center" }}>
            <Link className="luxa-button primary" href="/contact">Talk with Lux Automaton ↗</Link>
            <Link className="luxa-button" href="/services">Explore services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
