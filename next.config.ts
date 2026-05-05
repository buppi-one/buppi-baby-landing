import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["@/components"],
  },
};

export default nextConfig;
