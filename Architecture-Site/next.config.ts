import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ractysh/db"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 78, 84, 90]
  }
};

export default nextConfig;
