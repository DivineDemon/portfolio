import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const siteUrl = process.env.PUBLIC_SITE_URL || "https://mushood.com";

export default defineConfig({
  site: siteUrl,
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["astro/compiler-runtime"],
    },
  },
});
