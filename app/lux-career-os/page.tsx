import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lux Career OS — Lux Automaton",
  description: "A career operating system for opportunity discovery, applications, resumes, interviews, follow-up, and career workflow visibility.",
};

export default function LuxCareerOSPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "150px 24px 96px", background: "var(--bg-void)" }}>
      <section style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p className="section-label">LUX AUTOMATON PRODUCT</p>
        <h1 style={{ fontSize: "clamp(3rem,8vw,6rem)", margin: "18px 0", lineHeight: .95 }}>Lux Career OS</h1>
        <p style={{ maxWidth: 760, fontSize: "1.25rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
          One career command center for finding opportunities, organizing applications, preparing resumes, tracking interviews, and keeping follow-up moving.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
          <Link href="/contact" className="btn-primary">Learn about Lux Career OS</Link>
          <Link href="/products" className="btn-secondary">Explore the ecosystem</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 64 }}>
          {[
            ["Opportunity pipeline", "Keep promising roles, research, links, and status in one organized workflow."],
            ["Application workspace", "Coordinate resumes, application materials, follow-up, and interview preparation without losing the history."],
            ["Human-controlled automation", "Use AI to reduce repetitive career work while keeping applications, messages, and commitments visible to the user."],
          ].map(([title, body]) => (
            <article key={title} style={{ padding: 28, border: "1px solid var(--border-subtle)", borderRadius: 18, background: "rgba(17,24,39,.55)" }}>
              <h2 style={{ fontSize: "1.15rem", marginBottom: 10 }}>{title}</h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
