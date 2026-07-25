"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

function GithubLogoIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

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
  weeklyStars: number;
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
    weeklyStars: 3513,
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
    weeklyStars: 7824,
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
    weeklyStars: 6240,
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
    weeklyStars: 2814,
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
    weeklyStars: 3899,
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

interface MoneyPlayScript {
  id: string;
  appSlug: "hermes" | "opencut" | "omniroute" | "deeptutor" | "officecli";
  appName: string;
  scriptNumber: 1 | 2;
  title: string;
  subtitle: string;
  expectedValue: string;
  language: string;
  filename: string;
  description: string;
  code: string;
  instructions: string[];
}

const MONEY_PLAY_SCRIPTS: MoneyPlayScript[] = [
  {
    id: "hermes-1",
    appSlug: "hermes",
    appName: "Hermes Agent",
    scriptNumber: 1,
    title: "Managed Client Ops Desk Daemon",
    subtitle: "Persistent memory, Telegram/Slack gateways & automated 5 PM summary dispatch",
    expectedValue: "$3,500 Setup + $999/mo Retainer",
    language: "python",
    filename: "hermes_ops_desk.py",
    description: "Deploys a background daemon script hooking Hermes Agent into client messaging channels with memory retention and daily summary reporting.",
    code: `# hermes_ops_desk.py - Hermes Agent Client Operations Daemon
import os, sys, time, json
from hermes import HermesEngine, MemoryStore, TelegramGateway

# 1. Initialize persistent client memory & messaging gateway
memory = MemoryStore(client_id="client_corp_01", db_path="./memory.db")
gateway = TelegramGateway(token=os.getenv("TELEGRAM_BOT_TOKEN"), allowed_chats=[int(os.getenv("CLIENT_CHAT_ID"))])
hermes = HermesEngine(memory=memory, gateways=[gateway], provider="anthropic/claude-3-5-sonnet")

@hermes.on_message
def handle_client_request(msg):
    print(f"[Hermes Ops] Received client prompt: {msg.text}")
    context = memory.query_relevant_context(msg.text, limit=5)
    response = hermes.run_subagent_task(prompt=msg.text, context=context)
    memory.save_interaction(msg.text, response)
    gateway.send_message(chat_id=msg.chat_id, text=response)

@hermes.scheduled(cron="0 17 * * 1-5")  # Daily 5 PM Client Status Digest
def send_daily_ops_summary():
    summary = hermes.generate_summary(days=1)
    gateway.send_message(chat_id=int(os.getenv("CLIENT_CHAT_ID")), text=f"📊 Daily Business Ops Summary:\\n{summary}")

if __name__ == "__main__":
    print("🚀 Starting Hermes Managed Ops Desk Daemon ($3,500 setup / $999/mo SLA)...")
    hermes.start()`,
    instructions: [
      "Install dependencies: pip install hermes-agent-sdk python-dotenv",
      "Set environment variables: TELEGRAM_BOT_TOKEN and CLIENT_CHAT_ID in .env",
      "Run as systemd daemon service on client VPS: python hermes_ops_desk.py"
    ]
  },
  {
    id: "hermes-2",
    appSlug: "hermes",
    appName: "Hermes Agent",
    scriptNumber: 2,
    title: "Client Intake Skill & Payment Verification Webhook",
    subtitle: "Custom JSON skill schema for Stripe client subscription validation",
    expectedValue: "Automated Onboarding Engine",
    language: "json",
    filename: "hermes_skill_intake.json",
    description: "Custom skill definition for Hermes Agent that automatically verifies Stripe payment status before creating client workspace folders.",
    code: `{
  "name": "client_intake_automation",
  "version": "1.0.0",
  "description": "Hermes Agent skill to onboard new client retainers and verify Stripe payment status",
  "trigger_keywords": ["onboard client", "new retainer", "client intake"],
  "parameters": {
    "client_name": { "type": "string", "required": true },
    "client_email": { "type": "string", "required": true },
    "retainer_tier": { "type": "string", "enum": ["starter", "pro", "enterprise"], "required": true }
  },
  "execution_flow": [
    { "step": 1, "action": "stripe_verify_subscription", "email": "$client_email" },
    { "step": 2, "action": "create_client_workspace", "folder": "/clients/$client_name" },
    { "step": 3, "action": "send_welcome_kit_email", "template": "hermes_onboarding_v1" },
    { "step": 4, "action": "register_cron_health_checks", "schedule": "daily" }
  ],
  "metadata": {
    "agency_fee": "$3,500 fixed setup",
    "recurring_sla": "$999/mo"
  }
}`,
    instructions: [
      "Save file to Hermes Agent skills directory: ~/.hermes/skills/hermes_skill_intake.json",
      "Register Stripe secret key in Hermes config: hermes config set STRIPE_SECRET_KEY=sk_live_...",
      "Test skill invocation: hermes run skill client_intake_automation --client_email user@corp.com"
    ]
  },
  {
    id: "opencut-1",
    appSlug: "opencut",
    appName: "OpenCut",
    scriptNumber: 1,
    title: "Headless Video Render Engine Pipeline",
    subtitle: "Automated 4K vertical Shorts/Reels batch export with brand watermarks",
    expectedValue: "$1,500 Setup + $399/mo Retainer",
    language: "typescript",
    filename: "opencut_render_pipeline.ts",
    description: "Headless TypeScript batch render script utilizing OpenCut core binary to export branded video assets with zero cloud subscription fees.",
    code: `// opencut_render_pipeline.ts - OpenCut Headless Batch Video Render Engine
import { OpenCutRenderEngine, BrandPreset } from "@opencut/core";
import path from "path";

async function renderClientBrandVideo(inputVideo: string, clientBrand: BrandPreset): Promise<string> {
  console.log(\`🎬 Initializing OpenCut Headless Render for \${clientBrand.name}...\`);
  
  const engine = new OpenCutRenderEngine({
    hardwareAcceleration: "metal", // or 'cuda' on Linux
    outputFormat: "mp4",
    aspectRatio: "9:16", // Vertical Reel / Short
    fps: 60
  });

  await engine.loadProject({
    tracks: [
      { type: "video", source: inputVideo },
      { type: "watermark", source: clientBrand.logoOverlayPath, opacity: 0.85, position: "top-right" },
      { type: "captions", style: clientBrand.captionStyle }
    ],
    audio: { normLevel: -14, bgMusicTrack: clientBrand.introAudioPath }
  });

  const outputPath = path.join("./exports", \`\${clientBrand.slug}_export_\${Date.now()}.mp4\`);
  await engine.exportToFile(outputPath);
  console.log(\`✅ Video rendered successfully: \${outputPath}\`);
  return outputPath;
}

// Run headless batch job
renderClientBrandVideo("./raw/interview.mp4", {
  name: "Acme Corp",
  slug: "acme_corp",
  logoOverlayPath: "./assets/acme_logo.png",
  introAudioPath: "./assets/theme.mp3",
  captionStyle: { font: "Inter", color: "#ffe45c", size: 36 }
});`,
    instructions: [
      "Install OpenCut CLI core: npm install -g @opencut/cli @opencut/core",
      "Place raw footage in ./raw/ and client logo PNG in ./assets/",
      "Execute render pipeline: npx ts-node opencut_render_pipeline.ts"
    ]
  },
  {
    id: "opencut-2",
    appSlug: "opencut",
    appName: "OpenCut",
    scriptNumber: 2,
    title: "Client Video Branding Preset Injector",
    subtitle: "Python batch overlay processor for intro/outro watermarks & presets",
    expectedValue: "Creator Retainer Automation",
    language: "python",
    filename: "opencut_preset_injector.py",
    description: "Automates applying client brand watermarks, animated intros, and custom subtitle presets to batch video uploads.",
    code: `# opencut_preset_injector.py - Batch Overlay & Watermark Automation
import os, subprocess, json

def inject_brand_preset(video_dir, brand_config_file):
    with open(brand_config_file, "r") as f:
        config = json.load(f)
    
    print(f"📦 Processing video folder {video_dir} for client: {config['client_name']}")
    output_dir = os.path.join(video_dir, "branded_output")
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(video_dir):
        if filename.endswith((".mp4", ".mov")):
            input_path = os.path.join(video_dir, filename)
            output_path = os.path.join(output_dir, f"branded_{filename}")
            
            # Execute opencut-cli preset overlay command
            cmd = [
                "opencut-cli", "process",
                "--input", input_path,
                "--output", output_path,
                "--watermark", config["watermark_path"],
                "--intro-sec", "2.5",
                "--preset", config["preset_name"]
            ]
            subprocess.run(cmd, check=True)
            print(f"✨ Branded export complete: {output_path}")

if __name__ == "__main__":
    inject_brand_preset("./client_uploads/batch_01", "./presets/acme_branding.json")`,
    instructions: [
      "Create client branding JSON config in ./presets/",
      "Run python batch script: python opencut_preset_injector.py",
      "Deliver branded videos directly to client Dropbox or Google Drive"
    ]
  },
  {
    id: "omniroute-1",
    appSlug: "omniroute",
    appName: "OmniRoute",
    scriptNumber: 1,
    title: "Multi-Provider Cost Control & Fallback Proxy Gateway",
    subtitle: "Token compression, local Ollama routing & zero-downtime provider fallback",
    expectedValue: "$1,997 Setup + $499/mo Retainer",
    language: "typescript",
    filename: "omniroute_cost_router.ts",
    description: "Deploys a proxy gateway that intercepts LLM calls, routes cheap queries to local open-source models, and falls back to Claude 3.5 / GPT-4o.",
    code: `// omniroute_cost_router.ts - Cost-Control & Fallback Proxy Gateway
import express from "express";
import { OmniRouteGateway } from "@omniroute/sdk";

const app = express();
app.use(express.json());

const gateway = new OmniRouteGateway({
  providers: [
    { name: "ollama", endpoint: "http://localhost:11434/v1", costPerToken: 0 },
    { name: "anthropic", apiKey: process.env.ANTHROPIC_API_KEY, costPerToken: 0.000015 },
    { name: "openai", apiKey: process.env.OPENAI_API_KEY, costPerToken: 0.00001 }
  ],
  routingStrategy: "cost_optimized", // Cheap Local -> Claude -> GPT-4o
  tokenCompressor: true,            // Cuts prompt token usage by 35%
  semanticCache: true               // Serves identical queries instantly from RAM
});

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await gateway.routeRequest(req.body);
    res.json(response);
  } catch (err) {
    console.error("OmniRoute Gateway Error:", err);
    res.status(500).json({ error: "Routing failure, falling back to backup provider." });
  }
});

app.listen(8080, () => console.log("🚀 OmniRoute Cost-Control Proxy live on port 8080 ($1,997 setup / $499/mo)"));`,
    instructions: [
      "Install OmniRoute SDK: npm install express @omniroute/sdk dotenv",
      "Run local Ollama instance: ollama run llama3",
      "Launch OmniRoute Proxy: npx ts-node omniroute_cost_router.ts"
    ]
  },
  {
    id: "omniroute-2",
    appSlug: "omniroute",
    appName: "OmniRoute",
    scriptNumber: 2,
    title: "Client Token Metering & Stripe Invoicing Script",
    subtitle: "Real-time consumption logger with automated Stripe line items",
    expectedValue: "Client Usage Billing Engine",
    language: "typescript",
    filename: "omniroute_metered_billing.ts",
    description: "Tracks client API consumption per workspace and logs metered usage records to Stripe for automated monthly invoicing.",
    code: `// omniroute_metered_billing.ts - Client API Consumption Tracker
import { OmniRouteLogger } from "@omniroute/analytics";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27" });

OmniRouteLogger.on("request_completed", async (event) => {
  const { tenantId, totalTokens, costSavedUsd, provider } = event;
  console.log(\`[OmniRoute Meter] Tenant \${tenantId} consumed \${totalTokens} tokens via \${provider}. Saved $\${costSavedUsd.toFixed(4)}.\`);

  // Send metered usage record to Stripe for recurring retainer billing
  await stripe.subscriptionItems.createUsageRecord(
    tenantId, // Stripe Subscription Item ID
    {
      quantity: totalTokens,
      timestamp: Math.floor(Date.now() / 1000),
      action: "increment"
    }
  );
});`,
    instructions: [
      "Import into OmniRoute proxy middleware",
      "Set STRIPE_SECRET_KEY in production env",
      "View real-time token savings report in OmniRoute admin dashboard"
    ]
  },
  {
    id: "deeptutor-1",
    appSlug: "deeptutor",
    appName: "DeepTutor",
    scriptNumber: 1,
    title: "SOP & PDF Knowledge Ingestion Engine",
    subtitle: "RAG ingestion script converting manuals into grounded quiz modules",
    expectedValue: "$2,500 Setup + $599/mo Retainer",
    language: "python",
    filename: "deeptutor_rag_ingest.py",
    description: "Parses corporate SOPs, textbooks, or training manuals into DeepTutor vector memory, generating grounded quiz modules automatically.",
    code: `# deeptutor_rag_ingest.py - DeepTutor Knowledge Base Ingestion Script
import os, json
from deeptutor import TutorEngine, PDFIngester, VectorMemory

def ingest_client_curriculum(pdf_path, course_id):
    print(f"📖 Ingesting PDF curriculum for DeepTutor: {pdf_path}")
    memory = VectorMemory(collection=course_id)
    ingester = PDFIngester(chunk_size=500, overlap=50)
    
    chunks = ingester.process(pdf_path)
    memory.store_chunks(chunks)
    
    tutor = TutorEngine(memory=memory)
    quiz_questions = tutor.generate_grounded_quiz(num_questions=10)
    
    print(f"✅ Generated 10 grounded quiz modules for course '{course_id}':")
    print(json.dumps(quiz_questions, indent=2))

if __name__ == "__main__":
    ingest_client_curriculum("./curriculum/cybersecurity_sop.pdf", "course_cyber_101")`,
    instructions: [
      "Install DeepTutor Python package: pip install deeptutor-ai pypdf langchain",
      "Place PDF documents in ./curriculum/",
      "Execute ingestion: python deeptutor_rag_ingest.py"
    ]
  },
  {
    id: "deeptutor-2",
    appSlug: "deeptutor",
    appName: "DeepTutor",
    scriptNumber: 2,
    title: "Automated Learner Progress & Mastery Reporter",
    subtitle: "TypeScript tracker emailing weekly mastery scorecards to parents or managers",
    expectedValue: "Education SLA Reporting",
    language: "typescript",
    filename: "deeptutor_progress_reporter.ts",
    description: "Queries student mastery metrics and sends automated formatted HTML progress reports to parents or department leaders.",
    code: `// deeptutor_progress_reporter.ts - Learner Mastery & Weekly Card Generator
import { DeepTutorAnalytics } from "@deeptutor/analytics";
import nodemailer from "nodemailer";

async function generateWeeklyLearnerReports(studentId: string, parentEmail: string) {
  const analytics = new DeepTutorAnalytics(studentId);
  const stats = await analytics.getWeeklyStats(); // Mastery %, weakest topics, total quiz loops completed

  const htmlReport = \`
    <div style="font-family: Arial, sans-serif; background: #060913; color: #fff; padding: 24px; border-radius: 12px;">
      <h2 style="color: #43e6ff;">🎓 DeepTutor Weekly Progress Card</h2>
      <p>Student ID: <strong>\${studentId}</strong></p>
      <p>Mastery Level: <span style="color: #00ffa3; font-size: 1.4rem;">\${stats.masteryScore}%</span></p>
      <p>Weak Topics Identified: \${stats.weakTopics.join(", ")}</p>
      <p>Recommended Practice Modules: \${stats.recommendedModules.join(", ")}</p>
    </div>
  \`;

  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: 587 });
  await transporter.sendMail({
    from: '"DeepTutor Portal" <reports@deeptutor.ai>',
    to: parentEmail,
    subject: \`Weekly Learning Report for Student \${studentId}\`,
    html: htmlReport
  });

  console.log(\`📩 Progress report dispatched to \${parentEmail}\`);
}`,
    instructions: [
      "Configure SMTP credentials in server environment",
      "Schedule script as weekly cron job (Sundays at 8 PM)",
      "Run: npx ts-node deeptutor_progress_reporter.ts"
    ]
  },
  {
    id: "officecli-1",
    appSlug: "officecli",
    appName: "OfficeCLI",
    scriptNumber: 1,
    title: "Headless PDF & Financial Sheet Generator",
    subtitle: "Node.js wrapper executing single-binary OfficeCLI without Microsoft Office",
    expectedValue: "$1,250 Setup + $349/mo Retainer",
    language: "javascript",
    filename: "officecli_pdf_generator.js",
    description: "Generates custom Word documents, populates Excel data, and renders clean PDF reports on headless servers using the self-contained OfficeCLI binary.",
    code: `// officecli_pdf_generator.js - Single Binary Document & PDF Automation
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function generateClientReport(clientData) {
  console.log(\`⚙️ Generating Word/PDF Client Report for \${clientData.company}...\`);

  const templatePath = path.join(__dirname, "templates/proposal_template.docx");
  const jsonInputPath = path.join(__dirname, "temp_data.json");
  const outputDocx = path.join(__dirname, \`exports/\${clientData.slug}_proposal.docx\`);
  const outputPdf = path.join(__dirname, \`exports/\${clientData.slug}_proposal.pdf\`);

  fs.writeFileSync(jsonInputPath, JSON.stringify(clientData));

  // Execute single binary OfficeCLI without Microsoft Office
  execSync(\`officecli fill --template "\${templatePath}" --data "\${jsonInputPath}" --out "\${outputDocx}"\`);
  execSync(\`officecli render --input "\${outputDocx}" --format pdf --out "\${outputPdf}"\`);

  console.log(\`📄 Generated docx and rendered PDF: \${outputPdf}\`);
  return outputPdf;
}

generateClientReport({ company: "Nexus Systems", slug: "nexus", monthlyRetainer: 2500, date: "2026-07-24" });`,
    instructions: [
      "Download OfficeCLI binary for Linux/Mac/Windows from GitHub releases",
      "Add officecli binary to system PATH: sudo mv officecli /usr/local/bin/",
      "Run script: node officecli_pdf_generator.js"
    ]
  },
  {
    id: "officecli-2",
    appSlug: "officecli",
    appName: "OfficeCLI",
    scriptNumber: 2,
    title: "Automated Pitch Deck Builder & Slide Previewer",
    subtitle: "Python script creating styled PowerPoint (.pptx) decks from JSON data",
    expectedValue: "Document Automation Retainer",
    language: "python",
    filename: "officecli_deck_builder.py",
    description: "Transforms survey JSON inputs directly into styled PowerPoint pitch decks with HTML visual previews.",
    code: `# officecli_deck_builder.py - Automated Presentation Deck Builder
import os, subprocess, json

def build_pitch_deck(survey_json_path, output_pptx_path):
    print(f"📊 Transforming survey data ({survey_json_path}) into PPTX pitch deck...")
    
    cmd = [
        "officecli", "create-presentation",
        "--theme", "dark_cyber_glow",
        "--data", survey_json_path,
        "--output", output_pptx_path,
        "--render-html-preview" # Generates instant web preview images
    ]
    
    subprocess.run(cmd, check=True)
    print(f"🎉 Pitch deck and web preview slides generated at: {output_pptx_path}")

if __name__ == "__main__":
    build_pitch_deck("./client_data/survey_results.json", "./decks/client_pitch_deck.pptx")`,
    instructions: [
      "Ensure officecli binary is executable in environment",
      "Pass client survey JSON data file",
      "Run Python deck builder: python officecli_deck_builder.py"
    ]
  }
];

