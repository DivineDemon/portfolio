export interface Metric {
  value: string;
  label: string;
  subtext?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  project?: string;
  role?: string;
  domain?: string;
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
  author?: string;
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

function parseMarkdownCaseStudyHeader(rawContent: string): {
  title?: string;
  project?: string;
  role?: string;
  technologies?: string[];
  domain?: string;
  description?: string;
} {
  const meta: {
    title?: string;
    project?: string;
    role?: string;
    technologies?: string[];
    domain?: string;
    description?: string;
  } = {};

  const projectMatch = rawContent.match(/\*\*Project:\*\*\s*(.+)$/m);
  if (projectMatch?.[1]) {
    meta.project = projectMatch[1].trim();
  }

  const caseStudyTitleMatch = rawContent.match(/^#\s*Case Study:\s*(.+)$/m);
  if (caseStudyTitleMatch?.[1]) {
    meta.title = caseStudyTitleMatch[1].trim();
  } else if (meta.project) {
    meta.title = meta.project;
  } else {
    const h1Match = rawContent.match(
      /^#\s+(?!#|Executive Summary|The Challenge|The Solution)(.+)$/m,
    );
    if (h1Match?.[1]) {
      meta.title = h1Match[1].trim();
    }
  }

  const roleMatch = rawContent.match(/\*\*Role:\*\*\s*(.+)$/m);
  if (roleMatch?.[1]) {
    meta.role = roleMatch[1].trim();
  }

  const techMatch = rawContent.match(/\*\*Technologies:\*\*\s*(.+)$/m);
  if (techMatch?.[1]) {
    meta.technologies = techMatch[1]
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  const domainMatch = rawContent.match(/\*\*Domain:\*\*\s*(.+)$/m);
  if (domainMatch?.[1]) {
    meta.domain = domainMatch[1].trim();
  }

  const execSummaryMatch = rawContent.match(
    /##?\s*Executive Summary\s*\n+([\s\S]*?)(?=\n\r?\n|\n#)/i,
  );
  if (execSummaryMatch?.[1]) {
    meta.description = execSummaryMatch[1]
      .trim()
      .replace(/^#+\s*/, "")
      .replace(/\r?\n/g, " ");
  }

  return meta;
}

function inferCompanyAndType(
  slug: string,
  project?: string,
  _domain?: string,
): { clientCompany: string; type: CaseStudy["type"] } {
  const lowerSlug = slug.toLowerCase();
  const lowerProj = (project || "").toLowerCase();

  if (lowerSlug.includes("haga") || lowerProj.includes("haga")) {
    return { clientCompany: "Haga Labs", type: "Personal / Startup" };
  }

  if (
    lowerSlug.includes("adcp") ||
    lowerSlug.includes("agbsim") ||
    lowerSlug.includes("oplftsf") ||
    lowerSlug.includes("rtfsp") ||
    lowerProj.includes("afiniti")
  ) {
    return { clientCompany: "Afiniti", type: "Company" };
  }

  if (
    lowerSlug.includes("brsc") ||
    lowerSlug.includes("faq_srp") ||
    lowerSlug.includes("fbf_re") ||
    lowerSlug.includes("salon_pos") ||
    lowerSlug.includes("ue_sc") ||
    lowerProj.includes("confiz")
  ) {
    return { clientCompany: "Confiz", type: "Company" };
  }

  if (lowerSlug.includes("ezra") || lowerProj.includes("ezra")) {
    return { clientCompany: "Ezra Global", type: "Client" };
  }

  if (
    lowerSlug.includes("coeus") ||
    lowerSlug.includes("portfolio") ||
    lowerSlug.includes("research")
  ) {
    return { clientCompany: "Personal / Startup", type: "Personal / Startup" };
  }

  return { clientCompany: "Enterprise", type: "Company" };
}

function extractMetricsFromMarkdown(rawContent: string): Metric[] {
  const metrics: Metric[] = [];

  const tableMatches = Array.from(rawContent.matchAll(/\|([^\n]+)\|/g));
  if (tableMatches.length > 2) {
    for (let i = 2; i < tableMatches.length; i++) {
      const match = tableMatches[i];
      if (!match?.[1]) continue;
      const row = match[1];
      if (row.includes("---")) continue;
      const cols = row
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      const firstCol = cols[0];
      const lastCol = cols[cols.length - 1];
      if (cols.length >= 3 && firstCol && lastCol) {
        metrics.push({
          label: firstCol.replace(/\*\*/g, ""),
          value: lastCol.replace(/\*\*/g, ""),
          subtext: cols.length >= 4 && cols[1] ? cols[1].replace(/\*\*/g, "") : undefined,
        });
      }
    }
  }

  if (metrics.length === 0) {
    const boldMetricMatches = Array.from(
      rawContent.matchAll(
        /\*\*([0-9]+%|[0-9]+x|[0-9]+\+|<[0-9]+[a-z]+|~?[0-9]+\s*days?|~?[0-9]+\s*hours?)\*\*\s+([^.\n]+)/gi,
      ),
    );
    for (const match of boldMetricMatches.slice(0, 3)) {
      if (match[1] && match[2]) {
        metrics.push({
          value: match[1],
          label: match[2].trim().slice(0, 40),
        });
      }
    }
  }

  return metrics.slice(0, 4);
}

function cleanTitle(title: string): string {
  return title
    .replace(/\s*\([A-Z0-9-]{2,}\)\s*$/gi, "")
    .replace(/^#+\s*/, "")
    .trim();
}

const CURATED_CASE_STUDY_METRICS: Record<string, Metric[]> = {
  adcp: [
    { value: "92%", label: "Document Processing Time Saved" },
    { value: "96% F1", label: "Extraction Accuracy" },
    { value: "6 Agents", label: "LangGraph Orchestration Layer" },
  ],
  agbsim: [
    { value: "92.3%", label: "p50 Latency Reduction", subtext: "2071ms → 160ms" },
    { value: "64.0%", label: "Cost Savings per 1k Transactions" },
    { value: "Instant", label: "p95 Time-To-First-Token Streaming" },
  ],
  brsc: [
    { value: "75%", label: "Memory Footprint Reduction", subtext: "470MB → 117MB" },
    { value: "< 60ms", label: "Vector Retrieval Latency" },
    { value: "80%", label: "Factual Error Reduction" },
  ],
  coeus: [
    { value: "100%", label: "Organized Knowledge System", subtext: "PARA Method Architecture" },
    { value: "3x", label: "Information Retrieval Speed" },
    { value: "0", label: "Local Data Lock-in" },
  ],
  ezra_bid_assistant: [
    { value: "80%", label: "Proposal Generation Time Saved" },
    { value: "100%", label: "Contextual Client Alignment" },
    { value: "< 2s", label: "Chrome Extension Query Latency" },
  ],
  ezra_global: [
    { value: "100", label: "Lighthouse Performance Score" },
    { value: "0.2s", label: "First Contentful Paint" },
    { value: "100%", label: "Type-Safe Monorepo" },
  ],
  faq_srp: [
    { value: "88%", label: "Top-1 Search Accuracy" },
    { value: "4x", label: "Relevance Score Improvement" },
    { value: "70%", label: "Reduction in Support Escalations" },
  ],
  fbf_re: [
    { value: "< 15ms", label: "FAISS Vector Search Latency" },
    { value: "100k+", label: "Concurrent Indexed Documents" },
    { value: "99.9%", label: "System Service Availability" },
  ],
  haga: [
    { value: "98.4%", label: "Physics Perturbation Pass Rate" },
    { value: "0%", label: "Data Drift Between Public & Dataroom" },
    { value: "85%", label: "Manual Review Time Saved" },
  ],
  oplftsf: [
    { value: "4x", label: "Serving Throughput via vLLM" },
    { value: "70%", label: "VRAM Reduction via 4-bit QLoRA" },
    { value: "100%", label: "On-Premise Data Sovereignty" },
  ],
  rtfsp: [
    { value: "< 20ms", label: "Real-Time Scoring Latency" },
    { value: "99.4%", label: "Fraud Detection Precision" },
    { value: "5k+", label: "Transactions per Second" },
  ],
  salon_pos: [
    { value: "99.9%", label: "Multi-Branch Sync Reliability" },
    { value: "< 1s", label: "Point-of-Sale Checkout Latency" },
    { value: "100%", label: "Offline-First Data Protection" },
  ],
  ue_sc: [
    { value: "89%", label: "Multilingual Classification Accuracy" },
    { value: "93.3%", label: "Labeling Workload Reduction" },
    { value: "70%", label: "Faster Priority Ticket Escalation" },
  ],
};

export function getAllCaseStudies(): CaseStudy[] {
  const caseStudies: CaseStudy[] = [];

  for (const [filepath, fileModule] of Object.entries(caseStudyFiles)) {
    const rawContent = extractRawString(fileModule);
    const { data, content: yamlContent } = parseFrontmatter(rawContent);
    const headerMeta = parseMarkdownCaseStudyHeader(rawContent);

    const fallbackSlug = filepath.split("/").pop()?.replace(".mdx", "") || "";
    const slug = (data.slug as string) || fallbackSlug;
    const cleanSlug = slug.replace("_case_study", "").toLowerCase();

    const rawTitle = (data.title as string) || headerMeta.title || "Untitled Case Study";
    const title = cleanTitle(rawTitle);
    const project = (data.project as string) || headerMeta.project;
    const role = (data.role as string) || headerMeta.role;
    const domain = (data.domain as string) || headerMeta.domain;
    const description =
      (data.description as string) ||
      headerMeta.description ||
      "Technical case study on AI systems engineering, high-throughput microservices, and production deployment.";

    const tags = Array.isArray(data.tags) ? (data.tags as string[]) : headerMeta.technologies || [];

    const { clientCompany, type } = inferCompanyAndType(slug, project, domain);

    let parsedMetrics: Metric[] | undefined = CURATED_CASE_STUDY_METRICS[cleanSlug];
    if (!parsedMetrics) {
      if (rawContent.includes("metrics:")) {
        parsedMetrics = parseMetricsFromRaw(rawContent);
      } else {
        const extracted = extractMetricsFromMarkdown(rawContent);
        if (extracted.length > 0) parsedMetrics = extracted;
      }
    }

    const cleanContent = rawContent.includes("---")
      ? yamlContent
      : rawContent
          .replace(/^#\s*Case Study:.*$/m, "")
          .replace(/^\*\*Project:\*\*.+$/m, "")
          .replace(/^\*\*Role:\*\*.+$/m, "")
          .replace(/^\*\*Technologies:\*\*.+$/m, "")
          .replace(/^\*\*Domain:\*\*.+$/m, "")
          .replace(/^##?\s*Executive Summary\s*$/gm, "")
          .trim();

    caseStudies.push({
      slug,
      title,
      project,
      role,
      domain,
      type: (data.type as CaseStudy["type"]) || type,
      clientCompany: (data.clientCompany as string) || clientCompany,
      date: (data.date as string) || "2026-01-01",
      author: (data.author as string) || "Mushood Hanif",
      description,
      tags,
      metrics: parsedMetrics,
      content: cleanContent,
    });
  }

  return caseStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const all = getAllCaseStudies();
  const lowerSlug = slug.toLowerCase();

  return all.find((cs) => {
    const csLower = cs.slug.toLowerCase();
    const cleanCsLower = csLower.replace("_case_study", "").replace(/-/g, "_");
    const cleanTargetLower = lowerSlug.replace("_case_study", "").replace(/-/g, "_");

    return (
      csLower === lowerSlug ||
      cleanCsLower === cleanTargetLower ||
      csLower === `${lowerSlug}_case_study` ||
      csLower.replace("_case_study", "") === lowerSlug
    );
  });
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
