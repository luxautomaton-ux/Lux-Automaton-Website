"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./InfrastructureCostCenter.module.css";
import { supabase } from "@/lib/supabase";

type ExpenseRow = {
  id: string;
  name: string;
  category: string;
  owner: string;
  monthly: number;
  custom?: boolean;
};

type CostCenterState = {
  monthlyBudget: number;
  expenses: ExpenseRow[];
  monthlyRevenue: number;
  transactions: number;
  annualDomainSpend: number;
  r2StorageGb: number;
  streamStoredMinutes: number;
  streamDeliveredMinutes: number;
  aiApiMonthly: number;
  otherToolsMonthly: number;
  macMiniMonthlyAllocation: number;
  includeSupabasePro: boolean;
  includeWorkersPaid: boolean;
  includeChatgptPlus: boolean;
  checklist: Record<string, boolean>;
};

type WebProperty = {
  site_key: string;
  display_name: string;
  repo_full_name: string;
  website_kind: string;
  current_host: string;
  target_host: string;
  backend_strategy: string;
  stage: string;
  monthly_fixed_cost: number | string;
  paid_trigger: string;
  owner: string;
  notes: string;
};

type Service = {
  name: string;
  layer: string;
  now: string;
  launch: string;
  trigger: string;
  owner: string;
  purpose: string;
  where: string;
  source?: string;
};

const STORAGE_KEY = "lux-admin-cost-center-v1";
const PRICING_CHECKED = "October 2, 2026";

const DEFAULT_WEB_PROPERTIES: WebProperty[] = [
  { site_key: "lux-automaton", display_name: "Lux Automaton", repo_full_name: "luxautomaton-ux/Lux-Automaton-Website", website_kind: "Company / admin", current_host: "GitHub Pages", target_host: "Cloudflare Workers Static Assets", backend_strategy: "Shared Lux Supabase production backend", stage: "live-free", monthly_fixed_cost: 0, paid_trigger: "Supabase Pro at customer production; Workers paid only when measured need exists", owner: "Dre + LANA", notes: "Primary company website." },
  { site_key: "lux-agent", display_name: "Lux Agent", repo_full_name: "luxautomaton-ux/lux-agent-website", website_kind: "Product marketing", current_host: "GitHub Pages", target_host: "Cloudflare Workers Static Assets", backend_strategy: "Shared backend for common customer/account services", stage: "live-free", monthly_fixed_cost: 0, paid_trigger: "No paid hosting before production requirement", owner: "Dre + LANA", notes: "Customer-facing Lux Agent website." },
  { site_key: "lux-care-os", display_name: "Lux Care OS", repo_full_name: "luxautomaton-ux/lux-care-os-website", website_kind: "Product marketing", current_host: "GitHub Pages", target_host: "Cloudflare Workers Static Assets", backend_strategy: "Shared marketing services only; clinical/health data stays isolated", stage: "live-free", monthly_fixed_cost: 0, paid_trigger: "No paid hosting before production requirement", owner: "Dre + LANA", notes: "Healthcare data isolation remains mandatory." },
  { site_key: "lux-coder", display_name: "Lux Coder", repo_full_name: "luxautomaton-ux/lux-coder-website", website_kind: "Static product / downloads", current_host: "GitHub Pages", target_host: "Cloudflare Workers Static Assets", backend_strategy: "Static-first; shared backend only for approved account/payment needs", stage: "live-free", monthly_fixed_cost: 0, paid_trigger: "No paid hosting before measured requirement", owner: "Dre + LANA", notes: "Static site with downloads." },
  { site_key: "lux-studio", display_name: "Lux Studio", repo_full_name: "luxautomaton-ux/lux-studio-website", website_kind: "Static product marketing", current_host: "GitHub Pages", target_host: "Cloudflare Workers Static Assets", backend_strategy: "Static-first", stage: "live-free", monthly_fixed_cost: 0, paid_trigger: "No paid hosting before measured requirement", owner: "Dre + LANA", notes: "Keep static and free unless requirements change." },
  { site_key: "lux-store", display_name: "Lux Store", repo_full_name: "luxautomaton-ux/lux-store", website_kind: "Storefront", current_host: "GitHub Pages", target_host: "Cloudflare Workers Static Assets", backend_strategy: "Shared Supabase + Stripe for approved commerce flows", stage: "live-free", monthly_fixed_cost: 0, paid_trigger: "Payment fees only when sales occur; paid infra requires founder approval", owner: "Dre + Tyrone", notes: "Storefront uses the shared Lux cost model." },
];

