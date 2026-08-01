import {
  type BlogPost,
  type CaseStudy,
  getBlogPostBySlug as getLocalBlogPostBySlug,
  getAllBlogPosts as getLocalBlogPosts,
  getAllCaseStudies as getLocalCaseStudies,
  getCaseStudyBySlug as getLocalCaseStudyBySlug,
} from "./mdx";

export type { BlogPost, CaseStudy };

export interface D1ContentRow {
  slug: string;
  collection: string;
  title: string;
  description: string | null;
  content: string;
  date: string | null;
  author: string | null;
  type: string | null;
  client_company: string | null;
  role: string | null;
  domain: string | null;
  tags: string | null;
  metrics: string | null;
  reading_time: string | null;
  updated_at: string | null;
}

export async function fetchCaseStudiesFromD1(db?: D1Database): Promise<CaseStudy[]> {
  if (!db || typeof db.prepare !== "function") {
    return getLocalCaseStudies();
  }

  try {
    const { results } = await db
      .prepare("SELECT * FROM content WHERE collection = 'case-studies' ORDER BY date DESC")
      .all<D1ContentRow>();

    if (!results || results.length === 0) {
      return getLocalCaseStudies();
    }

    return results.map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      content: row.content,
      date: row.date || "2026-01-01",
      author: row.author || "Mushood Hanif",
      type: (row.type as CaseStudy["type"]) || "Company",
      clientCompany: row.client_company || "Enterprise",
      role: row.role || undefined,
      domain: row.domain || undefined,
      tags: row.tags ? JSON.parse(row.tags) : [],
      metrics: row.metrics ? JSON.parse(row.metrics) : [],
    }));
  } catch (error) {
    console.error("Error fetching case studies from Cloudflare D1:", error);
    return getLocalCaseStudies();
  }
}

export async function fetchCaseStudyBySlugFromD1(
  slug: string,
  db?: D1Database,
): Promise<CaseStudy | undefined> {
  if (!db || typeof db.prepare !== "function") {
    return getLocalCaseStudyBySlug(slug);
  }

  try {
    const lowerSlug = slug.toLowerCase();
    const cleanTargetLower = lowerSlug.replace("_case_study", "").replace(/-/g, "_");

    const { results } = await db
      .prepare("SELECT * FROM content WHERE collection = 'case-studies'")
      .all<D1ContentRow>();

    if (!results || results.length === 0) {
      return getLocalCaseStudyBySlug(slug);
    }

    const row = results.find((r) => {
      const csLower = r.slug.toLowerCase();
      const cleanCsLower = csLower.replace("_case_study", "").replace(/-/g, "_");
      return (
        csLower === lowerSlug ||
        cleanCsLower === cleanTargetLower ||
        csLower === `${lowerSlug}_case_study` ||
        csLower.replace("_case_study", "") === lowerSlug
      );
    });

    if (!row) return getLocalCaseStudyBySlug(slug);

    return {
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      content: row.content,
      date: row.date || "2026-01-01",
      author: row.author || "Mushood Hanif",
      type: (row.type as CaseStudy["type"]) || "Company",
      clientCompany: row.client_company || "Enterprise",
      role: row.role || undefined,
      domain: row.domain || undefined,
      tags: row.tags ? JSON.parse(row.tags) : [],
      metrics: row.metrics ? JSON.parse(row.metrics) : [],
    };
  } catch (error) {
    console.error("Error fetching case study by slug from D1:", error);
    return getLocalCaseStudyBySlug(slug);
  }
}

export async function fetchBlogPostsFromD1(db?: D1Database): Promise<BlogPost[]> {
  if (!db || typeof db.prepare !== "function") {
    return getLocalBlogPosts();
  }

  try {
    const { results } = await db
      .prepare("SELECT * FROM content WHERE collection = 'blogs' ORDER BY date DESC")
      .all<D1ContentRow>();

    if (!results || results.length === 0) {
      return getLocalBlogPosts();
    }

    return results.map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      content: row.content,
      date: row.date || "2024-01-01",
      author: row.author || "Mushood Hanif",
      tags: row.tags ? JSON.parse(row.tags) : [],
      readingTime: row.reading_time || "5 min read",
    }));
  } catch (error) {
    console.error("Error fetching blog posts from Cloudflare D1:", error);
    return getLocalBlogPosts();
  }
}

export async function fetchBlogPostBySlugFromD1(
  slug: string,
  db?: D1Database,
): Promise<BlogPost | undefined> {
  if (!db || typeof db.prepare !== "function") {
    return getLocalBlogPostBySlug(slug);
  }

  try {
    const { results } = await db
      .prepare("SELECT * FROM content WHERE collection = 'blogs' AND slug = ?")
      .bind(slug)
      .all<D1ContentRow>();

    if (!results || results.length === 0) {
      return getLocalBlogPostBySlug(slug);
    }

    const row = results[0];
    if (!row) return getLocalBlogPostBySlug(slug);

    return {
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      content: row.content,
      date: row.date || "2024-01-01",
      author: row.author || "Mushood Hanif",
      tags: row.tags ? JSON.parse(row.tags) : [],
      readingTime: row.reading_time || "5 min read",
    };
  } catch (error) {
    console.error("Error fetching blog post by slug from D1:", error);
    return getLocalBlogPostBySlug(slug);
  }
}
