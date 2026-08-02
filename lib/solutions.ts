// ============================================================
// LUX AUTOMATON — Solutions Catalog
// Featured client systems built on the Lux Automaton stack.
// These are NOT core products — they are real-world verticals.
// ============================================================

export interface Solution {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  bgImage?: string;
  problem: string;
  useCases: string[];
  features: string[];
  audience: string[];
  ecosystemConnection: string;
  disclaimer?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  externalUrl?: string;
  fiveWH: {
    who: { headline: string; body: string };
    what: { headline: string; body: string };
    when: { headline: string; body: string };
    where: { headline: string; body: string };
    why: { headline: string; body: string };
    how: { headline: string; body: string };
  };
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'lux-care-os',
    name: 'Lux Care OS',
    category: 'Healthcare / Care Operations',
    tagline: 'Care Operations, Organized.',
    accentColor: 'var(--green)',
    bgImage: '/images/lux-care-os-hero.jpg',
    externalUrl: 'https://luxautomaton-ux.github.io/lux-care-os-website',
    description: 'Lux Care OS is a private AI-powered care operations system designed to help clinics, caregivers, and support teams organize workflows, documentation support, staff tasks, and daily execution.',
    problem: 'Care teams deal with scattered information, manual follow-up, overloaded staff, unclear task ownership, and documentation gaps. Lux Care OS brings daily operations into one structured workflow.',
    useCases: [
      'Care team task management',
      'Intake workflow support',
      'Follow-up organization',
      'Staff coordination',
      'Internal documentation support',
      'SOPs & care workflow playbooks',
      'Admin workflow automation',
      'Role-based guidance',
      'Daily operating dashboards',
      'Compliance-aware structure',
    ],
    features: [
      'Workflow dashboard',
      'Staff task structure',
      'Intake support',
      'Follow-up guidance',
      'SOP organization',
      'AI assistant support',
      'Role-based workflows',
      'Success Pack compatibility',
      'Internal operations reporting',
      'Compliance-aware structure',
    ],
    audience: [
      'Clinics',
      'Care teams',
      'Support organizations',
      'Health-focused programs',
      'Admin staff',
      'Care coordinators',
      'Nonprofit care programs',
      'Small healthcare operations',
    ],
    ecosystemConnection:
      'Lux Care OS uses Lux Agent for workflow guidance, Lux Coder for custom tools, Success Packs for operating playbooks, and Lux Automaton infrastructure for secure business workflows.',
    disclaimer:
      'Lux Care OS supports operations and workflow organization. It does not provide diagnosis, treatment, clinical decision-making, or emergency medical guidance. Any use involving PHI, HIPAA, or regulated healthcare data requires compliant infrastructure, approved policies, proper access controls, and legal review.',
    primaryCta: { label: 'Talk About Lux Care OS', href: '/contact' },
    secondaryCta: { label: 'Explore Custom Systems', href: '/solutions' },
    fiveWH: {
      who: {
        headline: 'Built for Care Teams Drowning in Admin Work',
        body: 'Clinics, care coordinators, health-focused nonprofits, support organizations, and admin staff who are spending more time on paperwork than care. If your team is managing people and processes with scattered tools, Lux Care OS brings order to the chaos.',
      },
      what: {
        headline: 'A Private AI-Powered Care Operations System',
        body: 'Lux Care OS organizes the operational side of care delivery. Intake workflows, staff task assignment, internal documentation support, follow-up reminders, SOP libraries, and role-based AI guidance — all in one connected system.',
      },
      when: {
        headline: 'Daily — For Every Operational Task Your Team Handles',
        body: 'Morning staff briefings. Intake processing. Follow-up calls. Documentation. End-of-day reporting. Lux Care OS is the operational backbone running continuously behind your care delivery — keeping tasks visible and teams aligned.',
      },
      where: {
        headline: 'In Your Private, Secure Deployment',
        body: 'Lux Care OS operates in a private environment. Your patient data, staff workflows, and operational records stay within your controlled infrastructure. No shared cloud, no third-party data exposure.',
      },
      why: {
        headline: 'Because Care Teams Carry Too Much — and Lose Too Much in the Process',
        body: 'When administrative burden outpaces capacity, details fall through the cracks. Follow-ups missed. Intake delayed. Staff burned out. Lux Care OS reduces the operational load so your team can focus on what actually matters — the people in their care.',
      },
      how: {
        headline: 'Deploy. Configure. Operate.',
        body: 'Work with the Lux Automaton team to configure your Care OS instance. Define your workflows, staff roles, intake steps, and SOP library. Lux Agent guides your team through daily tasks. Success Packs install your operating playbooks. Your team runs the system — the system runs the operations.',
      },
    },
    icon: '🏥',
  },
  {
    slug: 'epic-electric',
    name: 'Epic Electric',
    category: 'Contractor / Field Service Operations',
    tagline: 'Turn Field Work Into a Business System.',
    accentColor: 'var(--orange)',
    bgImage: '/images/epic-electric-hero.png',
    description:
      'Epic Electric is a custom contractor operations system built with Lux Automaton. It helps an electrical business manage leads, job notes, estimates, customer communication, scheduling, reviews, and weekly business review.',
    problem:
      'Contractors are often busy doing the work while the business side gets scattered across phones, texts, notebooks, emails, photos, and invoices. Epic Electric organizes those moving pieces into one guided system.',
    useCases: [
      'Lead capture',
      'Estimate and quote preparation',
      'Job scheduling',
      'Customer communication',
      'Before/after job photo organization',
      'Service checklist workflows',
      'Invoice follow-up',
      'Review requests',
      'Referral requests',
      'Local marketing content',
      'CRM pipeline',
      'Weekly business review',
    ],
    features: [
      'Contractor CRM',
      'Quote workflow',
      'Job tracking',
      'Customer follow-up',
      'Service checklist support',
      'Photo organization',
      'Local content prompts',
      'Review/referral workflow',
      'Business dashboard',
      'Lux Agent support',
      'Success Pack structure',
    ],
    audience: [
      'Electrical contractors',
      'Local service businesses',
      'Field service teams',
      'Solo operators',
      'Small contractor crews',
      'Home service businesses',
    ],
    ecosystemConnection:
      'Epic Electric uses Lux Agent USB for portable business operations, Lux Agent for customer follow-up and workflow guidance, Success Packs for repeatable operating structure, and Lux Coder for custom business tools.',
    disclaimer:
      'Epic Electric supports business operations, documentation, scheduling, and customer communication. Electrical work must be performed by qualified personnel and follow applicable licensing, permit, inspection, and electrical code requirements.',
    primaryCta: { label: 'View Contractor Systems', href: '/contact' },
    secondaryCta: { label: 'Book a Custom Setup', href: '/contact' },
    fiveWH: {
      who: {
        headline: 'For Contractors Who Are Great at the Trade but Struggling with the Business',
        body: 'Electrical contractors, solo operators, small field crews, and home service businesses who are winning jobs but losing time to disorganized business operations. If you live in your truck and run your business from your phone, this was built for you.',
      },
      what: {
        headline: 'A Custom AI Business System for Electrical Contractors',
        body: 'Epic Electric is a full business operations system powered by Lux Automaton. It organizes your leads, quotes, jobs, customer communication, photos, invoices, and local marketing into one AI-guided workflow — built specifically for how contractors actually work.',
      },
      when: {
        headline: 'From First Call to Final Invoice — Every Job, Every Day',
        body: 'When a new lead calls. When you need to send a quote. When the job is done and you need to request a review. When Monday morning hits and you need to see what is on the schedule. Epic Electric guides the business side so you can focus on the work.',
      },
      where: {
        headline: 'In the Field, In the Office, On Your Phone',
        body: 'Accessible from your phone, tablet, or laptop. Works in the field with Lux Agent USB for offline-capable local operations. Syncs your job data, photos, and customer records wherever you are — no more scattered texts and notebooks.',
      },
      why: {
        headline: 'Because a Great Electrician Deserves a Great Business System',
        body: 'Skilled tradespeople lose thousands of dollars every year to missed follow-ups, forgotten referral requests, untracked expenses, and disorganized estimates. Epic Electric closes those gaps — turning your expertise into a scalable, repeatable business.',
      },
      how: {
        headline: 'Set Up Your Contractor OS. Run Your Business.',
        body: 'Work with Lux Automaton to configure your Epic Electric system. Load your Success Pack with your service types, pricing, and workflows. Connect your CRM pipeline. Lux Agent guides customer follow-up, quote generation, and weekly reviews. Your business runs on a system — not just your memory.',
      },
    },
    icon: '⚡',
  },
  {
    slug: 'inland-circle-program-o',
    name: 'Inland Circle Program OS',
    category: 'Community / Nonprofit Program Operations',
    tagline: 'Community Work Needs a Real Operating System.',
    accentColor: 'var(--cyan)',
    bgImage: '/images/inland-circle-hero.png',
    description:
      'Inland Circle Program OS is a program operations system designed to support community-based organizations. It helps organize participants, outreach, staff tasks, events, resources, volunteer workflows, and reporting in one connected structure.',
    problem:
      'Community programs often carry serious responsibilities with limited staff, limited time, and too many disconnected tools. Program OS brings structure to the daily work so teams can support people more consistently.',
    useCases: [
      'Participant intake tracking',
      'Outreach tracking',
      'Resource directory management',
      'Staff task workflows',
      'Event planning',
      'Volunteer coordination',
      'Program reporting',
      'Grant/funder update support',
      'Community communication',
      'Internal SOPs',
      'Follow-up reminders',
    ],
    features: [
      'Participant workflow support',
      'Staff task structure',
      'Event planning',
      'Resource directory',
      'Volunteer coordination',
      'Reporting support',
      'SOP library',
      'AI assistant guidance',
      'Program dashboard',
      'Success Pack compatibility',
      'Custom role workflows',
    ],
    audience: [
      'Nonprofits',
      'Community programs',
      'Outreach teams',
      'Youth support programs',
      'Housing support programs',
      'Reentry programs',
      'Mentorship programs',
      'Resource navigation teams',
      'Program administrators',
    ],
    ecosystemConnection:
      'Program OS uses Lux Agent to guide staff workflows, Lux Coder to build custom tools, Lux Agent USB for local-first operations, and Success Packs for repeatable program playbooks.',
    primaryCta: { label: 'Explore Program OS', href: '/contact' },
    secondaryCta: { label: 'Book a Community Systems Demo', href: '/contact' },
    fiveWH: {
      who: {
        headline: 'For Community Organizations Doing Critical Work with Limited Resources',
        body: 'Nonprofits, outreach teams, youth support programs, housing programs, reentry programs, mentorship organizations, and resource navigation teams — any mission-driven organization that serves people and needs a better way to track, coordinate, and execute the work.',
      },
      what: {
        headline: 'An AI-Assisted Program Operations System for Community Organizations',
        body: 'Program OS organizes the operational infrastructure of community programs. Participant intake, outreach tracking, staff tasks, event coordination, resource directories, volunteer workflows, and funder reporting — all structured and AI-guided in one connected system.',
      },
      when: {
        headline: 'Every Day Your Team Shows Up to Serve the Community',
        body: 'Intake sessions. Outreach visits. Event planning. Volunteer coordination. Funder reporting deadlines. Staff onboarding. Program OS supports your team through every operational moment — so no one falls through the cracks and nothing important gets forgotten.',
      },
      where: {
        headline: 'In Your Community, In Your Office, In the Field',
        body: 'Program OS works wherever your team works. Office-based administrators access dashboards and reports. Field staff use mobile-accessible workflows. Lux Agent USB supports local-first operations for teams without reliable internet. The system meets your team where they are.',
      },
      why: {
        headline: 'Because the People You Serve Deserve an Organized Team Behind Them',
        body: 'Disorganization in community programs is not just inefficient — it affects the people you serve. Missed follow-ups, duplicated outreach, and lost referrals have real consequences. Program OS brings structure and consistency to your operations so your impact matches your intention.',
      },
      how: {
        headline: 'Configure. Deploy. Serve Better.',
        body: 'Partner with Lux Automaton to build your Program OS system. Define your participant workflows, staff roles, event templates, and reporting structure. Load your Success Pack with your program SOPs. Lux Agent guides daily execution. Your team follows the system — the system serves the mission.',
      },
    },
    icon: '🌐',
  },
  {
    slug: 'inland-circle',
    name: 'Inland Circle Program OS',
    category: 'Community / Nonprofit Program Operations',
    tagline: 'Community Work Needs a Real Operating System.',
    accentColor: 'var(--cyan)',
    bgImage: '/images/inland-circle-hero.png',
    description:
      'Inland Circle Program OS is a program operations system designed to support community-based organizations. It helps organize participants, outreach, staff tasks, events, resources, volunteer workflows, and reporting in one connected structure.',
    problem:
      'Community programs often carry serious responsibilities with limited staff, limited time, and too many disconnected tools. Program OS brings structure to the daily work so teams can support people more consistently.',
    useCases: [
      'Participant intake tracking',
      'Outreach tracking',
      'Resource directory management',
      'Staff task workflows',
      'Event planning',
      'Volunteer coordination',
      'Program reporting',
      'Grant/funder update support',
      'Community communication',
      'Internal SOPs',
      'Follow-up reminders',
    ],
    features: [
      'Participant workflow support',
      'Staff task structure',
      'Event planning',
      'Resource directory',
      'Volunteer coordination',
      'Reporting support',
      'SOP library',
      'AI assistant guidance',
      'Program dashboard',
      'Success Pack compatibility',
      'Custom role workflows',
    ],
    audience: [
      'Nonprofits',
      'Community programs',
      'Outreach teams',
      'Youth support programs',
      'Housing support programs',
      'Reentry programs',
      'Mentorship programs',
      'Resource navigation teams',
      'Program administrators',
    ],
    ecosystemConnection:
      'Program OS uses Lux Agent to guide staff workflows, Lux Coder to build custom tools, Lux Agent USB for local-first operations, and Success Packs for repeatable program playbooks.',
    primaryCta: { label: 'Explore Program OS', href: '/contact' },
    secondaryCta: { label: 'Book a Community Systems Demo', href: '/contact' },
    fiveWH: {
      who: {
        headline: 'For Community Organizations Doing Critical Work with Limited Resources',
        body: 'Nonprofits, outreach teams, youth support programs, housing programs, reentry programs, mentorship organizations, and resource navigation teams — any mission-driven organization that serves people and needs a better way to track, coordinate, and execute the work.',
      },
      what: {
        headline: 'An AI-Assisted Program Operations System for Community Organizations',
        body: 'Program OS organizes the operational infrastructure of community programs. Participant intake, outreach tracking, staff tasks, event coordination, resource directories, volunteer workflows, and funder reporting — all structured and AI-guided in one connected system.',
      },
      when: {
        headline: 'Every Day Your Team Shows Up to Serve the Community',
        body: 'Intake sessions. Outreach visits. Event planning. Volunteer coordination. Funder reporting deadlines. Staff onboarding. Program OS supports your team through every operational moment — so no one falls through the cracks and nothing important gets forgotten.',
      },
      where: {
        headline: 'In Your Community, In Your Office, In the Field',
        body: 'Program OS works wherever your team works. Office-based administrators access dashboards and reports. Field staff use mobile-accessible workflows. Lux Agent USB supports local-first operations for teams without reliable internet. The system meets your team where they are.',
      },
      why: {
        headline: 'Because the People You Serve Deserve an Organized Team Behind Them',
        body: 'Disorganization in community programs is not just inefficient — it affects the people you serve. Missed follow-ups, duplicated outreach, and lost referrals have real consequences. Program OS brings structure and consistency to your operations so your impact matches your intention.',
      },
      how: {
        headline: 'Configure. Deploy. Serve Better.',
        body: 'Partner with Lux Automaton to build your Program OS system. Define your participant workflows, staff roles, event templates, and reporting structure. Load your Success Pack with your program SOPs. Lux Agent guides daily execution. Your team follows the system — the system serves the mission.',
      },
    },
    icon: '🌐',
  },
  {
    slug: 'contractor-os',
    name: 'Contractor OS',
    category: 'Field Trades / Independent Contractors',
    tagline: 'Trade Operations & Field Workflow Automation.',
    accentColor: 'var(--amber)',
    bgImage: '/images/epic-electric-hero.png',
    description:
      'Contractor OS is an AI-powered field operations system designed for electricians, plumbers, HVAC technicians, roofers, and general contractors to manage leads, quotes, job notes, customer communication, and invoicing.',
    problem:
      'Field contractors spend up to 15 hours a week managing quotes, texts, receipts, phone calls, and dispatch paperwork instead of focusing on billed trade work.',
    useCases: [
      'Lead intake & smart dispatching',
      'Instant job estimates & quote builder',
      'Field service checklists & photo logs',
      'Automated customer SMS updates',
      'Invoice generation & payment follow-up',
      'Review & referral automation',
    ],
    features: [
      'Contractor CRM pipeline',
      'Job photo & notes archive',
      'Offline-capable Lux Agent USB integration',
      'Custom invoice playbooks',
      'Customer review automation',
    ],
    audience: [
      'Independent contractors',
      'Field service technicians',
      'Electricians, plumbers & HVAC pros',
      'Small trade crews',
    ],
    ecosystemConnection:
      'Contractor OS uses Lux Agent USB for offline field operations, Lux Agent for automated customer follow-ups, and Success Packs for standardized quote and job templates.',
    primaryCta: { label: 'Explore Contractor OS', href: '/contact' },
    secondaryCta: { label: 'Book Field Systems Demo', href: '/contact' },
    fiveWH: {
      who: {
        headline: 'Built for Independent Contractors and Trade Crews',
        body: 'Trade professionals who want to eliminate administrative drag and run a professional, high-margin field business.',
      },
      what: {
        headline: 'An AI-Powered Operations Backbone for Field Trades',
        body: 'Organizes quotes, scheduling, job logs, client communication, and payments into one seamless mobile workflow.',
      },
      when: {
        headline: 'From First Client Lead to Final Payment',
        body: 'Runs continuously behind your field work — logging job notes on site and generating quotes before you leave the driveway.',
      },
      where: {
        headline: 'In Your Truck, On Job Sites, On Your Phone',
        body: 'Works anywhere on mobile or offline via Lux Agent USB.',
      },
      why: {
        headline: 'Never Lose a Job to Delayed Quotes or Forgotten Follow-Ups',
        body: 'Speeds up estimate delivery by 80% and ensures every completed job triggers a review request.',
      },
      how: {
        headline: 'Deploy. Load Success Pack. Run Your Trade.',
        body: 'Configure your trade pricing, load your job checklists, and let Lux Agent handle field administration.',
      },
    },
    icon: '🛠️',
  },
  {
    slug: 'creator-os',
    name: 'Creator OS',
    category: 'Media Production / AI Studio Engine',
    tagline: 'Turn Ideas Into Production-Ready Explainer & Video Operations.',
    accentColor: 'var(--purple)',
    bgImage: '/images/baoyu-comic-illustrator-hero.png',
    description:
      'Creator OS is an AI video and content production operating system. It connects story bibles, beat maps, visual continuity locks, script generation, and multi-platform publishing into a synchronized creator pipeline.',
    problem:
      'Video creators and production teams struggle with character visual drift, scattered script drafts, manual video planning, and slow publishing cadence.',
    useCases: [
      'Story Bible Core & Character Identity Locks',
      'AI explainer video beat maps',
      'Visual asset & prompt generation',
      'Multi-channel script formatting',
      'Production perception audits',
      'Automated episode publishing',
    ],
    features: [
      'Lux Codex story architecture integration',
      'Explainer video production planner',
      'Visual perception audit engine',
      'Content bridge distribution workflows',
      'Multi-modal prompt memory',
    ],
    audience: [
      'YouTube creators & video producers',
      'EdTech & course builders',
      'Digital media studios',
      'Brand storytelling teams',
    ],
    ecosystemConnection:
      'Creator OS connects Lux Agent for narrative planning, Lux Coder for automated video pipelines, and Lux Codex schemas for character and story continuity.',
    primaryCta: { label: 'Explore Creator OS', href: '/contact' },
    secondaryCta: { label: 'See Explainer Factory', href: '/blog/how-codex-can-direct-an-ai-explainer-video-factory' },
    fiveWH: {
      who: {
        headline: 'Built for High-Velocity Content Creators and Studios',
        body: 'Producers, creators, and agencies who want to produce consistent, high-grade AI series without losing visual continuity or creative control.',
      },
      what: {
        headline: 'An AI Video Factory & Narrative Operating System',
        body: 'Synchronizes your story bibles, character identity locks, scene beat maps, and video publishing pipelines.',
      },
      when: {
        headline: 'From Concept Brainstorm to Scheduled Episode Release',
        body: 'Powers your studio production cycle daily, keeping character memory and lore locked across episodes.',
      },
      where: {
        headline: 'In Your Local Studio or Cloud Pipeline',
        body: 'Runs in your production workspace with local asset safety.',
      },
      why: {
        headline: 'Eliminate Character Drift and Production Bottlenecks',
        body: 'Scale video output 5x while maintaining director-level artistic control and episode continuity.',
      },
      how: {
        headline: 'Connect Story Bible. Map Beats. Publish Series.',
        body: 'Use Lux Codex templates to define characters, generate beat maps, and run perception audits before publishing.',
      },
    },
    icon: '🎨',
  },
  {
    slug: 'small-business-os',
    name: 'Small Business OS',
    category: 'Retail / Local Commerce Operations',
    tagline: 'Automate Local Commerce, Inventory & Customer Systems.',
    accentColor: 'var(--blue)',
    bgImage: '/images/page-hero-waves.png',
    description:
      'Small Business OS is an all-in-one operational system for retail stores, boutique services, local shops, and e-commerce brands to manage customer inquiries, local marketing, inventory workflows, and daily sales reviews.',
    problem:
      'Small business owners spend their days context-switching between customer messages, social media posts, inventory checks, vendor emails, and staff schedules.',
    useCases: [
      'Local customer message automation',
      'Social content & local SEO generator',
      'Inventory reorder alerts & supplier tracking',
      'Staff shift checklists & daily briefings',
      'Customer loyalty & review workflows',
      'Weekly financial & operational reviews',
    ],
    features: [
      'Omnichannel inbox assistant',
      'Local SEO & Google Business optimizer',
      'Automated customer follow-up playbooks',
      'Daily operating dashboards',
      'Success Pack retail templates',
    ],
    audience: [
      'Retail store owners',
      'Local boutique services',
      'E-commerce brands',
      'Small business founders',
    ],
    ecosystemConnection:
      'Small Business OS uses Lux Agent for customer support automation, Lux Budgeter for scenario forecasting, and Success Packs for retail SOPs.',
    primaryCta: { label: 'Explore Small Business OS', href: '/contact' },
    secondaryCta: { label: 'Book Business Systems Demo', href: '/contact' },
    fiveWH: {
      who: {
        headline: 'Built for Busy Main-Street Merchants and Local Founders',
        body: 'Store owners and local service businesses who need enterprise-level operational efficiency without enterprise complexity.',
      },
      what: {
        headline: 'An Operational System for Local Commerce',
        body: 'Automates customer communications, local marketing, inventory workflows, and staff SOPs.',
      },
      when: {
        headline: 'Every Business Day',
        body: 'Handles customer inquiries 24/7 and generates morning staff briefings and end-of-day sales reviews automatically.',
      },
      where: {
        headline: 'At Your Register, On Your Phone, In Store',
        body: 'Accessible across desktop, tablet, and mobile devices.',
      },
      why: {
        headline: 'Reclaim 10+ Hours a Week Spent on Manual Store Admin',
        body: 'Drive more repeat visits, capture 5-star Google reviews, and keep daily store operations running smoothly.',
      },
      how: {
        headline: 'Connect Channels. Load Playbooks. Grow Commerce.',
        body: 'Set up your store channels, load retail Success Packs, and let LANA guide your daily operations.',
      },
    },
    icon: '🏬',
  },
];

export default SOLUTIONS;
