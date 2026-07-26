import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { getCmsProjects, getCmsWorkflows, toDate } from "@/lib/data/cms-store";
import type {
  CaseStudyCard,
  CaseStudyClient,
  ProjectCaseStudy,
  WorkflowCaseStudy,
} from "@/lib/types/case-study";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type CaseStudyCardRecord = {
  slug: string;
  title: string;
  coverImage: string;
  cardOutcome: string | null;
  headlineResult: string;
  featured: boolean;
  displayOrder: number | null;
  createdAt: string | Date;
};

function mapClient(client: CaseStudyClient | null): CaseStudyClient | null {
  return client;
}

function toCaseStudyCard(
  record: CaseStudyCardRecord,
  kind: "project" | "workflow",
): CaseStudyCard {
  return {
    kind,
    slug: record.slug,
    title: record.title,
    excerpt: record.cardOutcome ?? record.headlineResult,
    coverImage: record.coverImage,
    publishedAt: toDate(record.createdAt),
  };
}

function compareCaseStudyRecords(
  a: CaseStudyCardRecord,
  b: CaseStudyCardRecord,
) {
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }

  const aOrder = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
  const bOrder = b.displayOrder ?? Number.MAX_SAFE_INTEGER;

  if (aOrder !== bOrder) {
    return aOrder - bOrder;
  }

  return toDate(b.createdAt).getTime() - toDate(a.createdAt).getTime();
}

function sortCaseStudyRecords<T extends CaseStudyCardRecord>(records: T[]) {
  return [...records].sort(compareCaseStudyRecords);
}

export async function getPublishedProjects(): Promise<CaseStudyCard[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-projects");
  cacheLife("max");

  return sortCaseStudyRecords(getCmsProjects()).map((record) =>
    toCaseStudyCard(record, "project"),
  );
}

export async function getPublishedWorkflows(): Promise<CaseStudyCard[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-workflows");
  cacheLife("max");

  return sortCaseStudyRecords(getCmsWorkflows()).map((record) =>
    toCaseStudyCard(record, "workflow"),
  );
}

export async function getPublishedProjectSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-projects");
  cacheLife("max");

  return getCmsProjects().map((project) => project.slug);
}

export async function getPublishedWorkflowSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-workflows");
  cacheLife("max");

  return getCmsWorkflows().map((workflow) => workflow.slug);
}

export async function getPublishedProjectBySlug(
  slug: string,
): Promise<ProjectCaseStudy | null> {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  return getCachedPublishedProjectBySlug(slug);
}

export async function getPublishedWorkflowBySlug(
  slug: string,
): Promise<WorkflowCaseStudy | null> {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  return getCachedPublishedWorkflowBySlug(slug);
}

async function getCachedPublishedProjectBySlug(
  slug: string,
): Promise<ProjectCaseStudy | null> {
  "use cache";
  cacheTag("case-studies", `case-study-project-${slug}`);
  cacheLife("max");

  const project = getCmsProjects().find((entry) => entry.slug === slug);
  if (!project) {
    return null;
  }

  const { clients, ...rest } = project;

  return {
    kind: "project",
    ...rest,
    createdAt: toDate(rest.createdAt),
    updatedAt: toDate(rest.updatedAt),
    client: mapClient(clients),
  };
}

async function getCachedPublishedWorkflowBySlug(
  slug: string,
): Promise<WorkflowCaseStudy | null> {
  "use cache";
  cacheTag("case-studies", `case-study-workflow-${slug}`);
  cacheLife("max");

  const workflow = getCmsWorkflows().find((entry) => entry.slug === slug);
  if (!workflow) {
    return null;
  }

  const { clients, ...rest } = workflow;

  return {
    kind: "workflow",
    ...rest,
    createdAt: toDate(rest.createdAt),
    updatedAt: toDate(rest.updatedAt),
    client: mapClient(clients),
  };
}
