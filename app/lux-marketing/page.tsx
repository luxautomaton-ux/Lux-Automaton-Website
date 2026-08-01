"use client";

/* eslint-disable @next/next/no-img-element */
import { forwardRef, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ClipboardCopy,
  Download,
  ImageIcon,
  LayoutTemplate,
  Mail,
  Megaphone,
  Plus,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
import { toPng } from "html-to-image";

const asset = (path: string) => (process.env.NODE_ENV === "production" ? "/Lux-Automaton-Website" : "") + path;

type Category = "photo" | "social" | "promotion" | "newsletter" | "workshop" | "thumbnail";
type Ratio = "16:9" | "1:1" | "4:5" | "9:16";
type Layout = "campaign" | "quote" | "newsletter" | "workshop" | "photo" | "background";
type Backdrop = "eclipse" | "circuit" | "prism" | "void";

type Template = {
  id: string;
  name: string;
  category: Category;
  format: string;
  headline: string;
  description: string;
  cta: string;
  tag: string;
  image?: string;
  layout: Layout;
  ratio: Ratio;
  accent: string;
  backdrop: Backdrop;
};

const BRAND = {
  logo: asset("/lux-marketing/lux-logo-wide.png"),
  icon: asset("/lux-marketing/lux-logo-icon.png"),
};

const templates: Template[] = [
  {
    id: "private-ai",
    name: "Private AI Campaign",
    category: "promotion",
    format: "Website / 16:9",
    headline: "Private AI systems for builders",
    description: "We build the AI operating systems that run your business, automate your workflow, and help you scale.",
    cta: "Start Here",
    tag: "Lux Automaton",
    image: asset("/lux-marketing/asa-close.png"),
    layout: "campaign",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "circuit",
  },
  {
    id: "founder-quote",
    name: "Founder Insight",
    category: "social",
    format: "Instagram / 4:5",
    headline: "Automate the repeatable. Focus on the irreplaceable.",
    description: "A founder principle for building a business that scales without losing the human edge.",
    cta: "Read the Insight",
    tag: "Asa Pritchard",
    image: asset("/lux-marketing/asa-black.png"),
    layout: "quote",
    ratio: "4:5",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
  {
    id: "lana-tip",
    name: "LANA Business Tip",
    category: "social",
    format: "Instagram / 4:5",
    headline: "Your AI agent can run the business while you build the future.",
    description: "LANA turns daily operations into clear, repeatable systems.",
    cta: "Meet LANA",
    tag: "LANA Tip",
    image: asset("/lux-marketing/lana-seated.png"),
    layout: "quote",
    ratio: "4:5",
    accent: "#00ffa3",
    backdrop: "circuit",
  },
  {
    id: "launch",
    name: "Product Launch",
    category: "promotion",
    format: "Campaign / 1:1",
    headline: "Build. Automate. Grow.",
    description: "One private AI operating system for the work that matters most.",
    cta: "Explore Lux",
    tag: "New Release",
    image: asset("/lux-marketing/asa-white.png"),
    layout: "campaign",
    ratio: "1:1",
    accent: "#7c4dff",
    backdrop: "prism",
  },
  {
    id: "weekly",
    name: "LANA Weekly Intelligence",
    category: "newsletter",
    format: "Email / 16:9",
    headline: "This week in AI that impacts your business.",
    description: "Useful model updates, business insights, and automation ideas researched and explained by LANA.",
    cta: "Read Full Breakdown",
    tag: "Issue 042",
    image: asset("/lux-marketing/lana-bw.png"),
    layout: "newsletter",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "circuit",
  },
  {
    id: "ai-foundations",
    name: "AI Foundations Workshop",
    category: "workshop",
    format: "Workshop / 1:1",
    headline: "AI Foundations Masterclass",
    description: "Learn the core concepts of AI and how to use them in your business.",
    cta: "View Workshop",
    tag: "Beginner · 7 Modules",
    image: asset("/lux-marketing/asa-office.png"),
    layout: "workshop",
    ratio: "1:1",
    accent: "#00ffa3",
    backdrop: "void",
  },
  {
    id: "builder-workshop",
    name: "AI Business Workshop",
    category: "workshop",
    format: "Workshop / 4:5",
    headline: "Build Your First AI Business",
    description: "A step-by-step system to launch and automate an AI-powered business.",
    cta: "Reserve Your Seat",
    tag: "Popular · 11 Modules",
    image: asset("/lux-marketing/asa-full.png"),
    layout: "workshop",
    ratio: "4:5",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
  {
    id: "build-apps-thumb",
    name: "Build AI Apps Thumbnail",
    category: "thumbnail",
    format: "YouTube / 16:9",
    headline: "Build AI apps without coding",
    description: "The Lux Way",
    cta: "Watch Now",
    tag: "Founder Build",
    image: asset("/lux-marketing/asa-tie.png"),
    layout: "campaign",
    ratio: "16:9",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
  {
    id: "ai-news-thumb",
    name: "AI News Thumbnail",
    category: "thumbnail",
    format: "YouTube / 16:9",
    headline: "AI news you need to know",
    description: "LANA Reports",
    cta: "Watch Now",
    tag: "AI News",
    image: asset("/lux-marketing/lana-standing.png"),
    layout: "campaign",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "prism",
  },
  {
    id: "office-photo",
    name: "LANA Office Portrait",
    category: "photo",
    format: "Portrait / 4:5",
    headline: "Meet LANA",
    description: "Your private AI partner for work, growth, and clear decisions.",
    cta: "Meet Your AI Partner",
    tag: "Brand Photography",
    image: asset("/lux-marketing/lana-office.png"),
    layout: "photo",
    ratio: "4:5",
    accent: "#00d4ff",
    backdrop: "void",
  },
  {
    id: "asa-photo",
    name: "Founder Office Portrait",
    category: "photo",
    format: "Portrait / 4:5",
    headline: "Systems create freedom.",
    description: "Founder photography for campaigns, articles, and speaking engagements.",
    cta: "About Asa",
    tag: "Founder Photography",
    image: asset("/lux-marketing/asa-office.png"),
    layout: "photo",
    ratio: "4:5",
    accent: "#00ffa3",
    backdrop: "void",
  },
  {
    id: "circuit-bg",
    name: "Neon Circuit Background",
    category: "photo",
    format: "Background / 16:9",
    headline: "Automate. Innovate. Accelerate.",
    description: "Signature Lux circuit field for slides, video calls, campaigns, and event screens.",
    cta: "Lux Automaton",
    tag: "Background",
    layout: "background",
    ratio: "16:9",
    accent: "#00d4ff",
    backdrop: "circuit",
  },
  {
    id: "eclipse-bg",
    name: "Violet Eclipse Background",
    category: "photo",
    format: "Background / 16:9",
    headline: "The future is private.",
    description: "A dramatic stage and keynote background in the Lux visual system.",
    cta: "Lux Automaton",
    tag: "Background",
    layout: "background",
    ratio: "16:9",
    accent: "#7c4dff",
    backdrop: "eclipse",
  },
];

const categories: Array<{ id: Category; label: string; icon: React.ReactNode }> = [
  { id: "photo", label: "Backgrounds & Photos", icon: <ImageIcon className="h-4 w-4" /> },
  { id: "social", label: "Social Media", icon: <Share2 className="h-4 w-4" /> },
  { id: "promotion", label: "Promotions", icon: <Megaphone className="h-4 w-4" /> },
  { id: "newsletter", label: "Newsletters", icon: <Mail className="h-4 w-4" /> },
  { id: "workshop", label: "Workshops", icon: <BookOpen className="h-4 w-4" /> },
  { id: "thumbnail", label: "Thumbnails", icon: <LayoutTemplate className="h-4 w-4" /> },
];

const backdrops: Record<Backdrop, string> = {
  eclipse: "radial-gradient(circle at 72% 48%, rgba(124,77,255,.5), transparent 24%), radial-gradient(circle at 80% 52%, transparent 0 22%, rgba(0,212,255,.5) 22.5% 23%, transparent 24%), #05070d",
  circuit: "radial-gradient(circle at 82% 48%, rgba(0,212,255,.26), transparent 28%), radial-gradient(circle at 72% 62%, rgba(124,77,255,.22), transparent 36%), #05070d",
  prism: "radial-gradient(circle at 85% 20%, rgba(0,255,163,.24), transparent 28%), radial-gradient(circle at 20% 80%, rgba(124,77,255,.32), transparent 34%), #05070d",
  void: "linear-gradient(145deg, #0b1020 0%, #05070d 58%, #020307 100%)",
};

const ratioStyle: Record<Ratio, string> = {
  "16:9": "16 / 9",
  "1:1": "1 / 1",
  "4:5": "4 / 5",
  "9:16": "9 / 16",
};

function gptPrompt(template: Template) {
  const host =
    template.id.includes("lana") || template.name.toLowerCase().includes("lana")
      ? "LANA as the polished AI business host, wearing a lavender button-down and holding a tablet"
      : template.id.includes("workshop")
        ? "Asa and LANA together as premium workshop hosts, Asa in a black suit and LANA in a lavender button-down"
        : "Asa Pritchard as the founder host, wearing a black suit, glasses, confident executive presence";

  return `Create a 16:9 cinematic Lux Automaton marketing thumbnail in the exact uniform brand style of the supplied references.

Brand lockup: Lux Automaton logo in the top-left, text "LUX AUTOMATON", tagline "AUTOMATE | INNOVATE | ACCELERATE".
Main headline, huge bold uppercase on the left: "${template.headline}".
Small label/subtitle under the headline: "${template.tag}".
Scene: dark futuristic glass office at night with city lights, neon cyan and violet ceiling lights, transparent holographic AI workflow screens, circuit-line overlays, glowing cyan/violet arcs, premium SaaS/founder energy.
Hero figure: ${host}.
Visual rules: ultra sharp commercial render, high contrast, black background, white headline with cyan/violet gradient emphasis on the most important words, clean spacing, no clutter, no random extra words, no misspelled logo text, no warped faces or hands.
Optional bottom strip: four simple icon callouts matching the topic: ${template.cta}, automate smarter, launch faster, scale with confidence.
Use the Lux colors only: cyan #00D4FF, violet #7C4DFF, emerald #00FFA3, white, near-black.`;
}

export default function LuxMarketingPage({ embedded = false }: { embedded?: boolean }) {
  const [items, setItems] = useState(templates);
  const [activeId, setActiveId] = useState(templates[0].id);
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [panel, setPanel] = useState<"edit" | "style" | "prompt">("edit");
  const [exporting, setExporting] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const active = items.find((item) => item.id === activeId) ?? items[0];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) =>
      (category === "all" || item.category === category) &&
      (!needle || `${item.name} ${item.headline} ${item.tag}`.toLowerCase().includes(needle)),
    );
  }, [category, items, query]);

  function update(patch: Partial<Template>) {
    setItems((current) => current.map((item) => item.id === active.id ? { ...item, ...patch } : item));
  }

  function duplicate() {
    const copy = { ...active, id: crypto.randomUUID(), name: `${active.name} Copy` };
    setItems((current) => [copy, ...current]);
    setActiveId(copy.id);
    setCategory("all");
  }

  function selectCategory(next: Category | "all") {
    setCategory(next);
    const first = next === "all" ? items[0] : items.find((item) => item.category === next);
    if (first) setActiveId(first.id);
  }

  async function exportPng() {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const url = await toPng(canvasRef.current, { cacheBust: true, pixelRatio: 2, backgroundColor: "#05070d" });
      const link = document.createElement("a");
      link.download = `${active.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
      link.href = url;
      link.click();
    } finally {
      setExporting(false);
    }
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(gptPrompt(active));
    setCopiedPrompt(true);
    window.setTimeout(() => setCopiedPrompt(false), 1400);
  }

  function makeAllUniform() {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        accent: item.id.includes("lana") ? "#00d4ff" : item.id.includes("workshop") ? "#7c4dff" : item.accent,
        backdrop: "circuit",
        layout: item.layout === "background" ? "background" : "campaign",
        ratio: "16:9",
      })),
    );
  }

  const ASA_LANA_ASSETS = [
    { label: "Asa Close", path: asset("/lux-marketing/asa-close.png") },
    { label: "Asa Office", path: asset("/lux-marketing/asa-office.png") },
    { label: "Asa Founder", path: asset("/lux-marketing/asa-founder.png") },
    { label: "Asa Black", path: asset("/lux-marketing/asa-black.png") },
    { label: "Asa White", path: asset("/lux-marketing/asa-white.png") },
    { label: "Asa Tie", path: asset("/lux-marketing/asa-tie.png") },
    { label: "LANA Seated", path: asset("/lux-marketing/lana-seated.png") },
    { label: "LANA Standing", path: asset("/lux-marketing/lana-standing.png") },
    { label: "LANA Office", path: asset("/lux-marketing/lana-office.png") },
    { label: "LANA B&W", path: asset("/lux-marketing/lana-bw.png") },
    { label: "LANA Full", path: asset("/lux-marketing/lana.png") },
  ];

  function generateFreeAiImage() {
    const seed = Math.floor(Math.random() * 1000000);
    const cleanHeadline = active.headline.replace(/[^a-zA-Z0-9 ]/g, " ");
    const isLana = active.tag.toLowerCase().includes("lana") || active.headline.toLowerCase().includes("lana");
    const character = isLana ? "beautiful intelligent futuristic female executive AI partner LANA" : "charismatic charismatic founder Asa Pritchard";
    const promptText = `photorealistic commercial portrait ${character} in dark cyber futuristic glass office lux automaton ${cleanHeadline} neon cyan violet lights ultra high resolution 8k`;
    const dims = active.ratio === "9:16" ? "width=1080&height=1920" : active.ratio === "4:5" ? "width=1080&height=1350" : active.ratio === "1:1" ? "width=1080&height=1080" : "width=1920&height=1080";
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?${dims}&nologo=true&seed=${seed}`;
    update({ image: url });
  }

  function draftLanaCampaign() {
    const presets = [
      {
        name: "Private AI Operating System",
        headline: "Private AI Systems for Builders and Founders",
        description: "Run your business operating system locally with 100% data privacy and zero cloud dependency.",
        cta: "Explore Lux OS",
        tag: "Lux Automaton",
        accent: "#00d4ff",
        backdrop: "circuit" as Backdrop,
      },
      {
        name: "LANA Executive Assistant",
        headline: "Your Autonomous Executive AI Partner",
        description: "LANA turns daily business operations into clear, repeatable systems and schedules content automatically.",
        cta: "Meet LANA",
        tag: "LANA AI",
        accent: "#7c4dff",
        backdrop: "eclipse" as Backdrop,
      },
      {
        name: "Founder Build Loop",
        headline: "Idea to Prototype to Scale in 30 Days",
        description: "Turn standard service workflows into productized AI software packs with LANA.",
        cta: "Start Building",
        tag: "Founder OS",
        accent: "#00ffa3",
        backdrop: "prism" as Backdrop,
      },
      {
        name: "Lux AI Kids Workshop",
        headline: "Your First Video Game: Imagine. Draw. Play!",
        description: "Hands-on paper prototyping and AI art guidance for young creators aged 6 to 8.",
        cta: "Join Workshop",
        tag: "Lux AI Kids",
        accent: "#00d4ff",
        backdrop: "circuit" as Backdrop,
      },
    ];

    const pick = presets[Math.floor(Math.random() * presets.length)];
    const seed = Math.floor(Math.random() * 1000000);
    const promptText = `cinematic futuristic dark cyber luxury office executive ${pick.headline} lux automaton`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=1080&height=1080&nologo=true&seed=${seed}`;

    const newCampaign: Template = {
      id: crypto.randomUUID(),
      ...pick,
      category: "promotion",
      format: "Campaign / 16:9",
      image: imageUrl,
      layout: "campaign",
      ratio: "16:9",
    };

    setItems((current) => [newCampaign, ...current]);
    setActiveId(newCampaign.id);
    setCategory("all");
  }

  return (
    <main className={`lux-marketing-root ${embedded ? "embedded" : "standalone"}`}>
      <div className="lux-marketing-layout">
        <aside className="lux-marketing-leftnav">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <BrandIcon size={38} />
              <div>
                <p className="font-black text-sm tracking-[.08em] text-white m-0">LUX MARKETING</p>
                <p className="mt-0.5 text-[11px] font-medium m-0"><span className="text-violet-400">Create.</span> <span className="text-cyan-300">Brand.</span> <span className="text-emerald-300">Publish.</span></p>
              </div>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search templates..."
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "#0c101c",
                  color: "#f8fafc",
                  padding: "8px 12px 8px 34px",
                  fontSize: "12px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <nav aria-label="Template categories" className="flex flex-col gap-1">
            <CategoryButton active={category === "all"} label="All Templates" count={items.length} icon={<LayoutTemplate className="h-4 w-4" />} onClick={() => selectCategory("all")} />
            {categories.map((item) => (
              <CategoryButton key={item.id} active={category === item.id} label={item.label} count={items.filter((template) => template.category === item.id).length} icon={item.icon} onClick={() => selectCategory(item.id)} />
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-white/10 bg-[#0c101c] p-3">
            <div className="flex items-center gap-2.5">
              <BrandIcon size={28} />
              <div className="min-w-0"><p className="truncate text-xs font-bold text-white m-0">Lux Automaton</p><p className="truncate text-[10px] text-slate-500 m-0">Brand system active</p></div>
              <Check className="ml-auto h-3.5 w-3.5 text-emerald-300" />
            </div>
          </div>
        </aside>

        <section className="lux-marketing-center">
          <header className="lux-marketing-center-header">
            <div><p className="text-[10px] uppercase tracking-[.16em] text-slate-500 m-0">Campaign</p><h1 className="mt-0.5 text-base font-bold text-white m-0">{active.name}</h1></div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>{active.format}</span>
              <button
                type="button"
                onClick={draftLanaCampaign}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                  border: "1px solid rgba(124, 77, 255, 0.4)",
                  background: "linear-gradient(135deg, rgba(124, 77, 255, 0.25) 0%, rgba(0, 212, 255, 0.25) 100%)",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#ffffff",
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(124,77,255,0.2)",
                }}
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> ✨ Draft with LANA
              </button>
              <button
                type="button"
                onClick={duplicate}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.06)",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Duplicate
              </button>
            </div>
          </header>

          <div className="lux-marketing-center-body">
            <aside className="lux-marketing-template-list">
              <div className="mb-2 flex items-center justify-between px-1"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 m-0">{category === "all" ? "All Templates" : categories.find((item) => item.id === category)?.label}</p><span className="text-[10px] text-slate-600">{filtered.length}</span></div>
              <div className="space-y-2">
                {filtered.map((item) => <TemplateCard key={item.id} item={item} active={item.id === active.id} onClick={() => setActiveId(item.id)} />)}
                {!filtered.length && <p className="p-3 text-xs text-slate-500">No matching templates.</p>}
              </div>
            </aside>

            <div className="lux-marketing-canvas-viewport">
              <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.05) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
              <div className="lux-marketing-canvas-wrapper" style={{ maxWidth: active.ratio === "9:16" ? "300px" : active.ratio === "4:5" ? "400px" : active.ratio === "1:1" ? "460px" : "660px" }}>
                <CreativeCanvas ref={canvasRef} template={active} />
              </div>
            </div>
          </div>
        </section>

        <aside className="lux-marketing-rightpanel">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px" }}>
            {(["edit", "style", "prompt"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPanel(tab)}
                style={{
                  padding: "6px 0",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  background: "transparent",
                  color: panel === tab ? "#ffffff" : "#64748b",
                  border: "none",
                  borderBottom: panel === tab ? "2px solid #7c4dff" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {panel === "edit" ? (
            <div style={{ display: "grid", gap: "12px" }}>
              <Field label="Headline" value={active.headline} multiline onChange={(headline) => update({ headline })} />
              <Field label="Description" value={active.description} multiline onChange={(description) => update({ description })} />
              <Field label="Call to action" value={active.cta} onChange={(cta) => update({ cta })} />
              <Field label="Label" value={active.tag} onChange={(tag) => update({ tag })} />

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px", marginTop: "4px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                  Character & Photography Asset
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", maxHeight: "150px", overflowY: "auto", paddingRight: "2px" }}>
                  {ASA_LANA_ASSETS.map((imgAsset) => (
                    <button
                      key={imgAsset.path}
                      type="button"
                      onClick={() => update({ image: imgAsset.path })}
                      style={{
                        padding: "6px 4px",
                        borderRadius: "6px",
                        border: active.image === imgAsset.path ? "1px solid #00d4ff" : "1px solid rgba(255,255,255,0.1)",
                        background: active.image === imgAsset.path ? "rgba(0, 212, 255, 0.2)" : "#0c101c",
                        color: active.image === imgAsset.path ? "#ffffff" : "#94a3b8",
                        fontSize: "10px",
                        fontWeight: 600,
                        cursor: "pointer",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {imgAsset.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={generateFreeAiImage}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    borderRadius: "8px",
                    border: "1px solid rgba(0, 212, 255, 0.4)",
                    background: "rgba(0, 212, 255, 0.12)",
                    color: "#00d4ff",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" /> 🖼️ Generate Free AI Image (Pollinations.ai)
                </button>
              </div>
            </div>
          ) : panel === "style" ? (
            <div style={{ display: "grid", gap: "16px" }}>
              <ControlGroup label="Color style">
                <div style={{ display: "flex", gap: "10px" }}>
                  {["#7c4dff", "#00d4ff", "#00ffa3", "#f8fafc"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-label={`Use ${color}`}
                      onClick={() => update({ accent: color })}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: active.accent === color ? "2px solid #ffffff" : "2px solid transparent",
                        padding: "2px",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ display: "block", width: "100%", height: "100%", borderRadius: "50%", background: color }} />
                    </button>
                  ))}
                </div>
              </ControlGroup>
              <ControlGroup label="Background">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {(["eclipse", "circuit", "prism", "void"] as Backdrop[]).map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => update({ backdrop: name })}
                      style={{
                        borderRadius: "8px",
                        border: active.backdrop === name ? "1px solid #7c4dff" : "1px solid rgba(255,255,255,0.1)",
                        background: "#0c101c",
                        padding: "8px",
                        textAlign: "left",
                        color: active.backdrop === name ? "#ffffff" : "#94a3b8",
                        fontSize: "11px",
                        textTransform: "capitalize",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ display: "block", height: "36px", borderRadius: "6px", background: backdrops[name], marginBottom: "6px" }} />
                      {name}
                    </button>
                  ))}
                </div>
              </ControlGroup>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              <textarea
                readOnly
                value={gptPrompt(active)}
                style={{
                  height: "180px",
                  width: "100%",
                  resize: "none",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "#0c101c",
                  color: "#cbd5e1",
                  padding: "10px",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={copyPrompt}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,212,255,0.4)",
                  background: "rgba(0,212,255,0.1)",
                  color: "#ffffff",
                  padding: "10px",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                <ClipboardCopy className="h-3.5 w-3.5" /> {copiedPrompt ? "Copied" : "Copy GPT Prompt"}
              </button>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "10px" }}>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                  Free Image Generators
                </span>
                <div style={{ display: "grid", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={generateFreeAiImage}
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      background: "rgba(0,255,163,0.12)",
                      border: "1px solid rgba(0,255,163,0.3)",
                      color: "#00ffa3",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    ⚡ Instant Pollinations.ai (Free - 1 Click)
                  </button>
                  <a
                    href="https://www.bing.com/create"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#cbd5e1",
                      fontSize: "11px",
                      fontWeight: 600,
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    🎨 Open Bing Image Creator (Free DALL-E 3)
                  </a>
                </div>
              </div>
            </div>
          )}

          <ControlGroup label="Aspect ratio">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
              {(["16:9", "1:1", "4:5", "9:16"] as Ratio[]).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => update({ ratio })}
                  style={{
                    borderRadius: "6px",
                    border: active.ratio === ratio ? "1px solid #7c4dff" : "1px solid rgba(255,255,255,0.1)",
                    background: active.ratio === ratio ? "rgba(124,77,255,0.2)" : "#0c101c",
                    color: active.ratio === ratio ? "#ffffff" : "#94a3b8",
                    padding: "8px 0",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </ControlGroup>

          <button
            type="button"
            onClick={exportPng}
            disabled={exporting}
            style={{
              width: "100%",
              padding: "10px 16px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #7c4dff 0%, #00d4ff 100%)",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "12px",
              border: "none",
              cursor: exporting ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "auto",
              boxShadow: "0 0 20px rgba(0,212,255,0.2)",
              opacity: exporting ? 0.6 : 1,
            }}
          >
            <Download className="h-3.5 w-3.5" /> {exporting ? "Exporting..." : "Export PNG"}
          </button>
        </aside>
      </div>
    </main>
  );
}

function CategoryButton({ active, label, count, icon, onClick }: { active: boolean; label: string; count: number; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        padding: "8px 12px",
        borderRadius: "8px",
        borderLeft: active ? "3px solid #7c4dff" : "3px solid transparent",
        background: active ? "rgba(124, 77, 255, 0.18)" : "transparent",
        color: active ? "#ffffff" : "#94a3b8",
        fontSize: "13px",
        fontWeight: active ? 700 : 500,
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.15s ease",
        marginBottom: "2px",
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
      }}
    >
      {icon}
      <span style={{ flex: 1, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ fontSize: "10px", opacity: 0.7, background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "10px" }}>{count}</span>
    </button>
  );
}

function TemplateCard({ item, active, onClick }: { item: Template; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        width: "100%",
        height: "90px",
        borderRadius: "8px",
        overflow: "hidden",
        border: active ? "2px solid #7c4dff" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: active ? "0 0 16px rgba(124,77,255,0.3)" : "none",
        background: backdrops[item.backdrop],
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.15s ease",
        marginBottom: "8px",
        display: "block",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
      {item.image && (
        <img
          src={item.image}
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "85%",
            width: "60%",
            objectFit: "cover",
            objectPosition: "top",
            opacity: 0.8,
            filter: "grayscale(0.3) brightness(0.8)",
          }}
        />
      )}
      <div style={{ position: "absolute", inset: 0, padding: "8px 10px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: item.accent, margin: 0 }}>
          {item.tag}
        </p>
        <p style={{ fontSize: "11px", fontWeight: 800, color: "#ffffff", margin: "2px 0 0", lineHeight: "1.2", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {item.headline}
        </p>
      </div>
      {active && (
        <span style={{ position: "absolute", top: "6px", right: "6px", width: "18px", height: "18px", borderRadius: "50%", background: "#7c4dff", display: "grid", placeItems: "center" }}>
          <Check style={{ width: "12px", height: "12px", color: "#fff" }} />
        </span>
      )}
    </button>
  );
}

const getImageStyle = (layout: Layout): React.CSSProperties => {
  switch (layout) {
    case "photo":
      return { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" };
    case "newsletter":
      return { position: "absolute", bottom: 0, right: 0, height: "78%", width: "44%", objectFit: "cover", objectPosition: "top", opacity: 0.95 };
    case "quote":
      return { position: "absolute", bottom: 0, right: 0, height: "62%", width: "58%", objectFit: "cover", objectPosition: "top", opacity: 0.9 };
    case "workshop":
      return { position: "absolute", bottom: 0, right: 0, height: "58%", width: "48%", objectFit: "cover", objectPosition: "top", opacity: 0.75 };
    case "campaign":
    default:
      return {
        position: "absolute",
        bottom: 0,
        right: 0,
        height: "94%",
        width: "52%",
        objectFit: "cover",
        objectPosition: "top",
        filter: "grayscale(0.2) brightness(0.88) contrast(1.15)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 24%)",
        maskImage: "linear-gradient(90deg, transparent, black 24%)",
      };
  }
};

const CreativeCanvas = forwardRef<HTMLDivElement, { template: Template }>(function CreativeCanvas({ template }, ref) {
  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-[#05070d] shadow-[0_28px_90px_rgba(0,0,0,.55)]" style={{ aspectRatio: ratioStyle[template.ratio], background: backdrops[template.backdrop] }}>
      <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.09) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(90deg, transparent 36%, black)" }} />
      {template.image && template.layout !== "background" && (
        <img src={template.image} alt="" style={getImageStyle(template.layout)} />
      )}
      <div className={`absolute inset-0 ${template.layout === "photo" ? "bg-gradient-to-t from-black via-black/20 to-transparent" : "bg-gradient-to-r from-[#05070d] via-[#05070d]/80 to-transparent"}`} />
      <div className="relative z-10 flex h-full flex-col p-[5%]">
        <div className="flex items-start justify-between gap-4">
          <img src={BRAND.logo} alt="Lux Automaton" className="h-auto w-[34%] max-w-[270px] object-contain object-left" />
          <span className="text-[clamp(8px,1.05vw,12px)] font-bold uppercase tracking-[.16em]" style={{ color: template.accent }}>{template.tag}</span>
        </div>
        {template.layout === "background" ? (
          <div className="grid flex-1 place-items-center text-center"><div><BrandIcon size={48} /><h2 className="text-[clamp(25px,5vw,62px)] font-black uppercase leading-[.98] mt-4">{template.headline}</h2><p className="mx-auto mt-5 max-w-xl text-[clamp(11px,1.5vw,18px)] leading-relaxed text-slate-300">{template.description}</p></div></div>
        ) : template.layout === "newsletter" ? (
          <div className="mt-[8%] w-[58%]"><h2 className="text-[clamp(24px,4.2vw,52px)] font-black leading-[1.02]">{template.headline}</h2><p className="mt-[5%] text-[clamp(10px,1.35vw,16px)] leading-relaxed text-slate-300">{template.description}</p><div className="mt-[6%] space-y-2 border-t border-white/15 pt-[4%] text-[clamp(9px,1.1vw,13px)]"><p><span style={{ color: template.accent }}>01</span> New AI model releases</p><p><span style={{ color: template.accent }}>02</span> Small-business automation</p><p><span style={{ color: template.accent }}>03</span> Founder intelligence</p></div></div>
        ) : template.layout === "workshop" ? (
          <div className="mt-auto w-[64%] pb-[3%]"><Sparkles className="mb-[5%] h-[10%] w-[10%]" style={{ color: template.accent }} /><h2 className="text-[clamp(26px,4.8vw,60px)] font-black leading-[1.02]">{template.headline}</h2><p className="mt-[4%] text-[clamp(10px,1.3vw,16px)] leading-relaxed text-slate-300">{template.description}</p><CanvasButton label={template.cta} accent={template.accent} /></div>
        ) : template.layout === "quote" ? (
          <div className="mt-[9%] w-[72%]"><span className="text-[clamp(34px,7vw,90px)] font-black leading-none" style={{ color: template.accent }}>“</span><h2 className="-mt-[3%] text-[clamp(24px,4.6vw,58px)] font-black uppercase leading-[1.02]">{template.headline}</h2><p className="mt-[5%] text-[clamp(10px,1.3vw,16px)] text-slate-300">— {template.tag}</p></div>
        ) : template.layout === "photo" ? (
          <div className="mt-auto max-w-[78%]"><h2 className="text-[clamp(28px,5.5vw,68px)] font-black leading-none">{template.headline}</h2><p className="mt-[4%] text-[clamp(10px,1.4vw,17px)] leading-relaxed text-slate-200">{template.description}</p></div>
        ) : (
          <div className="mt-auto w-[62%] pb-[4%]"><h2 className="text-[clamp(28px,5.4vw,68px)] font-black uppercase leading-[.96]">{template.headline.split(" ").map((word, index) => <span key={`${word}-${index}`} className="mr-[.18em] inline-block" style={index >= Math.max(1, template.headline.split(" ").length - 2) ? { color: template.accent } : undefined}>{word}</span>)}</h2><div className="my-[5%] h-1 w-[22%] rounded-full" style={{ background: `linear-gradient(90deg,#7c4dff,${template.accent})` }} /><p className="max-w-lg text-[clamp(10px,1.35vw,16px)] leading-relaxed text-slate-300">{template.description}</p><CanvasButton label={template.cta} accent={template.accent} /></div>
        )}
      </div>
    </div>
  );
});

