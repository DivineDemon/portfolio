import type { Metadata } from "next";
import { CaseStudyList } from "@/components/case-study/case-study-list";
import { getPublishedWorkflows } from "@/lib/data/case-studies";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Workflows",
  description: "n8n automation workflows and integration case studies.",
  path: "/case-studies/workflows",
});

export default async function WorkflowsPage() {
  const workflows = await getPublishedWorkflows();

  return (
    <CaseStudyList
      title="Workflows"
      description="n8n automation workflows and integrations."
      items={workflows}
      emptyMessage="No workflows published yet."
    />
  );
}
