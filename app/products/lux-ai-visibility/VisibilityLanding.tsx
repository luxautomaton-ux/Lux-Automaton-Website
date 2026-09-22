"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BadgeDollarSign,
  Bot,
  CheckCircle2,
  FileCheck2,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const features = [
  { icon: Search, title: "AI Visibility Audit", copy: "See how prepared your business is to be understood and recommended by AI systems." },
  { icon: BarChart3, title: "Competitor Intelligence", copy: "Compare your positioning, identify gaps, and see where your business can win." },
  { icon: BadgeDollarSign, title: "Revenue Leak Detection", copy: "Connect discoverability gaps to the customer opportunities you may be missing." },
  { icon: Bot, title: "LANA Recommendations", copy: "Turn audit findings into clear, prioritized actions instead of another long report." },
  { icon: WandSparkles, title: "Auto-Fix Content", copy: "Generate answer-ready FAQs, service copy, schema briefs, and implementation content." },
  { icon: ShieldCheck, title: "Lux Verify", copy: "Re-check completed work against the same standard and keep an evidence trail." },
];

const steps = [
  ["01", "Connect Business", "Share your business details, website, market, and core services."],
  ["02", "Audit Presence", "Score answer-readiness, local discoverability, trust signals, and content gaps."],
  ["03", "Apply Fixes", "Use LANA to prioritize improvements, generate content, and verify the changes."],
];

export default function VisibilityLanding() {
  return (
    <div className="lav-shell">
      <section className="lav-hero">
        <div className="lav-light lav-light-a" />
        <div className="lav-light lav-light-b" />
        <div className="lav-wrap lav-hero-grid">
          <div className="lav-copy">
            <p className="lav-kicker">LUX AI VISIBILITY</p>
            <h1>Get Found by <em>AI.</em><br /><span>Get Chosen by Customers.</span></h1>
            <p className="lav-lede">
              See how prepared your business is for AI search and recommendation,
              uncover missed opportunities, and improve the signals that help customers find you.
            </p>
            <div className="lav-actions">
              <Link href="/products/lux-ai-visibility/dashboard" className="lav-button gold">
                Run My AI Visibility Audit <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="lav-button ghost">Book a Demo</Link>
            </div>
            <div className="lav-micro-row">
              <span><CheckCircle2 size={14}/> Free preview</span>
              <span><CheckCircle2 size={14}/> No paid services enabled</span>
              <span><CheckCircle2 size={14}/> Lux Verify ready</span>
            </div>
          </div>

          <div className="lav-dashboard-preview" aria-label="Lux AI Visibility dashboard preview">
            <div className="lav-preview-top">
              <div><span className="lav-mark">A</span> LUX AI VISIBILITY</div>
              <span className="lav-live-pill">FREE PREVIEW</span>
            </div>
            <div className="lav-preview-body">
              <div className="lav-preview-score">
                <div className="lav-ring"><strong>78</strong><small>OUT OF 100</small></div>
                <div><b>Strong momentum</b><p>Clear machine-readable signals with room to grow.</p></div>
              </div>
              <div className="lav-chart">
                {[28,37,34,46,52,57,54,63,62,69,74,86].map((h, i) => <i key={i} style={{height: `${h}%`}} />)}
              </div>
              <div className="lav-mini-grid">
                <div><span>GEO</span><b>84</b></div>
                <div><span>SEO</span><b>72</b></div>
                <div><span>TRUST</span><b>86</b></div>
                <div><span>RECOMMEND</span><b>81</b></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lav-section">
        <div className="lav-wrap">
          <div className="lav-heading-row">
            <div>
              <p className="lav-kicker">POWERFUL TOOLS FOR A MORE VISIBLE TOMORROW</p>
              <h2>Everything You Need to Win<br /><span>in the AI Economy</span></h2>
            </div>
            <p>One focused product. Six connected capabilities. Built on the Lux ecosystem instead of another disconnected app.</p>
          </div>
          <div className="lav-feature-grid">
            {features.map(({icon: Icon,title,copy}) => (
              <article className="lav-feature" key={title}>
                <div className="lav-feature-icon"><Icon size={22}/></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lav-process">
        <div className="lav-wrap lav-process-grid">
          <div className="lav-process-title">
            <p className="lav-kicker">HOW IT WORKS</p>
            <h2>From Insight<br />to Impact<br /><span>in 3 Simple Steps</span></h2>
          </div>
          <div className="lav-step-list">
            {steps.map(([n,title,copy]) => (
              <article className="lav-step" key={n}>
                <span>{n}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <ArrowRight size={18}/>
              </article>
            ))}
          </div>
          <aside className="lav-quote-card">
            <Sparkles size={24}/>
            <h3>Less guesswork.<br/><span>More growth.</span></h3>
            <p>Turn discoverability into a measurable operating system.</p>
          </aside>
        </div>
      </section>

      <section className="lav-results">
        <div className="lav-wrap">
          <div className="lav-heading-row compact">
            <div>
              <p className="lav-kicker">BUILD → VERIFY → IMPROVE</p>
              <h2>Visibility becomes useful<br/><span>when it creates action.</span></h2>
            </div>
          </div>
          <div className="lav-result-grid">
            <article><Radar size={24}/><strong>Score</strong><p>Turn business signals into a repeatable visibility baseline.</p></article>
            <article><Bot size={24}/><strong>Recommend</strong><p>Let LANA translate findings into prioritized business actions.</p></article>
            <article><FileCheck2 size={24}/><strong>Verify</strong><p>Re-run the checklist after changes and keep the proof with Lux Verify.</p></article>
          </div>
        </div>
      </section>

      <section className="lav-pricing">
        <div className="lav-wrap lav-price-panel">
          <div>
            <p className="lav-kicker">FREE-FIRST RELEASE</p>
            <h2>Start with the audit.<br/><span>Only add cost when value is proven.</span></h2>
            <p>The current build uses GitHub Pages and a zero-cost preview engine. Paid data sources remain off.</p>
          </div>
          <Link href="/products/lux-ai-visibility/dashboard" className="lav-button gold">
            Open the Audit <ArrowRight size={16}/>
          </Link>
        </div>
      </section>
    </div>
  );
}
