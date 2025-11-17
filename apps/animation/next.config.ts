import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: "/animation",
  assetPrefix: "/animation-static",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/animation-static/_next/:path*",
          destination: "/_next/:path*",
        },
      ],
    };
  },

  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
