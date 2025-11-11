import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: `${process.env.DOCS_DOMAIN}/docs`,
      },
      {
        source: "/docs/:path+",
        destination: `${process.env.DOCS_DOMAIN}/docs/:path+`,
      },
      {
        source: "/docs-static/:path+",
        destination: `${process.env.DOCS_DOMAIN}/docs-static/:path+`,
      },
    ];
  },
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
