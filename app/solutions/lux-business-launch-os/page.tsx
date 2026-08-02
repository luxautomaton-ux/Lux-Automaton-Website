import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Lux Business Launch OS — From Formation to Foundation | Lux Automaton",
  description: "Launch and maintain an organized company with a guided Corporate Book, company identity, resolutions, registers, deadlines, and LANA support.",
};

const capabilities = [
  ["Company identity", "Keep your logo, seal, brand rules, and company details governed from one source."],
  ["Corporate Book", "Organize ownership, agreements, resolutions, registers, and company records in one clear system."],
  ["Launch setup", "Turn formation details into a practical checklist with visible progress and a clear next step."],
  ["Compliance rhythm", "Track reports, licenses, insurance, domains, and review dates before they become surprises."],
  ["LANA guidance", "Ask what belongs in the record, draft routine documents, and understand what needs human review."],
  ["Secure knowledge", "Keep company context, approved files, and decision history ready for the people who need it."],
];

const steps = [
  ["01", "Build the foundation", "Capture formation facts, ownership, company identity, and the records you already have."],
  ["02", "Organize the book", "Place agreements, resolutions, registers, and key documents into one governed record."],
  ["03", "Run the company", "Use dashboards, deadlines, and LANA briefings to see what needs attention next."],
  ["04", "Keep it current", "Review changes, approve drafts, export records, and maintain a durable company history."],
];

const gallery = [
  ["dashboard.png", "One operating view", "See company health, tasks, renewals, records, and LANA’s next actions."],
  ["corporate-book.png", "A Corporate Book you can use", "Browse the record systems behind ownership, governance, IP, AI, and compliance."],
  ["resolutions.png", "Review-first resolutions", "Prepare structured drafts while keeping consequential decisions under human approval."],
  ["record-book-preview.png", "Client-ready exports", "Review the full branded book before exporting a company record or launch pack."],
];

export default function LuxBusinessLaunchOSPage() {
  return (
    <main className="launch-os-page">
      <section className="launch-os-hero">
        <video autoPlay muted loop playsInline poster={prefixPath("/images/lux-business-launch-os/dashboard.png")}>
          <source src={prefixPath("/videos/lux-business-launch-os-launch-film.mp4")} type="video/mp4" />
        </video>
        <div className="launch-os-hero-shade" />
        <div className="launch-os-hero-copy">
          <Link href="/solutions" className="launch-os-back">← All solutions</Link>
          <Image src={prefixPath("/images/lux-business-launch-os/logo.png")} alt="Lux Business Launch OS" width={410} height={137} priority />
          <p className="launch-os-eyebrow">From formation to foundation</p>
          <h1>Build the company.<br /><span>Keep the record.</span></h1>
          <p>Formation creates the business. Launch OS helps you organize what comes next—identity, records, decisions, deadlines, and a company history you can actually find.</p>
          <div className="launch-os-actions">
            <Link href="/contact" className="launch-os-primary">Start company setup <span>→</span></Link>
            <Link href="#inside-launch-os" className="launch-os-secondary">See what is inside</Link>
          </div>
          <small>Review-first by design. Important legal, tax, and financial actions stay under human approval.</small>
        </div>
      </section>

      <section className="launch-os-intro">
        <div><p className="launch-os-eyebrow">The gap after filing</p><h2>A filed company is not yet an organized company.</h2></div>
        <p>New founders are handed documents, dates, and responsibilities across email, folders, portals, and memory. Lux Business Launch OS turns those loose parts into one operating foundation—with clear records, guided work, and a visible next step.</p>
      </section>

      <section className="launch-os-capabilities" id="inside-launch-os">
        <header><p className="launch-os-eyebrow">One system · six foundations</p><h2>Everything the business needs to stay legible.</h2></header>
        <div>{capabilities.map(([title, copy], index) => <article key={title}><b>{String(index + 1).padStart(2, "0")}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="launch-os-gallery">
        <header><p className="launch-os-eyebrow">Inside Launch OS</p><h2>Professional records. Practical daily guidance.</h2></header>
        <div>{gallery.map(([file, title, copy]) => <article key={file}><div className="launch-os-gallery-image"><Image src={prefixPath(`/images/lux-business-launch-os/${file}`)} alt={`${title} in Lux Business Launch OS`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </section>

      <section className="launch-os-flow">
        <header><p className="launch-os-eyebrow">A clear operating rhythm</p><h2>Launch once. Maintain with confidence.</h2></header>
        <div>{steps.map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="launch-os-lana">
        <div><p className="launch-os-eyebrow">LANA · AI chief of staff</p><h2>You do not have to know what belongs in the book.</h2><p>LANA explains the next step in plain language, helps organize supporting details, prepares review-ready drafts, and keeps the founder in control of every consequential action.</p></div>
        <div className="launch-os-lana-card"><span>Today’s briefing</span><strong>Your foundation is organized.</strong><p>Annual minutes and the IP assignment still need review. I prepared the next actions for you.</p><b>Review actions →</b></div>
      </section>

      <section className="launch-os-final">
        <p className="launch-os-eyebrow">Ready to build the foundation?</p><h2>Give your company a record it can grow on.</h2><p>Start with what you have. Lux Business Launch OS will help make the next step clear.</p>
        <Link href="/contact" className="launch-os-primary">Talk with Lux Automaton <span>→</span></Link>
        <small>Lux Business Launch OS provides organizational tools and draft support—not legal, tax, or accounting advice. Requirements vary by jurisdiction and should be reviewed by qualified professionals.</small>
      </section>
    </main>
  );
}
