import type { MetadataRoute } from "next";
import { getAllBlogPosts, getAllCaseStudies } from "@/lib/mdx";
import { SITE_URL } from "@/lib/seo";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [posts, caseStudies] = await Promise.all([getAllBlogPosts(), getAllCaseStudies()]);

  const latestBlogDate = posts[0]?.date;
  const latestCaseStudyDate = caseStudies[0]?.date;
  const latestDate = [latestBlogDate, latestCaseStudyDate].filter(Boolean).sort().at(-1);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: latestDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/work`,
      lastModified: latestCaseStudyDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...caseStudies.map((cs) => ({
      url: `${SITE_URL}/work/${cs.slug}`,
      lastModified: cs.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
};

export default sitemap;
