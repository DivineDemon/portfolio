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
