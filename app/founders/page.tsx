"use client";

import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

const VALUES = [
  {
    title: "Build for Real Problems",
    desc: "Every tool should solve a real workflow problem, not just look impressive.",
  },
  {
    title: "Keep AI Practical",
    desc: "AI should help people move faster, organize better, and make work easier to execute.",
  },
  {
    title: "Protect the User",
    desc: "Privacy, access control, licensing, and responsible use matter.",
  },
  {
    title: "Make Systems Understandable",
    desc: "Powerful technology should still be simple enough for real users to understand.",
  },
  {
    title: "Serve Builders and Communities",
    desc: "Lux Automaton is built for founders, creators, care leaders, contractors, nonprofits, and small businesses.",
  },
  {
    title: "Move from Ideas to Action",
    desc: "The goal is not just to talk about the future. The goal is to build it.",
  },
];

const SYSTEMS = [
  { name: "Lux Coder", desc: "A premium AI coding suite that helps builders create software, websites, dashboards, reports, and automation workflows.", href: "/products/lux-coder" },
  { name: "LANA", desc: "The AI operator and heart of Lux Automaton — helping users plan, organize, follow up, create, and execute.", href: "/products/lana" },
  { name: "Lux Agent USB", desc: "A portable AI business operating system for founders, creators, contractors, and small businesses.", href: "/products/lux-agent-usb" },
  { name: "Success Packs", desc: "Ready-made AI business playbooks that teach Lux Agent how to work for a specific person, business, industry, or goal.", href: "/products/success-packs" },
  { name: "Lux Care OS", desc: "A care operations system designed to support care teams, clinics, and support organizations with workflow structure.", href: "/solutions/lux-care-os" },
  { name: "Epic Electric", desc: "A contractor business operating system for leads, quotes, jobs, photos, customer follow-up, and service workflows.", href: "/solutions/epic-electric" },
  { name: "Inland Circle Program OS", desc: "A program operations system for outreach, participant support, resources, reporting, and community workflows.", href: "/solutions/inland-circle-program-o" },
];

