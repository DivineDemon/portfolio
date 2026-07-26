import type { NextConfig } from "next";
import {
  getPostHogApiHost,
  getPostHogAssetsHost,
} from "./src/lib/posthog/config";

const posthogApiHost = getPostHogApiHost();
const posthogAssetsHost = getPostHogAssetsHost();

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  transpilePackages: ["react-tweet"],
  // OpenNext/esbuild needs workerd builds of pg-cloudflare; NFT otherwise only traces empty.js
  outputFileTracingIncludes: {
    "/**": [
      "./node_modules/pg-cloudflare/dist/**",
      "./node_modules/pg-cloudflare/esm/**",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "abs.twimg.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${posthogAssetsHost}/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${posthogApiHost}/:path*`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
