import type { MetadataRoute } from "next";
import { getSitemapData } from "@/lib/cms/get-sitemap-data";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    projects,
    workflows,
    pages,
    blogPosts,
    leadMagnets,
    settingsUpdatedAt,
  } = await getSitemapData();
  const homeLastModified =
    settingsUpdatedAt ??
    projects[0]?.updatedAt ??
    workflows[0]?.updatedAt ??
    pages[0]?.updatedAt ??
    blogPosts[0]?.updatedAt ??
    new Date();
  const seoLastModified = settingsUpdatedAt ?? homeLastModified;

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const workflowEntries: MetadataRoute.Sitemap = workflows.map((workflow) => ({
    url: `${SITE_URL}/workflows/${workflow.slug}`,
    lastModified: workflow.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const resourceEntries: MetadataRoute.Sitemap = leadMagnets.map((magnet) => ({
    url: `${SITE_URL}/resources/${magnet.slug}`,
    lastModified: magnet.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogPosts[0]?.updatedAt ?? homeLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: leadMagnets[0]?.updatedAt ?? homeLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: seoLastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/llms-full.txt`,
      lastModified: seoLastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return [
    ...staticEntries,
    ...pageEntries,
    ...blogEntries,
    ...resourceEntries,
    ...projectEntries,
    ...workflowEntries,
  ];
}
