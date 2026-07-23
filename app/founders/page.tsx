"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "AI Strategy" | "Development" | "Security" | "Kids Education";
  styleType: "Founder Focus" | "LANA AI News" | "Co-Pilot Session" | "Kids Studio";
  image: string;
  videoUrl?: string;
}

const FOUNDER_EPISODES: Episode[] = [
  {
    id: "future-non-custodial",
    title: "The Future of Non-Custodial AI Operating Systems",
    description: "Asa Pritchard and LANA break down why custodial SaaS models expose business intelligence, and how local runtime solves lock-in.",
    duration: "24:15",
    category: "AI Strategy",
    styleType: "Co-Pilot Session",
    image: "/images/style3a.png",
  },
  {
    id: "clinic-intake-automation",
    title: "How We Automated Clinic Intakes Safely Under HIPAA Guidelines",
    description: "LANA covers the case study of Lux Care OS: setting up secure local boundaries so client health records never leave the private local server.",
    duration: "18:40",
    category: "Security",
    styleType: "LANA AI News",
    image: "/images/style2.png",
  },
  {
    id: "vs-code-neural-hack",
    title: "Inside Lux Coder: VS Code Extensions & Persistent Memory Wikis",
    description: "A developer walkthrough explaining how to connect open source LLMs inside your editor and build a compounding codebase context database.",
    duration: "32:10",
    category: "Development",
    styleType: "Founder Focus",
    image: "/images/style1.jpg",
  },
  {
    id: "saas-is-dead",
    title: "Why Traditional Subscriptions Are Dead: Build Your Own Platform",
    description: "Exploring the compounding returns of deploying unified AI systems that run CRM, invoicing, budgets, and scheduling in a singular database.",
    duration: "22:50",
    category: "AI Strategy",
    styleType: "Co-Pilot Session",
    image: "/images/style3b.png",
  },
  {
    id: "dr-dooley-kids-safety",
    title: "Dr. Torrey Dooley: Safe AI Learning Starts With Better Questions",
    description: "Dr. Torrey Dooley introduces the Lux AI Kids safety framework: teaching children to ask critical questions before sharing personal info.",
    duration: "15:20",
    category: "Kids Education",
    styleType: "Kids Studio",
    image: "/images/lux-kids-world.png",
  },
  {
    id: "local-models-low-power",
    title: "Running Enterprise-Grade Local LLMs on Consumer Hardware",
    description: "A technical analysis detailing how quantization allows developers to execute local LLM parameters at near-zero operating costs.",
    duration: "28:35",
    category: "Development",
    styleType: "Founder Focus",
    image: "/images/style1b.jpg",
  },
];

const founders = [
  {
    id: "asa-pritchard",
    name: "Asa Spade Pritchard",
    role: "Co-Founder & Chief Architect",
    kicker: "SYSTEMS ARCHITECTURE & PRIVATE AI",
    bio: "Asa Pritchard builds non-custodial, private AI operating systems because business owners shouldn't have to surrender their proprietary intelligence to stay modern. Subscription SaaS models harvest your client lists, financial records, and IP. Asa designs unified local-first runtimes where your business context remains 100% under your ownership.",
    quote: "“Continuity begins when the team knows what must keep working—not when it buys another subscription.”",
    image: "/images/founder-asa.png",
    pillars: [
      { title: "Local-First Architecture", copy: "Deploying AI models locally so data stays on site." },
      { title: "Private Operating Systems", copy: "Replacing scattered apps with unified execution layers." },
      { title: "Autonomous Agent Networks", copy: "Building self-correcting agents with human approval." }
    ],
    primaryAction: { label: "Explore ASA's Systems", href: "/products" },
    secondaryAction: { label: "Read Asa's Field Notes", href: "/blog" },
    tone: "cyan"
  },
  {
    id: "dr-torrey-dooley",
    name: "Dr. Torrey Dooley",
    role: "Co-Founder & Chief Educator",
    kicker: "LUX AI KIDS & GENERATIONAL LEARNING",
    bio: "Dr. Torrey Dooley leads the Lux AI Kids initiative, empowering the next generation of creators to explore artificial intelligence with curiosity, creativity, and safety. Through project-based workshops, interactive puppet labs, and hands-on story challenges, Dr. Dooley turns 'How does AI work?' into 'Look what I made today!'",
    quote: "“We don't teach children to fear technology. We teach them to direct it with human kindness, ethics, and care.”",
    image: "/images/lux-kids-world.png",
    pillars: [
      { title: "Safety-First Pedagogy", copy: "Teaching kids privacy, consent, and source verification." },
      { title: "Creative Confidence", copy: "Turning prompts into stories, art, videos, and robots." },
      { title: "Future Careers Lab", copy: "Preparing kids for careers that don't even have names yet." }
    ],
    primaryAction: { label: "Explore Lux AI Kids", href: "/lux-ai-kids" },
    secondaryAction: { label: "Kids Workshops", href: "/lux-ai-kids/workshops" },
    tone: "kids"
  }
];