function CanvasButton({ label, accent }: { label: string; accent: string }) {
  return <span className="mt-[6%] inline-block rounded-md px-[5%] py-[2.5%] text-[clamp(9px,1.1vw,14px)] font-black text-black" style={{ background: `linear-gradient(120deg,#7c4dff,${accent})`, color: accent === "#f8fafc" ? "#05070d" : "white" }}>{label}</span>;
}

function BrandIcon({ size = 36 }: { size?: number }) {
  return (
    <span
      role="img"
      aria-label="Lux Automaton"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        display: "block",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "10px",
        background: "#111625",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <img
        src={BRAND.icon}
        alt=""
        style={{
          position: "absolute",
          width: "170%",
          left: "-35%",
          top: "-15%",
          objectFit: "contain",
        }}
      />
    </span>
  );
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "#0c101c",
    color: "#f8fafc",
    padding: "8px 12px",
    fontSize: "12px",
    lineHeight: "1.4",
    outline: "none",
    marginTop: "4px",
    display: "block",
    boxSizing: "border-box",
  };

  return (
    <label style={{ display: "block" }}>
      <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
        {label}
      </span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={{ ...inputStyle, resize: "none" }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={inputStyle}
        />
      )}
    </label>
  );
}

function ControlGroup({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={className} style={{ marginTop: "12px" }}>
      <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", marginTop: 0 }}>
        {label}
      </h2>
      {children}
    </section>
  );
}
