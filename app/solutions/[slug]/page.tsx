import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/solutions";
import { prefixPath } from "@/lib/prefix";
import SolutionCard from "@/components/SolutionCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((item) => item.slug === slug);
  return solution
    ? { title: `${solution.name} — ${solution.tagline} | Lux Automaton`, description: solution.description }
    : {};
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((item) => item.slug === slug);
  if (!solution) notFound();

  const fiveWHItems = [
    { key: "who", label: "WHO", emoji: "👥", ...solution.fiveWH.who },
    { key: "what", label: "WHAT", emoji: "🧠", ...solution.fiveWH.what },
    { key: "when", label: "WHEN", emoji: "⏰", ...solution.fiveWH.when },
    { key: "where", label: "WHERE", emoji: "📍", ...solution.fiveWH.where },
    { key: "why", label: "WHY", emoji: "💡", ...solution.fiveWH.why },
    { key: "how", label: "HOW", emoji: "⚙️", ...solution.fiveWH.how },
  ];

  const otherSolutions = SOLUTIONS.filter((item) => item.slug !== solution.slug);

  return (
    <div style={{ paddingTop: "72px", background: "var(--bg-void)" }}>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: solution.bgImage
            ? `linear-gradient(to bottom, rgba(3, 5, 18, 0.78) 0%, rgba(3, 5, 18, 0.93) 100%), url(${prefixPath(solution.bgImage)})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Link
            href="/solutions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "24px",
            }}
          >
            ← Back to All Solutions
          </Link>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: solution.accentColor,
              background: `color-mix(in srgb, ${solution.accentColor} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${solution.accentColor} 30%, transparent)`,
              borderRadius: "4px",
              padding: "6px 14px",
              marginBottom: "20px",
            }}
          >
            <span>{solution.icon}</span> {solution.category}
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: "16px",
              maxWidth: "900px",
            }}
          >
            {solution.name}
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: solution.accentColor,
              marginBottom: "24px",
            }}
          >
            {solution.tagline}
          </p>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: "760px",
              marginBottom: "40px",
            }}
          >
            {solution.description}
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href={solution.primaryCta.href}
              className="btn-primary"
              style={{ background: solution.accentColor, color: "#000", border: "none" }}
            >
              {solution.primaryCta.label} →
            </Link>
            <Link href={solution.secondaryCta.href} className="btn-outline">
              {solution.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 5 Ws and H */}
      <section style={{ padding: "80px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)" }}>
              The 5 Ws &amp; H of {solution.name}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
            {fiveWHItems.map((item) => (
              <div
                key={item.key}
                className="glass-card"
                style={{
                  padding: "32px",
                  borderRadius: "16px",
                  border: `1px solid color-mix(in srgb, ${solution.accentColor} 18%, transparent)`,
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{item.emoji}</div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: solution.accentColor,
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px" }}>
                  {item.headline}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES & FEATURES */}
      <section style={{ padding: "80px 24px", background: "var(--bg-void)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "40px" }}>
            <div className="glass-card" style={{ padding: "40px", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "20px" }}>
                Primary Workflows &amp; Use Cases
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {solution.useCases.map((uc) => (
                  <li key={uc} style={{ display: "flex", gap: "12px", color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                    <span style={{ color: solution.accentColor }}>◆</span> {uc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card" style={{ padding: "40px", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "20px" }}>
                System Architecture &amp; Connections
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "24px", fontSize: "0.95rem" }}>
                {solution.ecosystemConnection}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {solution.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SOLUTIONS */}
      <section style={{ padding: "80px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "36px", textAlign: "center" }}>
            Explore Other Lux Automaton Systems
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {otherSolutions.slice(0, 3).map((item) => (
              <SolutionCard key={item.slug} solution={item} layout="grid" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
