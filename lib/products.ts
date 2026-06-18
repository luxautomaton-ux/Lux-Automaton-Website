// ============================================================
// LUX AUTOMATON — Central Product Catalog
// Source of truth for all 6 ecosystem products + pricing tiers.
// ============================================================

export type BillingInterval = "month" | "year";

export interface Price {
  id: string;
  amount: number; // in cents
  interval: BillingInterval;
  nickname: string;
}

export interface FiveWH {
  who: { headline: string; body: string };
  what: { headline: string; body: string };
  when: { headline: string; body: string };
  where: { headline: string; body: string };
  why: { headline: string; body: string };
  how: { headline: string; body: string };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  status: "live" | "beta" | "coming-soon";
  accentColor: string;
  features: string[];
  prices: Price[];
  ctaLabel: string;
  ctaHref: string;         // external or checkout link
  pageHref: string;        // internal detail page
  logoImage?: string;
  heroImage?: string;
  bgImage?: string;
  fiveWH: FiveWH;
}

export const PRODUCTS: Product[] = [
  // ── LUX AGENT USB ────────────────────────────────────
  {
    id: "lux-agent-usb",
    slug: "lux-agent-usb",
    name: "Lux Agent USB",
    tagline: "Portable AI Business OS",
    description:
      "Your entire AI business operating system on a USB drive. Plug in anywhere and run Lux Agent, manage leads, execute content workflows, CRM, and delivery — fully offline or hybrid.",
    icon: "💾",
    status: "coming-soon",
    accentColor: "var(--cyan)",
    features: [
      "Full AI OS on portable USB hardware",
      "Lead capture & CRM pipeline",
      "Content workflows & delivery",
      "Works offline — your data stays local",
      "Connect to cloud when needed",
      "Lux Agent pre-installed & ready",
    ],
    prices: [],
    ctaLabel: "Join Waitlist",
    ctaHref: "/contact",
    pageHref: "/products/lux-agent-usb",
    bgImage: "/images/lux-agent-usb.jpeg",
    fiveWH: {
      who: {
        headline: "Built for Builders on the Move",
        body: "Entrepreneurs, field sales reps, remote operators, small business owners, and anyone who needs their full business system available anywhere — without depending on cloud access or public Wi-Fi.",
      },
      what: {
        headline: "Your Entire Business OS on a Drive",
        body: "Lux Agent USB is a pre-configured AI business operating system loaded onto a portable USB drive. It includes Lux Agent, your CRM pipeline, content workflows, SOPs, and automation templates — all self-contained and ready to run from any compatible machine.",
      },
      when: {
        headline: "Whenever You Need to Work Without Limits",
        body: "On the road between client meetings. At a job site with no internet. In a coffee shop, a co-working space, or a hotel room. Lux Agent USB turns any computer into your fully equipped business command center — the moment you plug it in.",
      },
      where: {
        headline: "Any Windows or Mac Computer, Anywhere",
        body: "No installation required. No cloud login. Plug the drive into any compatible computer and your entire AI business system launches instantly. Works at home, at your office, at client sites, or anywhere in the world.",
      },
      why: {
        headline: "Because Your Business Shouldn't Be Locked to One Machine",
        body: "Cloud dependency is a liability. Subscription fatigue is real. With Lux Agent USB, your data stays private, your system stays with you, and your business keeps running even when internet access is unreliable. Own your infrastructure.",
      },
      how: {
        headline: "Plug In. Launch. Execute.",
        body: "Insert the USB drive into any compatible computer. Lux Agent boots from the drive — no installation, no setup. Access your full CRM, run content workflows, execute SOPs, and manage your business using natural language commands. When you're done, remove the drive. Nothing left behind.",
      },
    },
  },

  // ── LUX CODER ────────────────────────────────────────
  {
    id: "lux-coder",
    slug: "lux-coder",
    name: "Lux Coder",
    tagline: "Premium AI Coding Suite",
    description:
      "An AI coding command center inside VS Code. Multi-model support, saved sessions, local memory wiki, specialist sub-agents, diff review, and branded PDF exports. Code faster. Build smarter. Ship everything.",
    icon: "</> ",
    status: "live",
    accentColor: "var(--blue-bright)",
    features: [
      "AI coding command center in VS Code",
      "Multi-model support + BYOK",
      "Saved sessions & local memory wiki",
      "Specialist sub-agents + diff review",
      "Branded PDF / screenshot exports",
      "Deep Lux Agent integration",
    ],
    prices: [],
    ctaLabel: "Visit Lux Coder →",
    ctaHref: "https://luxautomaton-ux.github.io/lux-coder-website",
    pageHref: "/products/lux-coder",
    heroImage: "/images/lux-coder-card.png",
    bgImage: "/images/lux-coder-hero.png",
    fiveWH: {
      who: {
        headline: "For Developers Who Refuse to Slow Down",
        body: "Software developers, technical founders, indie hackers, and engineering teams who want AI-assisted coding without giving up control of their environment. Built for people who build things.",
      },
      what: {
        headline: "An AI Coding Command Center Inside VS Code",
        body: "Lux Coder is a VS Code extension that brings multi-model AI, persistent memory, specialist sub-agents, diff review, and branded export capabilities directly into your coding environment. It's not just autocomplete — it's a full AI development partner.",
      },
      when: {
        headline: "During Every Phase of Development",
        body: "From initial architecture planning to line-by-line code review. When you're stuck on a bug at midnight. When you need to onboard a new pattern quickly. When you're shipping fast and need AI to keep pace. Lux Coder is always-on and always in context.",
      },
      where: {
        headline: "Right Inside VS Code — Where You Already Work",
        body: "No context-switching. No copying code to a chat window. Lux Coder lives inside your existing development environment. Your models, your memory, your workflow — enhanced by AI without leaving the editor.",
      },
      why: {
        headline: "Because Generic AI Tools Don't Know Your Codebase",
        body: "Off-the-shelf AI assistants forget everything between sessions. Lux Coder maintains a local memory wiki of your project, learns your patterns, and uses specialist sub-agents trained for specific coding tasks. It gets smarter as you build.",
      },
      how: {
        headline: "Install. Connect. Build Faster.",
        body: "Install the Lux Coder extension in VS Code. Connect your preferred AI model API keys (BYOK). Your memory wiki auto-populates as you work. Use the command panel to ask questions, review diffs, generate code, export documentation, or call in specialist sub-agents for targeted help.",
      },
    },
  },

  // ── LUX AGENT ────────────────────────────────────────
  {
    id: "lux-agent",
    slug: "lux-agent",
    name: "Lux Agent",
    tagline: "Your Personal AI Assistant",
    description:
      "A private AI agent that runs your workflows, answers business queries, and automates repetitive operations — all within your own secure environment. Ask, plan, guide, execute.",
    icon: "🤖",
    status: "live",
    accentColor: "var(--green)",
    features: [
      "Custom workflow automation",
      "Natural language task execution",
      "Secure private deployment",
      "Connect to your existing tools",
      "Memory & context retention",
      "Multi-agent orchestration",
    ],
    prices: [],
    ctaLabel: "Visit Lux Agent →",
    ctaHref: "https://luxautomaton-ux.github.io/lux-agent-website",
    pageHref: "/products/lux-agent",
    logoImage: "/images/lux-agent-hero.png",
    bgImage: "/images/lux-agent-hero.png",
    fiveWH: {
      who: {
        headline: "Built for Business Owners Who Are Done Doing It All Manually",
        body: "Solopreneurs, founders, small business operators, consultants, and growing teams who need an intelligent assistant that understands their business — not just answers general questions. If you're handling too much alone, Lux Agent is your force multiplier.",
      },
      what: {
        headline: "A Private AI Agent That Runs Your Business Operations",
        body: "Lux Agent is a fully private, self-hosted AI assistant that executes workflows, automates repetitive tasks, handles communication drafts, manages SOPs, and connects to your existing business tools — all through natural language conversation.",
      },
      when: {
        headline: "Every Single Day — For Every Operational Task",
        body: "Monday morning planning. Client follow-up drafts. Lead outreach. Content creation. Report generation. Scheduling. Research. Lux Agent is your daily operating partner — available 24/7, never tired, never forgetful.",
      },
      where: {
        headline: "In Your Private Environment — Not Someone Else's Server",
        body: "Lux Agent runs in your own secure deployment. Your business data never leaves your infrastructure. Accessible from your browser, your desktop, or your team's shared workspace — with zero exposure to third-party data harvesting.",
      },
      why: {
        headline: "Because Every Hour You Spend on Repetitive Work Is an Hour Lost",
        body: "Automation isn't just about speed — it's about leverage. Lux Agent handles the execution layer of your business so you can focus on strategy, relationships, and growth. Private deployment means your competitive data stays competitive.",
      },
      how: {
        headline: "Deploy Once. Automate Everything.",
        body: "Access your Lux Agent dashboard and connect your business tools — email, CRM, calendar, content systems. Define your workflows using simple natural language. Lux Agent executes tasks on command, retains context between sessions, and escalates when human judgment is needed.",
      },
    },
  },

  // ── LANA ─────────────────────────────────────────────
  {
    id: "lana",
    slug: "lana",
    name: "LANA",
    tagline: "The AI Operator & Soul of Lux Automaton",
    description:
      "LANA is the intelligent AI assistant and operator inside Lux Automaton, helping users plan, build, organize, automate, follow up, and execute work across the ecosystem.",
    icon: "💜",
    status: "live",
    accentColor: "var(--cyan)",
    features: [
      "Understands the Lux Automaton ecosystem",
      "Works with Success Packs",
      "Supports Lux Agent USB",
      "Helps guide Lux Coder builds",
      "Remembers workflows and operating rules",
      "Helps the user take action",
    ],
    prices: [],
    ctaLabel: "Meet LANA",
    ctaHref: "/products/lana",
    pageHref: "/products/lana",
    bgImage: "/images/lana.png",
    fiveWH: {
      who: {
        headline: "For Builders, Founders, and Small Business Owners",
        body: "LANA is built for people who have ideas, responsibilities, and work to move forward — especially users who are talented but overloaded.",
      },
      what: {
        headline: "The Intelligent AI Operator & Soul of the Ecosystem",
        body: "LANA connects the human side of the business with the technical side of the system, helping users think, plan, organize, build, follow up, and execute.",
      },
      when: {
        headline: "Continuous — From Idea to Daily Execution",
        body: "LANA helps guide daily tasks, plan builds, draft customer outreach, run Success Packs, and keep the founder organized throughout the work day.",
      },
      where: {
        headline: "Embedded Across Every Product and Solution Page",
        body: "LANA is the connective tissue of Lux Automaton, supporting you in VS Code, on your phone with Lux Agent USB, and inside custom operating systems.",
      },
      why: {
        headline: "Because Founders Don't Need Another Blank Chat Box",
        body: "Most AI tools wait for you to know exactly what to ask. LANA is proactive, structured, business-aware, and remembers your system context.",
      },
      how: {
        headline: "Speaks in Business Systems, Guided by Care",
        body: "LANA reads your operating rules, follows your business recipes (Success Packs), and helps you take action instead of just giving generic answers.",
      },
    },
  },

  // ── LUX WRITEOFF ────────────────────────────────────
  {
    id: "luxwriteoff-professional",
    slug: "luxwriteoff",
    name: "Lux WriteOff",
    tagline: "AI Expense Intelligence",
    description:
      "Maximize deductions. Automate tax write-offs. AI-powered expense tracking and tax write-off automation for independent professionals. Capture, categorize, and maximize every deduction automatically.",
    icon: "💰",
    status: "live",
    accentColor: "var(--orange)",
    features: [
      "Auto-categorize expenses with AI",
      "Tax write-off maximization engine",
      "Receipt scanning & OCR",
      "Real-time deduction dashboard",
      "Export-ready reports",
      "Bank sync & reconciliation",
    ],
    prices: [
      {
        id: "price_professional_monthly",
        amount: 3900,
        interval: "month",
        nickname: "Professional Monthly",
      },
      {
        id: "price_professional_annual",
        amount: 39000,
        interval: "year",
        nickname: "Professional Annual",
      },
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "/pricing",
    pageHref: "/products/luxwriteoff",
    logoImage: "/images/luxwriteoff-logo.png",
    bgImage: "/images/lux-write-off.jpg",
    fiveWH: {
      who: {
        headline: "For Every Self-Employed Professional Leaving Money on the Table",
        body: "Freelancers, independent contractors, consultants, creators, real estate agents, coaches, and any 1099 professional who is tired of missing write-offs at tax time. If you earn income outside a W-2, Lux WriteOff was built for you.",
      },
      what: {
        headline: "AI-Powered Tax Write-Off Automation",
        body: "Lux WriteOff automatically tracks your business expenses, categorizes them using AI, identifies every eligible tax deduction, and generates export-ready reports for your accountant or filing. It turns receipts into savings — automatically.",
      },
      when: {
        headline: "Year-Round — Not Just at Tax Season",
        body: "The biggest mistake self-employed professionals make is waiting until April to think about deductions. Lux WriteOff runs continuously, capturing expenses as they happen so nothing slips through. By tax time, your work is already done.",
      },
      where: {
        headline: "Web App, Mobile Receipt Scanning, and Bank Sync",
        body: "Access your deduction dashboard from any browser. Scan receipts on the go with your phone. Connect your bank accounts and credit cards for automatic import. Lux WriteOff works wherever you spend money — which is everywhere.",
      },
      why: {
        headline: "The Average Freelancer Misses $4,000+ in Deductions Every Year",
        body: "Manual expense tracking is slow, inconsistent, and incomplete. AI categorization finds patterns and deductions that humans miss. Lux WriteOff doesn't just track — it maximizes. Every eligible expense captured means real money back in your pocket.",
      },
      how: {
        headline: "Connect. Scan. Save.",
        body: "Connect your bank accounts and cards for automatic expense import. Snap photos of receipts with the mobile scanner. AI categorizes each expense, flags write-off opportunities, and builds your deduction report in real time. At tax time, export one clean report — and hand it to your accountant or file directly.",
      },
    },
  },

  // ── LUX BUDGETER ─────────────────────────────────────
  {
    id: "lux-budgeter",
    slug: "lux-budgeter",
    name: "Lux Budgeter",
    tagline: "Smart Business Budgeting",
    description:
      "Budget smarter. See cash flow. Stay in control. Track income and expenses, forecast and plan, and improve cash flow visibility — all connected to the Lux Automaton ecosystem.",
    icon: "📊",
    status: "coming-soon",
    accentColor: "var(--electric)",
    features: [
      "Income & expense tracking",
      "Cash flow forecasting",
      "Budget planning dashboards",
      "Connected to Lux WriteOff",
      "Business health snapshots",
      "Export-ready financial reports",
    ],
    prices: [],
    ctaLabel: "Join Waitlist",
    ctaHref: "/contact",
    pageHref: "/products/lux-budgeter",
    bgImage: "/images/lux-budgeter-hero.jpg",
    fiveWH: {
      who: {
        headline: "For Small Business Owners Flying Blind on Cash Flow",
        body: "Entrepreneurs, service providers, product businesses, and growing teams who know money is coming in and going out — but don't have clear visibility into where it's going or what's coming next. If you've ever been surprised by a slow month, this is for you.",
      },
      what: {
        headline: "A Smart Business Budgeting & Cash Flow Intelligence Tool",
        body: "Lux Budgeter tracks your income and expenses, forecasts future cash flow based on your patterns, and gives you a real-time dashboard of your business financial health. Connected to Lux WriteOff for full financial ecosystem visibility.",
      },
      when: {
        headline: "Monthly Planning, Quarterly Reviews, and Every Financial Decision",
        body: "Before you hire. Before you invest. Before you commit to a new expense. Lux Budgeter gives you the financial clarity to make decisions with confidence — not guesswork. Use it in your monthly planning sessions and leave every review knowing exactly where you stand.",
      },
      where: {
        headline: "Web Dashboard — Connected to Your Full Lux Ecosystem",
        body: "Access your budget dashboard from any browser. Lux Budgeter pulls data from Lux WriteOff for seamless expense visibility, giving you a complete picture of your business finances in one connected platform.",
      },
      why: {
        headline: "Because Most Businesses Fail from Cash Flow Problems — Not Bad Ideas",
        body: "A profitable business can still run out of cash. Lux Budgeter gives you the forecasting tools to see problems before they hit — and the planning framework to fix them. Stop reacting to your finances and start leading them.",
      },
      how: {
        headline: "Set Up. See Clearly. Stay in Control.",
        body: "Connect your Lux WriteOff account for instant expense data. Input your revenue streams and recurring costs. Lux Budgeter builds your cash flow forecast automatically and alerts you to budget variances, upcoming shortfalls, and financial milestones — all in a clean dashboard built for non-accountants.",
      },
    },
  },

  // ── SUCCESS PACKS ─────────────────────────────────────
  {
    id: "success-packs",
    slug: "success-packs",
    name: "Success Packs",
    tagline: "Done-For-You Business Systems",
    description:
      "Ready-made workflows and playbooks. Business recipes, SOPs, templates, and repeatable systems — pre-built so you can get results faster without starting from scratch.",
    icon: "📦",
    status: "live",
    accentColor: "var(--cyan)",
    features: [
      "Done-for-you business playbooks",
      "Repeatable SOP templates",
      "Industry-specific workflow systems",
      "Client delivery frameworks",
      "CRM & pipeline recipes",
      "Lux Agent-ready integrations",
    ],
    prices: [
      {
        id: "price_success_pack_single",
        amount: 9700,
        interval: "month",
        nickname: "Single Pack",
      },
    ],
    ctaLabel: "Browse Packs",
    ctaHref: "/pricing",
    pageHref: "/products/success-packs",
    bgImage: "/images/restaurant-success-pack.png",
    fiveWH: {
      who: {
        headline: "For Business Owners Who Need Results Now — Not in 6 Months",
        body: "New entrepreneurs who need a system fast. Established business owners tired of reinventing the wheel. Restaurant owners, contractors, consultants, coaches, service businesses, and operators in any industry who want proven playbooks they can deploy immediately.",
      },
      what: {
        headline: "Done-For-You Business Workflows, SOPs & Playbooks",
        body: "Success Packs are pre-built business operating systems for specific industries and functions. Each pack includes workflow maps, SOP templates, CRM pipeline setups, content calendars, client delivery frameworks, and Lux Agent-ready automation recipes — all ready to deploy.",
      },
      when: {
        headline: "When You Launch, Scale, or Systematize Your Business",
        body: "Day one of a new business. When you hire your first team member. When you're losing time to disorganization. When a new client type requires a new process. Success Packs are designed to be deployed fast — not studied. Pick your pack, install the system, execute.",
      },
      where: {
        headline: "Digital Delivery — Works with Lux Agent or Standalone",
        body: "Access your Success Packs immediately after purchase via digital download. Deploy them directly into Lux Agent for AI-powered execution, or use the templates and SOPs manually with your existing tools. Industry-specific packs are available for restaurants, contractors, real estate, healthcare, and more.",
      },
      why: {
        headline: "Because Building Systems from Scratch Is Expensive and Slow",
        body: "Every hour you spend building a workflow from zero is an hour you're not generating revenue. Success Packs give you battle-tested systems built from real-world business operations — so you skip the trial and error and go straight to execution.",
      },
      how: {
        headline: "Choose Your Pack. Deploy. Execute.",
        body: "Browse packs by industry or function. Purchase the pack that fits your business. Receive instant digital access to all templates, SOPs, workflow maps, and Lux Agent recipes. Follow the deployment guide to install your new system. Start executing the same day — with a proven process behind every action.",
      },
    },
  },
];

// ── PRICING TIERS (LuxWriteOff) ──────────────────────────────

export const PRICING_TIERS = [
  {
    name: "Professional",
    price: { monthly: 39, annual: 390 },
    description: "For independent professionals and freelancers",
    features: [
      "AI expense categorization",
      "Tax write-off engine",
      "Receipt scanning",
      "Up to 500 transactions/mo",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
    stripePriceId: { monthly: "price_professional_monthly", annual: "price_professional_annual" },
  },
  {
    name: "Enterprise",
    price: { monthly: 69, annual: 690 },
    description: "For growing teams and businesses",
    features: [
      "Everything in Professional",
      "Up to 10 team members",
      "Advanced analytics",
      "Unlimited transactions",
      "Priority support",
      "Dedicated onboarding",
    ],
    cta: "Get Enterprise",
    highlight: true,
    stripePriceId: { monthly: "price_enterprise_monthly", annual: "price_enterprise_annual" },
  },
  {
    name: "Agency",
    price: { monthly: 149, annual: 1490 },
    description: "For agencies managing multiple clients",
    features: [
      "Everything in Enterprise",
      "Unlimited clients",
      "White-label options",
      "API access & webhooks",
      "Client-level reporting",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlight: false,
    stripePriceId: { monthly: "price_agency_monthly", annual: "price_agency_annual" },
  },
];
