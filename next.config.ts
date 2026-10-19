import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  outputFileTracingIncludes: {
    "/**/*": ["./src/content/**/*"],
  },
};

export default nextConfig;