const DEFAULT_EXPENSES: ExpenseRow[] = [
  { id: "github", name: "GitHub + current Pages hosting", category: "Code / Hosting", owner: "Dre", monthly: 0 },
  { id: "supabase", name: "Supabase", category: "Database / Auth", owner: "Dre + LANA", monthly: 0 },
  { id: "cloudflare", name: "Cloudflare", category: "Hosting / Edge", owner: "Dre", monthly: 0 },
  { id: "domains", name: "Domains / DNS", category: "Domains", owner: "Tyrone", monthly: 0 },
  { id: "chatgpt", name: "ChatGPT / founder AI tooling", category: "AI Tooling", owner: "Asa", monthly: 0 },
  { id: "api", name: "AI model / API usage", category: "AI Compute", owner: "LANA + Tyrone", monthly: 0 },
  { id: "macmini", name: "Mac mini operating allocation", category: "Private Infrastructure", owner: "Dre", monthly: 0 },
  { id: "other", name: "Other Lux subscriptions", category: "SaaS", owner: "Tyrone", monthly: 0 },
];

const DEFAULT_STATE: CostCenterState = {
  monthlyBudget: 100,
  expenses: DEFAULT_EXPENSES,
  monthlyRevenue: 0,
  transactions: 0,
  annualDomainSpend: 0,
  r2StorageGb: 0,
  streamStoredMinutes: 0,
  streamDeliveredMinutes: 0,
  aiApiMonthly: 0,
  otherToolsMonthly: 0,
  macMiniMonthlyAllocation: 0,
  includeSupabasePro: true,
  includeWorkersPaid: false,
  includeChatgptPlus: true,
  checklist: {
    inventory: true,
    github: true,
    supabaseDev: true,
    cloudflare: false,
    dns: false,
    supabasePro: false,
    stripe: false,
    apiRuntime: false,
    backups: false,
  },
};

const SERVICES: Service[] = [
  {
    name: "GitHub",
    layer: "Source control",
    now: "$0 baseline",
    launch: "$0 baseline",
    trigger: "Pay only if a team/enterprise feature becomes necessary.",
    owner: "Dre",
    purpose: "Source of truth for website and Lux application code.",
    where: "GitHub repository → automated deployment pipeline.",
    source: "https://github.com/pricing",
  },
  {
    name: "GitHub Pages",
    layer: "Current website host",
    now: "$0 current host",
    launch: "Move production traffic to Cloudflare",
    trigger: "Production cutover after Cloudflare + domain DNS are ready.",
    owner: "Dre",
    purpose: "Keep the current site available while the production edge is prepared.",
    where: "Current public Lux website deployment.",
  },
  {
    name: "Cloudflare Static Assets",
    layer: "Production web edge",
    now: "$0 while preparing",
    launch: "$0 static requests / bandwidth",
    trigger: "Connect after production deployment test passes.",
    owner: "Dre",
    purpose: "Global website delivery, SSL, caching, DNS, and edge protection.",
    where: "Public Internet layer in front of Lux.",
    source: "https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/",
  },
  {
    name: "Cloudflare Workers",
    layer: "Server-side edge logic",
    now: "Free tier",
    launch: "Free first; $5/mo minimum paid plan if needed",
    trigger: "Use the free Worker tier first for designated server endpoints; upgrade only when limits or production requirements justify it.",
    owner: "Dre + Tyrone",
    purpose: "Run edge functions and server-side logic without hosting a full server.",
    where: "Cloudflare edge.",
    source: "https://developers.cloudflare.com/workers/platform/pricing/",
  },
  {
    name: "Supabase",
    layer: "Production backend",
    now: "Connected; enter actual plan cost in ledger",
    launch: "$25/mo Pro baseline",
    trigger: "Activate Pro when real customer production data goes live.",
    owner: "Dre + LANA",
    purpose: "Shared customer database, auth, storage, and production application data.",
    where: "One shared managed Lux production backend initially.",
    source: "https://supabase.com/pricing",
  },
  {
    name: "Cloudflare R2",
    layer: "Object storage",
    now: "Not required yet",
    launch: "10 GB-mo free; then $0.015/GB-mo standard storage",
    trigger: "Move larger downloads/media when Supabase storage economics or separation justify it.",
    owner: "Dre + Tyrone",
    purpose: "Low-cost files, images, downloads, and media assets with free Internet egress.",
    where: "Cloudflare object storage.",
    source: "https://developers.cloudflare.com/r2/pricing/",
  },
  {
    name: "Cloudflare Stream",
    layer: "Workshop video",
    now: "Not required yet",
    launch: "$5 / 1,000 stored minutes + $1 / 1,000 delivered minutes",
    trigger: "Use for private/paid Lux workshop video.",
    owner: "LANA + Dre",
    purpose: "Video encoding, storage, and delivery without stuffing video into GitHub.",
    where: "Lux Workshops / protected video delivery.",
    source: "https://developers.cloudflare.com/stream/pricing/",
  },
  {
    name: "Stripe",
    layer: "Payments",
    now: "$0 monthly baseline",
    launch: "2.9% + $0.30 per successful domestic card transaction",
    trigger: "Fees occur when Lux gets paid.",
    owner: "Tyrone + Asa",
    purpose: "Customer purchases, subscriptions, and payment processing.",
    where: "Checkout / billing layer.",
    source: "https://stripe.com/pricing",
  },
  {
    name: "GoDaddy / registrar",
    layer: "Domains",
    now: "Annual renewals; enter actual spend privately",
    launch: "Keep registrar unless a transfer is approved",
    trigger: "Renewal dates and any approved domain consolidation.",
    owner: "Tyrone",
    purpose: "Own and renew Lux domain names. Hosting does not need to live here.",
    where: "Registrar; DNS can point to Cloudflare.",
  },
  {
    name: "ChatGPT Plus",
    layer: "Founder tooling",
    now: "Current plan is entered privately",
    launch: "$20/mo planned Plus baseline",
    trigger: "Switch when Asa is ready; API usage remains separate.",
    owner: "Asa",
    purpose: "Founder research, building, analysis, and connected tool workflows.",
    where: "Founder tooling, not customer application hosting.",
    source: "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus",
  },
  {
    name: "Mac mini",
    layer: "Private Lux infrastructure",
    now: "Existing hardware",
    launch: "No cloud hosting fee; track any allocated power/network cost manually",
    trigger: "Scale only if local workload requires more hardware.",
    owner: "Dre + LANA",
    purpose: "Private agents, testing, local models, internal services, and automation.",
    where: "Lux private/local infrastructure.",
  },
];

