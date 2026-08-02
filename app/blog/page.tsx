"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_ARTICLES, getPublishedArticles, type Audience, type BlogArticle } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import ArticleVisualAssetsDeck, { type VisualAssetItem, type ResourceDownloadItem } from "@/components/ArticleVisualAssetsDeck";
import SocialShare from "@/components/SocialShare";

const filters: Array<"All" | Audience> = ["All", "App Review", "Lux Automaton", "Lux AI Kids"];

function StoryMedia({ article, sizes }: { article: BlogArticle; sizes: string }) {
  return article.video ? (
    <video
      src={prefixPath(article.video)}
      poster={prefixPath(article.image)}
      autoPlay
      loop
      muted
      playsInline
      aria-label={`${article.title} preview`}
    />
  ) : (
    <Image src={prefixPath(article.image)} alt={article.title} fill sizes={sizes} />
  );
}

function renderArticleParagraph(paragraph: string, index: number) {
  const trimmed = paragraph.trim();

  // Code Block syntax ```lang ... ```
  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n");
    const firstLine = lines[0] || "";
    const lang = firstLine.replace(/^```/, "").trim();
    const isClosed = lines.length > 1 && lines[lines.length - 1].trim().startsWith("```");
    const codeLines = lines.slice(1, isClosed ? -1 : undefined);
    const codeContent = codeLines.join("\n");

    return (
      <div key={index} className="my-5 rounded-xl bg-slate-950/90 border border-cyan-500/30 overflow-hidden shadow-lg max-w-full">
        {lang && (
          <div className="px-3.5 py-1 bg-cyan-950/70 border-b border-cyan-500/20 text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-400">
            {lang}
          </div>
        )}
        <pre className="p-3.5 text-cyan-200 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre leading-relaxed max-w-full -webkit-overflow-scrolling-touch">
          <code>{codeContent || trimmed.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "")}</code>
        </pre>
      </div>
    );
  }

  // Check for Markdown Image syntax ![alt](url)
  const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
  if (imageMatch) {
    const alt = imageMatch[1];
    const src = prefixPath(imageMatch[2]);
    return (
      <figure key={index} className="article-inline-figure max-w-full overflow-hidden">
        <div className="article-inline-media">
          <Image src={src} alt={alt || "Article illustration"} fill sizes="(max-width: 1000px) 100vw, 900px" />
        </div>
        {alt && (
          <figcaption className="break-words">{alt}</figcaption>
        )}
      </figure>
    );
  }

  // Heading 2
  if (paragraph.startsWith("## ")) {
    return (
      <h2 key={index} className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-10 mb-4 tracking-tight break-words [overflow-wrap:anywhere] max-w-full">
        {paragraph.replace(/^## /, "")}
      </h2>
    );
  }

  // Heading 3
  if (paragraph.startsWith("### ")) {
    return (
      <h3 key={index} className="text-lg sm:text-xl font-bold text-cyan-300 mt-8 mb-3 break-words [overflow-wrap:anywhere] max-w-full">
        {paragraph.replace(/^### /, "")}
      </h3>
    );
  }

  // Blockquote
  if (paragraph.startsWith("> ")) {
    const quoteText = paragraph.replace(/^> /, "").replaceAll('"', '');
    return (
      <blockquote key={index} className="my-6 pl-4 sm:pl-5 border-l-4 border-cyan-400 italic text-cyan-100 font-sans text-sm sm:text-base md:text-lg bg-cyan-950/20 py-3.5 pr-4 rounded-r-xl shadow-md break-words [overflow-wrap:anywhere] max-w-full">
        “{quoteText}”
      </blockquote>
    );
  }

  // Standard paragraph formatting
  const formattedHtml = paragraph
    // Code tags `code`
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/30 text-cyan-300 font-mono text-xs sm:text-sm break-all max-w-full inline-block my-0.5">$1</code>')
    // Markdown links [text](url)
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-cyan-400 underline font-medium hover:text-cyan-300 break-words">$1</a>')
    // Bold **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    .replaceAll('src="/images/', `src="${prefixPath("/images/")}`)
    .replaceAll('src="/videos/', `src="${prefixPath("/videos/")}`)
    .replaceAll('href="/documents/', `href="${prefixPath("/documents/")}`);

  return (
    <p
      key={index}
      className="text-slate-300 leading-relaxed my-4 text-base sm:text-lg font-sans break-words [overflow-wrap:anywhere] max-w-full"
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}

function getArticleVisualAssets(article: BlogArticle) {
  const images: VisualAssetItem[] = [];
  const downloads: ResourceDownloadItem[] = [];

  if (article.slug === "five-github-apps-worth-watching-july-29-2026") {
    downloads.push(
      {
        title: "Lux App Review: Top 5 GitHub Apps Report (PDF)",
        subtitle: "Complete 100-point evaluation report for Open Science, PGSimCity, AgentENV, GodotHub & Claude of Duty",
        url: "/documents/Lux_App_Review_Five_GitHub_Apps_2026-07-29.pdf",
        type: "Full Evaluation PDF"
      },
      {
        title: "Subscriber Money Play Guide (PDF)",
        subtitle: "Exclusive monetization playbook for turning top open-source tools into high-margin service offers",
        url: "/documents/Lux_App_Review_Five_GitHub_Apps_Money_Play_2026-07-29.pdf",
        type: "Subscriber Money Play PDF"
      },
      {
        title: "Editable Word Review Document (DOCX)",
        subtitle: "Fully editable Word document containing full review text and breakdown",
        url: "/documents/Lux_App_Review_Five_GitHub_Apps_2026-07-29.docx",
        type: "Editable DOCX"
      },
      {
        title: "Structured Review Data JSON",
        subtitle: "Importable review JSON with 7-part Lux Score breakdowns and repository metrics",
        url: "/documents/review.json",
        type: "Review Data JSON"
      },
      {
        title: "Money Play Strategy JSON",
        subtitle: "Structured business opportunities and service offer templates",
        url: "/documents/money-play.json",
        type: "Money Play JSON"
      },
      {
        title: "Money Play Agent Prompt (TXT)",
        subtitle: "Ready-to-use system prompt for executing subscriber Money Plays with LANA or Hermes",
        url: "/documents/money-play-agent-prompt.txt",
        type: "Agent System Prompt"
      },
      {
        title: "Responsive Web Page (HTML)",
        subtitle: "Standalone responsive HTML review page",
        url: "/documents/lux-app-review-top-5-page.html",
        type: "Standalone HTML Page"
      },
      {
        title: "Complete App Review Package (ZIP)",
        subtitle: "Download all PDFs, DOCX, JSON data, HTML page, agent prompts, and high-res images",
        url: "/documents/Lux_App_Review_Top_5_From_CHsKSt4B_Uc_2026-07-29.zip",
        type: "Complete ZIP Package"
      }
    );
    images.push(
      { title: "Top 5 GitHub Apps Hero Visual", subtitle: "Full-resolution 100-point Lux Score roundup infographic", imageUrl: "/images/lux-app-review-top-5-hero.png", type: "Hero Infographic" },
      { title: "Top 5 GitHub Apps Thumbnail", subtitle: "Official Lux App Review header thumbnail", imageUrl: "/images/lux-app-review-top-5-thumbnail.png", type: "Header Thumbnail" }
    );
  } else if (article.slug === "10-chatgpt-power-words-better-answers-better-lenses") {
    downloads.push(
      {
        title: "10 Prompt Lenses Practice Planner",
        subtitle: "Printable & interactive workbook for mastering prompt shorthand and the Lux Prompt Stack",
        url: "/documents/10-prompt-lenses-practice-planner.html",
        type: "Interactive Planner"
      },
      {
        title: "Lux 10 Prompt Lenses JSON Pack",
        subtitle: "Importable JSON template with expansions, aliases, business uses & prompt stack definitions",
        url: "/documents/lux-10-prompt-lenses.json",
        type: "JSON Template Pack"
      },
      {
        title: "Complete 10 ChatGPT Power Words Package (ZIP)",
        subtitle: "Download all HTML planners, JSON prompt packs, source markdown, and publishing notes",
        url: "/documents/lux-automaton-chatgpt-power-words-complete-package.zip",
        type: "Complete ZIP Package"
      }
    );
  } else if (article.slug === "laguna-s2-1-long-horizon-coding-model") {
    downloads.push(
      {
        title: "Laguna S 2.1 Model Pilot Planner",
        subtitle: "Printable & interactive two-page evaluation workbook for testing coding model horizon",
        url: "/documents/laguna-s2-1-model-pilot-planner.html",
        type: "Interactive Planner"
      },
      {
        title: "Laguna S 2.1 Pilot Template JSON",
        subtitle: "Importable JSON template for structuring bounded coding tasks and acceptance criteria",
        url: "/documents/laguna-s2-1-model-pilot-template.json",
        type: "Pilot Template JSON"
      },
      {
        title: "Complete Laguna S 2.1 Package (ZIP)",
        subtitle: "Download all 5 visual assets, HTML planner, JSON template, and source markdown",
        url: "/documents/lux-automaton-laguna-s2-1-complete-package.zip",
        type: "Complete ZIP Package"
      }
    );
    images.push(
      { title: "Asset-Set Preview — Complete Visual Package", subtitle: "Full overview of all 5 visual assets, printable planner, and pilot template JSON", imageUrl: "/images/00-asset-set-preview-laguna.png", type: "Asset Set Preview" },
      { title: "01 — Thumbnail Header", subtitle: "Laguna S 2.1: Build Longer. Build Locally.", imageUrl: "/images/01-thumbnail-laguna-s2-1.png", type: "Header Thumbnail" },
      { title: "02 — The Long-Horizon Coding Loop", subtitle: "Inspect, plan, edit, test, examine evidence, recover from mistakes, and continue", imageUrl: "/images/02-photo-long-horizon-coding-loop.png", type: "Photo Blueprint" },
      { title: "03 — Local Hardware & Model Reality", subtitle: "118B total, 8B active Mixture-of-Experts architecture, VRAM & quantization requirements", imageUrl: "/images/03-photo-local-hardware-reality.png", type: "Photo Blueprint" },
      { title: "04 — Run a Production Pilot", subtitle: "Safe evaluation framework with test branch, acceptance criteria, logs, and human approval", imageUrl: "/images/04-photo-laguna-production-pilot.png", type: "Photo Blueprint" },
      { title: "05 — Laguna S 2.1 Model Overview", subtitle: "Complete system architecture breakdown, benchmark context, and deployment routing", imageUrl: "/images/05-laguna-s2-1-overview.png", type: "Overview Infographic" }
    );
  } else if (article.slug === "how-codex-can-direct-an-ai-explainer-video-factory") {
    downloads.push(
      {
        title: "AI Explainer Video Production Planner",
        subtitle: "Printable & interactive planning workbook for story beats, visual presets, and approval gates",
        url: "/documents/ai-explainer-video-production-planner.html",
        type: "Interactive Planner"
      },
      {
        title: "Lux Codex Explainer Video Workflow JSON",
        subtitle: "Importable production workflow JSON with 4 human approval gates",
        url: "/documents/lux-codex-explainer-video-workflow.json",
        type: "Workflow JSON"
      },
      {
        title: "Sample Beats JSON Project Template",
        subtitle: "Ready-to-adapt 20-second sample project beat map file",
        url: "/documents/sample-beats.json",
        type: "Sample Beats JSON"
      },
      {
        title: "Complete Explainer Video Publishing Package (ZIP)",
        subtitle: "Download all 5 visual assets, HTML planner, workflow JSON, sample beats, and source text",
        url: "/documents/lux-automaton-codex-explainer-video-complete-package.zip",
        type: "Complete ZIP Package"
      }
    );
    images.push(
      { title: "Asset-Set Preview — Complete Visual Package", subtitle: "Full overview of all 5 visual assets, printable planner, and workflow JSON files", imageUrl: "/images/00-asset-set-preview-explainer.png", type: "Asset Set Preview" },
      { title: "01 — Thumbnail Header", subtitle: "How Codex Can Direct an AI Explainer Video Factory", imageUrl: "/images/01-thumbnail-codex-explainer-video-factory.png", type: "Header Thumbnail" },
      { title: "02 — Beat Map & Human Gate 1", subtitle: "One source of truth (beats.json) keeps narration, timing, and direction aligned", imageUrl: "/images/02-photo-beat-map-human-gate.png", type: "Photo Blueprint" },
      { title: "03 — Style Bake-Off & Human Gate 2", subtitle: "Render the same beat in 3-4 visual themes and choose the final style by eye", imageUrl: "/images/03-photo-style-bake-off.png", type: "Photo Blueprint" },
      { title: "04 — Motion, Audio, Assembly & Quality Control", subtitle: "Automating keyframes, motion, narration, music ducking, and local FFmpeg assembly", imageUrl: "/images/04-photo-motion-audio-assembly-qc.png", type: "Photo Blueprint" },
      { title: "05 — Explainer Video Production Overview", subtitle: "Complete system breakdown for Codex video factory, approval gates, and quality control", imageUrl: "/images/05-codex-explainer-video-overview.png", type: "Overview Infographic" }
    );
  } else if (article.slug === "asa-lana-ep3-asa-must-stay-asa") {
    downloads.push(
      {
        title: "Character Identity Lock Workbook",
        subtitle: "Interactive digital & printable workbook for locking face, wardrobe, voice & character state",
        url: "/documents/character-identity-lock-workbook.html",
        type: "Interactive Workbook"
      },
      {
        title: "Lux Codex Character Identity JSON Template",
        subtitle: "Importable Lux Codex JSON schema for Reality Memory character continuity",
        url: "/documents/lux-codex-character-identity-template.json",
        type: "JSON Template"
      },
      {
        title: "Complete Asa + LANA EP3 Package (ZIP)",
        subtitle: "Download all 5 visual assets, HTML workbook, JSON template, and episode text files",
        url: "/documents/asa-lana-ep3-asa-must-stay-asa-complete-package.zip",
        type: "Complete ZIP Package"
      }
    );
    images.push(
      { title: "Asset-Set Preview — Complete Publishing Package", subtitle: "Full overview of all 5 visual assets, printable workbook, and JSON template", imageUrl: "/images/00-asset-set-preview-ep3.png", type: "Asset Set Preview" },
      { title: "01 — Thumbnail Header", subtitle: "Asa Must Stay Asa — Episode 3", imageUrl: "/images/01-thumbnail-asa-must-stay-asa.png", type: "Header Thumbnail" },
      { title: "02 — Character Identity Drift", subtitle: "A scene can look good while the character quietly changes", imageUrl: "/images/02-photo-character-drift.png", type: "Photo Blueprint" },
      { title: "03 — Character Identity Lock", subtitle: "Structured record preserving approved reference pack, face, wardrobe & voice", imageUrl: "/images/03-photo-character-identity-lock.png", type: "Photo Blueprint" },
      { title: "04 — Reality Memory Review", subtitle: "Connecting approved character identity to the current story state", imageUrl: "/images/04-photo-reality-memory-review.png", type: "Photo Blueprint" },
      { title: "05 — Character Identity Continuity Overview", subtitle: "Complete system breakdown for Reality Memory and change control", imageUrl: "/images/05-character-identity-overview.png", type: "Overview Infographic" }
    );
  } else if (article.slug === "top-5-github-apps-to-watch-this-week") {
    downloads.push(
      {
        title: "Lux App Review — Top 5 GitHub Apps PDF",
        subtitle: "Complete editorial review, scoring breakdown, risk audit, and ranking PDF",
        url: "/documents/Lux_App_Review_Top_5_2026-07-24.pdf",
        type: "Community PDF"
      },
      {
        title: "Lux App Review — Subscriber Money Play PDF",
        subtitle: "Insider & Operator business plays, pricing models, agent prompts & implementation guides",
        url: "/documents/Lux_App_Review_Money_Play_2026-07-24.pdf",
        type: "Insider Money Play PDF"
      }
    );
    images.push(
      { title: "Asset-Set Preview — Complete Publishing Package", subtitle: "Full overview of all visual assets, PDFs, and implementation guides", imageUrl: "/images/00-asset-set-preview-top-5-github-apps.png", type: "Asset Set Preview" },
      { title: "01 — Top 5 GitHub Apps to Watch This Week", subtitle: "July 24 weekly-picks cover featuring Hermes, OpenCut, OmniRoute, DeepTutor & OfficeCLI", imageUrl: "/images/lux-app-review-july-24-cover.png", type: "Header Thumbnail" },
      { title: "02 — Lux Score Radar & Category Profiles", subtitle: "100-point scoring breakdown across Usefulness, Health, Momentum & Safety", imageUrl: "/images/05-top-5-github-apps-overview.png", type: "Overview Infographic" },
      { title: "03 — Lux App Review Editorial Workspace", subtitle: "Inside the testing lab evaluating open-source codebases and architecture", imageUrl: "/images/editorial-workspace.png", type: "Editorial Laboratory" }
    );
  } else if (article.slug === "10-chatgpt-power-words-better-answers-better-lenses") {
    downloads.push(
      {
        title: "10 Prompt Lenses Practice Planner",
        subtitle: "Interactive digital & printable two-page practice worksheet for prompt engineering",
        url: "/documents/10-prompt-lenses-practice-planner.html",
        type: "Interactive Planner"
      },
      {
        title: "Lux 10 Prompt Lenses Configuration JSON",
        subtitle: "Importable Lux Codex & LANA JSON configuration for all 10 prompt switches",
        url: "/documents/lux-10-prompt-lenses.json",
        type: "Config JSON"
      }
    );
    images.push(
      { title: "Prompt Engineering & Perspective Design Map", subtitle: "5-layer Lux Prompt Stack (Task, Context, Lens, Constraints, Output)", imageUrl: "/images/15_diagram_craft_prompt_framework.png", type: "Architecture Map" },
      { title: "01 — Safe AI Learning & Better Questions", subtitle: "Building dependable AI prompt lenses for real business operations", imageUrl: "/images/01-thumbnail-safe-ai-learning-better-questions.png", type: "Header Thumbnail" }
    );
  } else if (article.slug === "asa-lana-ep2-give-the-story-a-memory") {
    downloads.push(
      {
        title: "Story Memory Blueprint",
        subtitle: "Interactive digital & printable blueprint for building your Story Memory Tree",
        url: "/documents/story-memory-blueprint.html",
        type: "Interactive Blueprint"
      },
      {
        title: "Lux Codex Story Memory Template JSON",
        subtitle: "Importable Lux Codex JSON schema for character locks, location rules & continuity scoring",
        url: "/documents/lux-codex-story-memory-template.json",
        type: "Memory Template JSON"
      }
    );
    images.push(
      { title: "Asset-Set Preview — Complete Publishing Package", subtitle: "Full overview of all 5 visual assets, printable blueprint, and JSON schema", imageUrl: "/images/00-asset-set-preview-asa-lana-ep2.png", type: "Asset Set Preview" },
      { title: "01 — Give the Story a Memory", subtitle: "Episode 2 header thumbnail with Asa and LANA in the Continuity Lab", imageUrl: "/images/01-thumbnail-give-the-story-a-memory.png", type: "Header Thumbnail" },
      { title: "02 — Scattered Story Fragments", subtitle: "Asa surrounded by disconnected prompts before introducing memory", imageUrl: "/images/02-photo-scattered-story-fragments.png", type: "Photo Blueprint" },
      { title: "03 — Story Memory Tree", subtitle: "LANA constructing the connected Story Bible, characters, and rules", imageUrl: "/images/03-photo-story-memory-tree.png", type: "Photo Blueprint" },
      { title: "04 — Continuity Score 98", subtitle: "Pre-render evaluation scoring character locks, props, and timeline logic", imageUrl: "/images/04-photo-continuity-score.png", type: "Photo Blueprint" },
      { title: "05 — Story Memory System Overview", subtitle: "Complete architectural overview of the Lux Codex Story Memory Engine", imageUrl: "/images/05-story-memory-overview.png", type: "Overview Infographic" }
    );
  } else if (article.slug === "new-ollama-update-local-ai-moves-from-models-to-real-work") {
    downloads.push({
      title: "Local AI Agent Readiness Planner",
      subtitle: "Interactive digital & printable two-page readiness worksheet for Ollama agent mode",
      url: "/documents/local-ai-agent-readiness-planner.html",
      type: "Interactive Planner"
    });
    images.push(
      { title: "Asset-Set Preview — Complete Publishing Package", subtitle: "Full overview of all 5 visual assets, printable planner, and copy", imageUrl: "/images/00-asset-set-preview-ollama-agent-mode.png", type: "Asset Set Preview" },
      { title: "01 — Ollama Local AI Workbench", subtitle: "Interactive agent experience for chat, coding, web research, and delegated work", imageUrl: "/images/01-thumbnail-ollama-local-ai-workbench.png", type: "Header Thumbnail" },
      { title: "02 — One Command Opens Agent Mode", subtitle: "Starting from the job instead of just prompting a bare model", imageUrl: "/images/02-photo-one-command-opens-agent-mode.png", type: "Photo Blueprint" },
      { title: "03 — Local & Cloud Choice", subtitle: "Intentional routing for private offline work vs. cloud scale", imageUrl: "/images/03-photo-local-cloud-choice.png", type: "Photo Blueprint" },
      { title: "04 — Safe Agent Boundaries", subtitle: "Four permission levels: Read, Draft, Execute, and Publish", imageUrl: "/images/04-photo-safe-agent-boundaries.png", type: "Photo Blueprint" },
      { title: "05 — Ollama Agent Mode System Overview", subtitle: "Complete system breakdown and operating specs for Ollama 0.32", imageUrl: "/images/05-ollama-agent-mode-overview.png", type: "Overview Infographic" }
    );
  } else if (article.slug === "adhd-friendly-ai-put-the-next-action-first") {
    downloads.push(
      {
        title: "Action-First AI Output Planner",
        subtitle: "Two-page comparison planner for testing action-first agent responses",
        url: "/documents/action-first-ai-output-planner.html",
        type: "Interactive Planner"
      },
      {
        title: "Action-First AI Output Workflow JSON",
        subtitle: "Importable workflow template for LANA, Hermes, Codex, or Claude Code",
        url: "/documents/action-first-ai-output-workflow.json",
        type: "Workflow JSON"
      },
      {
        title: "AI Health Training & Communication Infographic",
        subtitle: "Full-resolution printable infographic blueprint by Dr. Torrey Dooley",
        url: "/documents/dr-torrey-ai-health-training-infographic.jpg",
        type: "Printable Infographic"
      }
    );
    images.push(
      {
        title: "Approved Hero Photograph — Dr. Torrey Dooley",
        subtitle: "Dr. Torrey Dooley, DNP, RN — Healthcare Educator & Future Medicine Guide",
        imageUrl: "/images/01-approved-dr-torrey-hero.jpg",
        type: "Hero Photograph"
      },
      {
        title: "05 — AI Health Training & Communication Blueprint",
        subtitle: "Dr. Torrey Dooley's 3 big lessons, smart care workflow & learning journey",
        imageUrl: "/images/05-dr-torrey-ai-health-training-overview.png",
        type: "Overview Infographic"
      }
    );
  } else if (article.slug === "lux-agent-usb-your-ai-assistant-anywhere") {
    downloads.push({
      title: "Lux Agent USB First Workflow Planner",
      subtitle: "Interactive digital & printable first workflow planning worksheet",
      url: "/documents/lux-agent-usb-first-workflow-planner.html",
      type: "Interactive Planner"
    });
    images.push(
      { title: "Asset-Set Preview — Complete Publishing Package", subtitle: "Full overview of all 5 visual assets, printable planner, and copy", imageUrl: "/images/00-asset-set-preview-lux-agent-usb.png", type: "Asset Set Preview" },
      { title: "01 — Thumbnail Header", subtitle: "Lux Agent USB: Your AI Assistant Anywhere", imageUrl: "/images/01-thumbnail-lux-agent-usb.png", type: "Header Thumbnail" },
      { title: "02 — Your Assistant in Your Pocket", subtitle: "Portable AI workspace with LANA, memory, and preloaded tools", imageUrl: "/images/02-photo-your-assistant-in-your-pocket.png", type: "Photo Blueprint" },
      { title: "03 — Work Offline With Confidence", subtitle: "Fast, reliable file transfers without internet dependency", imageUrl: "/images/03-photo-work-offline-with-confidence.png", type: "Photo Blueprint" },
      { title: "04 — Success Packs For Real Work", subtitle: "Industry-specific starters for restaurants, real estate, trade contractors & music", imageUrl: "/images/04-photo-success-packs-for-real-work.png", type: "Photo Blueprint" },
      { title: "05 — Lux Agent USB System Overview", subtitle: "Complete system breakdown and portable operating specs", imageUrl: "/images/05-lux-agent-usb-overview.png", type: "Overview Infographic" }
    );
  } else if (article.slug === "the-lana-weekly-turning-ideas-into-a-community-rhythm") {
    downloads.push({
      title: "LANA Weekly Community Rhythm Planner",
      subtitle: "Interactive digital & printable newsletter production planner",
      url: "/lana-weekly-community-rhythm-planner.html",
      type: "Printable Production Planner"
    });
    images.push(
      { title: "LANA Weekly Strategy Overview Sheet", subtitle: "Complete format, recurring sections & content journey map", imageUrl: "/images/05-lana-weekly-overview.png", type: "Overview PNG" },
      { title: "01 — Publish One Useful Note", subtitle: "Production workflow for weekly notes", imageUrl: "/images/02-photo-publish-one-useful-note.png", type: "Photo Blueprint" },
      { title: "02 — Use Recurring Sections", subtitle: "Section structure breakdown", imageUrl: "/images/03-photo-use-recurring-sections.png", type: "Photo Blueprint" },
      { title: "03 — Connect Readers to Workshops", subtitle: "Holographic learning journey map", imageUrl: "/images/04-photo-connect-readers-workshops-products.png", type: "Photo Blueprint" }
    );
  } else if (article.slug === "safe-ai-learning-starts-with-better-questions") {
    downloads.push({
      title: "Family Better Questions Activity Sheet",
      subtitle: "Kid-friendly AI safety & creative checklist worksheet",
      url: "/family-better-questions-activity-sheet.html",
      type: "Interactive Activity Sheet"
    });
    images.push(
      { title: "Five Better Questions Overview Sheet", subtitle: "Kid-friendly safety checklist overview PNG", imageUrl: "/images/05-kids-overview-five-better-questions.png", type: "Overview PNG" },
      { title: "01 — Ask Before Sharing", subtitle: "Privacy & consent principles", imageUrl: "/images/02-photo-ask-before-sharing.png", type: "Photo Blueprint" },
      { title: "02 — Check Sources Together", subtitle: "Fact-checking & verification guide", imageUrl: "/images/03-photo-check-sources-together.png", type: "Photo Blueprint" },
      { title: "03 — Make Projects That Help", subtitle: "Community project principles", imageUrl: "/images/04-photo-make-projects-that-help.png", type: "Photo Blueprint" }
    );
  } else if (article.slug === "the-first-automation-map-every-small-business-should-draw") {
    downloads.push({
      title: "Small Business Automation Map Planner",
      subtitle: "Interactive workflow mapping & handoff auditing workbook",
      url: "/small-business-automation-map-planner.html",
      type: "Interactive Workbook"
    });
    images.push(
      { title: "First Automation Map Overview Sheet", subtitle: "5-step business workflow mapping framework", imageUrl: "/images/05-first-automation-map-overview.png", type: "Overview PNG" },
      { title: "Infographic Part 1 — List Weekly Repeats", subtitle: "Inventorying core repeats", imageUrl: "/images/05-first-automation-map-infographic-1.jpg", type: "Infographic Card" },
      { title: "Infographic Part 2 — Mark Handoff Breaks", subtitle: "Finding friction & broken steps", imageUrl: "/images/05-first-automation-map-infographic-2.jpg", type: "Infographic Card" },
      { title: "Infographic Part 3 — Smallest Reliable Step", subtitle: "First reviewable automation candidate", imageUrl: "/images/05-first-automation-map-infographic-3.jpg", type: "Infographic Card" },
      { title: "Infographic Part 4 — Operating Rhythm", subtitle: "Weekly review & scaling loop", imageUrl: "/images/05-first-automation-map-infographic-4.jpg", type: "Infographic Card" }
    );
  } else if (article.slug === "why-offline-ready-ai-still-matters") {
    downloads.push({
      title: "Offline-Ready AI Continuity Planner",
      subtitle: "Local-first infrastructure & field team continuity checklist",
      url: "/offline-ready-ai-continuity-planner.html",
      type: "Continuity Planner"
    });
    images.push(
      { title: "Offline-Ready AI Overview Map", subtitle: "Local-first architecture & continuity strategy", imageUrl: "/images/05-offline-ready-ai-overview.png", type: "Overview PNG" },
      { title: "Continuity Guide Summary", subtitle: "Complete field team continuity guide", imageUrl: "/images/why-offline-ready-ai-infographic-guide.png", type: "Infographic Guide" },
      { title: "01 — Reduce Cloud Dependency", subtitle: "Core offline task inventory", imageUrl: "/images/why-offline-ready-ai-infographic-card1.png", type: "Breakdown Card" },
      { title: "02 — Keep Work Portable", subtitle: "Protected Lux Agent USB workspace", imageUrl: "/images/why-offline-ready-ai-infographic-card2.png", type: "Breakdown Card" },
      { title: "03 — Field Team Continuity", subtitle: "Capture, work, review & sync pipeline", imageUrl: "/images/why-offline-ready-ai-infographic-card3.png", type: "Breakdown Card" }
    );
  } else if (article.slug === "five-ai-video-projects-kids-can-make-this-month") {
    downloads.push({
      title: "Kids AI Video Project Planner",
      subtitle: "Storyboard & scene planning worksheet for young creators",
      url: "/kids-ai-video-project-planner.html",
      type: "Project Planner"
    });
    images.push(
      { title: "Five AI Video Projects Overview", subtitle: "One-month video project roadmap overview PNG", imageUrl: "/images/05-kids-overview-five-ai-video-projects.png", type: "Overview PNG" },
      { title: "Visual Breakdown 1 — Storyboard & Short Scenes", subtitle: "Four-box storyboard & clip formula", imageUrl: "/images/05-kids-overview-five-ai-video-projects-alt1.jpg", type: "Infographic Card" },
      { title: "Visual Breakdown 2 — AI Assistance Credit", subtitle: "Responsible creation & credit guide", imageUrl: "/images/05-kids-overview-five-ai-video-projects-alt2.jpg", type: "Infographic Card" }
    );
  } else if (article.slug === "the-coolest-ai-careers-may-not-have-names-yet") {
    downloads.push({
      title: "Future AI Career Lab Activity Sheet",
      subtitle: "Skill mix exploration & human judgment worksheet",
      url: "/future-ai-career-lab-activity-sheet.html",
      type: "Interactive Worksheet"
    });
    images.push(
      { title: "Future AI Careers Overview", subtitle: "Human skills & future career mix overview PNG", imageUrl: "/images/05-kids-overview-future-ai-careers.png", type: "Overview PNG" },
      { title: "01 — Creativity & Responsibility", subtitle: "Blending imagination with ethics", imageUrl: "/images/02-photo-creativity-and-responsibility.png", type: "Photo Blueprint" },
      { title: "02 — Communication Matters", subtitle: "Explaining goals & revising work", imageUrl: "/images/03-photo-communication-matters.png", type: "Photo Blueprint" },
      { title: "03 — Learning How to Learn", subtitle: "Durable human skills across changing tools", imageUrl: "/images/04-photo-learning-how-to-learn.png", type: "Photo Blueprint" }
    );
  } else if (article.slug === "asa-lana-the-story-remembers-ep1") {
    images.push(
      { title: "01 — Episode 1 Poster", subtitle: "ASA + LANA EP1: One Clip is a Seed", imageUrl: "/images/01-thumbnail-asa-lana-ep1.png", type: "Episode Poster" },
      { title: "02 — Seed Becomes a Story", subtitle: "Turn clips and ideas into connected story threads", imageUrl: "/images/02-photo-seed-becomes-a-story.png", type: "Photo Blueprint" },
      { title: "03 — Memory Starts to Form", subtitle: "Connecting clues, objectives, and personal history", imageUrl: "/images/03-photo-memory-starts-to-form.png", type: "Photo Blueprint" },
      { title: "04 — First Idea Takes Shape", subtitle: "Holographic story modeling inside the Lux Lab", imageUrl: "/images/04-photo-first-idea-takes-shape.png", type: "Photo Blueprint" },
      { title: "05 — From Clip to Living Story", subtitle: "Seed to memory to full cinematic series overview", imageUrl: "/images/05-story-ep1-overview.png", type: "Overview PNG" }
    );
  } else if (article.slug === "private-ai-business-os") {
    images.push(
      { title: "Private AI Business OS Overview", subtitle: "Operating layer unifying files, SOPs, budgets & execution", imageUrl: "/images/05-private-ai-business-os.png", type: "Overview PNG" },
      { title: "02 — Unify Scattered Context", subtitle: "Bringing customer files and SOPs together", imageUrl: "/images/02-photo-unify-scattered-business-context.png", type: "Photo Blueprint" },
      { title: "03 — Owner Control & Privacy", subtitle: "Owner-controlled private files", imageUrl: "/images/03-photo-private-files-owner-control.png", type: "Photo Blueprint" },
      { title: "04 — Guided Business Systems", subtitle: "Turn repeatable work into guided execution", imageUrl: "/images/04-photo-guided-business-systems.png", type: "Photo Blueprint" }
    );
  } else if (article.slug === "google-gemini-updates-small-business-actually-use") {
    downloads.push({
      title: "Gemini Update-to-Workflow Action Planner",
      subtitle: "2-page printable business workflow & AI adoption workbook",
      url: "/documents/gemini-update-to-workflow-action-planner.html",
      type: "Printable Action Planner"
    });
  }

  return { images, downloads };
}

export default function BlogPage() {
  const publishedArticles = useMemo(() => getPublishedArticles(), []);
  const [activeFilter, setActiveFilter] = useState<"All" | Audience>("All");
  const [selected, setSelected] = useState<BlogArticle>(publishedArticles[0] || BLOG_ARTICLES[0]);
  const articleRef = useRef<HTMLElement>(null);

  const articles = useMemo(
    () => activeFilter === "All" ? publishedArticles : publishedArticles.filter((article) => article.audience === activeFilter),
    [activeFilter, publishedArticles],
  );

  const topStories = articles.filter((article) => article.slug !== selected.slug).slice(0, 4);

  const visualAssets = useMemo(() => getArticleVisualAssets(selected), [selected]);

  return (
    <main className="editorial-world">
      <section id="alpha-dispatch" className="lux-newsroom" aria-label="Lux Automaton newsroom">
        <div className="news-ticker" aria-label="Latest Lux update">
          <b>ALPHA TICKER</b>
          <span>ASA + LANA: The Story Remembers — Episode 1 explores why every AI production needs memory.</span>
          <Link href="/lux-tv">Watch on Lux TV <span aria-hidden="true">→</span></Link>
        </div>

        <header className="newsroom-header">
          <div>
            <p className="news-kicker">THE ALPHA DISPATCH</p>
            <h2>News, Field Notes &amp; High-Signal Intelligence</h2>
          </div>
          <p>Raw insights, production breakthroughs, and practical guides directly from the builders behind Lux Automaton, Lux Codex, and LANA.</p>
        </header>

        <div className="news-filter-row" aria-label="Filter articles by audience">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "active" : ""}
              onClick={() => {
                setActiveFilter(filter);
                const next = filter === "All" ? publishedArticles[0] : publishedArticles.find((article) => article.audience === filter);
                if (next) setSelected(next);
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="news-lead-grid">
          <article className="news-lead-story">
            <Link href={`/blog/${selected.slug}`} className="news-lead-media" aria-label={`Read ${selected.title}`}>
              <StoryMedia article={selected} sizes="(max-width: 900px) 100vw, 45vw" />
              {selected.video && <span className="news-play-badge" aria-hidden="true">▶</span>}
              <span className="news-media-label">Watch + Read</span>
            </Link>
            <div className="news-lead-copy">
              <div className="news-story-meta">
                <span>{selected.category}</span>
                <time>{selected.date}</time>
                <span>{selected.readTime}</span>
              </div>
              <h3>{selected.title}</h3>
              <p>{selected.deck}</p>
              <Link href={`/blog/${selected.slug}`} className="news-read-button">
                Read the full story <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          <aside className="news-top-stories" aria-label="Top stories">
            <div className="news-section-heading">
              <span>Top stories</span>
              <small>Updated weekly</small>
            </div>
            {topStories.map((article, index) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <span className="news-rank">{String(index + 1).padStart(2, "0")}</span>
                <span className="news-top-story-copy">
                  <small>{article.category} · {article.readTime}</small>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </aside>
        </div>

        <section className="news-latest" aria-labelledby="latest-stories-title">
          <div className="news-section-heading">
            <h2 id="latest-stories-title">Latest stories</h2>
            <span>{articles.length} articles</span>
          </div>
          <div className="news-modern-grid">
            {articles.map((article) => (
              <article key={article.slug} className={selected.slug === article.slug ? "active" : ""}>
                <Link href={`/blog/${article.slug}`} className="news-modern-image" aria-label={`Read ${article.title}`}>
                  <StoryMedia article={article} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  {article.video && <span className="news-play-badge" aria-hidden="true">▶</span>}
                </Link>
                <div className="news-modern-copy">
                  <div className="news-story-meta">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  {article.plannerUrl && (
                    <span className="inline-flex items-center gap-1 my-1 text-[11px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full w-fit">
                      📥 Free Download / Worksheet
                    </span>
                  )}
                  <h3>{article.title}</h3>
                  <p>{article.deck}</p>
                  <Link href={`/blog/${article.slug}`}>Continue reading <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section ref={articleRef} className="news-reading-room" aria-labelledby="selected-article-title" hidden>
          <div className="news-reading-header">
            <p>{selected.audience} / {selected.category}</p>
            <h2 id="selected-article-title">{selected.title}</h2>
            <strong>{selected.deck}</strong>
            <div className="news-reading-byline">
              <span>Lux Automaton Editorial</span>
              <time>{selected.date}</time>
              <span>{selected.readTime}</span>
            </div>
            <SocialShare title={selected.title} text={selected.deck} />
          </div>

          <div className="news-reading-layout">
            <aside>
              <span>In this story</span>
              {selected.takeaways.map((takeaway, index) => (
                <p key={takeaway}><b>{String(index + 1).padStart(2, "0")}</b>{takeaway}</p>
              ))}
              {selected.plannerUrl && (
                <a
                  href={prefixPath(selected.plannerUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block text-center py-2.5 px-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-colors shadow-sm"
                >
                  📥 Download Free Planner
                </a>
              )}
              <Link href="/community">Discuss in the community <span aria-hidden="true">→</span></Link>
            </aside>

            <article className="editorial-article news-full-article">
              {selected.plannerUrl && (
                <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-purple-950 to-slate-900 border border-cyan-500/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-400">🎁 Free Resource Included</span>
                    <h4 className="text-lg font-bold text-white mt-1">Printable Activity Sheet &amp; Planner</h4>
                    <p className="text-xs text-slate-300">Complete interactive PDF/HTML worksheet included with this story.</p>
                  </div>
                  <a
                    href={prefixPath(selected.plannerUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/30 w-full sm:w-auto justify-center text-center"
                  >
                    📥 Download Free Planner <span aria-hidden="true">→</span>
                  </a>
                </div>
              )}
              {selected.body.map((paragraph, index) => renderArticleParagraph(paragraph, index))}

              {/* SPECIAL VISUAL ASSETS & DOWNLOADABLE KITS GALLERY DECK */}
              <ArticleVisualAssetsDeck
                heading="Visual Assets, Worksheets & Overview PNG Gallery"
                subheading="Preview full-resolution overview graphics, architecture maps, and interactive worksheets associated with this dispatch."
                images={visualAssets.images}
                downloads={visualAssets.downloads}
              />
            </article>
          </div>
        </section>

        <section className="news-newsletter">
          <div>
            <p>Briefed by LANA</p>
            <h2>One smart dispatch. Every week.</h2>
            <span>Founder notes, practical AI lessons, new workshops, Lux TV releases, and ideas worth building.</span>
          </div>
          <Link href="/community">Join the Lux community <span aria-hidden="true">→</span></Link>
        </section>
      </section>
    </main>
  );
}
