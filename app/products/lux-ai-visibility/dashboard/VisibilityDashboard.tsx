"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bot,
  Building2,
  Check,
  CircleDollarSign,
  FileCheck2,
  Gauge,
  Globe2,
  Loader2,
  MapPin,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WandSparkles,
} from "lucide-react";
import { runVisibilityAudit, type VisibilityAuditResult } from "@/lib/visibilityAudit";

const initial: VisibilityAuditResult = {
  mode: "preview",
  businessName: "Brightside Dental",
  industry: "General & Cosmetic Dentistry",
  location: "Austin, TX",
  scores: { visibility: 78, geo: 84, seo: 72, trust: 86, recommendation: 81 },
  estimatedMissedRevenue: null,
  leadOpportunities: null,
  trend: [24,31,43,46,51,55,51,59,58,64,70,82],
  competitors: [
    { name: "Austin Modern Dental", visibility: 64, geo: 70, mentions: null, estimatedLeads: null },
    { name: "Lone Star Smiles", visibility: 52, geo: 61, mentions: null, estimatedLeads: null },
    { name: "Riverbend Dental", visibility: 49, geo: 58, mentions: null, estimatedLeads: null },
  ],
  questions: [
    { question: "What is the best dentist in Austin for veneers?", priority: "high" },
    { question: "How much does a dental implant cost in Austin?", priority: "high" },
    { question: "Does Brightside Dental offer same-day crowns?", priority: "medium" },
    { question: "What should I look for in a cosmetic dentist?", priority: "medium" },
    { question: "Is teeth whitening safe?", priority: "low" },
  ],
  recommendations: [
    { title: "Add local business schema markup", detail: "Make the business identity easier for machines to parse.", impact: "high" },
    { title: "Improve service pages with FAQs", detail: "Answer high-intent buyer questions directly.", impact: "high" },
    { title: "Create answer-ready content", detail: "Build concise pages around machine-intent questions.", impact: "high" },
    { title: "Increase third-party proof", detail: "Strengthen trust with consistent reviews and citations.", impact: "medium" },
    { title: "Run Lux Verify", detail: "Re-score after changes to document progress.", impact: "low" },
  ],
  summary: "Sample preview data. Run your business below for a free, non-billable profile-completeness audit.",
};

const scoreMeta = [
  ["AI Visibility", "visibility", Gauge],
  ["GEO Score", "geo", Globe2],
  ["SEO Score", "seo", Search],
  ["Trust Score", "trust", ShieldCheck],
  ["Recommendation", "recommendation", Radar],
] as const;

