import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? (isProd ? "/Lux-Automaton-Website" : "");

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves static .html routes; Cloudflare uses trailing-slash directories.
  trailingSlash: siteBasePath === "",
  basePath: siteBasePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khyzmyvrfjwwnbvwfhhk.supabase.co",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
