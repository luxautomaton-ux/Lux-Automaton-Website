const fallbackSiteUrl = "https://luxautomaton-ux.github.io/Lux-Automaton-Website/";

/**
 * Absolute canonical URLs for both the GitHub Pages build (with its base path)
 * and the separately configured custom-domain build.
 * No new dependency, network request, or UI behavior.
 */
export function seoCanonical(pathname = ""): string {
  const root = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl).replace(/\/+$/, "");
  const path = pathname.replace(/^\/+|\/+$/g, "");
  return path ? `${root}/${path}/` : `${root}/`;
}