const SETUP_STEPS = [
  { id: "inventory", title: "Inventory the stack", detail: "Track every recurring or usage-based Lux service before enabling a paid plan." },
  { id: "github", title: "GitHub source is connected", detail: "Keep website and app code versioned in the Lux Automaton repository." },
  { id: "supabaseDev", title: "Supabase development backend is connected", detail: "Keep building/testing without forcing a production upgrade." },
  { id: "cloudflare", title: "Create and connect Cloudflare", detail: "Add Workers Static Assets, DNS, SSL, and edge configuration. Keep the initial tier free." },
  { id: "dns", title: "Point production domain DNS", detail: "GoDaddy can remain the registrar; DNS points the Lux domain to the production host." },
  { id: "supabasePro", title: "Activate Supabase Pro at launch", detail: "Make this a launch gate, not a build-stage expense." },
  { id: "stripe", title: "Verify Stripe live payments", detail: "Confirm live checkout, webhooks, taxes/settings, refunds, and settlement before launch." },
  { id: "apiRuntime", title: "Verify production API runtime", detail: "Static hosting cannot execute the current Next.js /api routes. Route checkout through the Supabase Edge Function and place approved LANA/AI server logic behind a secure Worker or Edge Function without exposing secrets or the Mac mini." },
  { id: "backups", title: "Lock backup + recovery procedure", detail: "Document who restores the website, database, and private Lux services if something fails." },
];

const TEAM = [
  { who: "Asa", role: "Founder approval", job: "Approves new recurring spend, budget changes, production upgrades, and vendor changes." },
  { who: "Torrey", role: "Founder budget visibility", job: "Reviews the monthly operating picture and understands what changed and why." },
  { who: "LANA", role: "Cost Center operator", job: "Maintains the checklist, explains the stack, flags variance, and prepares founder-ready cost summaries." },
  { who: "Dre", role: "Technical owner", job: "Owns hosting, DNS implementation, deployment, backend connectivity, backups, and technical migrations." },
  { who: "Tyrone", role: "Ops + cost control", job: "Reconciles vendor costs, renewal dates, API usage, support burden, and operating-cost changes." },
];

