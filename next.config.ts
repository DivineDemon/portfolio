import type { NextConfig } from "next";
import "./src/env.ts";

interface WebpackConfig {
  module?: {
    rules?: Array<{
      test?: RegExp;
      issuer?: unknown;
      resourceQuery?: RegExp | { not?: RegExp[] };
      exclude?: RegExp;
      use?: string[];
    }>;
  };
}

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  typedRoutes: true,
  webpack(config: WebpackConfig) {
    const fileLoaderRule = config.module?.rules?.find((rule) => rule.test?.test?.(".svg"));

    if (fileLoaderRule && config.module?.rules) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {
            not: [
              ...(typeof fileLoaderRule.resourceQuery === "object" &&
              fileLoaderRule.resourceQuery !== null &&
              "not" in fileLoaderRule.resourceQuery
                ? fileLoaderRule.resourceQuery.not || []
                : []),
              /url/,
            ],
          },
          use: ["@svgr/webpack"],
        },
      );

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default config;
