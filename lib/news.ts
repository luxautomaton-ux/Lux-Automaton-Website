export interface NewsStory {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  category: "News" | "Insights" | "Product Launch" | "Case Study";
  summary: string;
  content: string[];
  image: string;
  linkedinUrl: string;
  source: "Founder Insight" | "Company Update";
  likes: number;
  comments: number;
  featured?: boolean;
}

import scrapedData from "./scraped-news.json";

const STATIC_NEWS_STORIES: NewsStory[] = [
  {
    slug: "lux-agent-usb-your-ai-assistant-anywhere",
    title: "Lux Agent USB: Your AI Assistant Anywhere",
    subtitle: "Offline-ready AI that travels with you. Your memory. Your tools. Your workflow.",
    date: "July 23, 2026",
    author: {
      name: "Lux Automaton Editorial",
      role: "Product & Engineering",
      image: "/images/founder-asa.png"
    },
    category: "Product Launch",
    summary: "How a portable, offline-ready AI workspace keeps your tools, memory, and business workflows close at hand. Carry an AI working environment, keep essential work available offline, and add focused Success Packs.",
    content: [
      "A flash drive usually carries documents. Lux Agent USB is designed to carry a working environment. That distinction matters.",
      "Small-business owners rarely struggle because they cannot find one more app. They struggle because their notes, templates, customer information, checklists, unfinished drafts, and next actions are scattered across too many places. When the internet is weak—or the right login is unavailable—the work slows down even more.",
      "Lux Agent USB represents a different idea: keep a practical AI workspace close enough to travel with the owner. Plug it into an approved computer, open the Lux environment, choose the right workflow, and continue working with the tools and materials that were prepared for the business.",
      "![Lux Agent USB: Your AI Assistant Anywhere](/images/01-thumbnail-lux-agent-usb.png)",
      "It is not magic in a pocket. It is preparation in a pocket.",
      "## 01 — Carry an AI working environment, not just files",
      "The most important part of Lux Agent USB is not the storage capacity. It is the organization around the storage.",
      "A normal drive may contain a folder called 'Business,' another called 'Templates,' and several versions of the same document. That is useful, but the owner still has to remember where everything lives and what should happen next.",
      "A portable AI workspace can bring those pieces closer together: An AI assistant for questions, drafting, and planning; Approved memory and business context; Templates and reusable checklists; Step-by-step operating guides; Workflows for common tasks; Local tools prepared for the device; A clear place to save completed work.",
      "![Your Assistant in Your Pocket](/images/02-photo-your-assistant-in-your-pocket.png)",
      "That means the USB can support more than file transfer. It can help an owner move from information to action.",
      "A restaurant owner could open a customer-review response workflow. A real-estate professional could use a follow-up checklist and listing-content template. An electrical contractor could prepare a job summary or customer update. A music business could organize release notes, agreements, and campaign tasks.",
      "The hardware stays the same. The operating context changes. That is the purpose of Success Packs: they give a general AI workspace a focused starting point for a particular kind of work.",
      "> Asa’s note: 'The value is not carrying every tool ever made. The value is opening the right system when the work is right in front of you.'",
      "## 02 — Keep essential work available offline",
      "Cloud AI is powerful, convenient, and useful. Lux Automaton is not against the cloud. But a business should understand the difference between cloud-first convenience and local continuity.",
      "A browser-based tool may become unavailable because of weak internet access, a service outage, a forgotten password, a changed subscription, an account restriction, or a client location with limited connectivity.",
      "An offline-ready system gives the business another path.",
      "![Work Offline With Confidence](/images/03-photo-work-offline-with-confidence.png)",
      "With the correct local setup, approved files, templates, and supported tools can remain available without depending on a live browser session. The owner can continue drafting, organizing, reviewing, and preparing work. When connectivity returns, approved changes can be synchronized through the business’s normal process.",
      "This is especially useful for traveling founders, field technicians, contractors, events, mobile teams, community organizations, and businesses that prefer local control for certain materials.",
      "Offline-ready does not mean 'never connect to the internet.' It means the internet is a choice for the next step, not a requirement for every step.",
      "### Speed matters, but reliability matters more",
      "The supplied Move Speed hardware is designed for fast USB-C and USB-A access. Quick file transfers can make a portable workspace feel practical rather than frustrating.",
      "Still, a responsible product promise should be based on the complete system—not only the maximum number shown on the packaging. Real performance depends on the computer, port, file size, thermal conditions, encryption, and software workload. The goal is dependable access and smooth everyday use, not a laboratory number that every customer must reproduce.",
      "For Lux Agent USB, the stronger message is simple: Your working materials are close. Your workflow is prepared. Your business has another way to keep moving.",
      "## 03 — Add focused Success Packs for the work you actually do",
      "Most people do not need an empty AI system. They need a useful beginning. That is why industry and role-based Success Packs can make Lux Agent USB easier to understand. Each pack can organize the knowledge, templates, and workflows around a clear business outcome.",
      "![Success Packs For Real Work](/images/04-photo-success-packs-for-real-work.png)",
      "### Restaurant Success Pack\nReview-response templates, weekly promotion ideas, event and booking checklists, menu-description prompts, customer follow-up language, and staff communication templates.",
      "### Real Estate Success Pack\nListing-content workflows, lead follow-up sequences, open-house checklists, buyer and seller communication templates, market-update outlines, and transaction organization guides.",
      "### Electrical Contractor Success Pack\nEstimate preparation checklists, job summary templates, customer update messages, scheduling workflows, documentation reminders, and review-request follow-up.",
      "### Music Business Success Pack\nRelease-planning checklists, A&R and demo tracking, campaign calendars, contract-organization guides, artist content prompts, and distribution workflows.",
      "### Healthcare and professional packs\nHealthcare-related packs require stricter controls. They should separate general operations support from clinical judgment, protected information, and regulated workflows. Dr. Torrey Dooley’s expertise can guide health-related education and workflow design, while the system continues to reinforce human review and professional responsibility.",
      "![Lux Agent USB Overview Infographic](/images/05-lux-agent-usb-overview.png)",
      "## What Lux Agent USB should not promise",
      "A trustworthy product is clear about its limits. Lux Agent USB should not be presented as a replacement for every cloud platform, a guarantee that every AI feature works fully offline, a substitute for backups, automatic security without configuration, a replacement for professional judgment, or a promise that one device can run every workload on every computer.",
      "The strength of the product is the combination of portability, preparation, local capability, focused workflows, and owner control.",
      "## A simple first-day setup",
      "1. Connect the device to an approved computer.\n2. Open the Start Here guide.\n3. Confirm the correct operating mode.\n4. Create or select the business profile.\n5. Choose the first Success Pack or workflow.\n6. Review where completed files will be saved.\n7. Test one small task from beginning to end.\n8. Confirm the backup and recovery plan.\n9. Disconnect the device safely.\n10. Repeat the workflow until it becomes dependable.",
      "The first win should be small: draft a follow-up, organize a client folder, build a checklist, prepare a weekly plan, summarize approved notes, or create a reusable template. Once one workflow works reliably, add the next one.",
      "## Ownership is the real product story",
      "Portable hardware is easy to photograph. Ownership is the deeper story. Lux Agent USB reflects several Lux Automaton principles: Owners should understand where their work lives; Useful context should not be trapped in scattered apps; AI should support judgment, not replace it; A business should have continuity when connectivity changes; Workflows should be teachable and repeatable; Technology should make people more capable—not more dependent.",
      "LANA can help organize the next action. Success Packs can provide a focused starting point. Local tools can reduce cloud dependency. Cloud services can still help when collaboration, scale, or synchronization is needed.",
      "The owner remains in charge of the system.",
      "## The takeaway",
      "Lux Agent USB is not valuable because it is a USB drive with an AI label. It is valuable when it becomes a portable operating layer for real work: Your assistant travels with you; Your approved memory and templates stay close; Your workflows are ready to use; Your business has an offline path; Your Success Packs match the work you actually do; Your final judgment remains human.",
      "That is a more practical definition of personal AI. Not a chatbot waiting in another tab. A prepared system that can go where the work goes.",
      "> 'AI should work for you.' — Asa Pritchard\n\n**Learn AI. Build Tomorrow. Change the World. — LANA**",
      "## Your next action",
      "Choose one repeated task your business must complete every week. Write down the files, instructions, templates, and approvals needed to finish it. That becomes the first workflow to prepare for Lux Agent USB. Let’s build it."
    ],
    image: "/images/01-thumbnail-lux-agent-usb.png",
    linkedinUrl: "https://www.linkedin.com/in/asapritchard/recent-activity/all/",
    source: "Founder Insight",
    likes: 215,
    comments: 44,
    featured: true
  },
  {
    slug: "democratizing-ai-education-study-ai-courses",
    title: "Democratizing AI: Lux Automaton Launches 'Study AI Courses' Platform",
    subtitle: "A hands-on learning community built to teach founders, developers, and career changers how to deploy real AI systems.",
    date: "June 15, 2026",
    author: {
      name: "Asa Spade",
      role: "Founder, Lux Automaton",
      image: "/images/founder-asa.png"
    },
    category: "News",
    summary: "We're excited to launch Study AI Courses, an educational initiative designed to provide practical, expert-led training on AI workflows, tools, and 1-on-1 mentorship.",
    content: [
      "AI is transforming business, but the gap between theoretical knowledge and real-world deployment remains massive. Most courses teach you how to write prompts; very few show you how to build a production-grade system that automates actual business operations.",
      "To bridge this gap, the Lux Automaton team has launched Study AI Courses. Our curriculum is built for builders: founders who want to automate their workflows, developers looking to integrate advanced AI agents, and career changers aiming to enter the AI engineering field.",
      "Study AI Courses offers self-paced lessons, live code-alongs, and direct 1-on-1 mentorship from creators who build and deploy AI systems every day. From setting up autonomous CRM pipelines to local-first database designs, we focus on what works in production.",
      "Join us today and start building systems that move. Visit the courses catalog or connect with our community to begin your journey."
    ],
    image: "/images/page-hero-circuit.png",
    linkedinUrl: "https://www.linkedin.com/in/asapritchard/recent-activity/all/",
    source: "Founder Insight",
    likes: 142,
    comments: 38,
    featured: true
  },
  {
    slug: "introducing-luxwriteoff-expense-intelligence",
    title: "Introducing LuxWriteOff: AI-Powered Tax Savings and Expense Tracking",
    subtitle: "Never miss another write-off. Automate your 1099 accounting with private, secure transaction categorization.",
    date: "May 28, 2026",
    author: {
      name: "Asa Spade",
      role: "Founder, Lux Automaton",
      image: "/images/founder-asa.png"
    },
    category: "Product Launch",
    summary: "Lux Automaton introduces LuxWriteOff, an AI-driven expense manager built for self-employed professionals to automatically scan receipts and identify tax deductions securely.",
    content: [
      "For W-2 employees, tax season is relatively straightforward. For 1099 contractors, freelancers, and small business owners, it is a constant struggle of scattered receipts, unorganized spreadsheets, and thousands of dollars left on the table.",
      "LuxWriteOff changes that. Powered by the Lux Automaton AI engine, LuxWriteOff connects to your business accounts, scans receipts, and uses secure local-first AI to automatically categorize transactions and identify write-offs you might have missed.",
      "Unlike other platforms that sell your data or train external models on your financial history, LuxWriteOff operates in a private, secure environment. Your financial data stays yours, protected by our ecosystem's strict privacy rules.",
      "Start saving time and money on your taxes today. LuxWriteOff is now available as a core product in the Lux Automaton suite."
    ],
    image: "/images/lux-write-off.jpg",
    linkedinUrl: "https://www.linkedin.com/company/lux-automaton-saas/posts/",
    source: "Company Update",
    likes: 89,
    comments: 12
  },
  {
    slug: "saas-sprawl-crisis-private-ai-ecosystems",
    title: "The SaaS Sprawl Crisis: Why Your Business Needs a Unified Private AI Ecosystem",
    subtitle: "Why paying for 12 different subscriptions that don't talk to each other is slowing your business down—and how to fix it.",
    date: "April 12, 2026",
    author: {
      name: "Asa Spade",
      role: "Founder, Lux Automaton",
      image: "/images/founder-asa.png"
    },
    category: "Insights",
    summary: "Asa Spade breaks down the hidden costs of SaaS sprawl and why the future of business operations lies in a private, local-first, unified AI architecture.",
    content: [
      "If you look at the monthly bill of the average modern startup or small business, you will see a laundry list of software subscriptions: a CRM, an email marketing tool, a task manager, an accounting app, and multiple AI prompt tools. Not only does this get expensive, but it creates a massive data silo problem.",
      "Your CRM doesn't know what your task manager is doing, and your AI prompt generator has no context about your client communications. Every time you copy and paste data between these windows, you are losing efficiency.",
      "The solution is not more SaaS. The solution is an ecosystem. By using a private, unified AI operating system, all of your tools share a single context. Your AI assistant knows your projects, your code, your budgets, and your operations, without sending your data to public servers.",
      "Lux Automaton was built to solve this exact problem. By bringing your tools into one private infrastructure, you build a compounding system where every addition makes your business faster and smarter."
    ],
    image: "/images/page-hero-cyber.jpg",
    linkedinUrl: "https://www.linkedin.com/in/asapritchard/recent-activity/all/",
    source: "Founder Insight",
    likes: 215,
    comments: 54
  },
  {
    slug: "private-ai-in-healthcare-lux-care-os",
    title: "Private AI in Healthcare: How Lux Care OS is Optimizing Clinic Operations",
    subtitle: "Inside the design of a private, HIPAA-aware care operations system built for health-focused nonprofit programs and clinics.",
    date: "March 20, 2026",
    author: {
      name: "Dr. Torrey Dooley",
      role: "Partner, Lux Automaton",
      image: "/images/partner-torrey.png"
    },
    category: "Case Study",
    summary: "A deep dive into how clinics and care coordinators are leveraging Lux Care OS to automate intake workflows, SOP libraries, and staff task management securely.",
    content: [
      "Administrative work in healthcare is notoriously overwhelming. Care coordinators and clinical staff often spend more time filling out forms and managing spreadsheets than actually helping patient communities.",
      "However, using standard cloud AI tools in healthcare is a compliance nightmare due to strict privacy rules. Patient information cannot be sent to public models or shared cloud systems without strict legal agreements and infrastructure.",
      "Lux Care OS solves this by deploying a private, secure care operations platform. It organizes intake processing, SOP documentation, daily task scheduling, and follow-up tracking entirely within the clinic's private environment.",
      "By automating the operational overhead, clinical teams can reclaim hours of administrative time each week. Learn more about how Lux Care OS is transforming local care programs."
    ],
    image: "/images/lux-care-os-hero.jpg",
    linkedinUrl: "https://www.linkedin.com/company/lux-automaton-saas/posts/",
    source: "Company Update",
    likes: 112,
    comments: 23
  },
  {
    slug: "power-of-local-first-ai-security",
    title: "The Power of Local-First AI: Eliminating Data Leaks in Enterprise Systems",
    subtitle: "How running open-source LLMs on secure local networks keeps proprietary enterprise data fully private.",
    date: "March 5, 2026",
    author: {
      name: "Dr. Torrey Dooley",
      role: "Partner, Lux Automaton",
      image: "/images/partner-torrey.png"
    },
    category: "Insights",
    summary: "In the rush to adopt AI, enterprises are leaking proprietary code and IP to public LLM APIs. Here is how local-first AI solves this.",
    content: [
      "Many organizations are starting to realize that sending customer records, proprietary source code, and internal financial projections to public AI models exposes them to massive regulatory and security risks.",
      "Lux Automaton focuses on deploying custom, open-source models inside your secure local infrastructure or virtual private cloud (VPC). This means no data ever leaves your control, ensuring strict compliance with HIPAA, SOC 2, and GDPR guidelines.",
      "By optimizing models for local-first execution, we also eliminate latency and recurring API usage costs. Your intelligence network is faster, cheaper, and entirely yours."
    ],
    image: "/images/page-hero-cyber.jpg",
    linkedinUrl: "https://www.linkedin.com/company/lux-automaton-saas/posts/?feedView=all&viewAsMember=true",
    source: "Company Update",
    likes: 174,
    comments: 31
  },
  {
    slug: "lux-agent-usb-portable-operations",
    title: "Lux Agent USB: Desktop AI Agents Running Directly From a Secure Physical Drive",
    subtitle: "Take your private AI workspace anywhere. Fully self-contained operating playbooks on a plug-and-play secure USB key.",
    date: "February 18, 2026",
    author: {
      name: "Asa Spade",
      role: "Founder, Lux Automaton",
      image: "/images/founder-asa.png"
    },
    category: "Product Launch",
    summary: "Introducing Lux Agent USB, a physical encryption drive loaded with custom-compiled local models and pre-configured business templates.",
    content: [
      "For field service operators, remote teams, and highly sensitive environments, internet connectivity is either unreliable or a security risk. That is why we built Lux Agent USB.",
      "By packaging our lightweight business engines and specialized agent frameworks onto a hardware-encrypted USB drive, operators can run full client pipelines, document generation, and scheduling tools offline on any computer.",
      "Plug it in, run the secure sandbox, and start working immediately with your private local agent. It is enterprise intelligence, completely decoupled from the cloud."
    ],
    image: "/images/lux-agent-usb.jpeg",
    linkedinUrl: "https://www.linkedin.com/company/lux-automaton-saas/posts/?feedView=all&viewAsMember=true",
    source: "Company Update",
    likes: 245,
    comments: 67
  },
  {
    slug: "custom-coder-workflows-enterprise-automation",
    title: "Custom Coder Workflows: How Custom-Compiled Agents Bridge Enterprise Software Gaps",
    subtitle: "Stop waiting for vendors to build integrations. Leverage dedicated coding agents to write glue scripts and automations in real time.",
    date: "January 30, 2026",
    author: {
      name: "Asa Spade",
      role: "Founder, Lux Automaton",
      image: "/images/founder-asa.png"
    },
    category: "Case Study",
    summary: "A case study on how we used Lux Coder to generate custom Python API orchestrations, linking 30+ legacy business databases automatically.",
    content: [
      "Every enterprise has legacy databases that refuse to talk to modern cloud systems. Traditional integration projects cost hundreds of thousands of dollars and take months of planning.",
      "Using the Lux Coder agent, we deployed an autonomous developer environment that analyzes database schemas, writes secure API endpoints, and compiles custom integration connectors in a fraction of the time.",
      "By leveraging structured validation scripts, the AI safely tested and deployed these bridges without risking database integrity. It is software engineering optimized for speed and resilience."
    ],
    image: "/images/page-hero-circuit.png",
    linkedinUrl: "https://www.linkedin.com/company/lux-automaton-saas/posts/?feedView=all&viewAsMember=true",
    source: "Company Update",
    likes: 152,
    comments: 28
  }
];