export default function VisibilityDashboard() {
  const [result, setResult] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    location: "",
    website: "",
    description: "",
    services: "",
  });

  const trendPoints = useMemo(() => {
    const values = result.trend.length ? result.trend : [20,30,40,50,60];
    return values.map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * 100;
      const y = 100 - value;
      return `${x},${y}`;
    }).join(" ");
  }, [result.trend]);

  async function submitAudit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.businessName || !form.industry || !form.location) return;
    setLoading(true);
    const data = await runVisibilityAudit({
      businessName: form.businessName,
      industry: form.industry,
      location: form.location,
      website: form.website || undefined,
      description: form.description || undefined,
      services: form.services.split(",").map(s => s.trim()).filter(Boolean),
    });
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="lav-app-shell">
      <aside className="lav-sidebar">
        <Link href="/products/lux-ai-visibility" className="lav-brand">
          <span className="lav-mark">A</span>
          <span><b>LUX AUTOMATON</b><small>AI VISIBILITY</small></span>
        </Link>
        <nav>
          {[
            [Gauge, "Overview"], [Search, "Audit"], [Building2, "Competitors"],
            [TrendingUp, "Opportunities"], [WandSparkles, "Content Fixes"],
            [Bot, "LANA"], [ShieldCheck, "Verify"], [BarChart3, "Reports"],
          ].map(([Icon,label], index) => (
            <a className={index === 0 ? "active" : ""} href={index === 1 ? "#audit-form" : "#dashboard"} key={label as string}>
              {/* @ts-expect-error icon tuple */}
              <Icon size={17}/><span>{label as string}</span>
            </a>
          ))}
        </nav>
        <div className="lav-side-message">
          <p>A MORE VISIBLE TOMORROW</p>
          <span>AI turns answers into opportunities.</span>
        </div>
      </aside>

      <main className="lav-dashboard" id="dashboard">
        <header className="lav-app-top">
          <div>
            <p className="lav-kicker">{result.mode === "live" ? "LIVE AUDIT" : "FREE PREVIEW MODE"}</p>
            <h1>{result.businessName}</h1>
            <span>{result.industry} &nbsp; | &nbsp; {result.location}</span>
          </div>
          <div className="lav-top-actions">
            <span className={result.mode === "live" ? "lav-status live" : "lav-status"}>
              {result.mode === "live" ? "Live AI audit" : "No paid services enabled"}
            </span>
            <Link className="lav-back-link" href="/products/lux-ai-visibility"><ArrowLeft size={15}/> Product</Link>
          </div>
        </header>

        <section className="lav-score-row">
          {scoreMeta.map(([label,key,Icon]) => {
            const score = result.scores[key];
            return (
              <article className="lav-score-card" key={key}>
                <div className="lav-card-label"><Icon size={17}/>{label}</div>
                <div className="lav-score-content">
                  <div className="lav-score-ring" style={{"--score": score} as React.CSSProperties}>
                    <strong>{score}</strong><small>OUT OF 100</small>
                  </div>
                  <div><b>{score >= 80 ? "Strong performance" : score >= 65 ? "Improving" : "Opportunity"}</b><p>Current readiness baseline for this category.</p></div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="lav-main-metrics">
          <article className="lav-wide-card lav-money">
            <div className="lav-card-label"><CircleDollarSign size={18}/> Missed Revenue</div>
            <strong>{result.estimatedMissedRevenue == null ? "Live audit required" : `$${result.estimatedMissedRevenue.toLocaleString()}/mo`}</strong>
            <p>We do not fabricate revenue estimates in preview mode.</p>
          </article>
          <article className="lav-wide-card">
            <div className="lav-card-label"><TrendingUp size={18}/> Lead Opportunities</div>
            <strong>{result.leadOpportunities == null ? "Live audit required" : result.leadOpportunities}</strong>
            <p>Opportunity estimates activate only with verified live data.</p>
          </article>
          <article className="lav-trend-card">
            <div className="lav-card-label"><BarChart3 size={18}/> AI Visibility Trend</div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Visibility trend">
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#27e5df" stopOpacity=".35"/>
                  <stop offset="100%" stopColor="#27e5df" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polygon points={`0,100 ${trendPoints} 100,100`} fill="url(#trendFill)"/>
              <polyline points={trendPoints} fill="none" stroke="#36e5e1" strokeWidth="2"/>
            </svg>
          </article>
        </section>

        <section className="lav-dashboard-grid">
          <article className="lav-panel competitor-panel">
            <div className="lav-card-label"><Building2 size={18}/> Competitor Comparison</div>
            <div className="lav-table">
              <div className="lav-table-row head"><span>Business</span><span>Visibility</span><span>GEO</span></div>
              <div className="lav-table-row featured"><span>{result.businessName}</span><span>{result.scores.visibility}</span><span>{result.scores.geo}</span></div>
              {result.competitors.map((c) => (
                <div className="lav-table-row" key={c.name}><span>{c.name}</span><span>{c.visibility}</span><span>{c.geo}</span></div>
              ))}
            </div>
          </article>

          <article className="lav-panel">
            <div className="lav-card-label"><MapPin size={18}/> Local Presence</div>
            <div className="lav-map-faux">
              <div className="lav-map-grid" />
              <MapPin size={36}/>
              <strong>{result.location}</strong>
              <span>Location-aware audit baseline</span>
            </div>
          </article>

          <article className="lav-panel lav-lana">
            <div className="lav-card-label"><Sparkles size={18}/> LANA <small>Your AI Visibility Assistant</small></div>
            <div className="lav-lana-message">
              <Bot size={24}/>
              <p>{result.summary}</p>
            </div>
            <h4>Here’s what I recommend:</h4>
            <ol>
              {result.recommendations.slice(0,3).map((r) => <li key={r.title}><span>✓</span>{r.title}</li>)}
            </ol>
            <a href="#audit-form" className="lav-button gold small">Run Another Audit</a>
          </article>

          <article className="lav-panel questions-panel">
            <div className="lav-card-label"><Search size={18}/> Machine-Intent Questions</div>
            <div className="lav-question-list">
              {result.questions.map((q, index) => (
                <div key={q.question}><span>{index + 1}</span><p>{q.question}</p><b className={q.priority}>{q.priority}</b></div>
              ))}
            </div>
          </article>

          <article className="lav-panel actions-panel">
            <div className="lav-card-label"><FileCheck2 size={18}/> Recommended Actions</div>
            {result.recommendations.map((r) => (
              <label key={r.title}><input type="checkbox"/><span><b>{r.title}</b><small>{r.detail}</small></span><em className={r.impact}>{r.impact}</em></label>
            ))}
            <div className="lav-action-buttons">
              <button type="button" className="lav-button gold small"><WandSparkles size={15}/> Generate Content</button>
              <button type="button" className="lav-button ghost small"><ShieldCheck size={15}/> Run Lux Verify</button>
            </div>
          </article>
        </section>

        <section className="lav-audit-form-wrap" id="audit-form">
          <div>
            <p className="lav-kicker">RUN YOUR BUSINESS</p>
            <h2>Free Visibility Preview</h2>
            <p>Required fields stay on-device unless the verified free AI backend is enabled. Preview mode never claims live AI-search measurements.</p>
          </div>
          <form onSubmit={submitAudit} className="lav-audit-form">
            <input required placeholder="Business name" value={form.businessName} onChange={e=>setForm({...form,businessName:e.target.value})}/>
            <input required placeholder="Industry / business type" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}/>
            <input required placeholder="City, State" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
            <input placeholder="Website (optional)" value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/>
            <textarea placeholder="Business description (optional)" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
            <input placeholder="Services, comma separated" value={form.services} onChange={e=>setForm({...form,services:e.target.value})}/>
            <button disabled={loading} className="lav-button gold" type="submit">
              {loading ? <><Loader2 className="lav-spin" size={16}/> Auditing...</> : <>Run Free Preview <Check size={16}/></>}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