function money(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function safeNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function cloneDefaults(): CostCenterState {
  return {
    ...DEFAULT_STATE,
    expenses: DEFAULT_EXPENSES.map((row) => ({ ...row })),
    checklist: { ...DEFAULT_STATE.checklist },
  };
}

function mergeCostState(base: CostCenterState, saved?: Partial<CostCenterState> | null): CostCenterState {
  if (!saved) return base;
  return {
    ...base,
    ...saved,
    expenses: Array.isArray(saved.expenses) ? saved.expenses : base.expenses,
    checklist: { ...base.checklist, ...(saved.checklist || {}) },
  };
}

export default function InfrastructureCostCenter() {
  const [state, setState] = useState<CostCenterState>(() => {
    const defaults = cloneDefaults();
    if (typeof window === "undefined") return defaults;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      const saved = JSON.parse(raw) as Partial<CostCenterState>;
      return mergeCostState(defaults, saved);
    } catch {
      return defaults;
    }
  });
  const [notice, setNotice] = useState("Private local backup active · connecting Supabase sync…");
  const [remoteReady, setRemoteReady] = useState(false);
  const [webProperties, setWebProperties] = useState<WebProperty[]>(DEFAULT_WEB_PROPERTIES);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(async ({ data: sessionData }) => {
      const userId = sessionData.session?.user.id;
      if (!userId) {
        if (active) {
          setNotice("Private local backup active · sign in to enable Supabase sync.");
          setRemoteReady(true);
        }
        return;
      }

      const { data, error } = await supabase
        .from("lux_cost_center_state")
        .select("state, updated_at")
        .eq("id", "lux-company")
        .maybeSingle();

      if (!active) return;
      if (error) {
        setNotice("Private local backup active · Supabase sync is temporarily unavailable.");
        setRemoteReady(true);
        return;
      }

      if (data?.state && typeof data.state === "object") {
        setState((current) => mergeCostState(current, data.state as Partial<CostCenterState>));
      }
      const { data: fleetData } = await supabase
        .from("lux_web_properties")
        .select("site_key, display_name, repo_full_name, website_kind, current_host, target_host, backend_strategy, stage, monthly_fixed_cost, paid_trigger, owner, notes")
        .order("display_name");
      if (active && Array.isArray(fleetData) && fleetData.length) {
        setWebProperties(fleetData as WebProperty[]);
      }

      setNotice("Private Supabase sync active · local backup also enabled.");
      setRemoteReady(true);
    });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The dashboard still works if browser storage is blocked.
    }

    if (!remoteReady) return;
    const timer = window.setTimeout(() => {
      void supabase.auth.getSession().then(async ({ data: sessionData }) => {
        const userId = sessionData.session?.user.id;
        if (!userId) return;
        await supabase.from("lux_cost_center_state").upsert({
          id: "lux-company",
          state,
          updated_by: userId,
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [remoteReady, state]);

  const webHostingMonthly = useMemo(
    () => webProperties.reduce((sum, site) => sum + Number(site.monthly_fixed_cost || 0), 0),
    [webProperties],
  );

  const currentMonthly = useMemo(
    () => state.expenses.reduce((sum, row) => sum + (Number.isFinite(row.monthly) ? row.monthly : 0), 0),
    [state.expenses],
  );

  const r2StorageCost = useMemo(() => {
    const billableGb = Math.max(0, Math.ceil(state.r2StorageGb - 10));
    return billableGb * 0.015;
  }, [state.r2StorageGb]);

  const streamStorageCost = useMemo(
    () => (state.streamStoredMinutes > 0 ? Math.ceil(state.streamStoredMinutes / 1000) * 5 : 0),
    [state.streamStoredMinutes],
  );

  const streamDeliveryCost = useMemo(
    () => (state.streamDeliveredMinutes / 1000) * 1,
    [state.streamDeliveredMinutes],
  );

  const stripeEstimate = useMemo(
    () => state.monthlyRevenue * 0.029 + state.transactions * 0.3,
    [state.monthlyRevenue, state.transactions],
  );

  const launchFixedInfrastructure =
    (state.includeSupabasePro ? 25 : 0) +
    (state.includeWorkersPaid ? 5 : 0);

  const plannedFounderTooling = state.includeChatgptPlus ? 20 : 0;
  const domainMonthly = state.annualDomainSpend / 12;
  const variableInfrastructure = r2StorageCost + streamStorageCost + streamDeliveryCost;
  const wholeLuxMonthly =
    launchFixedInfrastructure +
    variableInfrastructure +
    stripeEstimate +
    domainMonthly +
    plannedFounderTooling +
    state.aiApiMonthly +
    state.otherToolsMonthly +
    state.macMiniMonthlyAllocation;
  const annualRunRate = wholeLuxMonthly * 12;
  const budgetPct = state.monthlyBudget > 0 ? (wholeLuxMonthly / state.monthlyBudget) * 100 : 0;
  const infraPctRevenue = state.monthlyRevenue > 0 ? (wholeLuxMonthly / state.monthlyRevenue) * 100 : 0;
  const remainingAfterTracked = state.monthlyRevenue - wholeLuxMonthly;
  const setupComplete = SETUP_STEPS.filter((step) => state.checklist[step.id]).length;
  const budgetStatus = budgetPct < 80 ? "green" : budgetPct <= 100 ? "amber" : "red";

  const updateExpense = (id: string, patch: Partial<ExpenseRow>) => {
    setState((current) => ({
      ...current,
      expenses: current.expenses.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    }));
  };

  const addExpense = () => {
    const id = "custom-" + Date.now();
    setState((current) => ({
      ...current,
      expenses: [
        ...current.expenses,
        { id, name: "New Lux expense", category: "Other", owner: "Tyrone", monthly: 0, custom: true },
      ],
    }));
  };

  const removeExpense = (id: string) => {
    setState((current) => ({ ...current, expenses: current.expenses.filter((row) => row.id !== id) }));
  };

  const toggleChecklist = (id: string) => {
    setState((current) => ({
      ...current,
      checklist: { ...current.checklist, [id]: !current.checklist[id] },
    }));
  };

  const reset = () => {
    if (!window.confirm("Reset the private Lux cost snapshot to defaults?")) return;
    setState(cloneDefaults());
    setNotice("Cost Center reset to clean defaults.");
  };

  const exportSnapshot = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      pricingChecked: PRICING_CHECKED,
      version: 1,
      state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "lux-cost-center-" + new Date().toISOString().slice(0, 10) + ".json";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Private Lux cost snapshot exported.");
  };

  const importSnapshot = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as { state?: Partial<CostCenterState> };
      if (!parsed.state) throw new Error("Missing state");
      setState((current) => ({
        ...current,
        ...parsed.state,
        expenses: Array.isArray(parsed.state?.expenses) ? parsed.state.expenses : current.expenses,
        checklist: { ...current.checklist, ...(parsed.state?.checklist || {}) },
      }));
      setNotice("Private Lux cost snapshot imported.");
    } catch {
      setNotice("That file is not a valid Lux Cost Center snapshot.");
    } finally {
      event.target.value = "";
    }
  };

  const setNumeric = (key: keyof CostCenterState, value: string) => {
    setState((current) => ({ ...current, [key]: safeNumber(value) }));
  };

  return (
    <section className={styles.shell}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>FOUNDER FINANCE + INFRASTRUCTURE</p>
          <h1>Lux Cost & Infrastructure Center</h1>
          <span>
            One place to answer: What runs Lux, who owns it, what are we paying now, what will launch cost,
            and when should we approve the next paid service?
          </span>
        </div>
        <div className={styles.heroBadge}>
          <strong>LANA READY</strong>
          <small>Pricing checked {PRICING_CHECKED}</small>
        </div>
      </header>

      <div className={styles.privacyBar}>
        <div>
          <b>🔒 {notice}</b>
          <span>Source code contains public pricing only. Actual Lux bills are not committed to GitHub.</span>
        </div>
        <div className={styles.actionRow}>
          <button type="button" onClick={exportSnapshot}>Export snapshot</button>
          <button type="button" onClick={() => importRef.current?.click()}>Import snapshot</button>
          <button type="button" onClick={reset}>Reset</button>
          <input ref={importRef} type="file" accept="application/json" onChange={importSnapshot} hidden />
        </div>
      </div>

      <div className={styles.metricGrid}>
        <article>
          <span>Tracked right now</span>
          <strong>{money(currentMonthly)}</strong>
          <small>Monthly equivalent from your private ledger</small>
        </article>
        <article>
          <span>Launch core infrastructure</span>
          <strong>{money(launchFixedInfrastructure)}</strong>
          <small>Supabase Pro + optional Workers paid</small>
        </article>
        <article>
          <span>Projected whole Lux / month</span>
          <strong>{money(wholeLuxMonthly)}</strong>
          <small>Hosting + tooling + usage assumptions below</small>
        </article>
        <article>
          <span>Projected annual run rate</span>
          <strong>{money(annualRunRate)}</strong>
          <small>12 × projected monthly operating estimate</small>
        </article>
      </div>

      <div className={styles.statusGrid}>
        <article className={styles.budgetCard}>
          <div className={styles.sectionHeading}>
            <div><p>Cost guardrail</p><h2>Monthly Lux budget</h2></div>
            <strong className={styles[budgetStatus]}>{Math.round(budgetPct)}%</strong>
          </div>
          <label className={styles.field}>
            <span>Monthly operating budget</span>
            <div className={styles.moneyInput}><b>$</b><input value={state.monthlyBudget} type="number" min="0" onChange={(e) => setNumeric("monthlyBudget", e.target.value)} /></div>
          </label>
          <div className={styles.progressTrack}><span style={{ width: Math.min(100, budgetPct) + "%" }} className={styles[budgetStatus]} /></div>
          <small>LANA flags 80% as watch, 100% as budget limit, and anything above 100% as founder review required.</small>
        </article>

        <article className={styles.flowCard}>
          <p>Shared Lux architecture</p>
          <div className={styles.flow}>
            <span>GitHub<br /><small>source</small></span><b>→</b>
            <span>Cloudflare<br /><small>web edge</small></span><b>→</b>
            <span>Supabase<br /><small>production brain</small></span><b>→</b>
            <span>R2 / Stream<br /><small>media</small></span>
          </div>
          <div className={styles.flowSub}>Mac mini = private LANA, agents, local models, testing, automation, and internal services. Static assets do not execute the current Next.js /api handlers; production server routes must use an approved Supabase Edge Function or Cloudflare Worker boundary.</div>
        </article>
      </div>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div><p>Zero-dollar web fleet</p><h2>{webProperties.length} Lux sites · {money(webHostingMonthly)} monthly hosting</h2></div>
          <span className={styles.setupCount}>VERIFIED FREE</span>
        </div>
        <p className={styles.helper}>All listed sites are currently on GitHub Pages at no new monthly hosting cost. Cloudflare Workers Static Assets is the prepared target when domain cutover is ready; no Hostinger subscription is required.</p>
        <div className={styles.serviceGrid}>
          {webProperties.map((site) => (
            <article key={site.site_key}>
              <div className={styles.serviceTop}>
                <div><b>{site.display_name}</b><span>{site.website_kind}</span></div>
                <strong>{money(Number(site.monthly_fixed_cost || 0))}/mo</strong>
              </div>
              <dl>
                <div><dt>Now</dt><dd>{site.current_host} · {site.stage}</dd></div>
                <div><dt>Next</dt><dd>{site.target_host}</dd></div>
                <div><dt>Backend</dt><dd>{site.backend_strategy}</dd></div>
                <div><dt>Trigger</dt><dd>{site.paid_trigger}</dd></div>
                <div><dt>Owner</dt><dd>{site.owner}</dd></div>
              </dl>
              <a href={"https://github.com/" + site.repo_full_name} target="_blank" rel="noreferrer">Open repository ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div><p>Bootstrap cost ladder</p><h2>Spend only after value is proven</h2></div>
          <span className={styles.lockedBadge}>ZERO SALES = ZERO NEW INFRA SPEND</span>
        </div>
        <div className={styles.metricGrid}>
          <article><span>Stage 0 · Build + zero sales</span><strong>$0</strong><small>Six free-hosted sites + Supabase Free + Mac mini you already own.</small></article>
          <article><span>Stage 1 · Customer production</span><strong>$25</strong><small>Supabase Pro becomes the first planned infrastructure gate.</small></article>
          <article><span>Stage 2 · + founder Plus</span><strong>$45</strong><small>Supabase Pro + ChatGPT Plus if Plus is counted as a Lux operating tool.</small></article>
          <article><span>Stage 3 · + paid Workers</span><strong>$50</strong><small>Only if Workers Free is no longer enough. Variable usage remains separate.</small></article>
        </div>
      </section>

      <div className={styles.twoColumn}>
        <section className={styles.panel}>
          <div className={styles.sectionHeading}>
            <div><p>What are we paying now?</p><h2>Current spend ledger</h2></div>
            <button type="button" className={styles.primaryButton} onClick={addExpense}>+ Add expense</button>
          </div>
          <p className={styles.helper}>Enter the real monthly amount from invoices or convert annual charges to a monthly equivalent. Signed-in admin changes sync privately to Supabase and keep a local browser backup.</p>
          <div className={styles.expenseTable}>
            <div className={styles.expenseHeader}><span>Service</span><span>Owner</span><span>Monthly</span><span /></div>
            {state.expenses.map((row) => (
              <div className={styles.expenseRow} key={row.id}>
                <div>
                  {row.custom ? (
                    <input className={styles.textInput} value={row.name} onChange={(e) => updateExpense(row.id, { name: e.target.value })} />
                  ) : <b>{row.name}</b>}
                  <small>{row.category}</small>
                </div>
                <span>{row.owner}</span>
                <div className={styles.inlineMoney}><b>$</b><input type="number" min="0" step="0.01" value={row.monthly} onChange={(e) => updateExpense(row.id, { monthly: safeNumber(e.target.value) })} /></div>
                <div>{row.custom && <button type="button" className={styles.deleteButton} onClick={() => removeExpense(row.id)} aria-label={"Remove " + row.name}>×</button>}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.sectionHeading}>
            <div><p>What will launch cost?</p><h2>Scenario switches</h2></div>
          </div>
          <div className={styles.switchList}>
            <label>
              <input type="checkbox" checked={state.includeSupabasePro} onChange={(e) => setState((current) => ({ ...current, includeSupabasePro: e.target.checked }))} />
              <span><b>Supabase Pro</b><small>$25/mo production baseline</small></span>
            </label>
            <label>
              <input type="checkbox" checked={state.includeWorkersPaid} onChange={(e) => setState((current) => ({ ...current, includeWorkersPaid: e.target.checked }))} />
              <span><b>Cloudflare Workers Paid</b><small>$5/mo minimum; leave off until needed</small></span>
            </label>
            <label>
              <input type="checkbox" checked={state.includeChatgptPlus} onChange={(e) => setState((current) => ({ ...current, includeChatgptPlus: e.target.checked }))} />
              <span><b>ChatGPT Plus founder tooling</b><small>$20/mo planned downgrade baseline; API separate</small></span>
            </label>
          </div>
          <div className={styles.scenarioSummary}>
            <div><span>Build stage</span><b>$0 new cloud baseline</b></div>
            <div><span>Production backend</span><b>{money(state.includeSupabasePro ? 25 : 0)}</b></div>
            <div><span>Optional edge functions</span><b>{money(state.includeWorkersPaid ? 5 : 0)}</b></div>
            <div><span>Founder tooling</span><b>{money(plannedFounderTooling)}</b></div>
          </div>
        </section>
      </div>

      <section className={styles.calculator}>
        <div className={styles.sectionHeading}>
          <div><p>Live calculator</p><h2>What happens when Lux grows?</h2></div>
          <span className={styles.calculatorBadge}>ESTIMATE · NOT ACCOUNTING/TAX ADVICE</span>
        </div>
        <div className={styles.calcGrid}>
          <label className={styles.field}><span>Monthly customer revenue</span><div className={styles.moneyInput}><b>$</b><input type="number" min="0" value={state.monthlyRevenue} onChange={(e) => setNumeric("monthlyRevenue", e.target.value)} /></div></label>
          <label className={styles.field}><span>Successful domestic card transactions</span><input type="number" min="0" value={state.transactions} onChange={(e) => setNumeric("transactions", e.target.value)} /></label>
          <label className={styles.field}><span>Annual domain spend</span><div className={styles.moneyInput}><b>$</b><input type="number" min="0" value={state.annualDomainSpend} onChange={(e) => setNumeric("annualDomainSpend", e.target.value)} /></div></label>
          <label className={styles.field}><span>R2 storage (GB-month)</span><input type="number" min="0" value={state.r2StorageGb} onChange={(e) => setNumeric("r2StorageGb", e.target.value)} /></label>
          <label className={styles.field}><span>Stream video stored (minutes)</span><input type="number" min="0" value={state.streamStoredMinutes} onChange={(e) => setNumeric("streamStoredMinutes", e.target.value)} /></label>
          <label className={styles.field}><span>Stream video delivered (minutes)</span><input type="number" min="0" value={state.streamDeliveredMinutes} onChange={(e) => setNumeric("streamDeliveredMinutes", e.target.value)} /></label>
          <label className={styles.field}><span>AI/API usage per month</span><div className={styles.moneyInput}><b>$</b><input type="number" min="0" value={state.aiApiMonthly} onChange={(e) => setNumeric("aiApiMonthly", e.target.value)} /></div></label>
          <label className={styles.field}><span>Other Lux SaaS tools per month</span><div className={styles.moneyInput}><b>$</b><input type="number" min="0" value={state.otherToolsMonthly} onChange={(e) => setNumeric("otherToolsMonthly", e.target.value)} /></div></label>
          <label className={styles.field}><span>Mac mini power/network allocation</span><div className={styles.moneyInput}><b>$</b><input type="number" min="0" value={state.macMiniMonthlyAllocation} onChange={(e) => setNumeric("macMiniMonthlyAllocation", e.target.value)} /></div></label>
        </div>

        <div className={styles.calcResults}>
          <article><span>Core fixed infra</span><strong>{money(launchFixedInfrastructure)}</strong><small>Supabase + Workers switch</small></article>
          <article><span>R2 + Stream estimate</span><strong>{money(variableInfrastructure)}</strong><small>Usage-based media</small></article>
          <article><span>Stripe estimate</span><strong>{money(stripeEstimate)}</strong><small>Domestic card assumption</small></article>
          <article><span>Domains / month</span><strong>{money(domainMonthly)}</strong><small>Annual spend ÷ 12</small></article>
          <article><span>Whole Lux estimate</span><strong>{money(wholeLuxMonthly)}</strong><small>All selected operating inputs</small></article>
          <article><span>After tracked costs</span><strong>{money(remainingAfterTracked)}</strong><small>Revenue minus this operating estimate</small></article>
        </div>

        <div className={styles.ratioLine}>
          <span>Tracked operating estimate as % of revenue: <b>{state.monthlyRevenue > 0 ? infraPctRevenue.toFixed(1) + "%" : "—"}</b></span>
          <span>R2 estimate: <b>{money(r2StorageCost)}</b></span>
          <span>Stream storage: <b>{money(streamStorageCost)}</b></span>
          <span>Stream delivery: <b>{money(streamDeliveryCost)}</b></span>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div><p>Who / What / When / Why / Where / How</p><h2>5W + H = Success</h2></div>
        </div>
        <div className={styles.sixGrid}>
          <article><b>WHO</b><h3>Asa + Torrey + LANA + Dre + Tyrone</h3><p>Founders see the money; LANA operates the system; Dre owns technical delivery; Tyrone owns cost/ops reconciliation.</p></article>
          <article><b>WHAT</b><h3>One shared Lux foundation</h3><p>Source control, web edge, production backend, payments, media, and private local infrastructure—without buying a separate stack for every app.</p></article>
          <article><b>WHEN</b><h3>Free while building; pay at triggers</h3><p>Supabase Pro at customer launch. Workers, R2, and Stream only when production needs or measured usage justify them.</p></article>
          <article><b>WHY</b><h3>Keep fixed costs low</h3><p>Spend follows revenue and usage while Lux keeps ownership, security, backups, and a clear migration path.</p></article>
          <article><b>WHERE</b><h3>Right workload, right home</h3><p>GitHub for code, Cloudflare for public edge, Supabase for customer data, Stripe for payments, Mac mini for private Lux operations.</p></article>
          <article><b>HOW</b><h3>Versioned + monitored + approved</h3><p>Every change follows a deployment path, every paid service enters this ledger, and no recurring spend is activated without founder approval.</p></article>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div><p>Simple instructions</p><h2>Production setup checklist</h2></div>
          <strong className={styles.setupCount}>{setupComplete}/{SETUP_STEPS.length} complete</strong>
        </div>
        <div className={styles.checklist}>
          {SETUP_STEPS.map((step, index) => (
            <label key={step.id} className={state.checklist[step.id] ? styles.done : ""}>
              <input type="checkbox" checked={Boolean(state.checklist[step.id])} onChange={() => toggleChecklist(step.id)} />
              <span className={styles.stepNumber}>{index + 1}</span>
              <span><b>{step.title}</b><small>{step.detail}</small></span>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div><p>LANA operating playbook</p><h2>Cost-control rules</h2></div>
          <span className={styles.lockedBadge}>FOUNDER APPROVAL GATE</span>
        </div>
        <div className={styles.rules}>
          <article><b>01</b><span><strong>Free-first by default.</strong> Build and test on free tiers until a documented launch, reliability, compliance, or usage trigger requires payment.</span></article>
          <article><b>02</b><span><strong>No silent upgrades.</strong> LANA can recommend a paid plan, but Asa approves every new recurring vendor charge before activation.</span></article>
          <article><b>03</b><span><strong>One shared backend first.</strong> Do not buy a separate Supabase project for every Lux app unless isolation, compliance, or scale requires it.</span></article>
          <article><b>04</b><span><strong>Reconcile monthly.</strong> Tyrone updates invoices/renewals; LANA explains changes against budget and identifies avoidable spend.</span></article>
          <article><b>05</b><span><strong>Watch the thresholds.</strong> At 80% of budget LANA warns the founders; at 100% she stops optional expansion and requests review.</span></article>
          <article><b>06</b><span><strong>Keep the knowledge outside ChatGPT.</strong> The operating rules live in this admin area and the repository so the team can continue them on any ChatGPT plan.</span></article>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div><p>Accountability</p><h2>Who takes care of what?</h2></div>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <article key={member.who}><span>{member.who.slice(0, 1)}</span><div><b>{member.who}</b><small>{member.role}</small><p>{member.job}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}>
          <div><p>Infrastructure catalog</p><h2>Every service has a job and a trigger</h2></div>
        </div>
        <div className={styles.serviceGrid}>
          {SERVICES.map((service) => (
            <article key={service.name}>
              <div className={styles.serviceTop}><div><b>{service.name}</b><span>{service.layer}</span></div><strong>{service.owner}</strong></div>
              <dl>
                <div><dt>Now</dt><dd>{service.now}</dd></div>
                <div><dt>Launch</dt><dd>{service.launch}</dd></div>
                <div><dt>When</dt><dd>{service.trigger}</dd></div>
                <div><dt>Why</dt><dd>{service.purpose}</dd></div>
                <div><dt>Where</dt><dd>{service.where}</dd></div>
              </dl>
              {service.source && <a href={service.source} target="_blank" rel="noreferrer">Official pricing / docs ↗</a>}
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footerNote}>
        <b>LANA NOTE:</b> Never treat estimates as invoices. Reconcile actual vendor statements, keep secrets out of source control,
        and record a reason + owner before any paid upgrade.
      </footer>
    </section>
  );
}
