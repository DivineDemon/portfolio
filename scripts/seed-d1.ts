import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

interface Metric {
  value: string;
  label: string;
  subtext?: string;
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

function parseMarkdownCaseStudyHeader(rawContent: string) {
  const meta: {
    title?: string;
    project?: string;
    role?: string;
    technologies?: string[];
    domain?: string;
    description?: string;
  } = {};

  const projectMatch = rawContent.match(/\*\*Project:\*\*\s*(.+)$/m);
  if (projectMatch?.[1]) meta.project = projectMatch[1].trim();

  const caseStudyTitleMatch = rawContent.match(/^#\s*Case Study:\s*(.+)$/m);
  if (caseStudyTitleMatch?.[1]) {
    meta.title = caseStudyTitleMatch[1].trim();
  } else if (meta.project) {
    meta.title = meta.project;
  } else {
    const h1Match = rawContent.match(
      /^#\s+(?!#|Executive Summary|The Challenge|The Solution)(.+)$/m,
    );
    if (h1Match?.[1]) meta.title = h1Match[1].trim();
  }

  const roleMatch = rawContent.match(/\*\*Role:\*\*\s*(.+)$/m);
  if (roleMatch?.[1]) meta.role = roleMatch[1].trim();

  const techMatch = rawContent.match(/\*\*Technologies:\*\*\s*(.+)$/m);
  if (techMatch?.[1]) {
    meta.technologies = techMatch[1]
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  const domainMatch = rawContent.match(/\*\*Domain:\*\*\s*(.+)$/m);
  if (domainMatch?.[1]) meta.domain = domainMatch[1].trim();

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

function inferCompanyAndType(slug: string, project?: string) {
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

function escapeSqlString(str: string | undefined | null): string {
  if (str == null) return "NULL";
  return `'${str.replace(/'/g, "''")}'`;
}

function main() {
  const rootDir = process.cwd();
  const contentDir = path.join(rootDir, "src", "content");
  const dbDir = path.join(rootDir, "db");

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const sqlStatements: string[] = [
    "CREATE TABLE IF NOT EXISTS content (",
    "  slug TEXT PRIMARY KEY,",
    "  collection TEXT NOT NULL,",
    "  title TEXT NOT NULL,",
    "  description TEXT,",
    "  content TEXT NOT NULL,",
    "  date TEXT,",
    "  author TEXT,",
    "  type TEXT,",
    "  client_company TEXT,",
    "  role TEXT,",
    "  domain TEXT,",
    "  tags TEXT,",
    "  metrics TEXT,",
    "  reading_time TEXT,",
    "  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP",
    ");",
    "",
  ];

  const collections = ["blogs", "case-studies", "landing"];

  for (const collection of collections) {
    const dirPath = path.join(contentDir, collection);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const fallbackSlug = file.replace(/\.(mdx|md)$/, "");
      const { data, content: yamlContent } = parseFrontmatter(rawContent);

      if (collection === "blogs") {
        const slug = (data.slug as string) || fallbackSlug;
        const title = (data.title as string) || "Untitled Post";
        const date = (data.date as string) || "2024-01-01";
        const description = (data.description as string) || "";
        const author = (data.author as string) || "Mushood Hanif";
        const tags = JSON.stringify(Array.isArray(data.tags) ? data.tags : []);
        const readingTime = calculateReadingTime(yamlContent);

        sqlStatements.push(
          `INSERT OR REPLACE INTO content (slug, collection, title, description, content, date, author, tags, reading_time) VALUES (${escapeSqlString(slug)}, ${escapeSqlString(collection)}, ${escapeSqlString(title)}, ${escapeSqlString(description)}, ${escapeSqlString(yamlContent)}, ${escapeSqlString(date)}, ${escapeSqlString(author)}, ${escapeSqlString(tags)}, ${escapeSqlString(readingTime)});`,
        );
      } else if (collection === "case-studies") {
        const headerMeta = parseMarkdownCaseStudyHeader(rawContent);
        const slug = (data.slug as string) || fallbackSlug;
        const cleanSlug = slug.replace("_case_study", "").toLowerCase();
        const rawTitle = (data.title as string) || headerMeta.title || "Untitled Case Study";
        const title = rawTitle
          .replace(/\s*\([A-Z0-9-]{2,}\)\s*$/gi, "")
          .replace(/^#+\s*/, "")
          .trim();
        const project = (data.project as string) || headerMeta.project;
        const role = (data.role as string) || headerMeta.role;
        const domain = (data.domain as string) || headerMeta.domain;
        const description = (data.description as string) || headerMeta.description || "";
        const author = (data.author as string) || "Mushood Hanif";
        const date = (data.date as string) || "2026-01-01";
        const tagsList = Array.isArray(data.tags) ? data.tags : headerMeta.technologies || [];
        const tags = JSON.stringify(tagsList);
        const { clientCompany, type } = inferCompanyAndType(slug, project);
        const metricsObj = CURATED_CASE_STUDY_METRICS[cleanSlug] || [];
        const metrics = JSON.stringify(metricsObj);
        const readingTime = calculateReadingTime(yamlContent);

        sqlStatements.push(
          `INSERT OR REPLACE INTO content (slug, collection, title, description, content, date, author, type, client_company, role, domain, tags, metrics, reading_time) VALUES (${escapeSqlString(slug)}, ${escapeSqlString(collection)}, ${escapeSqlString(title)}, ${escapeSqlString(description)}, ${escapeSqlString(yamlContent)}, ${escapeSqlString(date)}, ${escapeSqlString(author)}, ${escapeSqlString(type)}, ${escapeSqlString(clientCompany)}, ${escapeSqlString(role)}, ${escapeSqlString(domain)}, ${escapeSqlString(tags)}, ${escapeSqlString(metrics)}, ${escapeSqlString(readingTime)});`,
        );
      } else if (collection === "landing") {
        const slug = (data.slug as string) || fallbackSlug;
        const title = (data.title as string) || fallbackSlug;
        const description = (data.description as string) || "";

        sqlStatements.push(
          `INSERT OR REPLACE INTO content (slug, collection, title, description, content) VALUES (${escapeSqlString(slug)}, ${escapeSqlString(collection)}, ${escapeSqlString(title)}, ${escapeSqlString(description)}, ${escapeSqlString(yamlContent)});`,
        );
      }
    }
  }

  const seedSqlPath = path.join(dbDir, "seed.sql");
  fs.writeFileSync(seedSqlPath, sqlStatements.join("\n"), "utf-8");

  try {
    execSync("npx wrangler d1 execute DB --local --file=db/seed.sql", { stdio: "inherit" });
  } catch (_e) {}
}

main();
