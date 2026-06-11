import type { NextConfig } from "next";
import { resolve } from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: resolve(process.cwd(), "../"),
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 78, 84, 90]
  }
};

export default nextConfig;
