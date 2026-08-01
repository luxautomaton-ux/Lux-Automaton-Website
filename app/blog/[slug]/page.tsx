import { notFound } from "next/navigation";
import BlogArticlePage from "@/components/BlogArticlePage";
import { BLOG_ARTICLES } from "@/lib/luxContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function BlogStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((entry) => entry.slug === slug);

  if (!article) notFound();

  return <BlogArticlePage article={article} />;
}
