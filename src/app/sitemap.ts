import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getSitemapData } from "@/lib/data/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogPosts, projects, workflows } = await getSitemapData();

  const homeLastModified =
    blogPosts[0]?.updatedAt ??
    projects[0]?.updatedAt ??
    workflows[0]?.updatedAt ??
    new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/case-studies/projects`,
      lastModified: projects[0]?.updatedAt ?? homeLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/case-studies/workflows`,
      lastModified: workflows[0]?.updatedAt ?? homeLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogPosts[0]?.updatedAt ?? homeLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: homeLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/case-studies/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workflowEntries: MetadataRoute.Sitemap = workflows.map((workflow) => ({
    url: `${SITE_URL}/case-studies/workflows/${workflow.slug}`,
    lastModified: workflow.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...projectEntries,
    ...workflowEntries,
  ];
}
