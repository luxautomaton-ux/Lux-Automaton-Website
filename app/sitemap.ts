export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { seoCanonical } from "@/lib/seoCanonical";

// Curated public marketing pages only. Private areas and preview dashboards
// are deliberately absent; this list is not a claim that Google indexed them.
const publicPages = [
  "",
  "solutions",
  "services",
  "products",
  "pricing",
  "start-here",
  "contact",
  "workshops",
  "privacy",
  "products/lux-ai-visibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages = PRODUCTS
    .filter((product) => product.status === "live")
    .map((product) => `products/${product.slug}`);

  return Array.from(new Set([...publicPages, ...productPages])).map((path) => ({
    url: seoCanonical(path),
  }));
}