export default function FoundersPage() {
  return (
    <div style={{ background: "var(--bg-void)", minHeight: "100vh", color: "var(--text-primary)", paddingTop: "72px" }}>
      
      {/* HERO SECTION */}
      <section style={{ position: "relative", minHeight: "580px", display: "flex", alignItems: "center", overflow: "hidden", borderBottom: "1px solid rgba(0, 229, 255, 0.1)" }}>
        {/* Background Image Overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${prefixPath("/images/partners-hero-bg.jpg")})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0, opacity: 0.15 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(3,5,18,0.95) 0%, rgba(3,5,18,0.85) 60%, rgba(6,11,20,0.95) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "10%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)", zIndex: 2, pointerEvents: "none", filter: "blur(40px)" }} />
        
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 3 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center" }} className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", gap: "10px", alignItems: "center", color: "var(--cyan)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", background: "rgba(0, 229, 255, 0.08)", border: "1px solid rgba(0, 229, 255, 0.2)", borderRadius: "4px", padding: "5px 14px", marginBottom: "24px" }}>
                LUX AUTOMATON FOUNDERS
              </div>
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "20px" }}>
                Built by Vision.<br/>
                <span style={{ background: "linear-gradient(135deg, var(--cyan) 0%, var(--blue-bright) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Driven by Purpose.</span>
              </h1>
              <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "40px", maxWidth: "600px" }}>
                Lux Automaton was created to help people turn ideas, workflows, and business problems into real AI-powered systems that are practical, private, and built for daily execution.
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginBottom: "48px" }}>
                <Link href="/products" className="btn-primary" style={{ padding: "14px 32px" }}>
                  Explore the Ecosystem
                </Link>
                <Link href="/products/lana" className="btn-outline" style={{ border: "1px solid rgba(0, 229, 255, 0.3)" }}>
                  Meet LANA
                </Link>
              </div>

              {/* Badges Grid */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["Private AI Systems", "Builder-Led", "Business-Focused", "Human-Centered"].map((b) => (
                  <span key={b} style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border-subtle)", borderRadius: "6px", padding: "6px 14px" }}>
                    ◆ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Reusable Visual layout */}
            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "180px", marginTop: "-20px" }}>
                <div style={{ height: "200px", position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,229,255,0.2)", boxShadow: "0 10px 30px rgba(0,229,255,0.05)" }}>
                  <Image src={prefixPath("/images/founder-asa.png")} alt="Asa Pritchard" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", fontWeight: 600 }}>Asa Pritchard</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "180px", marginTop: "20px" }}>
                <div style={{ height: "200px", position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,255,136,0.2)", boxShadow: "0 10px 30px rgba(0,255,136,0.05)" }}>
                  <Image src={prefixPath("/images/partner-torrey.png")} alt="Dr. Torrey Dooley" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", fontWeight: 600 }}>Dr. Torrey Dooley</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FOUNDER INTRO */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ marginBottom: "20px" }}>The People Behind the System</div>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "24px" }}>Driven by the Mission to Support</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <p>
              Lux Automaton is not just software. It is a mission to help builders, founders, care leaders, creators, and small businesses use AI in a way that actually solves real problems.
            </p>
            <p>
              The system was built around one belief: <strong>People do not need more disconnected apps. They need operating systems that help them move.</strong>
            </p>
            <p>
              Lux Automaton brings together AI assistants, coding tools, workflow playbooks, business systems, automation, and guided execution into one connected ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: ASA PRITCHARD */}
      <section style={{ padding: "100px 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "flex-start" }} className="hero-grid">
            {/* Left Column: Portrait & Badge */}
            <div>
              <div style={{ position: "relative", width: "100%", height: "420px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0, 229, 255, 0.2)", boxShadow: "0 10px 40px rgba(0, 229, 255, 0.1)", marginBottom: "24px" }}>
                <Image src={prefixPath("/images/founder-asa.png")} alt="Asa Pritchard" fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ display: "inline-flex", color: "var(--cyan)", background: "rgba(0, 229, 255, 0.08)", border: "1px solid rgba(0, 229, 255, 0.2)", borderRadius: "4px", padding: "6px 14px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                Asa Pritchard
              </div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "8px" }}>Asa Pritchard</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "24px" }}>Founder & Builder of Lux Automaton</p>
              
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "24px", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                “I built Lux Automaton because people with vision need more than advice. They need systems that help them move.”
              </div>
            </div>

            {/* Right Column: Bio & Achievements */}
            <div>
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
                <p style={{ fontSize: "1.1rem", color: "var(--text-primary)", fontWeight: 500 }}>
                  Asa Pritchard is the founder and builder behind Lux Automaton, Lux Coder, Lux Agent USB, LANA, Success Packs, and the broader Lux AI ecosystem. His work focuses on turning scattered ideas into working systems that small businesses, creators, contractors, and founders can actually use.
                </p>
                <p>
                  Asa built Lux Automaton from the ground up with a clear mission: make powerful AI systems practical, private, and useful for real people doing real work.
                </p>
                <p>
                  His background combines business operations, technical support, systems thinking, product design, AI workflow building, and hands-on software creation. Instead of building another generic chatbot or dashboard, Asa focused on creating a connected ecosystem where each tool has a role.
                </p>
                <p>
                  Asa’s role is part founder, part builder, part strategist, and part operator. He is focused on helping people move from idea to execution with systems they can understand, use, and grow with.
                </p>
              </div>

              {/* What Asa Leads */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "40px" }}>
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--cyan)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>What Asa Leads</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                    {["Lux Automaton product vision", "Lux Coder development direction", "Lux Agent USB strategy", "LANA personality & workflow design", "Success Pack system design", "Sales & product packaging"].map((item) => (
                      <li key={item} style={{ display: "flex", gap: "8px" }}><span style={{ color: "var(--cyan)" }}>◆</span> {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--cyan)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Core Strengths</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                    {["AI product strategy", "Workflow automation", "Business systems", "Technical product design", "Founder operations", "Practical AI implementation"].map((item) => (
                      <li key={item} style={{ display: "flex", gap: "8px" }}><span style={{ color: "var(--cyan)" }}>◆</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <Link href="/products/lux-agent-usb" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Explore Asa’s Systems
                </Link>

                {/* Development value infographic */}
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--cyan)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Founder + Development Value</h4>
                  <div style={{ position: "relative", width: "100%", height: "480px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0, 229, 255, 0.15)" }}>
                    <Image src={prefixPath("/images/founder-dev-value.png")} alt="Founder + Development Value" fill style={{ objectFit: "contain", background: "#050714" }} />
                  </div>
                </div>

                {/* Asa's Journey Gallery */}
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--cyan)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Asa’s Journey & Operations</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                    {[
                      { img: "/images/asa-office.jpg", caption: "System Integration" },
                      { img: "/images/asa-airport.jpg", caption: "Global Deployment" },
                      { img: "/images/asa-radio.jpg", caption: "AI Broadcast Debut" },
                      { img: "/images/pack-founder.jpg", caption: "Founder Command Center" }
                    ].map((j, idx) => (
                      <div key={idx} style={{ position: "relative" }}>
                        <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <Image src={prefixPath(j.img)} alt={j.caption} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "6px", textAlign: "center", fontWeight: 600 }}>{j.caption}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DR. TORREY DOOLEY */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "flex-start" }} className="hero-grid">
            {/* Left Column: Portrait & Badge */}
            <div>
              <div style={{ position: "relative", width: "100%", height: "420px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0, 255, 136, 0.2)", boxShadow: "0 10px 40px rgba(0, 255, 136, 0.1)", marginBottom: "24px" }}>
                <Image src={prefixPath("/images/partner-torrey.png")} alt="Dr. Torrey Dooley" fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ display: "inline-flex", color: "var(--green)", background: "rgba(0, 255, 136, 0.08)", border: "1px solid rgba(0, 255, 136, 0.2)", borderRadius: "4px", padding: "6px 14px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                Dr. Torrey Dooley
              </div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "8px" }}>Dr. Torrey Dooley</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "24px" }}>Clinical & Creative Systems Partner</p>
              
              <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "24px", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                “Technology should help people feel more supported, not more overwhelmed.”
              </div>
            </div>

            {/* Right Column: Bio */}
            <div>
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
                <p style={{ fontSize: "1.1rem", color: "var(--text-primary)", fontWeight: 500 }}>
                  Dr. Torrey Dooley brings clinical insight, creative direction, and real-world care experience into the Lux Automaton ecosystem. His perspective helps shape systems like Lux Care OS, creative business workflows, and human-centered AI tools designed to support people, teams, and communities.
                </p>
                <p>
                  Dr. Torrey Dooley represents the care, leadership, and creative side of the Lux Automaton mission. His work connects healthcare awareness, community care, music, creativity, and operational leadership. Inside the Lux Automaton ecosystem, Torrey helps ground the technology in real human needs — making sure systems are not just smart, but useful, supportive, and responsible.
                </p>
                <p>
                  Torrey’s role is especially important for Lux Care OS and other people-centered systems. His perspective helps shape workflows around care operations, staff coordination, documentation support, follow-up, human communication, and practical daily execution.
                </p>
                <p>
                  He also brings creative insight into how AI can support music, storytelling, media, and personal brand development. Where Asa brings the builder engine, Torrey brings care-centered perspective, creative energy, and real-world human context.
                </p>
              </div>

              {/* What Torrey Shapes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "40px" }}>
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>What Torrey Shapes</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                    {["Lux Care OS direction", "Care workflow structure", "Human-centered AI use cases", "Creative business systems", "Music & media workflows", "Supportive AI guidance"].map((item) => (
                      <li key={item} style={{ display: "flex", gap: "8px" }}><span style={{ color: "var(--green)" }}>◆</span> {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Core Strengths</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                    {["Care operations insight", "Human-centered systems thinking", "Creative direction", "Community impact", "Music & media strategy", "Practical AI use-case review"].map((item) => (
                      <li key={item} style={{ display: "flex", gap: "8px" }}><span style={{ color: "var(--green)" }}>◆</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{ background: "rgba(255,107,0,0.03)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: "10px", padding: "20px", marginBottom: "32px" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "8px" }}>Clinical Operations Disclaimer</p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", lineHeight: 1.6 }}>
                  Lux Care OS and related care workflows are designed to support operations, documentation organization, task structure, and workflow guidance. They do not replace licensed medical judgment, diagnosis, treatment, emergency guidance, or regulated clinical decision-making. Any use involving PHI or healthcare data compliance requires proper infrastructure, approved policies, access controls, and legal review.
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "32px", display: "flex", flexDirection: "column", gap: "32px" }}>
                <Link href="/solutions/lux-care-os" className="btn-primary" style={{ background: "var(--green)", color: "#000", boxShadow: "0 0 20px rgba(0,255,136,0.2)", alignSelf: "flex-start" }}>
                  Explore Lux Care OS
                </Link>

                {/* Torrey's Care OS Gallery */}
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Torrey’s Systems & Work</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                    {[
                      { img: "/images/torrey-clinical-1.jpg", caption: "AI Care Coordination" },
                      { img: "/images/torrey-clinical-2.jpg", caption: "Local-First Hardware" },
                      { img: "/images/torrey-clinical-3.jpg", caption: "Clinical Workflow" },
                      { img: "/images/pack-doctor.jpg", caption: "Doctor Success Pack" },
                      { img: "/images/torrey-care-os.png", caption: "Lux Care OS Clinic System" }
                    ].map((j, idx) => (
                      <div key={idx} style={{ position: "relative" }}>
                        <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <Image src={prefixPath(j.img)} alt={j.caption} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "6px", textAlign: "center", fontWeight: 600 }}>{j.caption}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY THIS PARTNERSHIP MATTERS */}
      <section style={{ padding: "100px 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ marginBottom: "20px" }}>The Synergy</div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "24px" }}>Builder Vision Meets Human-Centered Care</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "40px", maxWidth: "700px", margin: "0 auto 40px" }}>
            Lux Automaton is strongest because it combines technical building with real-world human needs.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", textAlign: "left" }} className="hero-grid">
            <div className="glass-card" style={{ padding: "32px", border: "1px solid rgba(0, 229, 255, 0.15)", borderRadius: "16px", background: "rgba(0, 229, 255, 0.01)" }}>
              <span style={{ fontSize: "1.5rem" }}>⚙️</span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "16px 0 12px" }}>The Builder Engine</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Asa Pritchard brings the builder mindset — turning ideas into apps, workflows, agents, dashboards, documents, and operating systems.
              </p>
            </div>
            <div className="glass-card" style={{ padding: "32px", border: "1px solid rgba(0, 255, 136, 0.15)", borderRadius: "16px", background: "rgba(0, 255, 136, 0.01)" }}>
              <span style={{ fontSize: "1.5rem" }}>❤️</span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "16px 0 12px" }}>The Care-Centered Lens</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Dr. Torrey Dooley makes sure the technology stays grounded in real human needs — supporting people, care teams, creators, and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT THEY ARE BUILDING */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>Active Projects</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>What Asa and Torrey Are Building</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Creating the infrastructure for builders, creators, and care leaders.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {SYSTEMS.map((s, idx) => (
              <Link key={idx} href={s.href} style={{ textDecoration: "none" }}>
                <div className="glass-card nav-dropdown-item" style={{ padding: "28px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", background: "rgba(255,255,255,0.01)", height: "100%", transition: "all 0.2s" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--cyan)", marginBottom: "10px" }}>{s.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: SHARED VALUES */}
      <section style={{ padding: "100px 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>Ecosystem Core</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>The Values Behind Lux Automaton</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Principles that guide our engineering, product decisions, and partnerships.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {VALUES.map((v, i) => (
              <div key={i} className="glass-card" style={{ padding: "32px", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "16px", background: "rgba(255,255,255,0.01)" }}>
                <div style={{ fontSize: "1.3rem", color: "var(--cyan)", marginBottom: "16px" }}>◆</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px" }}>{v.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FOUNDER MESSAGE */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ marginBottom: "20px" }}>A Message from the Founders</div>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "24px" }}>Infrastructure for Builders</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <p>
              Lux Automaton was built for people who know they are capable of more but need the right system around them.
            </p>
            <p>
              We believe the next wave of AI will not just be about asking questions. It will be about building private, practical systems that help people run their work, support their communities, and bring ideas to life.
            </p>
            <p>
              Our mission is to make AI useful for real people, real businesses, and real problems. This is not just software. This is infrastructure for builders.
            </p>
            
            <div style={{ marginTop: "32px", borderTop: "1px solid var(--border-subtle)", paddingTop: "24px" }}>
              <span style={{ fontSize: "1.1rem", fontFamily: "var(--font-mono), monospace", fontWeight: 700, color: "var(--cyan)" }}>
                — Asa Pritchard & Dr. Torrey Dooley
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section style={{ padding: "100px 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="glass-card" style={{ padding: "60px 40px", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "24px", textAlign: "center", background: "rgba(6,11,20,0.85)", position: "relative", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "radial-gradient(circle at center, rgba(0, 229, 255, 0.04) 0%, transparent 60%)", zIndex: 0, pointerEvents: "none" }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="section-label" style={{ marginBottom: "20px", display: "inline-flex" }}>Get Started</div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "16px" }}>Meet the System Built for Builders.</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 40px" }}>
                Lux Automaton connects AI assistants, coding tools, workflow playbooks, and custom operating systems into one ecosystem designed to help you move from idea to execution.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
                <Link href="/products" className="btn-primary" style={{ padding: "14px 32px" }}>
                  Explore Lux Automaton
                </Link>
                <Link href="/contact" className="btn-outline" style={{ border: "1px solid rgba(0,229,255,0.3)" }}>
                  Book a Demo
                </Link>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "24px", fontStyle: "italic" }}>
                Built by vision. Guided by care. Powered by systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
