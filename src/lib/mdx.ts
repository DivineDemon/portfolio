export interface Metric {
  value: string;
  label: string;
  subtext?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  type: "Company" | "Personal / Startup" | "Client";
  clientCompany: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  metrics?: Metric[];
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  content: string;
}

function parseFrontmatter(rawContent: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match?.[1]) {
    return { data: {}, content: rawContent };
  }

  const yamlBlock = match[1];
  const content = match[2] || "";
  const data: Record<string, unknown> = {};

  const lines = yamlBlock.split("\n");
  let currentKey = "";
  let inArray = false;
  let arrayItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && inArray) {
      arrayItems.push(trimmed.slice(2).replace(/^["']|["']$/g, ""));
      continue;
    }

    if (inArray && !trimmed.startsWith("- ")) {
      data[currentKey] = arrayItems;
      inArray = false;
      arrayItems = [];
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const val = line.slice(colonIndex + 1).trim();

      if (!val) {
        currentKey = key;
        inArray = true;
        arrayItems = [];
      } else if (val.startsWith("[") && val.endsWith("]")) {
        const items = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
        data[key] = items;
      } else {
        data[key] = val.replace(/^["']|["']$/g, "");
      }
    }
  }

  if (inArray && currentKey) {
    data[currentKey] = arrayItems;
  }

  return { data, content };
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

const caseStudyFiles = import.meta.glob("/src/content/case-studies/*.mdx", {
  query: "?raw",
  eager: true,
});

const blogFiles = import.meta.glob("/src/content/blogs/*.mdx", {
  query: "?raw",
  eager: true,
});

function extractRawString(mod: unknown): string {
  if (typeof mod === "string") return mod;
  if (mod && typeof mod === "object" && "default" in mod) {
    return String((mod as { default: unknown }).default);
  }
  return "";
}

export function getAllCaseStudies(): CaseStudy[] {
  const caseStudies: CaseStudy[] = [];

  for (const [filepath, fileModule] of Object.entries(caseStudyFiles)) {
    const rawContent = extractRawString(fileModule);
    const { data, content } = parseFrontmatter(rawContent);

    const fallbackSlug = filepath.split("/").pop()?.replace(".mdx", "") || "";

    let parsedMetrics: Metric[] | undefined;
    if (rawContent.includes("metrics:")) {
      parsedMetrics = parseMetricsFromRaw(rawContent);
    }

    caseStudies.push({
      slug: (data.slug as string) || fallbackSlug,
      title: (data.title as string) || "Untitled Case Study",
      type: (data.type as CaseStudy["type"]) || "Company",
      clientCompany: (data.clientCompany as string) || "Enterprise",
      date: (data.date as string) || "2024-01-01",
      author: (data.author as string) || "Mushood Hanif",
      description: (data.description as string) || "",
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      metrics: parsedMetrics,
      content,
    });
  }

  return caseStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((cs) => cs.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [filepath, fileModule] of Object.entries(blogFiles)) {
    const rawContent = extractRawString(fileModule);
    const { data, content } = parseFrontmatter(rawContent);

    const fallbackSlug = filepath.split("/").pop()?.replace(".mdx", "") || "";

    posts.push({
      slug: (data.slug as string) || fallbackSlug,
      title: (data.title as string) || "Untitled Post",
      date: (data.date as string) || "2024-01-01",
      description: (data.description as string) || "",
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      readingTime: calculateReadingTime(content),
      content,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

function parseMetricsFromRaw(raw: string): Metric[] {
  const metrics: Metric[] = [];
  const metricsMatch = raw.match(/metrics:\s*([\s\S]*?)(?=\n[a-z]+:|\n---)/i);
  if (!metricsMatch?.[1]) return metrics;

  const lines = metricsMatch[1].split("\n");
  let currentMetric: Partial<Metric> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- value:")) {
      if (currentMetric.value && currentMetric.label) {
        metrics.push(currentMetric as Metric);
      }
      currentMetric = {
        value: trimmed
          .replace("- value:", "")
          .trim()
          .replace(/^["']|["']$/g, ""),
      };
    } else if (trimmed.startsWith("label:")) {
      currentMetric.label = trimmed
        .replace("label:", "")
        .trim()
        .replace(/^["']|["']$/g, "");
    } else if (trimmed.startsWith("subtext:")) {
      currentMetric.subtext = trimmed
        .replace("subtext:", "")
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }

  if (currentMetric.value && currentMetric.label) {
    metrics.push(currentMetric as Metric);
  }

  return metrics;
}
