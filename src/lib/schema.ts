import type { BlogPost, CaseStudy } from "./mdx";
import { absoluteUrl, SITE_NAME, SITE_URL } from "./seo";

export type Schema = Record<string, unknown>;

export const personSchema: Schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Mushood Hanif",
  url: SITE_URL,
  jobTitle: "Founder & AI Systems Architect",
  worksFor: [
    {
      "@type": "Organization",
      name: "Haga Labs",
      url: "https://hagalabs.ai",
    },
    {
      "@type": "Organization",
      name: "Afiniti",
    },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "LLM Fine-Tuning",
    "LangGraph Multi-Agent Systems",
    "Physical Verification",
    "vLLM",
    "PyTorch",
    "JAX",
    "FastAPI",
    "System Design",
  ],
  sameAs: [
    "https://github.com/mushoodhanif",
    "https://linkedin.com/in/mushoodhanif",
    "https://x.com/mushoodhanif",
  ],
};

export function websiteSchema(description: string): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description,
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en-US",
  };
}

export function blogIndexSchema(posts: BlogPost[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Technical Publications & AI Insights — Mushood Hanif",
    description:
      "In-depth technical writing on agentic AI loop engineering, multi-agent orchestration, open-weight models, physical verification, and AI system design.",
    url: absoluteUrl("/blog"),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
      author: {
        "@type": "Person",
        name: post.author || "Mushood Hanif",
      },
    })),
  };
}

export function workIndexSchema(caseStudies: CaseStudy[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Engineering Archive & Case Studies — Mushood Hanif",
    description:
      "Production AI microservices, multi-agent LLM systems, fine-tuning frameworks, and physical AI evaluation suites built by Mushood Hanif.",
    url: absoluteUrl("/work"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((cs, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: absoluteUrl(`/work/${cs.slug}`),
        name: cs.title,
      })),
    },
  };
}

export function blogPostSchema(post: BlogPost): Schema[] {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      author: {
        "@type": "Person",
        name: post.author || "Mushood Hanif",
        url: SITE_URL,
      },
      datePublished: post.date,
      url,
      keywords: post.tags.join(", "),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
}

export function caseStudySchema(caseStudy: CaseStudy): Schema[] {
  const url = absoluteUrl(`/work/${caseStudy.slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: caseStudy.title,
      description: caseStudy.description,
      author: {
        "@type": "Person",
        name: caseStudy.author || "Mushood Hanif",
        url: SITE_URL,
      },
      datePublished: caseStudy.date,
      url,
      keywords: caseStudy.tags.join(", "),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: caseStudy.title, path: `/work/${caseStudy.slug}` },
    ]),
  ];
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
