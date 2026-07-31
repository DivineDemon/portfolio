import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
	schema: z
		.object({
			title: z.string(),
			publishedAt: z.string().nullable().optional(),
			date: z.string().nullable().optional(),
			createdAt: z.string().nullable().optional(),
			updatedAt: z.string().nullable().optional(),
			author: z.string().nullable().optional(),
			summary: z.string().nullable().optional(),
			description: z.string().nullable().optional(),
			excerpt: z.string().nullable().optional(),
			image: z.string().nullable().optional(),
		})
		.transform((data) => {
			const resolvedDate =
				data.publishedAt || data.date || data.createdAt || "";
			const resolvedSummary =
				data.summary || data.description || data.excerpt || "";
			return {
				...data,
				publishedAt: resolvedDate,
				summary: resolvedSummary,
			};
		}),
});

export const collections = { posts };
