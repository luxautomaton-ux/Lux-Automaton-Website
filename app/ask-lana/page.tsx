"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, ShieldCheck, Sparkles, Workflow, X } from "lucide-react";
import { prefixPath } from "@/lib/prefix";

interface ResultCard {
  title: string;
  type: "Product" | "Solution" | "Workshop" | "Library Guide";
  description: string;
  link: string;
  icon: ReactNode;
}

const PRESET_QUERIES = [
  { text: "I waste too much time on manual tasks", category: "automation" },
  { text: "I need a CRM to manage clients", category: "business" },
  { text: "Is my customer data safe with AI?", category: "privacy" },
  { text: "How do I turn a video into a workshop?", category: "workshops" },
  { text: "What should I build first?", category: "strategy" },
];

const SEARCH_DATABASE: { keywords: string[]; results: ResultCard[] }[] = [
  {
    keywords: ["time", "manual", "waste", "productivity", "workflows", "slow", "automate"],
    results: [
      {
        title: "LANA - The AI Operator",
        type: "Product",
        description: "Your proactive AI coordinator for planning the day, writing SOPs, organizing tasks, and turning scattered work into execution.",
        link: "/products/lana",
        icon: <Sparkles size={22} />,
      },
      {
        title: "LANA Content Command Center",
        type: "Workshop",
        description: "A guided workshop for building newsletters, blogs, video topics, launch calendars, and repeatable community rhythm.",
        link: "/workshops",
        icon: <BookOpen size={22} />,
      },
      {
        title: "Success Packs",
        type: "Solution",
        description: "Structured workflow recipes that LANA can help you run for operations, outreach, sales, and admin follow-up.",
        link: "/products/success-packs",
        icon: <Workflow size={22} />,
      },
    ],
  },
  {
    keywords: ["crm", "client", "sales", "leads", "outreach", "pipeline", "deals"],
    results: [
      {
        title: "Lux Business Hub",
        type: "Product",
        description: "A business command layer for client files, CRM pipeline management, payments, tasks, and owner-approved execution.",
        link: "/products/lux-business",
        icon: <Workflow size={22} />,
      },
      {
        title: "Private AI Business OS",
        type: "Workshop",
        description: "Learn how to replace scattered apps with one private operating layer that keeps business context close to the work.",
        link: "/workshops",
        icon: <BookOpen size={22} />,
      },
    ],
  },
  {
    keywords: ["data", "safe", "hipaa", "privacy", "secure", "gdpr", "local", "leak"],
    results: [
      {
        title: "Lux Codex",
        type: "Product",
        description: "The private memory and local AI core for storing approved context, documents, tasks, project history, and knowledge.",
        link: "/products/lux-codex",
        icon: <ShieldCheck size={22} />,
      },
      {
        title: "Lux Care OS",
        type: "Solution",
        description: "A private, HIPAA-aware operations system built for clinics, care programs, and patient support networks.",
        link: "/solutions/lux-care-os",
        icon: <ShieldCheck size={22} />,
      },
    ],
  },
  {
    keywords: ["video", "youtube", "article", "workshop", "course", "lesson", "podcast", "generate"],
    results: [
      {
        title: "Workshop Studio",
        type: "Workshop",
        description: "The admin tool where LANA reads a source, designs a curriculum, creates lesson content, and prepares thumbnail and visual prompts.",
        link: "/admin",
        icon: <Sparkles size={22} />,
      },
      {
        title: "Lux AI Kids Workshops",
        type: "Workshop",
        description: "Kid-friendly AI labs with modules, lessons, activities, safety framing, and Ace + LANA teaching guidance.",
        link: "/lux-ai-kids/workshops",
        icon: <BookOpen size={22} />,
      },
    ],
  },
  {
    keywords: ["first", "build", "idea", "start", "strategy", "plan", "launch"],
    results: [
      {
        title: "Start Here",
        type: "Library Guide",
        description: "Choose a builder path and let LANA point you toward the right product, workshop, and launch sequence.",
        link: "/start-here",
        icon: <ArrowRight size={22} />,
      },
      {
        title: "Who Is LANA?",
        type: "Library Guide",
        description: "Meet the AI operator behind the Lux Automaton ecosystem and learn why she was created.",
        link: "/who-is-lana",
        icon: <Sparkles size={22} />,
      },
    ],
  },
];

