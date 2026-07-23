"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_ARTICLES, type Audience, type BlogArticle } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import ArticleVisualAssetsDeck, { type VisualAssetItem, type ResourceDownloadItem } from "@/components/ArticleVisualAssetsDeck";

const filters: Array<"All" | Audience> = ["All", "Lux Automaton", "Lux AI Kids"];

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
  // Check for Markdown Image syntax ![alt](url)
  const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
  if (imageMatch) {
    const alt = imageMatch[1];
    const src = prefixPath(imageMatch[2]);
    return (
      <figure key={index} className="my-8 rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950/90 shadow-2xl">
        <div className="relative w-full aspect-video">
          <Image src={src} alt={alt || "Article illustration"} fill className="object-cover" sizes="(max-width: 1000px) 100vw, 900px" />
        </div>
        {alt && (
          <figcaption className="p-3.5 text-center text-xs font-mono text-cyan-300 bg-slate-900/90 border-t border-cyan-500/20">
            📷 {alt}
          </figcaption>
        )}
      </figure>
    );
  }

  // Heading 2
  if (paragraph.startsWith("## ")) {
    return (
      <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 tracking-tight">
        {paragraph.replace(/^## /, "")}
      </h2>
    );
  }

  // Heading 3
  if (paragraph.startsWith("### ")) {
    return (
      <h3 key={index} className="text-xl font-bold text-cyan-300 mt-8 mb-3">
        {paragraph.replace(/^### /, "")}
      </h3>
    );
  }

  // Blockquote
  if (paragraph.startsWith("> ")) {
    const quoteText = paragraph.replace(/^> /, "").replaceAll('"', '');
    return (
      <blockquote key={index} className="my-6 pl-5 border-l-4 border-cyan-400 italic text-cyan-100 font-sans text-base sm:text-lg bg-cyan-950/20 py-3.5 pr-4 rounded-r-xl shadow-md">
        “{quoteText}”
      </blockquote>
    );
  }

  // Standard paragraph
  const formattedHtml = paragraph
    .replace(/\*\*(.*?)\*\*/g, '<strong className="text-white font-bold">$1</strong>')
    .replaceAll('src="/images/', `src="${prefixPath("/images/")}`)
    .replaceAll('src="/videos/', `src="${prefixPath("/videos/")}`)
    .replaceAll('href="/documents/', `href="${prefixPath("/documents/")}`);

  return (
    <p
      key={index}
      className="text-slate-300 leading-relaxed my-4 text-base sm:text-lg font-sans"
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}

function getArticleVisualAssets(article: BlogArticle) {
  const images: VisualAssetItem[] = [];
  const downloads: ResourceDownloadItem[] = [];

  if (article.slug === "the-lana-weekly-turning-ideas-into-a-community-rhythm") {
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
      { title: "Series Set Preview", subtitle: "Production preview inside Lux Automaton Laboratory", imageUrl: "/images/00_Marketing_Set_Preview.jpg", type: "Poster" },
      { title: "Asa & LANA Character Duo Poster", subtitle: "Official 4x5 character poster", imageUrl: "/images/05_Character_Duo_Poster_4x5.png", type: "Poster" },
      { title: "Lux Codex Continuity Engine", subtitle: "Operating memory layer for AI video", imageUrl: "/images/06_Lux_Codex_Continuity_Engine_4x5.png", type: "Architecture Map" },
      { title: "10-Episode Story Arc Overview", subtitle: "Complete narrative arc overview", imageUrl: "/images/07_Ten_Episode_Story_Arc_4x5.png", type: "Story Arc" }
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
  const [activeFilter, setActiveFilter] = useState<"All" | Audience>("All");
  const [selected, setSelected] = useState<BlogArticle>(BLOG_ARTICLES[0]);
  const articleRef = useRef<HTMLElement>(null);

  const articles = useMemo(
    () => activeFilter === "All" ? BLOG_ARTICLES : BLOG_ARTICLES.filter((article) => article.audience === activeFilter),
    [activeFilter],
  );

  const topStories = articles.filter((article) => article.slug !== selected.slug).slice(0, 4);

  const chooseStory = (article: BlogArticle, scroll = false) => {
    setSelected(article);
    if (scroll) {
      window.setTimeout(() => articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  const visualAssets = useMemo(() => getArticleVisualAssets(selected), [selected]);

  return (
    <main className="editorial-world">
      <section className="editorial-hero">
        <Image src={prefixPath("/images/blog-hero-backdrop.jpg")} alt="Lux Automaton Executive Team" fill priority sizes="100vw" />
        <div className="editorial-hero-shade" />
        <div className="editorial-hero-copy">
          <p>LUX AUTOMATON // DISPATCH &amp; ALPHA</p>
          <h1>Where Creators &amp; Builders Come to Get the Alpha.</h1>
          <span>Field notes, architectural blueprints, and creative intelligence for founders, makers, and young builders pushing the edge of AI.</span>
          <div>
            <a href="#alpha-dispatch" onClick={(e) => { e.preventDefault(); articleRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>Read Latest Alpha <span aria-hidden="true">↓</span></a>
            <Link href="/lux-tv">Watch Lux TV <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

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
                const next = filter === "All" ? BLOG_ARTICLES[0] : BLOG_ARTICLES.find((article) => article.audience === filter);
                if (next) setSelected(next);
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="news-lead-grid">
          <article className="news-lead-story">
            <button type="button" className="news-lead-media" onClick={() => chooseStory(selected, true)} aria-label={`Read ${selected.title}`}>
              <StoryMedia article={selected} sizes="(max-width: 980px) 100vw, 70vw" />
              <span className="news-media-label">{selected.video ? "Watch + read" : "Featured story"}</span>
            </button>
            <div className="news-lead-copy">
              <div className="news-story-meta">
                <span>{selected.category}</span>
                <time>{selected.date}</time>
                <span>{selected.readTime}</span>
              </div>
              <h3>{selected.title}</h3>
              <p>{selected.deck}</p>
              <button type="button" className="news-read-button" onClick={() => chooseStory(selected, true)}>
                Read the full story <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>

          <aside className="news-top-stories" aria-label="Top stories">
            <div className="news-section-heading">
              <span>Top stories</span>
              <small>Updated weekly</small>
            </div>
            {topStories.map((article, index) => (
              <button key={article.slug} type="button" onClick={() => chooseStory(article, true)}>
                <span className="news-rank">{String(index + 1).padStart(2, "0")}</span>
                <span className="news-top-story-copy">
                  <small>{article.category} · {article.readTime}</small>
                  <strong>{article.title}</strong>
                </span>
              </button>
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
                <button type="button" className="news-modern-image" onClick={() => chooseStory(article, true)} aria-label={`Read ${article.title}`}>
                  <StoryMedia article={article} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  {article.video && <span className="news-play-badge" aria-hidden="true">▶</span>}
                </button>
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
                  <button type="button" onClick={() => chooseStory(article, true)}>Continue reading <span aria-hidden="true">→</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section ref={articleRef} className="news-reading-room" aria-labelledby="selected-article-title">
          <div className="news-reading-header">
            <p>{selected.audience} / {selected.category}</p>
            <h2 id="selected-article-title">{selected.title}</h2>
            <strong>{selected.deck}</strong>
            <div className="news-reading-byline">
              <span>Lux Automaton Editorial</span>
              <time>{selected.date}</time>
              <span>{selected.readTime}</span>
            </div>
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/30 whitespace-nowrap"
                  >
                    📥 Download Free Planner <span aria-hidden="true">→</span>
                  </a>
                </div>
              )}
              <div className="editorial-image">
                <StoryMedia article={selected} sizes="(max-width: 980px) 100vw, 800px" />
              </div>
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
