import { cacheLife, cacheTag } from "next/cache";
import { SITE_URL } from "@/lib/constants";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import {
  getPublishedProjects,
  getPublishedWorkflows,
} from "@/lib/data/case-studies";
import { SITE_SEO_DEFAULTS } from "@/lib/seo/defaults";

function formatCaseStudyLine(
  title: string,
  url: string,
  summary: string | null | undefined,
): string {
  const trimmed = summary?.trim();
  return trimmed ? `- [${title}](${url}): ${trimmed}` : `- [${title}](${url})`;
}

export async function buildLlmsDocument(): Promise<string> {
  "use cache";
  cacheTag("seo:llms", "blog", "case-studies");
  cacheLife("hours");

  const [projects, workflows, blogPosts] = await Promise.all([
    getPublishedProjects(),
    getPublishedWorkflows(),
    getPublishedBlogPosts(),
  ]);

  const title = SITE_SEO_DEFAULTS.positioningTitle;
  const intro = SITE_SEO_DEFAULTS.positioningDescription;

  const lines: string[] = [
    `# ${title}`,
    "",
    `> ${intro}`,
    "",
    "Fractional CTO and fullstack engineer building SaaS platforms, AI systems, and n8n automation for founders and product teams.",
    "",
    "## Pages",
    `- [About](${SITE_URL}/): Background, services, and how I work.`,
    `- [Projects](${SITE_URL}/case-studies/projects): Software and product engineering case studies.`,
    `- [Workflows](${SITE_URL}/case-studies/workflows): n8n automation and integration work.`,
    `- [Skills](${SITE_URL}/skills): Technical stack and capabilities.`,
    `- [Testimonials](${SITE_URL}/testimonials): Client feedback.`,
    `- [Blog](${SITE_URL}/blog): Engineering and product writing.`,
    `- [Contact](${SITE_URL}/contact): Start a project or collaboration.`,
    "",
  ];

  if (projects.length > 0) {
    lines.push("## Projects");
    for (const project of projects) {
      lines.push(
        formatCaseStudyLine(
          project.title,
          `${SITE_URL}/case-studies/projects/${project.slug}`,
          project.excerpt,
        ),
      );
    }
    lines.push("");
  }

  if (workflows.length > 0) {
    lines.push("## Workflows");
    for (const workflow of workflows) {
      lines.push(
        formatCaseStudyLine(
          workflow.title,
          `${SITE_URL}/case-studies/workflows/${workflow.slug}`,
          workflow.excerpt,
        ),
      );
    }
    lines.push("");
  }

  if (blogPosts.length > 0) {
    lines.push("## Blog");
    for (const post of blogPosts) {
      lines.push(
        formatCaseStudyLine(
          post.title,
          `${SITE_URL}/blog/${post.slug}`,
          post.excerpt,
        ),
      );
    }
    lines.push("");
  }

  lines.push("## Optional", `- [Contact](${SITE_URL}/contact)`);

  return `${lines.join("\n")}\n`;
}
