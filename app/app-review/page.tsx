"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

interface AppReviewItem {
  rank: number;
  name: string;
  owner: string;
  repo: string;
  url: string;
  website: string;
  category: string;
  tags: string[];
  description: string;
  stars: string;
  forks: string;
  language: string;
  license: string;
  score: number;
  grade: string;
  verdict: string;
  confidence: string;
  scores: {
    usefulness: number;
    health: number;
    momentum: number;
    ease: number;
    trust: number;
    quality: number;
    innovation: number;
  };
  bestFor: string;
  solves: string;
  standout: string[];
  risks: string[];
}

const TOP_5_APPS: AppReviewItem[] = [
  {
    rank: 1,
    name: "Hermes Agent",
    owner: "NousResearch",
    repo: "NousResearch/hermes-agent",
    url: "https://github.com/NousResearch/hermes-agent",
    website: "https://hermes-agent.nousresearch.com/",
    category: "AI Agent / Business Automation",
    tags: ["AI Agent", "Automation", "Memory"],
    description: "Self-improving, multi-surface AI agent with persistent memory, subagents, skills, scheduling, and multi-gateway access.",
    stars: "220.0k",
    forks: "41.8k",
    language: "Python",
    license: "MIT",
    score: 92,
    grade: "A",
    verdict: "Excellent Choice",
    confidence: "High",
    scores: { usefulness: 19, health: 15, momentum: 15, ease: 13, trust: 13, quality: 9, innovation: 8 },
    bestFor: "Operators who want an always-on agent that can remember, schedule, delegate, and work across messaging channels.",
    solves: "Most AI assistants reset every session or live inside one app. Hermes combines persistent memory, reusable skills, scheduled work, tool use, subagents, and messaging access in one open-source runtime.",
    standout: [
      "Persistent memory and built-in learning loop across sessions",
      "Telegram, Discord, Slack, WhatsApp, Signal, Email, CLI, and desktop surfaces",
      "Scheduled background jobs, isolated subagents, MCP connections, and browser workflows",
      "Broad provider choice instead of single-model lock-in",
      "Permissive MIT licensing and extensive operational documentation"
    ],
    risks: [
      "Powerful terminal, browser, messaging, and automation access require least-privilege setup.",
      "The large feature surface increases configuration and support burden.",
      "Model, web-search, browser, image, or voice services may add recurring provider costs."
    ]
  },
  {
    rank: 2,
    name: "OpenCut",
    owner: "OpenCut-app",
    repo: "OpenCut-app/OpenCut",
    url: "https://github.com/OpenCut-app/OpenCut",
    website: "https://opencut.app/",
    category: "Creator Tool / Video Editing",
    tags: ["Creator Tool", "Video", "Privacy"],
    description: "Privacy-first, open-source video editor providing a free alternative to subscription and cloud-dependent editing tools.",
    stars: "52.0k",
    forks: "5.6k",
    language: "TypeScript",
    license: "MIT",
    score: 88,
    grade: "A-",
    verdict: "Worth Trying",
    confidence: "Medium-High",
    scores: { usefulness: 18, health: 13, momentum: 15, ease: 12, trust: 14, quality: 8, innovation: 8 },
    bestFor: "Creators and teams that value local processing, privacy, open formats, and freedom from per-seat editing subscriptions.",
    solves: "Creators often face subscription costs, watermarks, cloud uploads, and closed editing ecosystems. OpenCut is building a local-first editor with a modern web, desktop, mobile, Rust, and automation direction.",
    standout: [
      "Privacy-first positioning with local media processing",
      "MIT license and self-hosting path",
      "Modern TypeScript and Rust architecture",
      "Roadmap includes plugins, editor API, headless rendering, and MCP support",
      "Strongest estimated weekly star growth in this roundup (+7.8k stars/week)"
    ],
    risks: [
      "The project explicitly states a ground-up rewrite is underway.",
      "Essential editing functionality is still marked in progress on the roadmap."
    ]
  },
  {
    rank: 3,
    name: "OmniRoute",
    owner: "diegosouzapw",
    repo: "diegosouzapw/OmniRoute",
    url: "https://github.com/diegosouzapw/OmniRoute",
    website: "https://github.com/diegosouzapw/OmniRoute",
    category: "AI Infrastructure / Model Routing",
    tags: ["Infrastructure", "Model Gateway", "API"],
    description: "Open-source AI gateway placing multiple model providers behind one endpoint with fallback, analytics, and token compression.",
    stars: "23.6k",
    forks: "924",
    language: "TypeScript",
    license: "MIT",
    score: 87,
    grade: "A-",
    verdict: "Worth Trying",
    confidence: "Medium-High",
    scores: { usefulness: 19, health: 13, momentum: 14, ease: 13, trust: 11, quality: 9, innovation: 8 },
    bestFor: "Developers and teams that use several AI tools or providers and want a single compatible endpoint, fallback logic, and usage visibility.",
    solves: "Using multiple AI providers creates fragmented keys, URLs, quotas, pricing, and failure modes. OmniRoute centralizes connections and exposes an OpenAI-compatible gateway.",
    standout: [
      "One endpoint for many model providers and coding tools",
      "Routing, fallback, analytics, semantic cache, and token-compression features",
      "Desktop, PWA, Docker, npm, and source installation paths",
      "MCP and Agent-to-Agent (A2A) protocol support"
    ],
    risks: [
      "A gateway handles sensitive prompts and credentials, so security hardening is mandatory.",
      "Require API key authentication before deploying in multi-user environments."
    ]
  },
  {
    rank: 4,
    name: "DeepTutor",
    owner: "HKUDS",
    repo: "HKUDS/DeepTutor",
    url: "https://github.com/HKUDS/DeepTutor",
    website: "https://github.com/HKUDS/DeepTutor",
    category: "Education / Personalized Learning",
    tags: ["Education", "AI Tutor", "Research"],
    description: "Agent-native personalized tutoring framework with grounded problem solving, learner memory, and adaptive questions.",
    stars: "28.8k",
    forks: "3.3k",
    language: "Python",
    license: "Apache-2.0",
    score: 86,
    grade: "A-",
    verdict: "Worth Trying",
    confidence: "Medium-High",
    scores: { usefulness: 18, health: 14, momentum: 13, ease: 11, trust: 14, quality: 8, innovation: 8 },
    bestFor: "Educators, tutoring programs, learning communities, and internal training teams willing to supervise an AI learning system.",
    solves: "Generic chatbots rarely maintain a reliable learner model or a structured tutoring loop. DeepTutor combines grounded problem solving with learner memory.",
    standout: [
      "Personalization architecture backed by a published research paper",
      "Closed tutoring loop with grounded problem solving and calibrated questions",
      "TutorBot, CLI, web UI, knowledge-base tools, and multi-user deployment",
      "Permissive Apache-2.0 license"
    ],
    risks: [
      "AI tutoring requires human oversight for accuracy and age-appropriate use.",
      "Student conversation history creates data privacy compliance obligations."
    ]
  },
  {
    rank: 5,
    name: "OfficeCLI",
    owner: "iOfficeAI",
    repo: "iOfficeAI/OfficeCLI",
    url: "https://github.com/iOfficeAI/OfficeCLI",
    website: "https://github.com/iOfficeAI/OfficeCLI",
    category: "Document Automation / AI Agents",
    tags: ["Document OS", "Office Automation", "CLI"],
    description: "Single-binary office automation tool for agents to read, create, edit, and render Word, Excel, and PowerPoint files.",
    stars: "5.4k",
    forks: "445",
    language: "C#",
    license: "Apache-2.0",
    score: 84,
    grade: "B+",
    verdict: "Promising",
    confidence: "Medium",
    scores: { usefulness: 18, health: 13, momentum: 10, ease: 14, trust: 14, quality: 7, innovation: 8 },
    bestFor: "Agents and automation teams that must create or inspect Office files in environments where Microsoft Office is unavailable.",
    solves: "Document agents often produce files without being able to render and inspect the result. OfficeCLI gives agents a command-line path to create and render DOCX, XLSX, and PPTX documents.",
    standout: [
      "Single self-contained binary running without Microsoft Office",
      "Agent-oriented rendering to HTML or PNG for visual inspection",
      "Word, Excel, and PowerPoint workflows in one command tool",
      "Apache-2.0 license and frequent release history"
    ],
    risks: [
      "Complex document formatting fidelity must be tested against real business templates.",
      "Document automation can expose sensitive files if agent permissions are too broad."
    ]
  }
];