export default function AppReviewPage() {
  const [selectedApp, setSelectedApp] = useState<AppReviewItem | null>(null);
  const [activeTab, setActiveTab] = useState<"roundup" | "article" | "money-play" | "grading" | "subscriptions">("roundup");
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const copyCode = (script: MoneyPlayScript) => {
    navigator.clipboard.writeText(script.code);
    setCopiedScriptId(script.id);
    setTimeout(() => setCopiedScriptId(null), 2500);
  };

  const getAppScripts = (slug: "hermes" | "opencut" | "omniroute" | "deeptutor" | "officecli") => {
    return MONEY_PLAY_SCRIPTS.filter((s) => s.appSlug === slug);
  };

  return (
    <div style={{ background: "var(--bg-base)", color: "var(--text-primary)", minHeight: "100vh", paddingTop: "88px", paddingBottom: "80px" }}>
      
      {/* Top Banner & Header with Background Video Hero */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(108, 71, 255, 0.25)", background: "#060913", padding: "40px 0 44px" }}>
        
        {/* Background Video Hero (10% Zoomed to crop lower-right logo) */}
        <video 
          src={prefixPath("/videos/the-ai-workflow-stack-top-5.mp4")} 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0.38, transform: "scale(1.10)", transformOrigin: "center center" }} 
        />
        
        {/* Dark Gradient Overlay for Readability */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6, 9, 19, 0.65) 0%, rgba(11, 15, 25, 0.92) 100%)", zIndex: 1 }}></div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          {/* Header Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0, 212, 255, 0.4)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)", flexShrink: 0 }}>
                <Image 
                  src={prefixPath("/images/lux-app-review-hexagon-logo.png")} 
                  alt="Lux App Review Official Hexagon Logo" 
                  width={42} 
                  height={42} 
                  style={{ objectFit: "cover" }} 
                />
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.15em", color: "var(--lux-cyan)", textTransform: "uppercase", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <GithubLogoIcon size={14} color="var(--lux-cyan)" />
                  <span>LUX APP REVIEW • AUTOMATED GITHUB APP INTELLIGENCE</span>
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

          {/* Title & Subtitle */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "28px" }}>
            <div style={{ maxWidth: "800px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0, 212, 255, 0.1)", border: "1px solid rgba(0, 212, 255, 0.3)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700, color: "var(--lux-cyan)", marginBottom: "12px" }}>
                <GithubLogoIcon size={14} color="var(--lux-cyan)" />
                <span>Top 5 GitHub Apps to Watch This Week</span>
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                Weekly GitHub App Rankings &amp; Intelligence
              </h1>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginTop: "12px", marginBottom: 0, lineHeight: 1.6 }}>
                Independent research, operational scoring, and subscriber commercial plays for high-momentum open-source repositories.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a
                href="/documents/Lux_App_Review_Top_5_2026-07-24.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "linear-gradient(135deg, var(--lux-cyan), var(--lux-indigo))", color: "#fff", padding: "10px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>Full Review PDF 📥</span>
              </a>
              <a
                href="/documents/Lux_App_Review_Money_Play_2026-07-24.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "rgba(255, 215, 0, 0.12)", border: "1px solid #ffd700", color: "#ffe45c", padding: "10px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>👑 Subscriber Money Play PDF</span>
              </a>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div style={{ display: "flex", overflowX: "auto", gap: "8px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "12px" }}>
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
              🏆 Top 5 Weekly Rankings &amp; Charts
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
              💰 Subscriber Money Play (5 Offers &amp; 10 Embedded Scripts)
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
              👑 Subscriptions &amp; Money Play Access
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
                <div style={{ width: "240px", maxWidth: "100%", height: "135px", position: "relative", flexShrink: 0, borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0, 212, 255, 0.4)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)", background: "#060913" }}>
                  <Image src={prefixPath("/images/01-thumbnail-top-5-github-apps.png")} alt="Top 5 GitHub Apps to Watch This Week" fill style={{ objectFit: "contain" }} />
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

            {/* ANIMATED GAUGES & CHARTS ROW */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
              
              {/* RADAR CHART CARD (Page 2 PDF) */}
              <div style={{ background: "rgba(17, 24, 39, 0.75)", border: "1px solid rgba(0, 212, 255, 0.25)", borderRadius: "16px", padding: "24px", backdropFilter: "blur(20px)", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>7-DIMENSION EVALUATION</span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: "2px 0 0" }}>Lux Score Profiles (Radar Chart)</h3>
                  </div>
                  <span style={{ fontSize: "0.75rem", background: "rgba(0, 212, 255, 0.1)", color: "var(--lux-cyan)", padding: "4px 10px", borderRadius: "12px", border: "1px solid rgba(0,212,255,0.3)" }}>
                    Interactive Vector
                  </span>
                </div>

                {/* SVG RADAR GRAPHIC */}
                <div style={{ position: "relative", width: "100%", height: "260px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <svg viewBox="0 0 320 260" style={{ width: "100%", height: "100%" }}>
                    {/* Concentric Web Rings */}
                    <polygon points="160,30 240,65 260,140 210,210 110,210 60,140 80,65" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <polygon points="160,55 220,81 235,140 197,192 122,192 85,140 100,81" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <polygon points="160,80 200,97 210,140 185,175 135,175 110,140 120,97" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    
                    {/* Axis Lines */}
                    <line x1="160" y1="140" x2="160" y2="30" stroke="rgba(0, 212, 255, 0.25)" strokeDasharray="3 3" />
                    <line x1="160" y1="140" x2="240" y2="65" stroke="rgba(0, 212, 255, 0.25)" strokeDasharray="3 3" />
                    <line x1="160" y1="140" x2="260" y2="140" stroke="rgba(0, 212, 255, 0.25)" strokeDasharray="3 3" />
                    <line x1="160" y1="140" x2="210" y2="210" stroke="rgba(0, 212, 255, 0.25)" strokeDasharray="3 3" />
                    <line x1="160" y1="140" x2="110" y2="210" stroke="rgba(0, 212, 255, 0.25)" strokeDasharray="3 3" />
                    <line x1="160" y1="140" x2="60" y2="140" stroke="rgba(0, 212, 255, 0.25)" strokeDasharray="3 3" />
                    <line x1="160" y1="140" x2="80" y2="65" stroke="rgba(0, 212, 255, 0.25)" strokeDasharray="3 3" />

                    {/* App 1 Polygon: Hermes Agent (Cyan) */}
                    <polygon points="160,35 235,68 252,140 205,205 115,202 65,140 85,68" fill="rgba(0, 212, 255, 0.18)" stroke="var(--lux-cyan)" strokeWidth="2" />
                    
                    {/* App 2 Polygon: OpenCut (Pink) */}
                    <polygon points="160,40 230,72 250,140 200,200 120,195 62,140 88,72" fill="rgba(255, 0, 128, 0.15)" stroke="#ff0080" strokeWidth="1.5" strokeDasharray="4 2" />

                    {/* Labels */}
                    <text x="160" y="20" fill="var(--lux-cyan)" fontSize="9" textAnchor="middle" fontWeight="bold">Project Health</text>
                    <text x="250" y="60" fill="var(--text-muted)" fontSize="8">Momentum</text>
                    <text x="270" y="143" fill="var(--text-muted)" fontSize="8">Usefulness</text>
                    <text x="215" y="222" fill="var(--text-muted)" fontSize="8">Innovation</text>
                    <text x="105" y="222" fill="var(--text-muted)" fontSize="8">Quality</text>
                    <text x="45" y="143" fill="var(--text-muted)" fontSize="8">Trust &amp; Safety</text>
                    <text x="70" y="60" fill="var(--text-muted)" fontSize="8">Ease of Use</text>
                  </svg>
                </div>

                {/* Radar Legend */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "12px", fontSize: "0.72rem" }}>
                  <span style={{ color: "var(--lux-cyan)", display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "8px", background: "var(--lux-cyan)", borderRadius: "50%" }}></span> Hermes Agent (92)</span>
                  <span style={{ color: "#ff0080", display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "8px", background: "#ff0080", borderRadius: "50%" }}></span> OpenCut (88)</span>
                  <span style={{ color: "var(--lux-indigo)", display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "8px", background: "var(--lux-indigo)", borderRadius: "50%" }}></span> OmniRoute (87)</span>
                  <span style={{ color: "var(--lux-mint)", display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "8px", background: "var(--lux-mint)", borderRadius: "50%" }}></span> DeepTutor (86)</span>
                  <span style={{ color: "#ffe45c", display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "8px", height: "8px", background: "#ffe45c", borderRadius: "50%" }}></span> OfficeCLI (84)</span>
                </div>
              </div>

              {/* STAR GROWTH BAR CHART CARD (Page 2 PDF) */}
              <div style={{ background: "rgba(17, 24, 39, 0.75)", border: "1px solid rgba(108, 71, 255, 0.25)", borderRadius: "16px", padding: "24px", backdropFilter: "blur(20px)", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-mint)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>INDEPENDENT MOMENTUM ESTIMATE</span>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: "2px 0 0" }}>Estimated Weekly Star Growth</h3>
                  </div>
                  <span style={{ fontSize: "0.75rem", background: "rgba(0, 255, 163, 0.1)", color: "var(--lux-mint)", padding: "4px 10px", borderRadius: "12px", border: "1px solid rgba(0,255,163,0.3)" }}>
                    July 15–22 Snapshot
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "12px" }}>
                  {/* OpenCut */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      <span>OpenCut (Creator Tool)</span>
                      <span style={{ color: "#ff0080", fontFamily: "var(--font-mono)" }}>+7,824 stars / wk</span>
                    </div>
                    <div style={{ width: "100%", height: "14px", background: "rgba(255,255,255,0.06)", borderRadius: "7px", overflow: "hidden" }}>
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #ff0080, #ff66c4)", borderRadius: "7px" }}></div>
                    </div>
                  </div>

                  {/* OmniRoute */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      <span>OmniRoute (AI Infrastructure)</span>
                      <span style={{ color: "var(--lux-indigo)", fontFamily: "var(--font-mono)" }}>+6,240 stars / wk</span>
                    </div>
                    <div style={{ width: "100%", height: "14px", background: "rgba(255,255,255,0.06)", borderRadius: "7px", overflow: "hidden" }}>
                      <div style={{ width: "80%", height: "100%", background: "linear-gradient(90deg, var(--lux-indigo), var(--lux-cyan))", borderRadius: "7px" }}></div>
                    </div>
                  </div>

                  {/* OfficeCLI */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      <span>OfficeCLI (Document Automation)</span>
                      <span style={{ color: "#ffe45c", fontFamily: "var(--font-mono)" }}>+3,899 stars / wk</span>
                    </div>
                    <div style={{ width: "100%", height: "14px", background: "rgba(255,255,255,0.06)", borderRadius: "7px", overflow: "hidden" }}>
                      <div style={{ width: "50%", height: "100%", background: "linear-gradient(90deg, #ffe45c, #ff9900)", borderRadius: "7px" }}></div>
                    </div>
                  </div>

                  {/* Hermes Agent */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      <span>Hermes Agent (AI Agent)</span>
                      <span style={{ color: "var(--lux-cyan)", fontFamily: "var(--font-mono)" }}>+3,513 stars / wk</span>
                    </div>
                    <div style={{ width: "100%", height: "14px", background: "rgba(255,255,255,0.06)", borderRadius: "7px", overflow: "hidden" }}>
                      <div style={{ width: "45%", height: "100%", background: "linear-gradient(90deg, var(--lux-cyan), #00bfff)", borderRadius: "7px" }}></div>
                    </div>
                  </div>

                  {/* DeepTutor */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                      <span>DeepTutor (Education AI)</span>
                      <span style={{ color: "var(--lux-mint)", fontFamily: "var(--font-mono)" }}>+2,814 stars / wk</span>
                    </div>
                    <div style={{ width: "100%", height: "14px", background: "rgba(255,255,255,0.06)", borderRadius: "7px", overflow: "hidden" }}>
                      <div style={{ width: "36%", height: "100%", background: "linear-gradient(90deg, var(--lux-mint), #00ffaa)", borderRadius: "7px" }}></div>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "16px", fontStyle: "italic", textAlign: "right" }}>
                  *Momentum figures are third-party snapshot estimates; repository metrics change continuously.
                </div>
              </div>

            </div>

            {/* Ranking Table Card */}
            <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(108, 71, 255, 0.2)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                    <GithubLogoIcon size={20} color="#fff" />
                    <span>Weekly Open-Source App Rankings</span>
                  </h2>
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
                          <div style={{ fontWeight: 800, color: "#fff", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
                            <GithubLogoIcon size={16} color="var(--lux-cyan)" />
                            <span>{app.name}</span>
                          </div>
                          <a href={app.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textDecoration: "none" }}>{app.repo} ↗</a>
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
                        <td style={{ padding: "16px", fontWeight: 700, color: "#fff" }}>{app.stars}</td>
                        <td style={{ padding: "16px", color: "var(--text-muted)" }}>{app.forks}</td>
                        <td style={{ padding: "16px" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{app.language}</span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <button
                            onClick={() => setSelectedApp(app)}
                            style={{ background: "rgba(0, 212, 255, 0.1)", border: "1px solid rgba(0, 212, 255, 0.3)", color: "var(--lux-cyan)", padding: "6px 12px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                          >
                            Full Details →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* WEEKLY TAKEAWAYS SECTION (Page 9 PDF) */}
            <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(0, 212, 255, 0.25)", borderRadius: "18px", padding: "28px" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "4px" }}>
                EDITORIAL VERDICT HIGHLIGHTS
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", margin: "0 0 20px" }}>Weekly Takeaways &amp; Key Findings</h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255, 0, 128, 0.3)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ff0080", fontFamily: "var(--font-mono)" }}>BIGGEST MOMENTUM</div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", margin: "6px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <GithubLogoIcon size={16} color="#ff0080" />
                    <span>OpenCut</span>
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>Recorded the strongest independent weekly growth estimate (+7,824 stars/week), but its ground-up rewrite status keeps the verdict pilot-first.</p>
                </div>

                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 212, 255, 0.3)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", fontFamily: "var(--font-mono)" }}>BEST OVERALL PLATFORM</div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", margin: "6px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <GithubLogoIcon size={16} color="var(--lux-cyan)" />
                    <span>Hermes Agent</span>
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>Receives the highest Lux Score (92/100) because of its persistent memory, scheduling, subagents, multi-surface messaging, and MIT license.</p>
                </div>

                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(108, 71, 255, 0.3)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-indigo)", fontFamily: "var(--font-mono)" }}>BEST INFRASTRUCTURE PLAY</div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", margin: "6px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <GithubLogoIcon size={16} color="var(--lux-indigo)" />
                    <span>OmniRoute</span>
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>Simplifies multi-provider LLM stacks with fallback routing and token compression, but must be hardened like credential-bearing infrastructure.</p>
                </div>

                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 255, 163, 0.3)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-mint)", fontFamily: "var(--font-mono)" }}>BEST EDUCATION OPPORTUNITY</div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", margin: "6px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <GithubLogoIcon size={16} color="var(--lux-mint)" />
                    <span>DeepTutor</span>
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>Provides the strongest personalized-learning architecture with grounded problem solving, learner memory, and research backing.</p>
                </div>

                <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255, 228, 92, 0.3)", borderRadius: "12px", padding: "18px" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ffe45c", fontFamily: "var(--font-mono)" }}>BEST HIDDEN GEM</div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", margin: "6px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <GithubLogoIcon size={16} color="#ffe45c" />
                    <span>OfficeCLI</span>
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>Targets a narrow but high-value problem: creating, editing, and visually validating Word, Excel, and PPT files without MS Office.</p>
                </div>
              </div>
            </div>

            {/* SAFE INSTALL CHECKLIST & SOURCE REGISTER (Page 10 PDF) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              
              {/* Safe Install Checklist */}
              <div style={{ background: "rgba(17, 24, 39, 0.75)", border: "1px solid rgba(0, 255, 163, 0.25)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "1.4rem" }}>🛡️</span>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: 0 }}>Safe Install &amp; Hardening Checklist</h4>
                    <span style={{ fontSize: "0.7rem", color: "var(--lux-mint)", fontFamily: "var(--font-mono)" }}>OPERATIONAL PROTOCOL</span>
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
                  <li>Confirm exact repository owner and official domain website before cloning.</li>
                  <li>Read license terms, security policy, and recent release notes carefully.</li>
                  <li>Inspect installation scripts before executing remote shell commands (`curl | sh`).</li>
                  <li>Test new tools with non-sensitive data inside isolated Docker containers.</li>
                  <li>Enforce least-privilege API scopes and dedicated service accounts.</li>
                  <li>Enable authentication, security logging, backups, and documented rollback plans.</li>
                  <li>Require explicit human approval before pushing code to production servers.</li>
                  <li>Refresh repository metrics immediately prior to commercial deployment.</li>
                </ul>
              </div>

              {/* Verified Source Register */}
              <div style={{ background: "rgba(17, 24, 39, 0.75)", border: "1px solid rgba(0, 212, 255, 0.25)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <GithubLogoIcon size={22} color="var(--lux-cyan)" />
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: 0 }}>Verified Source Register (16 Primary Links)</h4>
                    <span style={{ fontSize: "0.7rem", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)" }}>RESEARCH AUDIT REGISTER</span>
                  </div>
                </div>
                <div style={{ maxHeight: "210px", overflowY: "auto", fontSize: "0.78rem", display: "flex", flexDirection: "column", gap: "8px", paddingRight: "6px" }}>
                  <a href="https://github.com/trending" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>1. GitHub Trending Discovery Registry ↗</a>
                  <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>2. Hermes Agent Repository (NousResearch) ↗</a>
                  <a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>3. Hermes Agent Official Documentation &amp; Site ↗</a>
                  <a href="https://github.com/OpenCut-app/OpenCut" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>4. OpenCut Repository (OpenCut-app) ↗</a>
                  <a href="https://opencut.app/roadmap" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>5. OpenCut Official Roadmap &amp; Architecture ↗</a>
                  <a href="https://github.com/diegosouzapw/OmniRoute" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>6. OmniRoute Repository (diegosouzapw) ↗</a>
                  <a href="https://github.com/HKUDS/DeepTutor" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>7. DeepTutor Repository (HKUDS) ↗</a>
                  <a href="https://arxiv.org/abs/2604.26962" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>8. DeepTutor Research Paper (arXiv:2604.26962) ↗</a>
                  <a href="https://github.com/iOfficeAI/OfficeCLI" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>9. OfficeCLI Repository (iOfficeAI) ↗</a>
                  <a href="https://whatstrending.ai/repos" target="_blank" rel="noreferrer" style={{ color: "var(--lux-cyan)", textDecoration: "none" }}>10. Independent Weekly Trend Snapshot ↗</a>
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
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginTop: "2px" }}>Download Complete PDFs &amp; Implementation Guides</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  <a
                    href="/documents/Lux_App_Review_Top_5_2026-07-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "linear-gradient(135deg, var(--lux-cyan), var(--lux-mint))", color: "#0b0f19", padding: "10px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  >
                    📄 Download Full Review PDF
                  </a>
                  <a
                    href="/documents/Lux_App_Review_Money_Play_2026-07-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffe45c", padding: "10px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none" }}
                  >
                    🔒 Subscriber Money Play PDF
                  </a>
                </div>
              </div>
            </div>

            {/* LUX LEADERSHIP PODCAST CARD WITH HOSTS PHOTO & M4A AUDIO PLAYER */}
            <div style={{ background: "linear-gradient(135deg, rgba(108, 71, 255, 0.18), rgba(9, 14, 26, 0.95))", border: "1px solid rgba(108, 71, 255, 0.4)", borderRadius: "20px", padding: "28px", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", backdropFilter: "blur(20px)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "center" }}>
                
                {/* Podcast Studio Hosts Photo */}
                <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(0, 212, 255, 0.4)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", background: "#060913" }}>
                  <Image 
                    src={prefixPath("/images/lux-app-review-podcast-hosts.jpg")} 
                    alt="LANA &amp; DRE Podcast Studio Hosts - Lux Leadership Podcast" 
                    fill 
                    style={{ objectFit: "cover" }} 
                  />
                  <div style={{ position: "absolute", bottom: "12px", left: "14px", background: "rgba(6, 9, 19, 0.88)", padding: "4px 12px", borderRadius: "8px", border: "1px solid rgba(0, 212, 255, 0.3)", fontSize: "0.7rem", color: "var(--lux-cyan)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>
                    🎙️ LANA &amp; DRE • LUX LEADERSHIP STUDIO
                  </div>
                </div>

                {/* Podcast Audio Player & Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(108, 71, 255, 0.2)", border: "1px solid var(--lux-indigo)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-mono)", width: "fit-content" }}>
                    <span>🎧 OFFICIAL FEATURED PODCAST EPISODE</span>
                  </div>
                  
                  <h3 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.25 }}>
                    Security Risks of Open-Source AI Agents
                  </h3>
                  
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                    Listen to the Lux Leadership Studio episode dissecting prompt injection vectors, least-privilege tool sandbox isolation, credential protection, and risk mitigation when running autonomous open-source agent runtimes in business environments.
                  </p>

                  {/* HTML5 Audio Player */}
                  <div style={{ background: "rgba(6, 9, 19, 0.85)", border: "1px solid rgba(0, 212, 255, 0.3)", borderRadius: "12px", padding: "14px 16px", marginTop: "4px" }}>
                    <audio 
                      controls 
                      src={prefixPath("/audio/Security_Risks_of_Open_Source_AI_Agents.m4a")} 
                      style={{ width: "100%", height: "40px", borderRadius: "8px" }} 
                    />
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px", marginTop: "8px", fontSize: "0.75rem" }}>
                      <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>📻 Audio: Security_Risks_of_Open_Source_AI_Agents.m4a</span>
                      <a 
                        href="/audio/Security_Risks_of_Open_Source_AI_Agents.m4a" 
                        download 
                        style={{ color: "var(--lux-cyan)", fontWeight: 800, textDecoration: "none", fontFamily: "var(--font-mono)" }}
                      >
                        Download M4A Audio 📥
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Article High-Res Hero Photo Banner */}
            <div style={{ position: "relative", width: "100%", height: "480px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0, 212, 255, 0.4)", boxShadow: "0 25px 50px rgba(0,0,0,0.6)", background: "#060913" }}>
              <Image 
                src={prefixPath("/images/hero.png")} 
                alt="Top 5 GitHub Apps to Watch This Week Hero Photograph" 
                fill 
                style={{ objectFit: "cover" }} 
                priority 
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6, 9, 19, 0.2) 0%, rgba(6, 9, 19, 0.85) 100%)" }}></div>
              <div style={{ position: "absolute", bottom: "24px", left: "32px", right: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <span style={{ background: "var(--lux-cyan)", color: "#0b0f19", fontSize: "0.75rem", fontWeight: 900, padding: "4px 12px", borderRadius: "12px", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    EDITORIAL HERO PHOTOGRAPH
                  </span>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", margin: "6px 0 0", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                    Top 5 GitHub Open-Source Apps Review
                  </h3>
                </div>
                <span style={{ fontSize: "0.8rem", color: "#ffe45c", fontFamily: "var(--font-mono)", background: "rgba(0,0,0,0.6)", padding: "4px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Photo Citation: Lux App Review Kit
                </span>
              </div>
            </div>

            {/* FEATURED VIDEO SHOWCASE CARD (10% Zoomed Scale to Crop Lower-Right Logo) */}
            <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(0, 212, 255, 0.4)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.7)" }}>
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#060913", overflow: "hidden" }}>
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={prefixPath("/videos/the-ai-workflow-stack-top-5.mp4")}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scale(1.10)",
                    transformOrigin: "center center"
                  }}
                />
              </div>
              <div style={{ padding: "18px 24px", background: "rgba(6, 9, 19, 0.92)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div>
                  <span style={{ background: "var(--lux-cyan)", color: "#0b0f19", fontSize: "0.7rem", fontWeight: 900, padding: "3px 10px", borderRadius: "10px", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    🎥 FEATURED VIDEO EVALUATION
                  </span>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff", margin: "4px 0 0" }}>
                    The AI Workflow Stack: Top 5 GitHub Tools Evaluated
                  </h4>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--lux-mint)", fontFamily: "var(--font-mono)", background: "rgba(0, 255, 163, 0.1)", padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(0, 255, 163, 0.3)" }}>
                  🔍 10% Zoom Scale Active (Cropped Lower-Right Logo)
                </div>
              </div>
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

              {/* Executive Summary 4-Photo High-Res Gallery */}
              <div style={{ margin: "32px 0" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-cyan)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: "14px" }}>
                  📷 EXECUTIVE SUMMARY EDITORIAL PHOTOGRAPHY &amp; VISUALS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                  
                  {/* Photo 1: Hero Visual */}
                  <div style={{ background: "#060913", border: "1px solid rgba(0, 212, 255, 0.35)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 15px 35px rgba(0,0,0,0.5)" }}>
                    <div style={{ position: "relative", width: "100%", height: "200px", background: "#0b0f19" }}>
                      <Image src={prefixPath("/images/hero.png")} alt="Top 5 GitHub Apps Editorial Hero" fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>Top 5 GitHub Apps Hero Visual</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>Primary editorial photograph from the publication kit</div>
                    </div>
                  </div>

                  {/* Photo 2: Editorial Workspace */}
                  <div style={{ background: "#060913", border: "1px solid rgba(108, 71, 255, 0.35)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 15px 35px rgba(0,0,0,0.5)" }}>
                    <div style={{ position: "relative", width: "100%", height: "200px", background: "#0b0f19" }}>
                      <Image src={prefixPath("/images/editorial-workspace.png")} alt="Lux Editorial Workspace" fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>Editorial Research Workspace</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>Evaluation workflow and research environment</div>
                    </div>
                  </div>

                  {/* Photo 3: Radar Score System */}
                  <div style={{ background: "#060913", border: "1px solid rgba(0, 255, 163, 0.35)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 15px 35px rgba(0,0,0,0.5)" }}>
                    <div style={{ position: "relative", width: "100%", height: "200px", background: "#0b0f19" }}>
                      <Image src={prefixPath("/images/score-visual.png")} alt="Lux Score 7-Dimension Rating Framework" fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>7-Dimension Lux Score System</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>Radar evaluation metrics and weightings</div>
                    </div>
                  </div>

                  {/* Photo 4: Social Preview */}
                  <div style={{ background: "#060913", border: "1px solid rgba(255, 215, 0, 0.35)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 15px 35px rgba(0,0,0,0.5)" }}>
                    <div style={{ position: "relative", width: "100%", height: "200px", background: "#0b0f19" }}>
                      <Image src={prefixPath("/images/social-preview.png")} alt="Lux App Review Social Preview Card" fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>Publication &amp; Social Card</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>Social media and newsletter distribution preview</div>
                    </div>
                  </div>

                </div>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "40px 0" }} />

              {/* Review Sections for Each App */}
              {TOP_5_APPS.map((app) => (
                <div key={app.rank} style={{ marginBottom: "48px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <span style={{ background: "var(--lux-cyan)", color: "#0b0f19", fontWeight: 900, padding: "4px 10px", borderRadius: "8px", fontSize: "0.9rem" }}>
                      #{app.rank}
                    </span>
                    <h3 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                      <GithubLogoIcon size={22} color="var(--lux-cyan)" />
                      <span>{app.name}</span>
                    </h3>
                    <a href={app.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textDecoration: "none" }}>
                      ({app.repo}) ↗
                    </a>
                  </div>

                  <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(0, 212, 255, 0.2)", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>LUX SCORE: </span>
                      <strong style={{ color: "var(--lux-cyan)", fontSize: "1.1rem" }}>{app.score}/100 ({app.grade})</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>VERDICT: </span>
                      <strong style={{ color: "#fff" }}>{app.verdict}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>LICENSE: </span>
                      <strong style={{ color: "var(--lux-mint)" }}>{app.license}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>WEEKLY GROWTH: </span>
                      <strong style={{ color: "#ffe45c" }}>+{app.weeklyStars.toLocaleString()} stars</strong>
                    </div>
                  </div>

                  <p><strong>What it solves:</strong> {app.solves}</p>
                  <p><strong>Best fit:</strong> {app.bestFor}</p>
                  
                  <div style={{ marginTop: "16px" }}>
                    <strong style={{ color: "#fff" }}>Why it stands out:</strong>
                    <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                      {app.standout.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "6px" }}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "16px" }}>
                    <strong style={{ color: "#ff6b6b" }}>Limitations and risks:</strong>
                    <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                      {app.risks.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "6px", color: "var(--text-secondary)" }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* TAB 3: SUBSCRIBER MONEY PLAY (COMMERCIAL OFFERS WITH EMBEDDED SCRIPTS) */}
        {activeTab === "money-play" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            
            {/* Subscriber Hero Banner */}
            <div style={{ background: "linear-gradient(135deg, rgba(255, 215, 0, 0.12), rgba(9, 14, 26, 0.95))", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "20px", padding: "32px", boxShadow: "0 0 40px rgba(255, 215, 0, 0.15)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffe45c", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800, fontFamily: "var(--font-mono)", marginBottom: "12px" }}>
                    <span>👑</span> SUBSCRIBER MONEY PLAY INTELLIGENCE • KIT LAR-W30-2026-0724
                  </div>
                  <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                    5 High-Ticket Commercial Offers with Embedded Implementation Scripts
                  </h2>
                  <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "8px", margin: 0, maxWidth: "780px", lineHeight: 1.6 }}>
                    Turn open-source GitHub repositories into $1,250 – $3,500 setup fees and $349 – $999/mo recurring service retainers. Each play below includes 2 copy-and-paste runnable scripts placed directly under the commercial offer.
                  </p>
                </div>

                <a
                  href="/documents/Lux_App_Review_Money_Play_2026-07-24.pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: "linear-gradient(135deg, #ffd700, #ff9900)", color: "#0b0f19", padding: "14px 24px", borderRadius: "12px", fontWeight: 900, fontSize: "0.9rem", textDecoration: "none", boxShadow: "0 0 25px rgba(255, 215, 0, 0.3)" }}
                >
                  Download Money Play PDF (141 KB) 📥
                </a>
              </div>
            </div>

            {/* 5 COMMERCIAL MONEY PLAYS OFFER GRID (WITH EMBEDDED SCRIPTS DIRECTLY UNDER EACH PLAY) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              
              {/* PLAY 1: HERMES AGENT */}
              <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(0, 212, 255, 0.3)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(20px)", boxShadow: "0 0 25px rgba(0, 212, 255, 0.08)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "20px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(0, 212, 255, 0.15)", border: "1px solid var(--lux-cyan)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                      🤖
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-cyan)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                        <GithubLogoIcon size={14} color="var(--lux-cyan)" />
                        <span>PLAY 01 • BASED ON HERMES AGENT (MIT)</span>
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

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "28px" }}>
                  <div>
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-cyan)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                    <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Small businesses, digital agencies, creators, and busy operations teams.</p>
                    
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-cyan)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK &amp; OFFER</h5>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      Deploy Hermes Agent on private client VPS infrastructure, connect Telegram/Slack/Email gateways, build 3 custom business skill workflows, set up memory retention rules, and maintain 24/7 logging with monthly skill tuning.
                    </p>
                  </div>

                  <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                    <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                    <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      <li>Always-on Hermes Agent VPS deployment with zero per-seat SaaS costs</li>
                      <li>Telegram, Slack, and Email operational messaging gateways</li>
                      <li>3 Custom Business Automation Skills (Lead Intake, Summary, Scheduling)</li>
                      <li>Monthly Retainer SLA: 24/7 uptime monitoring &amp; skill updates</li>
                    </ul>
                  </div>
                </div>

                {/* EMBEDDED SCRIPTS UNDER PLAY 1 */}
                <div style={{ borderTop: "1px solid rgba(0, 212, 255, 0.2)", paddingTop: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-cyan)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "16px" }}>
                    💻 PLAY 01 CODE SCRIPTS (HERMES AGENT)
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {getAppScripts("hermes").map((script) => (
                      <div key={script.id} style={{ background: "#060913", border: "1px solid rgba(0, 212, 255, 0.25)", borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <div>
                            <span style={{ background: "var(--lux-cyan)", color: "#0b0f19", fontWeight: 900, padding: "2px 8px", borderRadius: "4px", fontSize: "0.65rem", fontFamily: "var(--font-mono)", marginRight: "8px" }}>
                              SCRIPT #{script.scriptNumber}
                            </span>
                            <strong style={{ color: "#fff", fontSize: "1.05rem" }}>{script.title}</strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{script.subtitle}</div>
                          </div>
                          <button
                            onClick={() => copyCode(script)}
                            style={{ background: copiedScriptId === script.id ? "var(--lux-mint)" : "rgba(0, 212, 255, 0.15)", border: "1px solid var(--lux-cyan)", color: copiedScriptId === script.id ? "#0b0f19" : "var(--lux-cyan)", padding: "6px 14px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}
                          >
                            {copiedScriptId === script.id ? "✓ Copied!" : "📋 Copy Code"}
                          </button>
                        </div>
                        <pre style={{ background: "rgba(11, 15, 25, 0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", overflowX: "auto", whiteSpace: "pre-wrap", margin: "0 0 12px", lineHeight: 1.5 }}>
                          {script.code}
                        </pre>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "#ffe45c" }}>Steps: </strong> {script.instructions.join(" • ")}
                        </div>
                      </div>
                    ))}
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
                      <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-indigo)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                        <GithubLogoIcon size={14} color="var(--lux-indigo)" />
                        <span>PLAY 02 • BASED ON OPENCUT (MIT)</span>
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

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "28px" }}>
                  <div>
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-indigo)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                    <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Creators, schools, nonprofits, agencies, and privacy-sensitive media teams.</p>
                    
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-indigo)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK &amp; OFFER</h5>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      Deploy a branded private video editing workspace, prepare reusable brand video templates, train the editing team, document local storage and export workflows, and provide monthly software updates and technical support.
                    </p>
                  </div>

                  <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                    <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                    <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      <li>Self-hosted or desktop OpenCut deployment with zero recurring seat fees</li>
                      <li>5 Branded Brand Video Project Templates &amp; Presets</li>
                      <li>Team Workflow &amp; Local Storage Safety Playbook</li>
                      <li>Monthly Software Update Patching &amp; Feature Training</li>
                    </ul>
                  </div>
                </div>

                {/* EMBEDDED SCRIPTS UNDER PLAY 2 */}
                <div style={{ borderTop: "1px solid rgba(108, 71, 255, 0.2)", paddingTop: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-indigo)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "16px" }}>
                    💻 PLAY 02 CODE SCRIPTS (OPENCUT)
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {getAppScripts("opencut").map((script) => (
                      <div key={script.id} style={{ background: "#060913", border: "1px solid rgba(108, 71, 255, 0.25)", borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <div>
                            <span style={{ background: "var(--lux-indigo)", color: "#fff", fontWeight: 900, padding: "2px 8px", borderRadius: "4px", fontSize: "0.65rem", fontFamily: "var(--font-mono)", marginRight: "8px" }}>
                              SCRIPT #{script.scriptNumber}
                            </span>
                            <strong style={{ color: "#fff", fontSize: "1.05rem" }}>{script.title}</strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{script.subtitle}</div>
                          </div>
                          <button
                            onClick={() => copyCode(script)}
                            style={{ background: copiedScriptId === script.id ? "var(--lux-mint)" : "rgba(108, 71, 255, 0.2)", border: "1px solid var(--lux-indigo)", color: copiedScriptId === script.id ? "#0b0f19" : "#fff", padding: "6px 14px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}
                          >
                            {copiedScriptId === script.id ? "✓ Copied!" : "📋 Copy Code"}
                          </button>
                        </div>
                        <pre style={{ background: "rgba(11, 15, 25, 0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", overflowX: "auto", whiteSpace: "pre-wrap", margin: "0 0 12px", lineHeight: 1.5 }}>
                          {script.code}
                        </pre>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "#ffe45c" }}>Steps: </strong> {script.instructions.join(" • ")}
                        </div>
                      </div>
                    ))}
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
                      <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--lux-mint)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                        <GithubLogoIcon size={14} color="var(--lux-mint)" />
                        <span>PLAY 03 • BASED ON OMNIROUTE (MIT)</span>
                      </div>
                      <h4 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                        AI Cost-Control &amp; Reliability Gateway
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

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "28px" }}>
                  <div>
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-mint)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                    <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>AI agencies, development teams, internal innovation groups, multi-model operators.</p>
                    
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lux-mint)", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK &amp; OFFER</h5>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      Install a hardened OmniRoute gateway, connect approved model providers (OpenAI, Anthropic, Gemini, Ollama), configure fallback routing and token compression, set up monthly token budgets, train staff, and provide a monthly API cost optimization audit.
                    </p>
                  </div>

                  <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                    <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                    <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      <li>Single unified endpoint for all client LLM requests</li>
                      <li>Automated provider fallback to eliminate API downtime</li>
                      <li>Semantic Caching &amp; Token Compression rules (cut API costs 30-50%)</li>
                      <li>Monthly Token Spend Audit &amp; Provider Optimization Report</li>
                    </ul>
                  </div>
                </div>

                {/* EMBEDDED SCRIPTS UNDER PLAY 3 */}
                <div style={{ borderTop: "1px solid rgba(0, 255, 163, 0.2)", paddingTop: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-mint)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "16px" }}>
                    💻 PLAY 03 CODE SCRIPTS (OMNIROUTE)
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {getAppScripts("omniroute").map((script) => (
                      <div key={script.id} style={{ background: "#060913", border: "1px solid rgba(0, 255, 163, 0.25)", borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <div>
                            <span style={{ background: "var(--lux-mint)", color: "#0b0f19", fontWeight: 900, padding: "2px 8px", borderRadius: "4px", fontSize: "0.65rem", fontFamily: "var(--font-mono)", marginRight: "8px" }}>
                              SCRIPT #{script.scriptNumber}
                            </span>
                            <strong style={{ color: "#fff", fontSize: "1.05rem" }}>{script.title}</strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{script.subtitle}</div>
                          </div>
                          <button
                            onClick={() => copyCode(script)}
                            style={{ background: copiedScriptId === script.id ? "var(--lux-mint)" : "rgba(0, 255, 163, 0.15)", border: "1px solid var(--lux-mint)", color: copiedScriptId === script.id ? "#0b0f19" : "var(--lux-mint)", padding: "6px 14px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}
                          >
                            {copiedScriptId === script.id ? "✓ Copied!" : "📋 Copy Code"}
                          </button>
                        </div>
                        <pre style={{ background: "rgba(11, 15, 25, 0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", overflowX: "auto", whiteSpace: "pre-wrap", margin: "0 0 12px", lineHeight: 1.5 }}>
                          {script.code}
                        </pre>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "#ffe45c" }}>Steps: </strong> {script.instructions.join(" • ")}
                        </div>
                      </div>
                    ))}
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
                      <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ffe45c", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                        <GithubLogoIcon size={14} color="#ffe45c" />
                        <span>PLAY 04 • BASED ON DEEPTUTOR (APACHE-2.0)</span>
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

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "28px" }}>
                  <div>
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                    <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Tutoring companies, workforce programs, schools, nonprofits, membership communities.</p>
                    
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK &amp; OFFER</h5>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      Deploy a private DeepTutor portal, load approved learning materials &amp; custom knowledge bases, configure learner roles and progress tracking, train educators, add content review controls, and provide monthly curriculum and usage reporting.
                    </p>
                  </div>

                  <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                    <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                    <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      <li>Custom branded tutoring portal instance</li>
                      <li>Ingested curriculum docs &amp; verified answer grounding</li>
                      <li>Learner memory &amp; adaptive question generation setup</li>
                      <li>Monthly Educator Usage, Completion &amp; Accuracy Report</li>
                    </ul>
                  </div>
                </div>

                {/* EMBEDDED SCRIPTS UNDER PLAY 4 */}
                <div style={{ borderTop: "1px solid rgba(255, 228, 92, 0.2)", paddingTop: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#ffe45c", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "16px" }}>
                    💻 PLAY 04 CODE SCRIPTS (DEEPTUTOR)
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {getAppScripts("deeptutor").map((script) => (
                      <div key={script.id} style={{ background: "#060913", border: "1px solid rgba(255, 228, 92, 0.25)", borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <div>
                            <span style={{ background: "#ffe45c", color: "#0b0f19", fontWeight: 900, padding: "2px 8px", borderRadius: "4px", fontSize: "0.65rem", fontFamily: "var(--font-mono)", marginRight: "8px" }}>
                              SCRIPT #{script.scriptNumber}
                            </span>
                            <strong style={{ color: "#fff", fontSize: "1.05rem" }}>{script.title}</strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{script.subtitle}</div>
                          </div>
                          <button
                            onClick={() => copyCode(script)}
                            style={{ background: copiedScriptId === script.id ? "var(--lux-mint)" : "rgba(255, 228, 92, 0.15)", border: "1px solid #ffe45c", color: copiedScriptId === script.id ? "#0b0f19" : "#ffe45c", padding: "6px 14px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}
                          >
                            {copiedScriptId === script.id ? "✓ Copied!" : "📋 Copy Code"}
                          </button>
                        </div>
                        <pre style={{ background: "rgba(11, 15, 25, 0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", overflowX: "auto", whiteSpace: "pre-wrap", margin: "0 0 12px", lineHeight: 1.5 }}>
                          {script.code}
                        </pre>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "#ffe45c" }}>Steps: </strong> {script.instructions.join(" • ")}
                        </div>
                      </div>
                    ))}
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
                      <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ff6b00", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
                        <GithubLogoIcon size={14} color="#ff6b00" />
                        <span>PLAY 05 • BASED ON OFFICECLI (APACHE-2.0)</span>
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

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "28px" }}>
                  <div>
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ff6b00", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🎯 TARGET BUYERS</h5>
                    <p style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, margin: "0 0 16px" }}>Consultants, agencies, finance teams, operations groups, software vendors.</p>
                    
                    <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ff6b00", margin: "0 0 8px", fontFamily: "var(--font-mono)" }}>🛠️ SCOPE OF WORK &amp; OFFER</h5>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      Install OfficeCLI binary, connect approved AI agents (Hermes / LANA / custom scripts), build 3 Word, Excel, or PowerPoint automated document pipelines, establish quality validation checks, and provide managed template maintenance.
                    </p>
                  </div>

                  <div style={{ background: "rgba(6, 9, 19, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                    <h5 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffe45c", margin: "0 0 12px", fontFamily: "var(--font-mono)" }}>📋 CLIENT DELIVERABLES</h5>
                    <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      <li>OfficeCLI binary integrated into client server (no MS Office required)</li>
                      <li>3 Automated Document Workflows (Word Contract, Excel Report, PPT Deck)</li>
                      <li>Agent Document Template Library &amp; Formatting Guards</li>
                      <li>Monthly Maintenance &amp; Template Update SLA</li>
                    </ul>
                  </div>
                </div>

                {/* EMBEDDED SCRIPTS UNDER PLAY 5 */}
                <div style={{ borderTop: "1px solid rgba(255, 107, 0, 0.2)", paddingTop: "20px" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#ff6b00", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)", marginBottom: "16px" }}>
                    💻 PLAY 05 CODE SCRIPTS (OFFICECLI)
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {getAppScripts("officecli").map((script) => (
                      <div key={script.id} style={{ background: "#060913", border: "1px solid rgba(255, 107, 0, 0.25)", borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                          <div>
                            <span style={{ background: "#ff6b00", color: "#fff", fontWeight: 900, padding: "2px 8px", borderRadius: "4px", fontSize: "0.65rem", fontFamily: "var(--font-mono)", marginRight: "8px" }}>
                              SCRIPT #{script.scriptNumber}
                            </span>
                            <strong style={{ color: "#fff", fontSize: "1.05rem" }}>{script.title}</strong>
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{script.subtitle}</div>
                          </div>
                          <button
                            onClick={() => copyCode(script)}
                            style={{ background: copiedScriptId === script.id ? "var(--lux-mint)" : "rgba(255, 107, 0, 0.15)", border: "1px solid #ff6b00", color: copiedScriptId === script.id ? "#0b0f19" : "#ff6b00", padding: "6px 14px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer" }}
                          >
                            {copiedScriptId === script.id ? "✓ Copied!" : "📋 Copy Code"}
                          </button>
                        </div>
                        <pre style={{ background: "rgba(11, 15, 25, 0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "14px", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", overflowX: "auto", whiteSpace: "pre-wrap", margin: "0 0 12px", lineHeight: 1.5 }}>
                          {script.code}
                        </pre>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "#ffe45c" }}>Steps: </strong> {script.instructions.join(" • ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 4: 7-DIMENSION LUX SCORE GRADING SYSTEM */}
        {activeTab === "grading" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            <div style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(108, 71, 255, 0.3)", borderRadius: "20px", padding: "36px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-indigo)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                HOW THE LUX SCORE WORKS (PAGE 3 PDF)
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", margin: "8px 0 16px" }}>
                The 7-Dimension Lux Score Methodology
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 28px", maxWidth: "860px" }}>
                Stars are attention signals — not trust, quality, or security guarantees. Safety overrides prevent an archived, abandoned, unlicensed, suspicious, or materially unsafe project from receiving a top verdict without prominent warnings.
              </p>

              {/* 7 Dimensions Weights Table (Page 3 PDF) */}
              <div style={{ overflowX: "auto", marginBottom: "28px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ background: "rgba(6, 9, 19, 0.8)", color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <th style={{ padding: "14px 18px" }}>Dimension</th>
                      <th style={{ padding: "14px 18px", width: "100px" }}>Weight (Pts)</th>
                      <th style={{ padding: "14px 18px" }}>What It Measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--lux-cyan)" }}>1. Usefulness</td>
                      <td style={{ padding: "16px 18px", fontWeight: 900, color: "#fff" }}>20 Pts</td>
                      <td style={{ padding: "16px 18px", color: "var(--text-secondary)" }}>Problem clarity, practical business value, breadth of use.</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--lux-indigo)" }}>2. Project Health</td>
                      <td style={{ padding: "16px 18px", fontWeight: 900, color: "#fff" }}>15 Pts</td>
                      <td style={{ padding: "16px 18px", color: "var(--text-secondary)" }}>Commits, release velocity, active maintainers, issue response activity.</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--lux-mint)" }}>3. Community Momentum</td>
                      <td style={{ padding: "16px 18px", fontWeight: 900, color: "#fff" }}>15 Pts</td>
                      <td style={{ padding: "16px 18px", color: "var(--text-secondary)" }}>Recent growth velocity and genuine community engagement.</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 18px", fontWeight: 800, color: "#ffe45c" }}>4. Ease of Use</td>
                      <td style={{ padding: "16px 18px", fontWeight: 900, color: "#fff" }}>15 Pts</td>
                      <td style={{ padding: "16px 18px", color: "var(--text-secondary)" }}>Setup speed, documentation clarity, examples, onboarding path.</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 18px", fontWeight: 800, color: "#ff0080" }}>5. Trust &amp; Safety</td>
                      <td style={{ padding: "16px 18px", fontWeight: 900, color: "#fff" }}>15 Pts</td>
                      <td style={{ padding: "16px 18px", color: "var(--text-secondary)" }}>License clarity, permission scope, security controls, data handling.</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--lux-cyan)" }}>6. Product Quality</td>
                      <td style={{ padding: "16px 18px", fontWeight: 900, color: "#fff" }}>10 Pts</td>
                      <td style={{ padding: "16px 18px", color: "var(--text-secondary)" }}>Runtime reliability, UX polishedness, completeness, maintainability.</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--lux-mint)" }}>7. Innovation</td>
                      <td style={{ padding: "16px 18px", fontWeight: 900, color: "#fff" }}>10 Pts</td>
                      <td style={{ padding: "16px 18px", color: "var(--text-secondary)" }}>Originality, technical approach, and competitive advantage.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Safety Override Alert */}
              <div style={{ background: "rgba(255, 0, 128, 0.1)", border: "1px solid rgba(255, 0, 128, 0.4)", borderRadius: "12px", padding: "18px", color: "#ff66c4" }}>
                <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>⚠️ Safety &amp; Trust Overrides:</strong>
                Safety overrides prevent an archived, abandoned, unlicensed, suspicious, or materially unsafe project from receiving a top verdict without prominent warnings.
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: SUBSCRIPTIONS & MONEY PLAY ACCESS */}
        {activeTab === "subscriptions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 20px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--lux-mint)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                LUX APP REVIEW MEMBERSHIPS
              </span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", margin: "8px 0" }}>
                Choose Your Access Tier
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                Registered Community members receive public review PDFs. Paid subscribers receive the complete Money Play PDF, runnable code engine scripts, sales pitch prompt stack, and commercial delivery SOPs.
              </p>

              {/* Billing Toggle */}
              <div style={{ display: "inline-flex", background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "25px", padding: "4px", marginTop: "16px" }}>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  style={{ background: billingCycle === "monthly" ? "var(--lux-cyan)" : "transparent", color: billingCycle === "monthly" ? "#0b0f19" : "var(--text-secondary)", border: "none", padding: "6px 18px", borderRadius: "20px", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer" }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  style={{ background: billingCycle === "yearly" ? "var(--lux-cyan)" : "transparent", color: billingCycle === "yearly" ? "#0b0f19" : "var(--text-secondary)", border: "none", padding: "6px 18px", borderRadius: "20px", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer" }}
                >
                  Yearly (Save 20%)
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              
              {/* Free Tier */}
              <div style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>TIER 01</span>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", margin: "4px 0 12px" }}>Community Member</h3>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", marginBottom: "16px" }}>$0 <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>/ forever</span></div>
                  <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                    <li>Public Top 5 Weekly Rankings</li>
                    <li>7-Dimension Lux Score breakdowns</li>
                    <li>Download public App Review PDF</li>
                    <li>Weekly email notifications</li>
                  </ul>
                </div>
                <button style={{ width: "100%", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", padding: "12px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", marginTop: "24px" }}>
                  Current Plan (Active)
                </button>
              </div>

              {/* Pro Subscriber Tier */}
              <div style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.12), rgba(11,15,25,0.95))", border: "2px solid #ffd700", borderRadius: "20px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 0 35px rgba(255, 215, 0, 0.15)", position: "relative" }}>
                <div style={{ position: "absolute", top: "-14px", right: "24px", background: "#ffd700", color: "#0b0f19", fontSize: "0.7rem", fontWeight: 900, padding: "4px 12px", borderRadius: "12px", textTransform: "uppercase" }}>
                  MOST POPULAR FOR AGENCIES
                </div>
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ffe45c", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>TIER 02</span>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", margin: "4px 0 12px" }}>Subscriber Money Play</h3>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#ffe45c", marginBottom: "16px" }}>
                    {billingCycle === "monthly" ? "$49" : "$39"} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>/ month</span>
                  </div>
                  <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", color: "#fff", lineHeight: 1.8 }}>
                    <li><strong>Full Money Play PDF &amp; Service Pricing Guides</strong></li>
                    <li><strong>10 Commercial Runnable Code Engine Scripts Embedded in Plays</strong></li>
                    <li><strong>LANA Client Pitch Proposal Generator Prompt Stack</strong></li>
                    <li>5 Managed High-Ticket Client Offer Playbooks ($1.2k – $3.5k setup)</li>
                    <li>Client Deliverables &amp; SOP Templates</li>
                  </ul>
                </div>
                <a
                  href="https://buy.stripe.com/test_lux_app_review_subscriber"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg, #ffd700, #ff9900)", color: "#0b0f19", padding: "14px", borderRadius: "10px", fontWeight: 900, textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)", marginTop: "24px" }}
                >
                  Subscribe Now &amp; Unlock Money Plays 🚀
                </a>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* DETAIL MODAL FOR INDIVIDUAL APP REVIEW */}
      {selectedApp && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }} onClick={() => setSelectedApp(null)}>
          <div style={{ background: "#0b0f19", border: "1px solid rgba(0, 212, 255, 0.35)", borderRadius: "24px", maxWidth: "800px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "36px", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ background: "rgba(0, 212, 255, 0.12)", border: "1px solid rgba(0, 212, 255, 0.3)", color: "var(--lux-cyan)", padding: "3px 10px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 800 }}>
                  RANK #{selectedApp.rank} • {selectedApp.category}
                </span>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", margin: "8px 0 2px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <GithubLogoIcon size={26} color="var(--lux-cyan)" />
                  <span>{selectedApp.name}</span>
                </h2>
                <a href={selectedApp.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textDecoration: "none" }}>{selectedApp.repo} ↗</a>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", fontSize: "1.2rem", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", marginBottom: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>LUX SCORE</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--lux-cyan)" }}>{selectedApp.score}/100 ({selectedApp.grade})</div>
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>STARS</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>{selectedApp.stars}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>WEEKLY GROWTH</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--lux-mint)" }}>+{selectedApp.weeklyStars.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase" }}>LICENSE</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffe45c" }}>{selectedApp.license}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "0.95rem", lineHeight: 1.6 }}>
              <div>
                <strong style={{ color: "var(--lux-cyan)", display: "block", marginBottom: "4px" }}>What it solves:</strong>
                <p style={{ margin: 0, color: "var(--text-secondary)" }}>{selectedApp.solves}</p>
              </div>
              <div>
                <strong style={{ color: "var(--lux-mint)", display: "block", marginBottom: "4px" }}>Best fit target:</strong>
                <p style={{ margin: 0, color: "var(--text-secondary)" }}>{selectedApp.bestFor}</p>
              </div>
              <div>
                <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Why it stands out:</strong>
                <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-secondary)" }}>
                  {selectedApp.standout.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong style={{ color: "#ff6b6b", display: "block", marginBottom: "4px" }}>Limitations and risks:</strong>
                <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-secondary)" }}>
                  {selectedApp.risks.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: "28px", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <a
                href={selectedApp.url}
                target="_blank"
                rel="noreferrer"
                style={{ background: "var(--lux-cyan)", color: "#0b0f19", padding: "10px 20px", borderRadius: "10px", fontWeight: 800, textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <GithubLogoIcon size={16} color="#0b0f19" />
                <span>View GitHub Repo ↗</span>
              </a>
              <button
                onClick={() => setSelectedApp(null)}
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
