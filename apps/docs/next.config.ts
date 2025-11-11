import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: "/docs",
  assetPrefix: "/docs-static",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/docs-static/_next/:path*",
          destination: "/_next/:path*",
        },
      ],
    };
  },

  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
