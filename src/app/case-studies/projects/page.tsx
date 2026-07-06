import type { Metadata } from "next";
import { CaseStudyList } from "@/components/case-study/case-study-list";
import { getPublishedProjects } from "@/lib/data/case-studies";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description: "Software projects and product engineering case studies.",
  path: "/case-studies/projects",
});

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <CaseStudyList
      title="Projects"
      description="Software projects and product engineering work."
      items={projects}
      emptyMessage="No projects published yet."
    />
  );
}
