import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lux Connect — Lux Automaton",
  description: "A governed connection and community workspace for relationships, events, collaboration, and connected Lux workflows.",
};

export default function LuxConnectPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "150px 24px 96px", background: "var(--bg-void)" }}>
      <section style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p className="section-label">LUX AUTOMATON PRODUCT</p>
        <h1 style={{ fontSize: "clamp(3rem,8vw,6rem)", margin: "18px 0", lineHeight: .95 }}>Lux Connect</h1>
        <p style={{ maxWidth: 760, fontSize: "1.25rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
          Connect people, events, communities, and Lux workflows around one organized relationship and collaboration experience.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
          <Link href="/community" className="btn-primary">Explore the community</Link>
          <Link href="/contact" className="btn-secondary">Connect with Lux</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 64 }}>
          {[
            ["Relationships", "Keep useful context around the people, organizations, and communities that matter."],
            ["Events & collaboration", "Bring introductions, events, follow-up, and collaborative work into a clearer operating flow."],
            ["Connected Lux workflows", "Hand approved relationship context into supported Lux tools without collapsing privacy or ownership boundaries."],
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
