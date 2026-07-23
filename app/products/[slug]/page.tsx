import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";
import { PRODUCTS } from "@/lib/products";
import { getProductPreviews } from "@/lib/productPreviews";
import ProductShowcaseGallery from "@/components/ProductShowcaseGallery";
import EcosystemBanner from "@/components/EcosystemBanner";
import ProductPageCTA from "@/components/ProductPageCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  return product ? { title: `${product.name} — Lux Automaton`, description: product.description } : {};
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

  const previews = getProductPreviews(product);
  const isExternal = product.ctaHref.startsWith("http");
  const otherProducts = PRODUCTS.filter((item) => item.slug !== product.slug).slice(0, 7).map((item) => ({
    name: item.name,
    icon: item.icon.trim(),
    href: item.pageHref,
  }));
  const fiveWH = Object.entries(product.fiveWH) as Array<[string, { headline: string; body: string }]>;

  return (
    <main className="product-showcase-world" style={{ "--product-accent": product.accentColor } as CSSProperties}>
      <section className="product-showcase-hero">
        <Image src={prefixPath(previews[0].image)} alt="" fill priority sizes="100vw" />
        <div className="product-showcase-hero-shade" />
        <div className="product-showcase-hero-grid" />
        <div className="product-showcase-hero-content">
          <div className="product-showcase-kicker"><span>{product.icon.trim()}</span> Lux ecosystem / {product.status.replace("-", " ")}</div>
          <h1>{product.name}</h1>
          <h2>{product.tagline}</h2>
          <p>{product.description}</p>
          <div className="product-showcase-actions">
            {isExternal ? (
              <a href={product.ctaHref} target="_blank" rel="noreferrer" className="primary">{product.ctaLabel}<b>↗</b></a>
            ) : (
              <Link href={product.ctaHref} className="primary">{product.ctaLabel}<b>→</b></Link>
            )}
            <Link href="#product-preview">View product <b>↓</b></Link>
          </div>
          <div className="product-showcase-proof">
            <span><b>{String(product.features.length).padStart(2, "0")}</b> core capabilities</span>
            <span><b>01</b> connected ecosystem</span>
            <span><b>24/7</b> operational access</span>
          </div>
        </div>
        <div className="product-showcase-index">Product / {String(PRODUCTS.findIndex((item) => item.slug === product.slug) + 1).padStart(2, "0")}</div>
      </section>

      <div className="product-signal-strip" aria-label="Product principles">
        <span>Private by design</span><b>✦</b><span>Human approved</span><b>✦</b><span>Built for execution</span><b>✦</b><span>Connected to LANA</span>
      </div>

      <div id="product-preview">
        <ProductShowcaseGallery productName={product.name} accentColor={product.accentColor} previews={previews} />
      </div>

      <section className="product-showcase-story">
        <div className="product-showcase-story-number">01</div>
        <div>
          <p>What it is</p>
          <h2>{product.fiveWH.what.headline}</h2>
        </div>
        <div className="product-showcase-story-copy">
          <strong>{product.description}</strong>
          <p>{product.fiveWH.what.body}</p>
        </div>
      </section>

      <section className="product-showcase-capabilities">
        <header>
          <div><p>Inside the system</p><h2>Everything you need to move from intent to outcome.</h2></div>
          <span>{product.name} brings the key work into one deliberate operating experience.</span>
        </header>
        <div className="product-capability-grid">
          {product.features.map((feature, index) => (
            <article key={feature}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{feature}</h3>
              <p>Designed for clear execution, visible review, and connection to the wider Lux Automaton system.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-showcase-why">
        <div>
          <p>Why it matters</p>
          <h2>{product.fiveWH.why.headline}</h2>
          <span>{product.fiveWH.why.body}</span>
        </div>
        <div className="product-showcase-quote">
          <span>THE LUX STANDARD</span>
          <blockquote>“Technology should make the next responsible action easier to see—and easier to complete.”</blockquote>
          <b>ASA + LANA</b>
        </div>
      </section>

      <section className="product-showcase-journey">
        <header><p>Complete product story</p><h2>Who it serves. When it works. How it moves.</h2></header>
        <div>
          {fiveWH.map(([key, item], index) => (
            <article key={key}>
              <span>{String(index + 1).padStart(2, "0")} / {key}</span>
              <h3>{item.headline}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {product.slug === "lux-coder" && (
        <section className="product-showcase-demo">
          <div><p>Product walkthrough</p><h2>Watch Lux Coder build.</h2><span>See the command center, persistent context, and development workflow inside VS Code.</span></div>
          <div><iframe src="https://www.youtube.com/embed/LEdcHrIkzpg" title="Lux Coder product demonstration" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
        </section>
      )}

      <EcosystemBanner connectionText={`${product.name} is designed to work as part of the complete Lux Automaton operating system.`} accentColor={product.accentColor} products={otherProducts} />
      <ProductPageCTA
        headline={`Make ${product.name} part of your operating system.`}
        subheadline={product.fiveWH.how.body}
        accentColor={product.accentColor}
        primaryCta={{ label: product.ctaLabel, href: product.ctaHref }}
        secondaryCta={{ label: "Explore all products", href: "/products" }}
      />
    </main>
  );
}
