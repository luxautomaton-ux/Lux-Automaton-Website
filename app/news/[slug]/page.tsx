import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NEWS_STORIES } from "@/lib/news";
import { prefixPath } from "@/lib/prefix";
import ArticleVisualAssetsDeck, { type VisualAssetItem, type ResourceDownloadItem } from "@/components/ArticleVisualAssetsDeck";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return NEWS_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = NEWS_STORIES.find((s) => s.slug === slug);
  if (!story) return {};

  return {
    title: `${story.title} | Lux Automaton Dispatch`,
    description: story.summary,
    openGraph: {
      title: story.title,
      description: story.summary,
      type: "article",
    },
  };
}

function renderArticleParagraph(paragraph: string, index: number) {
  const imageMatch = paragraph.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
  if (imageMatch) {
    const alt = imageMatch[1];
    const src = prefixPath(imageMatch[2]);
    return (
      <figure
        key={index}
        style={{
          margin: "36px 0",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
          background: "rgba(10, 15, 30, 0.6)",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "460px" }}>
          <Image src={src} alt={alt || "Article illustration"} fill style={{ objectFit: "contain" }} sizes="(max-width: 1000px) 100vw, 800px" />
        </div>
        {alt && (
          <figcaption
            style={{
              padding: "12px 18px",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              textAlign: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              background: "rgba(0, 0, 0, 0.3)",
              fontWeight: 600,
            }}
          >
            {alt}
          </figcaption>
        )}
      </figure>
    );
  }

  if (paragraph.startsWith("## ")) {
    return (
      <h2 key={index} style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "44px", marginBottom: "18px", letterSpacing: "-0.02em" }}>
        {paragraph.replace(/^## /, "")}
      </h2>
    );
  }

  if (paragraph.startsWith("### ")) {
    return (
      <h3 key={index} style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--cyan)", marginTop: "32px", marginBottom: "14px" }}>
        {paragraph.replace(/^### /, "")}
      </h3>
    );
  }

  if (paragraph.startsWith("> ")) {
    const quoteText = paragraph.replace(/^> /, "").replaceAll('"', '');
    return (
      <blockquote
        key={index}
        style={{
          margin: "28px 0",
          padding: "16px 20px",
          borderLeft: "4px solid var(--cyan)",
          background: "rgba(0, 229, 255, 0.06)",
          borderRadius: "0 12px 12px 0",
          color: "var(--cyan)",
          fontStyle: "italic",
          fontSize: "1.1rem",
        }}
      >
        “{quoteText}”
      </blockquote>
    );
  }

  const formattedHtml = paragraph
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replaceAll('src="/images/', `src="${prefixPath("/images/")}`)
    .replaceAll('src="/videos/', `src="${prefixPath("/videos/")}`)
    .replaceAll('href="/documents/', `href="${prefixPath("/documents/")}`);

  return (
    <p
      key={index}
      style={{ marginBottom: "24px", lineHeight: 1.8 }}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}

function getNewsDetailVisualAssets(slug: string) {
  const images: VisualAssetItem[] = [];
  const downloads: ResourceDownloadItem[] = [];

  if (slug === "lux-agent-usb-your-ai-assistant-anywhere" || slug === "lux-agent-usb-portable-operations") {
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
  }

  return { images, downloads };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = NEWS_STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  const { images, downloads } = getNewsDetailVisualAssets(slug);

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh", background: "var(--bg-void)" }} className="circuit-grid">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>
        
        {/* Back Link */}
        <div style={{ marginBottom: "32px", position: "relative", zIndex: 1 }}>
          <Link
            href="/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--cyan)",
              fontSize: "0.85rem",
              fontWeight: 700,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
            className="hover:underline"
          >
            ← Back to all updates
          </Link>
        </div>

        {/* Article Header */}
        <header style={{ marginBottom: "40px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--cyan)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {story.category}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{story.date}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                background: "rgba(0, 229, 255, 0.1)",
                color: "var(--cyan)",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
              }}
            >
              {story.source}
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            {story.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            {story.subtitle}
          </p>

          {/* Author info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ position: "relative", width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
              <Image
                src={prefixPath(story.author.image)}
                alt={story.author.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1rem" }}>{story.author.name}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{story.author.role}</div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "450px",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "48px",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            zIndex: 1,
            background: "rgba(2, 4, 8, 0.4)",
          }}
        >
          <Image
            src={prefixPath(story.image)}
            alt={story.title}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Article Body */}
        <article
          style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "60px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {story.content.map(renderArticleParagraph)}
        </article>

        {/* Visual Assets Deck & Downloadable Planner */}
        {(images.length > 0 || downloads.length > 0) && (
          <div style={{ marginBottom: "60px", position: "relative", zIndex: 1 }}>
            <ArticleVisualAssetsDeck
              heading="Lux Agent USB Visual Assets & First Workflow Planner"
              subheading="Explore full-resolution blueprints, overview infographics, and interactive workflow planners included with this article."
              images={images}
              downloads={downloads}
            />
          </div>
        )}

        {/* LinkedIn Engagement Widget */}
        <div
          style={{
            padding: "32px",
            marginBottom: "48px",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
          className="glass-card"
        >
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px" }}>
            Join the conversation on LinkedIn
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.5 }}>
            This article was compiled from updates posted to our official feeds. Jump over to LinkedIn to share your thoughts, ask questions, or connect with us directly.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
            <a
              href={story.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, var(--cyan) 0%, var(--blue) 100%)",
                color: "var(--bg-void)",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "14px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.25)",
                transition: "all 0.2s ease",
              }}
              className="hover:opacity-90 hover:scale-[1.01]"
            >
              Discuss on LinkedIn ↗
            </a>
            
            <Link
              href="/news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "14px 24px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              More Articles
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
