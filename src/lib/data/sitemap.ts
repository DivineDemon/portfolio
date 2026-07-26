import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import {
  getCmsBlogPosts,
  getCmsProjects,
  getCmsWorkflows,
  toDate,
} from "@/lib/data/cms-store";

export async function getSitemapData() {
  "use cache";
  cacheTag("sitemap", "blog", "case-studies");
  cacheLife("max");

  return {
    blogPosts: getCmsBlogPosts().map((post) => ({
      slug: post.slug,
      updatedAt: toDate(post.updatedAt),
    })),
    projects: getCmsProjects().map((project) => ({
      slug: project.slug,
      updatedAt: toDate(project.updatedAt),
    })),
    workflows: getCmsWorkflows().map((workflow) => ({
      slug: workflow.slug,
      updatedAt: toDate(workflow.updatedAt),
    })),
  };
}
