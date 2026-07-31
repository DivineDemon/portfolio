import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	markdown: {
		processor: unified({
			remarkPlugins: [remarkCodeMeta],
		}),
	},

	integrations: [react(), mdx()],
});