export default function FoundersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<Episode | null>(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const filteredEpisodes = selectedCategory === "All"
    ? FOUNDER_EPISODES
    : FOUNDER_EPISODES.filter(ep => ep.category === selectedCategory);

  return (
    <div className="lux-world">
      {/* HERO SECTION */}
      <section className="world-hero">
        <video
          className="world-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={prefixPath("/images/lux-world-hero.png")}
          aria-label="Lux Automaton founders video introduction"
        >
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4" />
        </video>
        <div className="world-hero-shade" />
        <div className="world-orbit orbit-a" />
        <div className="world-orbit orbit-b" />
        
        <div className="world-hero-content">
          <p className="world-kicker"><span /> MEET THE FOUNDERS</p>
          <h1>The Minds Behind<br /><em>Lux Automaton.</em></h1>
          <p className="world-lede">
            Asa Spade Pritchard and Dr. Torrey Dooley are building the private AI operating systems, educational workshops, and creative tools that give founders, families, and young creators complete ownership of their digital future.
          </p>
          <div className="world-actions">
            <a className="world-button primary" href="#founders">Meet the Founders <b>↓</b></a>
            <a className="world-button ghost" href="#episodes">Watch Asa &amp; Dr. Dooley TV</a>
          </div>
        </div>
        <div className="world-status"><span>01</span><p>Scroll to explore</p><i /></div>
      </section>

      {/* FOUNDERS DETAIL SECTION */}
      <section id="founders" className="world-section">
        <div className="world-section-head">
          <div>
            <p className="section-label">LEADERSHIP &amp; VISION</p>
            <h2>Architects of Private AI &amp; Generational Learning</h2>
          </div>
          <Link href="/contact">Get in touch with the team →</Link>
        </div>

        <div style={{ display: "grid", gap: "60px" }}>
          {founders.map((founder) => (
            <div
              key={founder.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.3fr",
                gap: "48px",
                alignItems: "center",
                background: "#0c101d",
                border: "1px solid #202a40",
                borderRadius: "24px",
                padding: "48px",
                overflow: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)"
              }}
              className="founder-card-grid"
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: "18px", overflow: "hidden", border: "2px solid rgba(67, 230, 255, 0.3)" }}>
                <Image
                  src={prefixPath(founder.image)}
                  alt={`${founder.name} - ${founder.role}`}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div>
                <span style={{ font: "700 0.65rem 'JetBrains Mono'", letterSpacing: "0.18em", color: "var(--world-cyan)", textTransform: "uppercase" }}>
                  {founder.kicker}
                </span>
                <h2 style={{ font: "800 clamp(2.2rem, 4vw, 3.4rem)/1 'Montserrat'", letterSpacing: "-0.05em", margin: "12px 0 6px", color: "#ffffff" }}>
                  {founder.name}
                </h2>
                <strong style={{ color: "#00ffa3", fontSize: "1rem", display: "block", marginBottom: "20px", fontFamily: "'JetBrains Mono', monospace" }}>
                  {founder.role}
                </strong>

                <p style={{ color: "#bac5da", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "24px" }}>
                  {founder.bio}
                </p>

                <blockquote style={{ borderLeft: "3px solid var(--world-cyan)", paddingLeft: "18px", margin: "0 0 28px", color: "#e2e8f0", fontStyle: "italic", fontSize: "0.95rem" }}>
                  {founder.quote}
                </blockquote>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "32px" }}>
                  {founder.pillars.map((p) => (
                    <div key={p.title} style={{ background: "#070913", padding: "16px", borderRadius: "12px", border: "1px solid #1e2638" }}>
                      <strong style={{ color: "#ffffff", fontSize: "0.82rem", display: "block", marginBottom: "4px" }}>{p.title}</strong>
                      <span style={{ color: "#718096", fontSize: "0.72rem", lineHeight: 1.4, display: "block" }}>{p.copy}</span>
                    </div>
                  ))}
                </div>

                <div className="world-actions" style={{ marginTop: "0" }}>
                  <Link className="world-button primary" href={founder.primaryAction.href}>
                    {founder.primaryAction.label} <b>↗</b>
                  </Link>
                  <Link className="world-button ghost" href={founder.secondaryAction.href}>
                    {founder.secondaryAction.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO / THESIS */}
      <section id="vision" className="world-section world-manifesto">
        <div className="world-index">02 / OUR PHILOSOPHY</div>
        <div>
          <h2>Technology Should Empower <em>Humans,</em><br />Not Replace Them.</h2>
          <p>
            Whether engineering local-first AI runtimes for business operations or guiding young builders through their first story prompt, Lux Automaton stands for privacy, agency, and creative confidence.
          </p>
        </div>
        <div className="manifesto-stats">
          <span><strong>100%</strong> Local-first option</span>
          <span><strong>2</strong> Visionary founders</span>
          <span><strong>0</strong> Data selling</span>
        </div>
      </section>

      {/* ASA TV & MEDIA GRID */}
      <section id="episodes" className="world-section">
        <div className="world-section-head">
          <div>
            <p className="section-label">FOUNDERS TV &amp; BROADCASTS</p>
            <h2>Asa TV &amp; Dr. Dooley Studio Walkthroughs</h2>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "AI Strategy", "Development", "Security", "Kids Education"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  background: selectedCategory === cat ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.04)",
                  border: selectedCategory === cat ? "1px solid var(--world-cyan)" : "1px solid rgba(255, 255, 255, 0.1)",
                  color: selectedCategory === cat ? "var(--world-cyan)" : "#a0aec0",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="system-grid">
          {filteredEpisodes.map((ep) => (
            <div
              key={ep.id}
              className="system-card"
              style={{ cursor: "pointer", minHeight: "420px" }}
              onClick={() => setActiveVideo(ep)}
            >
              <div className="system-card-image">
                <Image src={prefixPath(ep.image)} alt={ep.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="system-card-copy">
                <span>{ep.category} · {ep.duration}</span>
                <h3>{ep.title}</h3>
                <p>{ep.description}</p>
                <b>Watch Episode ▶</b>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(6, 9, 19, 0.9)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "24px",
          }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            style={{
              maxWidth: "850px",
              width: "100%",
              background: "#090c18",
              border: "1px solid var(--world-cyan)",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 25px 60px rgba(0,212,255,0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute",
                right: "16px",
                top: "16px",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                zIndex: 10,
              }}
            >
              ✕
            </button>

            <div style={{ position: "relative", aspectRatio: "16/9", background: "#000" }}>
              <video
                src={prefixPath("/videos/lux-automaton-intro.mp4")}
                controls
                autoPlay
                className="cinema-video"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "28px" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--world-cyan)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>
                {activeVideo.category} · {activeVideo.duration}
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", fontFamily: "'Montserrat', sans-serif", margin: "8px 0 10px" }}>
                {activeVideo.title}
              </h3>
              <p style={{ color: "#a0aec0", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* NEWSLETTER */}
      <section className="world-newsletter">
        <div>
          <p className="section-label">THE LUX DISPATCH</p>
          <h2>Stay close to<br />what we&apos;re building.</h2>
          <p style={{ color: "#a0aec0", marginTop: "16px", lineHeight: 1.6 }}>
            Direct notes from Asa Spade Pritchard and Dr. Torrey Dooley. Architecture lessons, new workshops, and practical AI tools sent once a week.
          </p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (email) setJoined(true); }}>
          {joined ? (
            <strong style={{ color: "var(--world-mint)" }}>Welcome! You are subscribed to the Lux Dispatch.</strong>
          ) : (
            <>
              <label htmlFor="founder-newsletter-email">
                <span>Email Address</span>
                <input
                  id="founder-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@company.com"
                />
              </label>
              <button type="submit">Join →</button>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