export default function AppReviewPage() {
  const [selectedApp, setSelectedApp] = useState<AppReviewItem | null>(null);
  const [activeTab, setActiveTab] = useState<"roundup" | "article" | "money-play" | "grading" | "subscriptions">("roundup");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [modalOpen, setModalOpen] = useState(false);
  const [userPlan, setUserPlan] = useState<string>("Community");

  return (
    <div style={{ background: "var(--bg-base)", color: "var(--text-primary)", minHeight: "100vh", paddingTop: "88px", paddingBottom: "80px" }}>
      
      {/* Top Banner & Header */}
      <section style={{ borderBottom: "1px solid rgba(108, 71, 255, 0.15)", background: "linear-gradient(180deg, rgba(6, 9, 19, 0.9) 0%, rgba(11, 15, 25, 0.95) 100%)", padding: "32px 0 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          {/* Header Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, var(--lux-indigo), var(--lux-cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", color: "#fff", boxShadow: "0 0 16px rgba(0, 212, 255, 0.4)" }}>
                ❖
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em", color: "var(--lux-cyan)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                  LUX APP REVIEW • AUTOMATED GITHUB APP INTELLIGENCE
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Home</span> <span>›</span> <span>Rankings</span> <span>›</span> <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Weekly Roundup</span>
                </div>
              </div>
            </div>

            {/* Week & Update Badge */}
            <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(0, 212, 255, 0.25)", borderRadius: "10px", padding: "8px 16px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)" }}>
              <div style={{ fontSize: "1.4rem" }}>📅</div>
              <div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>WEEK OF</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>July 20 – 24, 2026</div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "14px" }}>
                <div style={{ fontSize: "0.65rem", color: "var(--lux-mint)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>NEXT UPDATE</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>in 2d 14h 22m</div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div style={{ position: "relative", width: "130px", height: "130px", flexShrink: 0, filter: "drop-shadow(0 0 25px rgba(0, 212, 255, 0.45))" }}>
                <Image 
                  src={prefixPath("/images/lux-app-review-logo-official.png")} 
                  alt="Lux App Review Official Hexagon Emblem" 
                  fill 
                  style={{ objectFit: "contain" }}
                  priority 
                />
              </div>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(108, 71, 255, 0.12)", border: "1px solid rgba(108, 71, 255, 0.3)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 600, color: "var(--lux-cyan)", marginBottom: "12px" }}>
                  <span>✨</span> Data-Driven Open-Source Evaluation Engine
                </div>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px", color: "#fff" }}>
                  Top 5 GitHub Apps This Week
                </h1>
                <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "820px", lineHeight: 1.6, margin: 0 }}>
                  Discover the best open-source AI and developer tools making a real impact. Rankings are built from scraped GitHub repositories, official documentation, YouTube creator reviews, and community signals—scored across seven dimensions, not stars alone.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div style={{ display: "flex", gap: "12px", marginTop: "28px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveTab("roundup")}
              style={{
                background: activeTab === "roundup" ? "rgba(0, 212, 255, 0.15)" : "transparent",
                border: activeTab === "roundup" ? "1px solid var(--lux-cyan)" : "1px solid transparent",
                color: activeTab === "roundup" ? "#fff" : "var(--text-secondary)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              🏆 Top 5 Weekly Rankings
            </button>
            <button
              onClick={() => setActiveTab("article")}
              style={{
                background: activeTab === "article" ? "rgba(0, 212, 255, 0.15)" : "transparent",
                border: activeTab === "article" ? "1px solid var(--lux-cyan)" : "1px solid transparent",
                color: activeTab === "article" ? "#fff" : "var(--text-secondary)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              📰 Featured Editorial Article
            </button>
            <button
              onClick={() => setActiveTab("money-play")}
              style={{
                background: activeTab === "money-play" ? "rgba(255, 215, 0, 0.18)" : "rgba(255, 215, 0, 0.05)",
                border: activeTab === "money-play" ? "1px solid #ffd700" : "1px solid rgba(255, 215, 0, 0.3)",
                color: activeTab === "money-play" ? "#fff" : "#ffe45c",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeTab === "money-play" ? "0 0 16px rgba(255, 215, 0, 0.3)" : "none"
              }}
            >
              💰 Subscriber Money Play (High-Ticket Offers)
            </button>
            <button
              onClick={() => setActiveTab("grading")}
              style={{
                background: activeTab === "grading" ? "rgba(108, 71, 255, 0.15)" : "transparent",
                border: activeTab === "grading" ? "1px solid var(--lux-indigo)" : "1px solid transparent",
                color: activeTab === "grading" ? "#fff" : "var(--text-secondary)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              📊 7-Dimension Lux Score System
            </button>
            <button
              onClick={() => setActiveTab("subscriptions")}
              style={{
                background: activeTab === "subscriptions" ? "rgba(0, 255, 163, 0.15)" : "transparent",
                border: activeTab === "subscriptions" ? "1px solid var(--lux-mint)" : "1px solid transparent",
                color: activeTab === "subscriptions" ? "#fff" : "var(--text-secondary)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              👑 Subscriptions & Money Play Access
            </button>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <div style={{ maxWidth: "1280px", margin: "40px auto 0", padding: "0 24px" }}>

        {/* TAB 1: WEEKLY RANKING TABLE & DASHBOARD */}
        {activeTab === "roundup" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

            {/* Featured Blog Post Card */}
            <div style={{ background: "linear-gradient(135deg, rgba(9, 14, 26, 0.95), rgba(16, 24, 40, 0.95))", border: "1px solid rgba(0, 212, 255, 0.35)", borderRadius: "16px", padding: "24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px", boxShadow: "0 0 35px rgba(0, 212, 255, 0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "95px", height: "95px", position: "relative", flexShrink: 0, borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0, 212, 255, 0.4)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)" }}>
                  <Image src={prefixPath("/images/01-thumbnail-top-5-github-apps.png")} alt="Top 5 GitHub Apps to Watch This Week" fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                    <span>📰</span> FEATURED EDITORIAL BLOG ARTICLE • JULY 24, 2026
                  </div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 900, margin: "0 0 6px", color: "#fff" }}>
                    Top 5 GitHub Apps to Watch This Week
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, maxWidth: "680px", lineHeight: 1.5 }}>
                    Open-source tools with real momentum, practical value, and a clear Lux verdict. Read the complete 14-minute editorial review of Hermes Agent, OpenCut, OmniRoute, DeepTutor, and OfficeCLI.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab("article")} 
                style={{ background: "linear-gradient(135deg, var(--lux-cyan), var(--lux-indigo))", border: "none", color: "#fff", padding: "12px 24px", borderRadius: "10px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 0 20px rgba(0,212,255,0.3)", display: "flex", alignItems: "center", gap: "8px", transition: "transform 0.2s" }}
              >
                <span>Read Full Article</span> <span>→</span>
              </button>
            </div>

            {/* Ranking Table Card */}
            <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#fff" }}>Weekly Open-Source App Rankings</h2>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>Updated July 24, 2026 • Evaluated across 7 operational dimensions</div>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--lux-cyan)", background: "rgba(0, 212, 255, 0.08)", padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(0, 212, 255, 0.2)" }}>
                  5 Selected Repositories
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ background: "rgba(6, 9, 19, 0.6)", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <th style={{ padding: "14px 16px", width: "40px" }}>#</th>
                      <th style={{ padding: "14px 16px" }}>App</th>
                      <th style={{ padding: "14px 16px" }}>Category</th>
                      <th style={{ padding: "14px 16px" }}>Description</th>
                      <th style={{ padding: "14px 16px" }}>Lux Score</th>
                      <th style={{ padding: "14px 16px" }}>Stars</th>
                      <th style={{ padding: "14px 16px" }}>Forks</th>
                      <th style={{ padding: "14px 16px" }}>Language</th>
                      <th style={{ padding: "14px 16px", textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_5_APPS.map((app) => (
                      <tr key={app.rank} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }} className="table-row-hover">
                        <td style={{ padding: "16px", fontWeight: 800, fontSize: "1.1rem", color: app.rank === 1 ? "var(--lux-cyan)" : app.rank === 2 ? "var(--lux-mint)" : "var(--text-secondary)" }}>
                          {app.rank}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <div style={{ fontWeight: 800, color: "#fff", fontSize: "0.95rem" }}>{app.name}</div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{app.repo}</div>
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span style={{ background: "rgba(108, 71, 255, 0.15)", border: "1px solid rgba(108, 71, 255, 0.3)", padding: "3px 8px", borderRadius: "12px", fontSize: "0.7rem", color: "#fff", fontWeight: 600 }}>
                            {app.category.split(" / ")[0]}
                          </span>
                        </td>
                        <td style={{ padding: "16px", color: "var(--text-secondary)", maxWidth: "260px", lineHeight: 1.4, fontSize: "0.8rem" }}>
                          {app.description}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: app.score >= 90 ? "rgba(0, 212, 255, 0.15)" : "rgba(0, 255, 163, 0.12)", border: app.score >= 90 ? "1px solid var(--lux-cyan)" : "1px solid var(--lux-mint)", padding: "4px 10px", borderRadius: "8px" }}>
                            <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#fff" }}>{app.score}</span>
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>/100</span>
                            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: app.score >= 90 ? "var(--lux-cyan)" : "var(--lux-mint)" }}>{app.grade}</span>
                          </div>
                        </td>
                        <td style={{ padding: "16px", color: "#fff", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                          ★ {app.stars}
                        </td>
                        <td style={{ padding: "16px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                          ⑂ {app.forks}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span style={{ background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: "4px", fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                            {app.language}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <button
                            onClick={() => setSelectedApp(app)}
                            style={{
                              background: "linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(108, 71, 255, 0.3) 100%)",
                              border: "1px solid var(--lux-cyan)",
                              color: "#fff",
                              padding: "6px 14px",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                          >
                            Read Full Review ›
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dashboard Analytics & Score Radar Section */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
              
              {/* Radar Chart & Score Box */}
              <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "16px", padding: "24px", backdropFilter: "blur(20px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0, color: "#fff" }}>HOW THE LUX SCORE WORKS</h3>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>7-Dimensional Operational Evaluation Model</div>
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-mint)", background: "rgba(0,255,163,0.1)", padding: "2px 8px", borderRadius: "4px" }}>Overall Avg: 87/100</span>
                </div>

                {/* SVG Spider Radar Visualization */}
                <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
                  <svg width="220" height="200" viewBox="0 0 200 200">
                    <polygon points="100,20 170,55 170,135 100,175 30,135 30,55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <polygon points="100,45 145,70 145,120 100,145 55,120 55,70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <polygon points="100,70 120,85 120,105 100,120 80,105 80,85" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    {/* Spider Net Lines */}
                    <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="170" y2="55" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="170" y2="135" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="100" y2="175" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="30" y2="135" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="30" y2="55" stroke="rgba(255,255,255,0.1)" />
                    {/* Active Score Polygon */}
                    <polygon points="100,26 160,60 155,130 100,165 42,128 40,62" fill="rgba(0, 212, 255, 0.25)" stroke="var(--lux-cyan)" strokeWidth="2" />
                  </svg>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.75rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "6px 10px", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Usefulness</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>94/100</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "6px 10px", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Project Health</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>88/100</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "6px 10px", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Momentum</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>85/100</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "6px 10px", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Ease of Use</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>82/100</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "6px 10px", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Trust & Safety</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>90/100</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "6px 10px", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Product Quality</span>
                    <span style={{ color: "#fff", fontWeight: 700 }}>86/100</span>
                  </div>
                </div>
              </div>

              {/* Weekly Snapshot & Metrics Box */}
              <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "16px", padding: "24px", backdropFilter: "blur(20px)" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 16px", color: "#fff" }}>WEEKLY SNAPSHOT</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ background: "rgba(6, 9, 19, 0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px" }}>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Apps Analyzed</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--lux-cyan)" }}>247</div>
                  </div>
                  <div style={{ background: "rgba(6, 9, 19, 0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px" }}>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>New Apps Detected</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--lux-mint)" }}>38</div>
                  </div>
                  <div style={{ background: "rgba(6, 9, 19, 0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px" }}>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Stars Added</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>+52.4k</div>
                  </div>
                  <div style={{ background: "rgba(6, 9, 19, 0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px" }}>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Forks Added</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>+8.7k</div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    Top Category: <span style={{ color: "#fff", fontWeight: 700 }}>AI Tools</span> • Trend: <span style={{ color: "var(--lux-mint)", fontWeight: 700 }}>Up ↗</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("subscriptions")}
                    style={{ background: "transparent", border: "1px solid var(--lux-cyan)", color: "var(--lux-cyan)", padding: "4px 12px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    View Full Snapshot →
                  </button>
                </div>
              </div>

              {/* Download PDF Teaser Card */}
              <div style={{ background: "linear-gradient(135deg, rgba(108, 71, 255, 0.2) 0%, rgba(0, 212, 255, 0.15) 100%)", border: "1px solid var(--lux-cyan)", borderRadius: "16px", padding: "24px", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", textTransform: "uppercase", letterSpacing: "0.1em" }}>COMMUNITY RESOURCE</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "8px 0 12px", color: "#fff" }}>DOWNLOAD THE TOP 5 WEEKLY PDF</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 16px" }}>
                    Get the complete 14-page editorial report, full scorecards, implementation risk cautions, and source notes in a beautifully formatted PDF.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a
                    href="/documents/Lux_App_Review_Top_5_2026-07-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "linear-gradient(135deg, var(--lux-cyan) 0%, var(--lux-mint) 100%)",
                      color: "#0b0f19",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      textDecoration: "none",
                      textAlign: "center",
                      boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)"
                    }}
                  >
                    📄 Download Top 5 Weekly PDF
                  </a>
                  <a
                    href="/documents/Lux_App_Review_Money_Play_2026-07-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(108, 71, 255, 0.2)",
                      border: "1px solid var(--lux-indigo)",
                      color: "#fff",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      textDecoration: "none",
                      textAlign: "center"
                    }}
                  >
                    🔒 Subscriber Money Play PDF
                  </a>
                </div>
              </div>

            </div>

            {/* Sources Scraped This Week Grid */}
            <div style={{ background: "rgba(17, 24, 39, 0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: "0 0 16px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                SOURCES SCRAPED THIS WEEK
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                <div style={{ background: "rgba(6, 9, 19, 0.6)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🐙 GitHub</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Search API, Topics & Star Signals</div>
                </div>
                <div style={{ background: "rgba(6, 9, 19, 0.6)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🌐 Official Sites</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Changelogs, Pricing & Security Docs</div>
                </div>
                <div style={{ background: "rgba(6, 9, 19, 0.6)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>▶ YouTube</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Video Demos & Creator Reviews</div>
                </div>
                <div style={{ background: "rgba(6, 9, 19, 0.6)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>𝕏 / Twitter</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Community Buzz & Dev Discussions</div>
                </div>
                <div style={{ background: "rgba(6, 9, 19, 0.6)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>📰 Blogs & News</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Independent Tech Coverage & Audits</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: FEATURED EDITORIAL BLOG REVIEW ARTICLE */}
        {activeTab === "article" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* Article Header Card */}
            <div style={{ background: "linear-gradient(135deg, rgba(9, 14, 26, 0.95), rgba(17, 24, 39, 0.95))", border: "1px solid rgba(0, 212, 255, 0.3)", borderRadius: "20px", padding: "36px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ background: "rgba(0, 212, 255, 0.12)", border: "1px solid rgba(0, 212, 255, 0.3)", color: "var(--lux-cyan)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800 }}>
                  APP REVIEW
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>•</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>July 24, 2026</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>•</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>14 min read</span>
              </div>

              <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 900, lineHeight: 1.15, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                Top 5 GitHub Apps to Watch This Week
              </h1>
              
              <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: "900px" }}>
                Open-source tools with real momentum, practical value, and a clear Lux verdict. Evaluated by the Lux Automaton Intelligence Team across 7 operational dimensions.
              </p>

              {/* PDF Downloads Bar */}
              <div style={{ background: "rgba(6, 9, 19, 0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-mint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>OFFICIAL PUBLISHING PACKAGE</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginTop: "2px" }}>Download Complete PDFs & Implementation Guides</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  <a
                    href="/documents/Lux_App_Review_Top_5_2026-07-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "linear-gradient(135deg, var(--lux-cyan), var(--lux-mint))", color: "#0b0f19", padding: "10px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  >
                    📄 Download Top 5 PDF
                  </a>
                  <a
                    href="/documents/Lux_App_Review_Money_Play_2026-07-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "rgba(108, 71, 255, 0.2)", border: "1px solid var(--lux-indigo)", color: "#fff", padding: "10px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none" }}
                  >
                    🔒 Subscriber Money Play PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Article Image Banner */}
            <div style={{ position: "relative", width: "100%", height: "420px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0, 212, 255, 0.3)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
              <Image 
                src={prefixPath("/images/01-thumbnail-top-5-github-apps.png")} 
                alt="Top 5 GitHub Apps to Watch This Week Header" 
                fill 
                style={{ objectFit: "cover" }} 
                priority 
              />
            </div>

            {/* Main Article Content Card */}
            <div style={{ background: "rgba(17, 24, 39, 0.75)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "20px", padding: "40px", backdropFilter: "blur(20px)", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              
              <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, marginTop: 0, marginBottom: "20px" }}>Executive Summary</h2>
              <p>
                Open-source software is moving faster than most businesses can evaluate it. A repository can gain thousands of stars in a week, appear in dozens of videos, and still be too early, too risky, or too complicated for the average team. That is why Lux App Review does not rank projects by stars alone.
              </p>
              <p>
                For this week of <strong>July 20–24, 2026</strong> edition, we looked for projects with a combination of practical usefulness, current momentum, active development, understandable documentation, permissive licensing, and a believable path from repository to real-world value.
              </p>

              {/* Table */}
              <div style={{ margin: "32px 0", overflowX: "auto", border: "1px solid rgba(0, 212, 255, 0.2)", borderRadius: "12px", background: "rgba(6, 9, 19, 0.8)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(108, 71, 255, 0.15)", color: "#fff" }}>
                      <th style={{ padding: "14px 16px" }}>Rank</th>
                      <th style={{ padding: "14px 16px" }}>App</th>
                      <th style={{ padding: "14px 16px" }}>Category</th>
                      <th style={{ padding: "14px 16px" }}>Lux Score</th>
                      <th style={{ padding: "14px 16px" }}>Grade</th>
                      <th style={{ padding: "14px 16px" }}>Stars</th>
                      <th style={{ padding: "14px 16px" }}>Forks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_5_APPS.map((app) => (
                      <tr key={app.rank} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 800, color: "var(--lux-cyan)" }}>#{app.rank}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 800, color: "#fff" }}>{app.name}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{app.category.split(" / ")[0]}</td>
                        <td style={{ padding: "14px 16px", fontWeight: 900, color: "var(--lux-cyan)" }}>{app.score}/100</td>
                        <td style={{ padding: "14px 16px", fontWeight: 800, color: "var(--lux-mint)" }}>{app.grade}</td>
                        <td style={{ padding: "14px 16px" }}>{app.stars}</td>
                        <td style={{ padding: "14px 16px" }}>{app.forks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Detailed App Reviews */}
              {TOP_5_APPS.map((app) => (
                <div key={app.rank} style={{ margin: "40px 0", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "28px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                      #{app.rank} {app.name} — {app.score}/100 ({app.grade})
                    </h3>
                    <span style={{ background: "rgba(0, 255, 163, 0.12)", border: "1px solid var(--lux-mint)", color: "var(--lux-mint)", padding: "4px 12px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 800 }}>
                      {app.verdict}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "16px" }}>
                    Repository: <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "underline" }}>{app.repo}</a> | Language: {app.language} | License: {app.license} | Stars: {app.stars}
                  </p>

                  <div style={{ background: "rgba(6, 9, 19, 0.5)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "6px" }}>What problem it solves:</strong>
                    <span>{app.solves}</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                    <div style={{ background: "rgba(0, 212, 255, 0.05)", border: "1px solid rgba(0, 212, 255, 0.2)", borderRadius: "12px", padding: "20px" }}>
                      <h4 style={{ color: "var(--lux-cyan)", fontSize: "1rem", fontWeight: 800, margin: "0 0 10px" }}>✨ Why It Stands Out</h4>
                      <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        {app.standout.map((item, i) => <li key={i} style={{ marginBottom: "6px" }}>{item}</li>)}
                      </ul>
                    </div>

                    <div style={{ background: "rgba(255, 77, 106, 0.05)", border: "1px solid rgba(255, 77, 106, 0.2)", borderRadius: "12px", padding: "20px" }}>
                      <h4 style={{ color: "#ff4d6a", fontSize: "1rem", fontWeight: 800, margin: "0 0 10px" }}>⚠️ Risks & Cautions</h4>
                      <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        {app.risks.map((item, i) => <li key={i} style={{ marginBottom: "6px" }}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {/* Conclusion & CTA */}
              <div style={{ background: "linear-gradient(135deg, rgba(108, 71, 255, 0.2), rgba(0, 212, 255, 0.15))", border: "1px solid var(--lux-cyan)", borderRadius: "16px", padding: "32px", textAlign: "center", marginTop: "40px" }}>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Ready to Turn Open-Source Apps Into Real Workflows?</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 20px" }}>
                  Join Lux Insider or Lux Operator to access Subscriber Money Play PDFs, agent prompt templates, and commercial deployment packs.
                </p>
                <button
                  onClick={() => setActiveTab("subscriptions")}
                  style={{ background: "linear-gradient(135deg, var(--lux-cyan), var(--lux-mint))", border: "none", color: "#0b0f19", padding: "12px 28px", borderRadius: "10px", fontWeight: 900, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}
                >
                  View Membership Tiers & Money Plays →
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB: SUBSCRIBER MONEY PLAY (HIGH-TICKET SERVICE OFFERS) */}
        {activeTab === "money-play" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

            {/* Subscriber Hero Banner */}
            <div style={{ background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(11, 15, 25, 0.95) 60%, rgba(0, 212, 255, 0.12))", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "20px", padding: "36px", boxShadow: "0 0 30px rgba(255, 215, 0, 0.15)", position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ background: "rgba(255, 215, 0, 0.2)", border: "1px solid #ffd700", color: "#ffe45c", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    👑 SUBSCRIBER MONEY PLAY INTELLIGENCE
                  </span>
                  <span style={{ background: "rgba(0, 212, 255, 0.15)", border: "1px solid rgba(0, 212, 255, 0.3)", color: "var(--lux-cyan)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                    KIT LAR-W30-2026-0724
                  </span>
                </div>
                <a
                  href="/documents/Lux_App_Review_Money_Play_2026-07-24.pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #ffd700, #ffaa00)", color: "#0b0f19", padding: "10px 20px", borderRadius: "10px", fontWeight: 900, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(255, 215, 0, 0.35)", transition: "all 0.2s" }}
                >
                  📥 DOWNLOAD MONEY PLAY PDF (141 KB) ⚡
                </a>
              </div>

              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.01em" }}>
                Turn Open-Source GitHub Repositories Into Managed High-Ticket Business Systems
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "880px", lineHeight: 1.6, margin: "0 0 24px" }}>
                Every week, Lux App Review publishes five commercial monetization blueprints for founders, agency owners, and technical consultants. Turn open-source code into high-margin recurring client revenue ($1,250 – $3,500 setup + $349 – $999/mo retainers).
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", background: "rgba(6, 9, 19, 0.7)", border: "1px solid rgba(255, 215, 0, 0.2)", borderRadius: "14px", padding: "20px" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-mono)" }}>AVERAGE SETUP VALUE</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#ffe45c" }}>$2,149 <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>/ project</span></div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-mono)" }}>AVERAGE MONTHLY SLA</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--lux-mint)" }}>$569 <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>/ client / mo</span></div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-mono)" }}>SUBSCRIBER DELIVERABLES</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>5 Scopes + Prompts + PDFs</div>
                </div>
              </div>
            </div>

            {/* Disclaimer Bar */}
            <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              <span style={{ fontSize: "1.1rem" }}>⚠️</span>
              <span><strong>Subscriber Disclaimer:</strong> Educational planning examples only. No earnings guarantee. All service offers require appropriate technical testing, client permission, license compliance, and security scoping before commercial deployment.</span>
            </div>

            {/* 5 COMMERCIAL MONEY PLAYS GRID */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", margin: 0 }}>This Week’s 5 High-Ticket Commercial Offers</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>Complete buyer targeting, pricing breakdown, scope of work, and monthly SLA retainers.</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

                {/* PLAY 1: HERMES AGENT */}
                <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(0, 212, 255, 0.3)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(20px)", boxShadow: "0 0 25px rgba(0, 212, 255, 0.08)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(0, 212, 255, 0.15)", border: "1px solid var(--lux-cyan)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                        🤖
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                          PLAY 01 • BASED ON HERMES AGENT (MIT)
                        </div>
                        <h4 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                          Managed AI Operations Desk
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255, 215, 0, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>SETUP FEE</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffe45c" }}>$3,500</div>
                      </div>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(0, 255, 163, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>MONTHLY RETAINER</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--lux-mint)" }}>$999<span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>/mo</span></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                    <div>
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-cyan)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                      <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Small businesses, agencies, creators, and internal operations teams.</p>
                      
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-cyan)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK & OFFER</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        Install and configure Hermes Agent, connect approved messaging channels (Telegram, Slack, Email), build 3 custom business skills, establish persistent memory stores, add scheduled reporting, document permissions, and provide managed 24/7 monitoring.
                      </p>
                    </div>

                    <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                      <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        <li>Hardened Hermes installation on isolated VPS or client server</li>
                        <li>3 Custom Business Skills (e.g. Lead Intake, Weekly Digest, PDF Summaries)</li>
                        <li>Configured Messaging Gateway (Slack / Telegram / Email)</li>
                        <li>Security & Least-Privilege Permission Scoping Document</li>
                        <li>Monthly Health Check, Log Audit & Skill Optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PLAY 2: OPENCUT */}
                <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(108, 71, 255, 0.3)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(20px)", boxShadow: "0 0 25px rgba(108, 71, 255, 0.08)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(108, 71, 255, 0.15)", border: "1px solid var(--lux-indigo)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                        🎬
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-indigo)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                          PLAY 02 • BASED ON OPENCUT (MIT)
                        </div>
                        <h4 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                          Private Creator Editing Studio
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255, 215, 0, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>SETUP FEE</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffe45c" }}>$1,500</div>
                      </div>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(0, 255, 163, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>MONTHLY RETAINER</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--lux-mint)" }}>$399<span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>/mo</span></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                    <div>
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-indigo)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                      <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Creators, schools, nonprofits, agencies, and privacy-sensitive media teams.</p>
                      
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-indigo)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK & OFFER</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        Deploy a branded private video editing workspace, prepare reusable brand video templates, train the editing team, document local storage and export workflows, and provide monthly software updates and technical support.
                      </p>
                    </div>

                    <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                      <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        <li>Self-hosted or desktop OpenCut deployment with zero recurring seat fees</li>
                        <li>5 Branded Brand Video Project Templates & Presets</li>
                        <li>Team Workflow & Local Storage Safety Playbook</li>
                        <li>Monthly Software Update Patching & Feature Training</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PLAY 3: OMNIROUTE */}
                <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(0, 255, 163, 0.3)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(20px)", boxShadow: "0 0 25px rgba(0, 255, 163, 0.08)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(0, 255, 163, 0.15)", border: "1px solid var(--lux-mint)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                        ⚡
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-mint)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                          PLAY 03 • BASED ON OMNIROUTE (MIT)
                        </div>
                        <h4 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                          AI Cost-Control & Reliability Gateway
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255, 215, 0, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>SETUP FEE</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffe45c" }}>$1,997</div>
                      </div>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(0, 255, 163, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>MONTHLY RETAINER</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--lux-mint)" }}>$499<span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>/mo</span></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                    <div>
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-mint)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                      <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>AI agencies, development teams, internal innovation groups, multi-model operators.</p>
                      
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-mint)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK & OFFER</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        Install a hardened OmniRoute gateway, connect approved model providers (OpenAI, Anthropic, Gemini, Ollama), configure fallback routing and token compression, set up monthly token budgets, train staff, and provide a monthly API cost optimization audit.
                      </p>
                    </div>

                    <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                      <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        <li>Single unified endpoint for all client LLM requests</li>
                        <li>Automated provider fallback to eliminate API downtime</li>
                        <li>Semantic Caching & Token Compression rules (cut API costs 30-50%)</li>
                        <li>Monthly Token Spend Audit & Provider Optimization Report</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PLAY 4: DEEPTUTOR */}
                <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(255, 228, 92, 0.3)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(20px)", boxShadow: "0 0 25px rgba(255, 228, 92, 0.08)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(255, 228, 92, 0.15)", border: "1px solid #ffe45c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                        🎓
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ffe45c", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                          PLAY 04 • BASED ON DEEPTUTOR (APACHE-2.0)
                        </div>
                        <h4 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                          Private AI Learning Portal
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255, 215, 0, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>SETUP FEE</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffe45c" }}>$2,500</div>
                      </div>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(0, 255, 163, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>MONTHLY RETAINER</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--lux-mint)" }}>$599<span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>/mo</span></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                    <div>
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                      <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Tutoring companies, workforce programs, schools, nonprofits, membership communities.</p>
                      
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK & OFFER</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        Deploy a private DeepTutor portal, load approved learning materials & custom knowledge bases, configure learner roles and progress tracking, train educators, add content review controls, and provide monthly curriculum and usage reporting.
                      </p>
                    </div>

                    <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                      <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        <li>Custom branded tutoring portal instance</li>
                        <li>Ingested curriculum docs & verified answer grounding</li>
                        <li>Learner memory & adaptive question generation setup</li>
                        <li>Monthly Educator Usage, Completion & Accuracy Report</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PLAY 5: OFFICECLI */}
                <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(255, 107, 0, 0.3)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(20px)", boxShadow: "0 0 25px rgba(255, 107, 0, 0.08)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(255, 107, 0, 0.15)", border: "1px solid #ff6b00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                        📄
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ff6b00", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                          PLAY 05 • BASED ON OFFICECLI (APACHE-2.0)
                        </div>
                        <h4 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                          Document Automation QuickStart
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255, 215, 0, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>SETUP FEE</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ffe45c" }}>$1,250</div>
                      </div>
                      <div style={{ background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(0, 255, 163, 0.3)", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>MONTHLY RETAINER</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--lux-mint)" }}>$349<span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>/mo</span></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                    <div>
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ff6b00", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                      <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Consultants, agencies, finance teams, operations groups, software vendors.</p>
                      
                      <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ff6b00", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK & OFFER</h5>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        Install OfficeCLI binary, connect approved AI agents (Hermes / LANA / custom scripts), build 3 Word, Excel, or PowerPoint automated document pipelines, establish quality validation checks, and provide managed template maintenance.
                      </p>
                    </div>

                    <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                      <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                      <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        <li>OfficeCLI binary integrated into client server (no MS Office required)</li>
                        <li>3 Automated Document Workflows (Word Contract, Excel Report, PPT Deck)</li>
                        <li>Agent Document Template Library & Formatting Guards</li>
                        <li>Monthly Maintenance & Template Update SLA</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 4-STEP SUBSCRIBER PLAYBOOK */}
            <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "18px", padding: "32px" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>The 4-Step Commercial Implementation Playbook</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: "0 0 28px" }}>Follow this proven framework to convert technical reviews into paid client engagements.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 212, 255, 0.2)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-cyan)", fontFamily: "var(--font-mono)" }}>PHASE 01 • DISCOVERY</div>
                  <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Target Selection & Audit</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>Identify clients spending over $2k/mo on manual ops, software seats, or fragmented AI tools.</p>
                </div>

                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-indigo)", fontFamily: "var(--font-mono)" }}>PHASE 02 • SCOPING</div>
                  <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Fixed Setup + SLA Retainer</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>Present a fixed 2-week implementation setup + recurring monthly SLA monitoring retainer.</p>
                </div>

                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 255, 163, 0.2)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-mint)", fontFamily: "var(--font-mono)" }}>PHASE 03 • DEPLOYMENT</div>
                  <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Hardened Security Setup</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>Deploy open-source binaries with least-privilege API keys, Docker isolation, and permission logs.</p>
                </div>

                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255, 215, 0, 0.2)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#ffe45c", fontFamily: "var(--font-mono)" }}>PHASE 04 • RETAINER</div>
                  <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Monthly Value Reporting</h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>Send automated monthly cost optimization reports showing exact hours & dollars saved.</p>
                </div>
              </div>
            </div>

            {/* COPY-AND-PASTE AGENT PROMPT STACK */}
            <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(0, 212, 255, 0.25)", borderRadius: "18px", padding: "28px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>⚡ SUBSCRIBER PROMPT STACK</span>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff", margin: "4px 0 0" }}>LANA Client Pitch Generator Prompt</h4>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(`You are an expert technical AI agency consultant. Generate a high-ticket client proposal scope for installing Hermes Agent and OmniRoute for a 20-person business team.`)}
                  style={{ background: "rgba(0, 212, 255, 0.15)", border: "1px solid var(--lux-cyan)", color: "var(--lux-cyan)", padding: "6px 14px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}
                >
                  📋 Copy Prompt
                </button>
              </div>

              <pre style={{ background: "#060913", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "10px", padding: "16px", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.82rem", overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
{`Role: Senior AI Infrastructure Consultant & Service Scoper
Task: Generate a 1-page Client Proposal Scope for deploying open-source AI infrastructure.
Client Profile: [Insert Client Business Type, e.g. 15-person Digital Agency]
Selected Stack: Hermes Agent (Ops Agent) + OmniRoute (Cost Gateway)
Output Required:
1. Executive Summary (Why open-source beats per-seat SaaS costs)
2. Setup Scope ($3,500 fixed setup - server install, API keys, 3 custom skills)
3. Monthly Retainer SLA ($999/mo - 24/7 monitoring, skill updates, monthly cost audit)
4. Implementation Timeline (Day 1: Audit, Day 5: Deployment, Day 10: Training)
5. Security & Permission Assurance (Least-privilege API scope, zero data retention)`}
              </pre>
            </div>

            {/* DOWNLOAD PDF & PRO TEMPLATE CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.1), rgba(11,15,25,0.8))", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ffe45c", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>PDF DOCUMENT</div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff", margin: "8px 0" }}>Money Play Full PDF Guide</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 20px" }}>Printable 6-page subscriber guide containing pricing tables, sales scripts, and risk checklists.</p>
                </div>
                <a
                  href="/documents/Lux_App_Review_Money_Play_2026-07-24.pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: "#ffe45c", color: "#0b0f19", padding: "12px", borderRadius: "10px", fontWeight: 900, fontSize: "0.85rem", textDecoration: "none" }}
                >
                  Download Money Play PDF 📥
                </a>
              </div>

              <div style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(11,15,25,0.8))", border: "1px solid rgba(0,212,255,0.3)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>FULL REVIEW PDF</div>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff", margin: "8px 0" }}>Top 5 GitHub Apps Full Review PDF</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 20px" }}>The complete 16-page editorial intelligence report for the week of July 20-24, 2026.</p>
                </div>
                <a
                  href="/documents/Lux_App_Review_Top_5_2026-07-24.pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: "var(--lux-cyan)", color: "#0b0f19", padding: "12px", borderRadius: "10px", fontWeight: 900, fontSize: "0.85rem", textDecoration: "none" }}
                >
                  Download Full Review PDF 📥
                </a>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: 7-DIMENSION LUX SCORE GRADING SYSTEM */}
        {activeTab === "grading" && (
          <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "16px", padding: "32px", backdropFilter: "blur(20px)" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>The 7-Dimension Lux Score Model</h2>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "800px", lineHeight: 1.6, margin: "0 0 32px" }}>
              Stars are attention signals—not security audits or production readiness guarantees. Lux App Review evaluates open-source applications across seven weighted operational dimensions to determine true enterprise and founder utility.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 212, 255, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--lux-cyan)" }}>01 • USEFULNESS (20 PTS)</div>
                <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Problem Fit & Breadth</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Evaluates how clearly the tool solves a real operational problem and how broadly it applies to business workflows.</p>
              </div>

              <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--lux-indigo)" }}>02 • PROJECT HEALTH (15 PTS)</div>
                <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Commits & Maintainers</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Measures active commit history, release frequency, issue responsiveness, and maintainer diversity.</p>
              </div>

              <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 255, 163, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--lux-mint)" }}>03 • MOMENTUM (15 PTS)</div>
                <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Weekly Growth Trajectory</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Tracks star growth, fork velocity, creator coverage, and community adoption rates.</p>
              </div>

              <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255, 228, 92, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#ffe45c" }}>04 • EASE OF USE (15 PTS)</div>
                <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Onboarding & Setup</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Assesses documentation quality, Docker/CLI setup speed, sample configs, and troubleshooting paths.</p>
              </div>

              <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255, 107, 0, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#ff6b00" }}>05 • TRUST & SAFETY (15 PTS)</div>
                <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>License & Security Posture</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Verifies OSI open-source licensing, dependency vulnerability scans, permissions, and credential security.</p>
              </div>

              <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 212, 255, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--lux-cyan)" }}>06 • PRODUCT QUALITY (10 PTS)</div>
                <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Code Architecture & UX</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Inspects codebase organization, test suite coverage, error handling, and interface polish.</p>
              </div>

              <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--lux-indigo)" }}>07 • INNOVATION (10 PTS)</div>
                <h4 style={{ fontSize: "1.1rem", margin: "8px 0", color: "#fff" }}>Originality & Agent Tech</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Evaluates novel architectural patterns like MCP support, A2A protocols, memory loops, and local models.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SUBSCRIPTIONS & MEMBERSHIP STRUCTURE */}
        {activeTab === "subscriptions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* Header & Toggle */}
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-cyan)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                SUBSCRIBER MONEY PLAY & AGENT PROMPTS
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", margin: "10px 0 14px" }}>
                Choose Your Lux App Review Access Level
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Turn open-source tools into high-margin business systems. Unlock subscriber Money Play PDFs, copy-and-paste agent prompts, JSON schemas, and commercial workflow code.
              </p>

              {/* Billing Toggle */}
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(17, 24, 39, 0.9)", border: "1px solid rgba(108, 71, 255, 0.3)", borderRadius: "30px", padding: "4px", marginTop: "20px" }}>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  style={{
                    background: billingCycle === "monthly" ? "var(--lux-indigo)" : "transparent",
                    color: "#fff",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  style={{
                    background: billingCycle === "yearly" ? "linear-gradient(135deg, var(--lux-cyan), var(--lux-mint))" : "transparent",
                    color: billingCycle === "yearly" ? "#0b0f19" : "#fff",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                >
                  Yearly (Save 20%)
                </button>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              
              {/* Tier 1: Lux Community ($0) */}
              <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>FREE ACCESS</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "8px 0", color: "#fff" }}>Lux Community</h3>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", margin: "16px 0" }}>$0 <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>/ forever</span></div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 24px" }}>
                    Perfect for open-source enthusiasts, developers, and builders following weekly app intelligence.
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-mint)" }}>✓</span> Saved reviews & bookmarks</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-mint)" }}>✓</span> Weekly Roundup email dispatch</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-mint)" }}>✓</span> Complete Top 5 App Review PDF</li>
                  </ul>
                </div>

                <button
                  onClick={() => { setUserPlan("Community"); setModalOpen(true); }}
                  style={{ width: "100%", marginTop: "32px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "12px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
                >
                  Join Free Community
                </button>
              </div>

              {/* Tier 2: Lux Insider ($19/mo) */}
              <div style={{ background: "rgba(17, 24, 39, 0.9)", border: "2px solid var(--lux-cyan)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 0 30px rgba(0, 212, 255, 0.15)", position: "relative" }}>
                <div style={{ position: "absolute", top: "-12px", right: "24px", background: "linear-gradient(135deg, var(--lux-cyan), var(--lux-mint))", color: "#0b0f19", padding: "2px 12px", borderRadius: "12px", fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase" }}>POPULAR CHOICE</div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-cyan)", textTransform: "uppercase" }}>INSIDER ALPHA</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "8px 0", color: "#fff" }}>Lux Insider</h3>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", margin: "16px 0" }}>
                    {billingCycle === "monthly" ? "$19" : "$190"} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>{billingCycle === "monthly" ? "/ month" : "/ year"}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 24px" }}>
                    For agency owners, founders, and consultants turning open-source tools into commercial services.
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem", color: "#fff" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-cyan)" }}>✓</span> All Community features</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-cyan)" }}>✓</span> Subscriber Money Play PDFs</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-cyan)" }}>✓</span> Full archive access</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-cyan)" }}>✓</span> Early access to new reviews</li>
                  </ul>
                </div>

                <button
                  onClick={() => { setUserPlan("Insider"); setModalOpen(true); }}
                  style={{ width: "100%", marginTop: "32px", background: "linear-gradient(135deg, var(--lux-cyan) 0%, var(--lux-indigo) 100%)", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 800, cursor: "pointer", boxShadow: "0 0 16px rgba(0, 212, 255, 0.3)" }}
                >
                  Subscribe to Insider
                </button>
              </div>

              {/* Tier 3: Lux Operator ($49/mo) */}
              <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(108, 71, 255, 0.3)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-indigo)", textTransform: "uppercase" }}>ENTERPRISE & PROMPT KIT</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "8px 0", color: "#fff" }}>Lux Operator</h3>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", margin: "16px 0" }}>
                    {billingCycle === "monthly" ? "$49" : "$490"} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>{billingCycle === "monthly" ? "/ month" : "/ year"}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 24px" }}>
                    Complete access for software engineers, systems integrators, and automated business operators.
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem", color: "#fff" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-mint)" }}>✓</span> All Insider access</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-mint)" }}>✓</span> Copy-and-paste Agent Prompts</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-mint)" }}>✓</span> Full App Review JSON schemas</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--lux-mint)" }}>✓</span> Website Code & Commercial Packs</li>
                  </ul>
                </div>

                <button
                  onClick={() => { setUserPlan("Operator"); setModalOpen(true); }}
                  style={{ width: "100%", marginTop: "32px", background: "linear-gradient(135deg, var(--lux-indigo) 0%, var(--lux-mint) 100%)", color: "#0b0f19", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 800, cursor: "pointer" }}
                >
                  Unlock Operator Stack
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* IN-DEPTH APP REVIEW DETAIL MODAL */}
      {selectedApp && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(6, 9, 19, 0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ background: "rgba(17, 24, 39, 0.95)", border: "1px solid var(--lux-cyan)", borderRadius: "20px", maxWidth: "760px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "32px", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ background: "rgba(0,212,255,0.1)", border: "1px solid var(--lux-cyan)", color: "var(--lux-cyan)", padding: "2px 8px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700 }}>
                  RANK #{selectedApp.rank} • {selectedApp.category}
                </span>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", margin: "8px 0 4px" }}>{selectedApp.name}</h2>
                <a href={selectedApp.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-mono)", textDecoration: "none" }}>
                  🔗 {selectedApp.repo}
                </a>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "flex", gap: "16px", background: "rgba(6, 9, 19, 0.6)", padding: "16px", borderRadius: "12px", marginBottom: "24px" }}>
              <div style={{ borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: "16px" }}>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>LUX SCORE</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--lux-cyan)" }}>{selectedApp.score}/100</div>
              </div>
              <div style={{ borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: "16px" }}>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>VERDICT</div>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--lux-mint)" }}>{selectedApp.verdict}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>LICENSE</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{selectedApp.license}</div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ color: "var(--lux-cyan)", fontSize: "0.9rem", margin: "0 0 6px" }}>WHAT PROBLEM IT SOLVES</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>{selectedApp.solves}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ color: "var(--lux-mint)", fontSize: "0.9rem", margin: "0 0 8px" }}>WHY IT STANDS OUT</h4>
              <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {selectedApp.standout.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <h4 style={{ color: "#ff6b00", fontSize: "0.9rem", margin: "0 0 8px" }}>RISKS & CAUTIONS</h4>
              <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {selectedApp.risks.map((risk, idx) => <li key={idx}>{risk}</li>)}
              </ul>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <a href={selectedApp.url} target="_blank" rel="noopener noreferrer" style={{ background: "var(--lux-cyan)", color: "#0b0f19", padding: "8px 16px", borderRadius: "6px", fontWeight: 800, fontSize: "0.8rem", textDecoration: "none" }}>
                View GitHub Repository →
              </a>
              <button onClick={() => setSelectedApp(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: "6px", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ONBOARDING & SUBSCRIPTION CHECKOUT MODAL */}
      {modalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(6, 9, 19, 0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ background: "rgba(17, 24, 39, 0.95)", border: "1px solid var(--lux-cyan)", borderRadius: "20px", maxWidth: "520px", width: "100%", padding: "32px", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0, color: "#fff" }}>Join Lux App Review — {userPlan} Plan</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
            </div>
            
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Create your account profile to complete onboarding and unlock protected downloads.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Account created for ${userPlan} plan! Check your email to complete verification.`); setModalOpen(false); }} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Display Name</label>
                <input type="text" required placeholder="e.g. Asa Spade" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Email Address</label>
                <input type="email" required placeholder="asa@luxautomaton.com" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Professional Role & Company</label>
                <input type="text" placeholder="Founder, Developer, Agency Owner" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(6, 9, 19, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }} />
              </div>

              <button
                type="submit"
                style={{ marginTop: "12px", background: "linear-gradient(135deg, var(--lux-cyan) 0%, var(--lux-mint) 100%)", color: "#0b0f19", padding: "12px", borderRadius: "8px", fontWeight: 800, border: "none", cursor: "pointer" }}
              >
                Complete Registration ({userPlan}) →
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
