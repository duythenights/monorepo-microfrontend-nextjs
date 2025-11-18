import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: "/animation",
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  transpilePackages: ["@repo/ui", "three"],
};

export default nextConfig;
