const fallbackSiteUrl = "https://luxautomaton-ux.github.io/Lux-Automaton-Website/";

/**
 * Select the public URL shape supported by the publishing host.
 * GitHub Pages currently serves exported leaf routes without a final slash;
 * the configured Cloudflare website uses auto-trailing-slash handling.
 * Never substitute a homepage canonical for a distinct inner page.
 */
export function seoCanonical(pathname = ""): string {
  const root = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl).replace(/\/+$/, "");
  const path = pathname.replace(/^\/+|\/+$/g, "");
  if (!path) return `${root}/`;
  const isGitHubPages = new URL(root).hostname.endsWith(".github.io");
  return `${root}/${path}${isGitHubPages ? "" : "/"}`;
}
