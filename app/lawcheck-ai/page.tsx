import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LawCheck AI — Lux Automaton",
  description: "Structured legal-workflow assistance with evidence-aware review, document organization, and human decision boundaries.",
};

export default function LawCheckAIPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "150px 24px 96px", background: "var(--bg-void)" }}>
      <section style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p className="section-label">LUX AUTOMATON PRODUCT</p>
        <h1 style={{ fontSize: "clamp(3rem,8vw,6rem)", margin: "18px 0", lineHeight: .95 }}>LawCheck AI</h1>
        <p style={{ maxWidth: 760, fontSize: "1.25rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
          Structured legal-workflow assistance for organizing documents, reviewing issues, preserving evidence, and preparing work for human review.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
          <Link href="/contact" className="btn-primary">Talk with Lux Automaton</Link>
          <Link href="/products" className="btn-secondary">Explore the ecosystem</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginTop: 64 }}>
          {[
            ["Document workflows", "Organize matters, source material, notes, and review steps in one governed workspace."],
            ["Evidence-aware assistance", "Keep source material and review context visible so conclusions are not separated from their supporting record."],
            ["Human decision boundary", "LawCheck AI supports legal workflows; it is not a law firm and does not replace advice from a qualified attorney."],
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
