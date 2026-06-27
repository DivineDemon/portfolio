import { cacheLife, cacheTag } from "next/cache";
import { getPublishedBlogPosts } from "@/lib/cms/get-published-blog-posts";
import { getPublishedPages } from "@/lib/cms/get-published-pages";
import { getPublishedProjects } from "@/lib/cms/get-published-projects";
import { getPublishedWorkflows } from "@/lib/cms/get-published-workflows";
import { getSiteSettings } from "@/lib/cms/get-site-settings";
import { SITE_URL } from "@/lib/constants";
import { SITE_SEO_DEFAULTS } from "@/lib/seo/defaults";

export type LlmsVariant = "summary" | "full";

function formatWhoThisIsFor(whoThisIsFor: unknown): string[] {
  if (!Array.isArray(whoThisIsFor)) {
    return [];
  }

  return whoThisIsFor.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0,
  );
}

function buildSummaryText(parts: Array<string | null | undefined>): string {
  return parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .slice(0, 2)
    .join(" ");
}

function formatCaseStudyLine(
  title: string,
  url: string,
  variant: LlmsVariant,
  summaryParts: {
    cardOutcome?: string | null;
    headlineResult: string;
    problem?: string | null;
    excerpt?: string | null;
  },
): string {
  if (variant === "summary") {
    const summary =
      summaryParts.cardOutcome?.trim() ||
      summaryParts.headlineResult.trim() ||
      summaryParts.excerpt?.trim();
    return summary
      ? `- [${title}](${url}): ${summary}`
      : `- [${title}](${url})`;
  }

  const summary = buildSummaryText([
    summaryParts.headlineResult,
    summaryParts.problem,
    summaryParts.excerpt,
  ]);

  return summary ? `- [${title}](${url}): ${summary}` : `- [${title}](${url})`;
}

export async function buildLlmsDocument(variant: LlmsVariant): Promise<string> {
  "use cache";
  cacheTag(
    "seo:llms",
    "cms:projects",
    "cms:workflows",
    "cms:pages",
    "cms:settings",
    "cms:blog",
  );
  cacheLife("hours");

  const [settings, projects, workflows, pages, blogPosts] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
    getPublishedWorkflows(),
    getPublishedPages(),
    getPublishedBlogPosts(),
  ]);

  const title =
    settings?.positioningTitle?.trim() ?? SITE_SEO_DEFAULTS.positioningTitle;
  const intro =
    settings?.llmsIntro?.trim() ??
    settings?.positioningDescription?.trim() ??
    SITE_SEO_DEFAULTS.positioningDescription;
  const badge = settings?.heroBadge?.trim() ?? SITE_SEO_DEFAULTS.heroBadge;

  const lines: string[] = [`# ${title}`];

  if (variant === "full") {
    lines.push(
      `> Full content export for AI systems. Summary version: ${SITE_URL}/llms.txt`,
    );
  }

  lines.push(`> ${intro.replace(/\n/g, "\n> ")}`, "", "## Identity");
  lines.push("- Full name: Mushood Hanif");

  if (badge) {
    lines.push(`- Role: ${badge}`);
  }

  lines.push(`- Website: ${SITE_URL}`);

  const profileUrls = [settings?.linkedinUrl, settings?.githubUrl].filter(
    (url): url is string => typeof url === "string" && url.trim().length > 0,
  );

  if (profileUrls.length > 0) {
    lines.push("- Profiles:");
    for (const url of profileUrls) {
      lines.push(`  - ${url}`);
    }
  }

  lines.push("");

  const whoThisIsFor = formatWhoThisIsFor(settings?.whoThisIsFor);
  if (whoThisIsFor.length > 0) {
    lines.push("## Who This Is For");
    for (const bullet of whoThisIsFor) {
      lines.push(`- ${bullet}`);
    }
    lines.push("");
  }

  const servicePages = pages.filter((page) => page.pageType === "service");
  if (servicePages.length > 0) {
    lines.push("## Services");
    for (const page of servicePages) {
      const url = `${SITE_URL}/${page.slug}`;
      if (variant === "full" && page.excerpt?.trim()) {
        lines.push(`- [${page.title}](${url}): ${page.excerpt.trim()}`);
      } else {
        lines.push(`- [${page.title}](${url})`);
      }
    }
    lines.push("");
  }

  if (projects.length > 0 || workflows.length > 0) {
    lines.push("## Case Studies");

    for (const project of projects) {
      lines.push(
        formatCaseStudyLine(
          project.title,
          `${SITE_URL}/projects/${project.slug}`,
          variant,
          {
            cardOutcome: project.cardOutcome,
            headlineResult: project.headlineResult,
            problem: project.problem,
          },
        ),
      );
    }

    for (const workflow of workflows) {
      lines.push(
        formatCaseStudyLine(
          workflow.title,
          `${SITE_URL}/workflows/${workflow.slug}`,
          variant,
          {
            cardOutcome: workflow.cardOutcome,
            headlineResult: workflow.headlineResult,
            problem: workflow.problem,
          },
        ),
      );
    }

    lines.push("");
  }

  if (blogPosts.length > 0) {
    lines.push("## Blog");
    for (const post of blogPosts) {
      const url = `${SITE_URL}/blog/${post.slug}`;
      if (variant === "full" && post.excerpt?.trim()) {
        lines.push(`- [${post.title}](${url}): ${post.excerpt.trim()}`);
      } else {
        lines.push(`- [${post.title}](${url})`);
      }
    }
    lines.push("");
  }

  const otherPages = pages.filter((page) => page.pageType !== "service");
  if (otherPages.length > 0) {
    lines.push("## Pages");
    for (const page of otherPages) {
      const url = `${SITE_URL}/${page.slug}`;
      if (variant === "full" && page.excerpt?.trim()) {
        lines.push(`- [${page.title}](${url}): ${page.excerpt.trim()}`);
      } else {
        lines.push(`- [${page.title}](${url})`);
      }
    }
    lines.push("");
  }

  lines.push("## Contact", `- Website: ${SITE_URL}/#contact`);

  if (settings?.bookingUrl?.trim()) {
    lines.push(`- Book a call: ${settings.bookingUrl.trim()}`);
  }

  if (settings?.availabilityText?.trim()) {
    lines.push(`- Availability: ${settings.availabilityText.trim()}`);
  }

  return `${lines.join("\n")}\n`;
}
