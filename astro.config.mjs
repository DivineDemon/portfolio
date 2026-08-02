import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

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
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: {
        "react-dom/server": "react-dom/server.edge",
      },
    },
    ssr: {
      noExternal: true,
      optimizeDeps: {
        exclude: ["astro"],
      },
    },
  },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public" }),
      PUBLIC_POSTHOG_HOST: envField.string({ context: "client", access: "public" }),
      EMAILJS_PRIVATE_KEY: envField.string({ context: "server", access: "secret" }),
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_EMAILJS_SERVICE_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_EMAILJS_PUBLIC_KEY: envField.string({ context: "client", access: "public" }),
      PUBLIC_EMAILJS_TEMPLATE_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_POSTHOG_PROJECT_TOKEN: envField.string({ context: "client", access: "public" }),
    },
  },
});
