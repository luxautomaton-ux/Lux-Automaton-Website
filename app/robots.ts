export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { seoCanonical } from "@/lib/seoCanonical";

// On a custom domain, robots.txt is served at the domain root.
// GitHub Pages project paths cannot set host-wide github.io robots policy.
export default function robots(): MetadataRoute.Robots {
  const root = seoCanonical();
  const sitePath = new URL(root).pathname.replace(/\/$/, "");

  const route = (path: string) => `${sitePath}/${path}/`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: route(""),
        disallow: [
          route("admin"),
          route("chat"),
          route("unsubscribe"),
          route("products/lux-ai-visibility/dashboard"),
        ],
      },
    ],
    sitemap: `${root}sitemap.xml`,
  };
}