export default function AskLanaPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultCard[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    const words = searchQuery.toLowerCase().split(/\s+/);
    const matchedResults: ResultCard[] = [];
    const seenTitles = new Set<string>();

    SEARCH_DATABASE.forEach((entry) => {
      const match = entry.keywords.some((kw) => words.some((word) => word.includes(kw) || kw.includes(word)));
      if (match) {
        entry.results.forEach((res) => {
          if (!seenTitles.has(res.title)) {
            seenTitles.add(res.title);
            matchedResults.push(res);
          }
        });
      }
    });

    setResults(matchedResults);
    setSearched(true);
  };

  return (
    <main className="ask-lana-page">
      <section className="ask-lana-hero">
        <video
          className="ask-lana-hero-video"
          src={prefixPath("/videos/ask-lana-hero-bg.mp4")}
          poster={prefixPath("/images/lana-executive-office.jpg")}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="ask-lana-hero-shade" />
        <div className="ask-lana-hero-inner">
          <div className="ask-lana-copy">
            <span className="section-label">LANA Intelligence Center</span>
            <h1>Ask LANA what to build, fix, automate, or learn next.</h1>
            <p>
              Describe the business problem, workshop idea, product question, or AI safety concern. LANA routes you to the right Lux system,
              guide, workshop, or next move.
            </p>
            <div className="ask-lana-actions">
              <Link href="/who-is-lana" className="primary-button">
                Who is LANA? <ArrowRight size={16} />
              </Link>
              <Link href="/admin" className="secondary-button">
                Open Workshop Studio
              </Link>
            </div>
          </div>
          <div className="lana-status-panel" aria-label="LANA operating status">
            <div>
              <span>Mode</span>
              <b>Operator</b>
            </div>
            <div>
              <span>Focus</span>
              <b>Workshops, products, strategy</b>
            </div>
            <div>
              <span>Review</span>
              <b>Human approved</b>
            </div>
          </div>
        </div>
      </section>

      <section className="ask-lana-console">
        <div className="ask-lana-console-inner">
          <div className="ask-lana-search">
            <Search size={22} />
            <input
              type="text"
              placeholder="Ask about automation, CRM, privacy, workshops, YouTube lessons, or what to build first..."
              value={query}
              onChange={(event) => handleSearch(event.target.value)}
            />
            {query && (
              <button type="button" onClick={() => handleSearch("")} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </div>

          {!searched && (
            <div className="ask-lana-prompts">
              {PRESET_QUERIES.map((item) => (
                <button key={item.text} type="button" onClick={() => handleSearch(item.text)}>
                  <span>{item.text}</span>
                  <b>{item.category}</b>
                </button>
              ))}
            </div>
          )}

          {searched && (
            <div className="ask-lana-results">
              <div className="ask-lana-results-head">
                <span>System Matches</span>
                <b>{results.length}</b>
              </div>

              {results.length > 0 ? (
                <div className="ask-lana-result-grid">
                  {results.map((result) => (
                    <Link key={result.title} href={result.link} className="ask-lana-result-card">
                      <span className="ask-lana-result-icon">{result.icon}</span>
                      <small>{result.type}</small>
                      <h2>{result.title}</h2>
                      <p>{result.description}</p>
                      <em>
                        Open recommendation <ArrowRight size={15} />
                      </em>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="ask-lana-empty">
                  <Sparkles size={28} />
                  <h2>No exact match yet.</h2>
                  <p>Try asking about workshops, CRM, private AI, invoices, videos, or what to build first.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
