import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Monitor,
  Settings2,
  ShieldCheck,
  Sparkles,
  Usb,
  Workflow,
} from "lucide-react";
import { prefixPath } from "@/lib/prefix";

const products = [
  {
    name: "Lux Agent Desktop",
    line: "Your full AI workspace.",
    image: "/images/lux-agent-hero.png",
    href: "/products/lux-agent",
  },
  {
    name: "Lux Agent USB",
    line: "Your AI team on the go.",
    image: "/images/lux-agent-usb-thumbnail.png",
    href: "/products/lux-agent-usb",
  },
  {
    name: "Memory Packs",
    line: "Remember more. Do more.",
    image: "/images/ecosystem/memory-packs-hero.png",
    href: "/products#memory-packs",
  },
  {
    name: "Success Packs",
    line: "Templates for real results.",
    image: "/images/ecosystem/success-packs-hero.png",
    href: "/products/success-packs",
  },
  {
    name: "Lux Flow",
    line: "Build. Connect. Automate.",
    image: "/images/ecosystem/lux-flow-logo-dark.png",
    href: "/products#lux-flow",
  },
  {
    name: "Warm Connect",
    line: "People. Opportunities. Growth.",
    image: "/images/lux-warmconnect/wordmark.png",
    href: "/products/lux-warmconnect",
  },
  {
    name: "Lux Verify",
    line: "Audit. Verify. Trust.",
    image: "/images/ecosystem/lux-verify-icon.png",
    href: "/products#lux-verify",
  },
  {
    name: "Business Launch OS",
    line: "Start smart. Build right.",
    image: "/images/ecosystem/business-launch-logo-dark.png",
    href: "/solutions/lux-business-launch-os",
  },
  {
    name: "Lux AI Kids",
    line: "Learn AI. Build tomorrow.",
    image: "/images/lux-ai-kids-brand/lux-ai-kids-logo.png",
    href: "/lux-ai-kids",
  },
];

const benefits = [
  { title: "AI Team", body: "A real team for real work.", Icon: Bot },
  { title: "Automate", body: "Eliminate busywork.", Icon: Settings2 },
  { title: "Grow", body: "Turn ideas into results.", Icon: BarChart3 },
  { title: "Private & Secure", body: "Your data. Your control.", Icon: ShieldCheck },
  { title: "Desktop + Travel", body: "Work anywhere.", Icon: Monitor },
];

const companyWorlds = [
  {
    eyebrow: "LEARN + BUILD",
    title: "Workshops",
    text: "Hands-on sessions, complete workshop packs, and practical AI training.",
    image: "/images/ai-foundations-for-founders-poster.jpg",
    href: "/workshops",
  },
  {
    eyebrow: "WATCH + DISCOVER",
    title: "Lux TV",
    text: "Product walkthroughs, founder media, tutorials, and the stories behind the systems.",
    image: "/images/lana-banner.jpg",
    href: "/lux-tv",
  },
  {
    eyebrow: "NEXT GENERATION",
    title: "Lux AI Kids",
    text: "A colorful, safety-first world for kids, parents, teachers, and young creators.",
    image: "/images/lux-kids-world.png",
    href: "/lux-ai-kids",
  },
  {
    eyebrow: "ACCESS + IMPACT",
    title: "Lux Foundation",
    text: "Education, access, mentorship, and opportunity for the communities we want to help grow.",
    image: "/images/lux-ai-kids-brand/lux-learning-team.png",
    href: "/foundation",
  },
];

