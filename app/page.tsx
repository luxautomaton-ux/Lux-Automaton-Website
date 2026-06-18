import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FeaturedSystems from "@/components/FeaturedSystems";
import { prefixPath } from "@/lib/prefix";
import { NEWS_STORIES } from "@/lib/news";


// ─────────────────────────────────────────────
// HOME PAGE — Lux Automaton
// ─────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      <HeroSection />
      <TrustBar />
      <ProductsPreview />
      <FeaturedSystems />
      <EcosystemSection />
      <FounderSection />
      <LatestNewsSection />
      <CTABanner />
    </div>
  );
}

// ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-void)",
      }}
    >
      {/* Real hero background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={prefixPath("/images/hero-bg.png")}
          alt="Lux Automaton AI background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.45 }}
        />
        {/* Dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(2,4,8,0.85) 40%, rgba(6,11,20,0.6) 100%)",
          }}
        />
      </div>

      {/* Subtle circuit grid on top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
          width: "100%",
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "80px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left — Copy */}
        <div>
          {/* Label */}
          <div className="section-label" style={{ marginBottom: "28px", display: "inline-flex" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 6px var(--green)",
              }}
            />
            Private AI Systems · Now Live
          </div>

          <h1
            style={{
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "24px",
            }}
          >
            Build Faster.
            <br />
            Automate{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--electric) 0%, var(--cyan) 50%, var(--blue-bright) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Smarter.
            </span>
            <br />
            <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>Own Your Stack.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: "560px",
              marginBottom: "44px",
            }}
          >
            Lux Automaton is a private AI ecosystem for builders, founders, and small businesses.
            One connected platform — multiple intelligent tools working together.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "60px" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
              Get in Touch
            </Link>
            <Link href="/products" className="btn-outline" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
              Explore Products
            </Link>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
              borderTop: "1px solid var(--border-subtle)",
              paddingTop: "28px",
            }}
          >
            {[
              { value: "3", label: "AI Products Live" },
              { value: "∞", label: "Automation Potential" },
              { value: "1", label: "Connected Ecosystem" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "var(--cyan)",
                    lineHeight: 1,
                    textShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Brand Logo Display */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
          className="hero-logo-panel"
        >
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "300px",
              borderRadius: "32px",
              overflow: "hidden",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              boxShadow: "0 0 60px rgba(0, 229, 255, 0.15), 0 0 120px rgba(26, 109, 255, 0.08)",
              background: "rgba(10, 18, 32, 0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Image
              src={prefixPath("/images/logo.png")}
              alt="Lux Automaton"
              fill
              priority
              style={{ objectFit: "contain", padding: "32px" }}
            />
          </div>

          {/* Tagline pill */}
          <div
            style={{
              background: "rgba(0, 229, 255, 0.06)",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              borderRadius: "100px",
              padding: "8px 20px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              textAlign: "center",
            }}
          >
            Automate · Innovate · Accelerate
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-logo-panel { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
function TrustBar() {
  const items = [
    "✦ AI-Powered Automation",
    "✦ Stripe-Secured Payments",
    "✦ Private & Self-Contained",
    "✦ Built for Founders",
    "✦ No Lock-In",
    "✦ Always Evolving",
  ];

  return (
    <div
      style={{
        background: "var(--bg-void)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "14px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "48px",
          animation: "marquee 22s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
function ProductsPreview() {
  return (
    <section
      className="circuit-grid"
      style={{
        padding: "120px 24px",
        background: "var(--bg-base)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "64px" }}>
          <div className="section-label" style={{ marginBottom: "20px", display: "inline-flex" }}>
            The Ecosystem
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            One Platform.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Multiple AI Tools.
            </span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "540px", lineHeight: 1.7 }}>
            Each product in the Lux Automaton ecosystem is built to work independently or together.
          </p>
        </div>

        <div
          className="product-grid-3"
          style={{
            gap: "20px",
          }}
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/products" className="btn-outline">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
function EcosystemSection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "var(--bg-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--cyan), var(--blue), transparent)",
          opacity: 0.3,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label" style={{ marginBottom: "20px", display: "inline-flex" }}>
            Full Ecosystem View
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI Operating System
            </span>{" "}
            for Your Business
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Every tool connected. Every workflow automated. One intelligence running your business.
          </p>
        </div>

        {/* Ecosystem diagram — real image */}
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 0 60px rgba(0, 229, 255, 0.08)",
            maxWidth: "1000px",
            margin: "0 auto 80px",
          }}
        >
          <Image
            src={prefixPath("/images/ecosystem-diagram.png")}
            alt="Lux Automaton Ecosystem — AI tools connected"
            width={1200}
            height={630}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            { icon: "⚡", title: "Instant Automation", body: "Set it once. Let the AI handle the rest.", color: "var(--cyan)" },
            { icon: "🔒", title: "Private by Design", body: "Your data stays yours. No external model training.", color: "var(--blue-bright)" },
            { icon: "🌐", title: "Connected Ecosystem", body: "Every product talks to the others. Value compounds.", color: "var(--green)" },
            { icon: "📈", title: "Built to Scale", body: "Same tools grow with you — solo to agency.", color: "var(--orange)" },
          ].map((pillar) => (
            <div key={pillar.title} className="glass-card" style={{ padding: "28px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: `${pillar.color}18`,
                  border: `1px solid ${pillar.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  marginBottom: "16px",
                }}
              >
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
                {pillar.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
function FounderSection() {
  const TEAM = [
    {
      name: "Asa Pritchard",
      role: "Founder · Lux Automaton",
      image: "/images/founder-asa.png",
      linkedin: "https://www.linkedin.com/in/asapritchard/",
      color: "var(--cyan)",
      quote: "I built Lux Automaton because I was tired of paying for 12 different SaaS tools that didn't talk to each other. Builders deserve private, powerful, connected AI — not another subscription that forgets what you said yesterday.",
    },
    {
      name: "Torrey Dooley",
      role: "Partner · Lux Automaton",
      image: "/images/partner-torrey.png",
      linkedin: "https://www.linkedin.com/in/torrey-dooley-bsn-rn-b43a5038/",
      color: "var(--green)",
      quote: "Operational efficiency in healthcare and community services requires systems that are private, secure, and intuitive. We design AI frameworks that serve critical operations without compromising security.",
    }
  ];

  return (
    <section
      className="circuit-grid"
      style={{ padding: "120px 24px", background: "var(--bg-base)" }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-label" style={{ marginBottom: "16px", display: "inline-flex" }}>
            Leadership & Partners
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            The Minds Behind the Systems
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
            gap: "32px",
          }}
          className="team-grid"
        >
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="glass-card"
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "300px",
                position: "relative",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: `0 0 20px ${member.color}05`,
              }}
            >
              {/* Corner tech details */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "8px", height: "1px", background: member.color }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "8px", background: member.color }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: "8px", height: "1px", background: member.color }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: "1px", height: "8px", background: member.color }} />

              <div>
                <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "24px" }}>
                  {/* Photo */}
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "2px",
                      overflow: "hidden",
                      border: `1px solid ${member.color}44`,
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={prefixPath(member.image)}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                      {member.name}
                    </h3>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: member.color,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginTop: "4px",
                      }}
                    >
                      {member.role}
                    </div>
                    {/* LinkedIn Link */}
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-linkedin-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        marginTop: "8px",
                        transition: "color 0.2s",
                      }}
                    >
                      <span style={{ color: member.color }}>in</span> LinkedIn Profile ↗
                    </Link>
                  </div>
                </div>

                <blockquote
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    borderLeft: `2px solid ${member.color}44`,
                    paddingLeft: "16px",
                    margin: 0,
                  }}
                >
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .team-linkedin-link:hover {
          color: var(--text-primary) !important;
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
function LatestNewsSection() {
  const latestStories = NEWS_STORIES.slice(0, 3);

  return (
    <section
      className="circuit-grid"
      style={{
        padding: "100px 24px",
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label" style={{ marginBottom: "16px", display: "inline-flex" }}>
            LUX DISPATCH
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Latest News &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--green) 0%, var(--cyan) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Insights
            </span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>
            Follow our progress and read updates from our active AI deployments and local-first systems.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {latestStories.map((story) => (
            <article
              key={story.slug}
              className="glass-card"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {/* Cover Image */}
              <div style={{ position: "relative", height: "180px", width: "100%" }}>
                <Image
                  src={prefixPath(story.image)}
                  alt={story.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(2,4,8,0.85)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {story.date}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "var(--cyan)",
                      textTransform: "uppercase",
                    }}
                  >
                    {story.category}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      background: "rgba(0, 229, 255, 0.08)",
                      color: "var(--text-secondary)",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      border: "1px solid rgba(0, 229, 255, 0.15)",
                    }}
                  >
                    {story.source}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  <Link href={`/news/${story.slug}`} className="hover:text-[var(--cyan)] transition-colors hover:underline">
                    {story.title}
                  </Link>
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                    flex: 1,
                  }}
                >
                  {story.summary}
                </p>

                {/* Footer info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ position: "relative", width: "20px", height: "20px", borderRadius: "50%", overflow: "hidden" }}>
                      <Image
                        src={prefixPath(story.author.image)}
                        alt={story.author.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{story.author.name}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)" }}>
                    <span>👍 {story.likes}</span>
                    <span>💬 {story.comments}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center" }}>
          <Link href="/news" className="btn-outline" style={{ fontSize: "0.9rem", padding: "14px 36px" }}>
            View All News & Blog Posts →
          </Link>
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
function CTABanner() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "var(--bg-void)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(0, 229, 255, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="section-label" style={{ marginBottom: "24px", display: "inline-flex" }}>
          Ready to Automate?
        </div>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            lineHeight: 1.1,
          }}
        >
          Your AI Stack is{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--electric), var(--cyan), var(--blue-bright))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Waiting.
          </span>
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "0 auto 48px",
          }}
        >
          Start with one tool. Build your full AI operating system. No lock-in. Cancel anytime.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }}>
            Get in Touch
          </Link>
          <Link href="/contact" className="btn-outline" style={{ fontSize: "1rem", padding: "16px 40px" }}>
            Talk to a Human
          </Link>
        </div>
      </div>
    </section>
  );
}
