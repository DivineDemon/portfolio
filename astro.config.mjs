import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	markdown: {
		remarkPlugins: [remarkCodeMeta],
	},

	integrations: [react(), mdx()],
});