export default function HomePage() {
  return (
    <main className="lux26-home">
      <section className="lux26-home-hero">
        <video
          className="lux26-hero-film"
          autoPlay
          muted
          loop
          playsInline
          poster={prefixPath("/images/lux-world-hero.png")}
        >
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4" />
        </video>
        <div className="lux26-hero-shade" />

        <div className="lux26-home-hero-grid lux26-site-width">
          <div className="lux26-home-copy">
            <span className="lux26-eyebrow">AI FOR A BRIGHTER TOMORROW</span>
            <h1>
              Your AI Team.<br />
              Your <em>Business OS.</em>
            </h1>
            <p>
              Lux Automaton builds connected AI systems, agents, automations, training,
              and business tools so people can work smarter, move faster, and go further.
            </p>

            <div className="lux26-feature-chips">
              <span><Bot size={18} /> AI Team</span>
              <span><Workflow size={18} /> Automate</span>
              <span><BarChart3 size={18} /> Grow</span>
              <span><ShieldCheck size={18} /> Private &amp; Secure</span>
            </div>

            <div className="lux26-home-actions">
              <Link href="/products" className="lux26-primary-cta">Explore Lux Agent <b>→</b></Link>
              <Link href="/lux-tv" className="lux26-secondary-cta"><span>▶</span> Watch Video</Link>
            </div>

            <div className="lux26-platform-line">
              <span></span>
              <span>⊞</span>
              <b>Mac + Windows</b>
              <i />
              <Usb size={16} />
              <b>Optional USB Travel Edition</b>
            </div>
          </div>

          <div className="lux26-lana-card">
            <Image
              src={prefixPath("/images/lana-executive-office.jpg")}
              alt="LANA, Lux Automaton AI Executive Assistant"
              width={1100}
              height={900}
              priority
            />
            <div className="lux26-lana-live"><i /> LIVE</div>
            <div className="lux26-lana-copy">
              <small>LANA</small>
              <strong>Your AI Executive Assistant.</strong>
              <span><Sparkles size={15} /> Strategy · Tasks · Ideas · Results</span>
            </div>
          </div>
        </div>
      </section>

      <section className="lux26-product-band">
        <div className="lux26-site-width">
          <div className="lux26-band-head">
            <div>
              <span>THE LUX ECOSYSTEM</span>
              <h2>A Complete AI Workspace for <em>Real Results.</em></h2>
            </div>
            <p>
              Start with Lux Agent, add the tools you need, and keep the rest of the
              company—Workshops, TV, Kids, Foundation, and services—connected around it.
            </p>
            <Link href="/products">Explore All Products <b>→</b></Link>
          </div>

          <div className="lux26-product-rail">
            {products.map((product) => (
              <Link href={product.href} className="lux26-product-tile" key={product.name}>
                <div className="lux26-product-media">
                  <Image src={prefixPath(product.image)} alt="" width={560} height={420} />
                </div>
                <strong>{product.name}</strong>
                <span>{product.line}</span>
                <b>Learn More →</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lux26-benefit-bar">
        <div className="lux26-site-width">
          {benefits.map(({ title, body, Icon }) => (
            <div key={title}>
              <Icon size={34} strokeWidth={1.7} />
              <span><strong>{title}</strong><small>{body}</small></span>
            </div>
          ))}
        </div>
      </section>

      <section className="lux26-company-worlds">
        <div className="lux26-site-width">
          <header>
            <span>MORE THAN SOFTWARE</span>
            <h2>One company. <em>More ways to move forward.</em></h2>
            <p>
              Keep everything already built into Lux Automaton—Workshops, Lux TV, Lux AI Kids,
              and the Foundation—inside one branded experience.
            </p>
          </header>

          <div className="lux26-world-grid">
            {companyWorlds.map((item) => (
              <Link href={item.href} className="lux26-world-card" key={item.title}>
                <Image src={prefixPath(item.image)} alt="" width={900} height={650} />
                <div>
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <b>Explore →</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lux26-home-cta">
        <video
          className="lux26-hero-film"
          autoPlay
          muted
          loop
          playsInline
          poster={prefixPath("/images/lux-business-office.jpg")}
        >
          <source src={prefixPath("/videos/lux-business-launch-os-launch-film.mp4")} type="video/mp4" />
        </video>
        <div className="lux26-hero-shade" />
        <div className="lux26-site-width">
          <span>BUILD · AUTOMATE · VERIFY · GROW</span>
          <h2>Bring us the goal.<br />We&apos;ll help build the system.</h2>
          <div>
            <Link href="/start-here" className="lux26-primary-cta">Get Started <b>→</b></Link>
            <Link href="/contact" className="lux26-secondary-cta"><BriefcaseBusiness size={18} /> Talk with Lux Automaton</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
