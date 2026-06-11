import type { NextConfig } from "next";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: resolve(process.cwd(), "../"),
  allowedDevOrigins: [
    "10.185.136.238",
    "10.169.138.244",
    "10.48.213.238",
    "127.0.0.1",
  ],
  images: {
    qualities: [48, 55, 75],
  },
  turbopack: {
    root: resolve(process.cwd(), ".."),
  },
};

export default nextConfig;