interface ScrapedPost {
  id?: string;
  url?: string;
  author?: string;
  authorProfile?: string;
  authorRole?: string;
  time?: string;
  content?: string;
  reactions?: number;
  comments?: number;
  image?: string | null;
  dateCollected?: string;
}

function mapScrapedPost(post: ScrapedPost): NewsStory {
  const contentText = post.content || "";
  const lines = contentText.split("\n").map((l: string) => l.trim()).filter((l: string) => l.length > 0);
  
  // Title: first line or a default title if empty
  let title = "LinkedIn Update";
  if (lines.length > 0) {
    title = lines[0];
    if (title.length > 80) {
      title = title.substring(0, 77) + "...";
    }
  }

  // Subtitle: second line or a summary of content
  let subtitle = "Read the latest update from Lux Automaton.";
  if (lines.length > 1) {
    subtitle = lines[1];
    if (subtitle.length > 120) {
      subtitle = subtitle.substring(0, 117) + "...";
    }
  } else if (lines.length > 0 && lines[0].length > 80) {
    subtitle = lines[0].substring(80, 200) + "...";
  }

  // Category detection based on content keywords
  let category: "News" | "Insights" | "Product Launch" | "Case Study" = "Insights";
  const contentLower = contentText.toLowerCase();
  if (contentLower.includes("launch") || contentLower.includes("introducing") || contentLower.includes("now available")) {
    category = "Product Launch";
  } else if (contentLower.includes("case study") || contentLower.includes("client solution") || contentLower.includes("success pack")) {
    category = "Case Study";
  } else if (contentLower.includes("announcing") || contentLower.includes("press release") || contentLower.includes("we are excited")) {
    category = "News";
  }

  // Author mapping matching known avatars
  let authorImage = "/images/founder-asa.png"; // default
  if (post.author && post.author.toLowerCase().includes("torrey")) {
    authorImage = "/images/partner-torrey.png";
  }

  // Fallback category images if post has no photo
  let image = post.image;
  if (!image) {
    if (category === "Product Launch") {
      image = "/images/lux-coder-hero.png";
    } else if (category === "Case Study") {
      image = "/images/lux-care-os-hero.jpg";
    } else if (category === "News") {
      image = "/images/page-hero-circuit.png";
    } else {
      image = "/images/page-hero-cyber.jpg";
    }
  }

  // Summary: first paragraph
  const summary = lines.length > 0 ? lines.join(" ").substring(0, 180) + "..." : "LinkedIn Update";

  return {
    slug: post.id || "update",
    title,
    subtitle,
    date: post.time || "Recently",
    author: {
      name: post.author || "Asa Spade",
      role: post.authorRole || "Founder, Lux Automaton",
      image: authorImage,
    },
    category,
    summary,
    content: lines.length > 0 ? lines : ["Read the full update on LinkedIn."],
    image,
    linkedinUrl: post.url || "https://www.linkedin.com/company/lux-automaton-saas/posts/",
    source: (post.author && post.author.toLowerCase().includes("torrey")) ? "Company Update" : "Founder Insight",
    likes: post.reactions || 0,
    comments: post.comments || 0,
  };
}

const scrapedStories: NewsStory[] = (scrapedData as ScrapedPost[]).map(mapScrapedPost);

const combinedStories = [
  ...scrapedStories,
  ...STATIC_NEWS_STORIES
];

// Ensure exactly one story is featured (preferably the first scraped story, or fallback to static featured)
if (combinedStories.length > 0) {
  combinedStories.forEach(s => {
    s.featured = false;
  });
  combinedStories[0].featured = true;
}

export const NEWS_STORIES: NewsStory[] = combinedStories;
