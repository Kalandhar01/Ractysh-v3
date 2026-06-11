import type { NextConfig } from "next";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.185.136.238",
    "10.169.138.244",
    "10.48.213.238",
    "127.0.0.1",
  ],
  images: {
    qualities: [48, 55, 75],
  },
  transpilePackages: ["@ractysh/db"],
  turbopack: {
    root: resolve(process.cwd(), ".."),
  },
};

export default nextConfig;
