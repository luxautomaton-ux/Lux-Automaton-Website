import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/lux-agent-website",
  assetPrefix: "/lux-agent-website/",
};

export default nextConfig;
