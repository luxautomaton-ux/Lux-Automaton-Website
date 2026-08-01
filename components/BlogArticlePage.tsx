import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/luxContent";
import { prefixPath } from "@/lib/prefix";
import SocialShare from "@/components/SocialShare";

function ArticleParagraph({ paragraph, index }: { paragraph: string; index: number }) {
  const trimmed = paragraph.trim();
  const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);

  if (imageMatch) {
    const [, alt, source] = imageMatch;
    return (
      <figure key={index} className="article-inline-figure">
        <div className="article-inline-media">
          <Image src={prefixPath(source)} alt={alt || "Article illustration"} fill sizes="(max-width: 900px) 100vw, 860px" />
        </div>
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    );
  }

  if (trimmed.startsWith("## ")) {
    return <h2 key={index} className="blog-detail-heading">{trimmed.slice(3)}</h2>;
  }

  if (trimmed.startsWith("### ")) {
    return <h3 key={index} className="blog-detail-subheading">{trimmed.slice(4)}</h3>;
  }

  if (trimmed.startsWith("> ")) {
    return <blockquote key={index} className="blog-detail-quote">{trimmed.slice(2)}</blockquote>;
  }

  if (trimmed.startsWith("<")) {
    const formattedHtml = paragraph
      .replaceAll('src="/images/', `src="${prefixPath("/images/")}`)
      .replaceAll('src="/videos/', `src="${prefixPath("/videos/")}`)
      .replaceAll('href="/documents/', `href="${prefixPath("/documents/")}`);
    return <div key={index} className="blog-detail-rich-block" dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
  }

  const formattedHtml = paragraph
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replaceAll('src="/images/', `src="${prefixPath("/images/")}`)
    .replaceAll('src="/videos/', `src="${prefixPath("/videos/")}`)
    .replaceAll('href="/documents/', `href="${prefixPath("/documents/")}`)
    .replaceAll('href="/kids-', `href="${prefixPath("/kids-")}`);

  return <p key={index} className="blog-detail-paragraph" dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
}

export default function BlogArticlePage({ article }: { article: BlogArticle }) {
  return (
    <main className="blog-detail-world">
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-media">
          {article.video ? (
            <video src={prefixPath(article.video)} poster={prefixPath(article.image)} autoPlay loop muted playsInline aria-label={`${article.title} preview`} />
          ) : (
            <Image src={prefixPath(article.image)} alt={article.title} fill priority sizes="100vw" />
          )}
        </div>
        <div className="blog-detail-hero-overlay" />
        <div className="blog-detail-hero-copy">
          <Link href="/blog" className="blog-detail-back">← All stories</Link>
          <p>{article.audience} · {article.category}</p>
          <h1>{article.title}</h1>
          <strong>{article.deck}</strong>
          <div className="blog-detail-meta"><span>{article.date}</span><span>{article.readTime}</span></div>
        </div>
      </section>

      <section className="blog-detail-shell">
        <aside className="blog-detail-sidebar">
          <p>In this story</p>
          {article.takeaways.map((takeaway, index) => <span key={takeaway}><b>{String(index + 1).padStart(2, "0")}</b>{takeaway}</span>)}
          {article.plannerUrl && <a href={prefixPath(article.plannerUrl)} target="_blank" rel="noreferrer">Download the free guide ↓</a>}
          <SocialShare title={article.title} text={article.deck} />
        </aside>

        <article className="blog-detail-article">
          {article.plannerUrl && (
            <div className="blog-detail-resource">
              <span>Free activity or planner</span>
              <h2>Keep learning with the companion guide.</h2>
              <p>Open this simple resource in a new tab, then use it at your own pace.</p>
              <a href={prefixPath(article.plannerUrl)} target="_blank" rel="noreferrer">Open the free guide →</a>
            </div>
          )}
          {article.body.map((paragraph, index) => <ArticleParagraph key={`${article.slug}-${index}`} paragraph={paragraph} index={index} />)}
        </article>
      </section>
    </main>
  );
}
