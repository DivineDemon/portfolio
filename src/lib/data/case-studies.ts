import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  CaseStudyCard,
  CaseStudyClient,
  ProjectCaseStudy,
  WorkflowCaseStudy,
} from "@/lib/types/case-study";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const caseStudyCardSelect = {
  slug: true,
  title: true,
  coverImage: true,
  cardOutcome: true,
  headlineResult: true,
  featured: true,
  displayOrder: true,
  createdAt: true,
} as const;

const clientSelect = {
  clientName: true,
  designation: true,
  company: true,
  content: true,
  feedback: true,
  image: true,
  logo: true,
  companyUrl: true,
} as const;

const projectDetailSelect = {
  slug: true,
  title: true,
  headlineResult: true,
  industry: true,
  role: true,
  engagementModel: true,
  teamSize: true,
  durationInMonths: true,
  problem: true,
  situation: true,
  approach: true,
  architecture: true,
  execution: true,
  whatMadeThisHard: true,
  whatWeBuilt: true,
  results: true,
  metrics: true,
  techStack: true,
  infrastructure: true,
  integrations: true,
  coverImage: true,
  galleryImages: true,
  galleryCaptions: true,
  demoUrl: true,
  repositoryUrl: true,
  seoTitle: true,
  seoDescription: true,
  keywords: true,
  featured: true,
  published: true,
  createdAt: true,
  updatedAt: true,
  businessOutcome: true,
  beforeAfter: true,
  engagementType: true,
  cardOutcome: true,
  displayOrder: true,
  isLive: true,
  clients: { select: clientSelect },
} as const;

const workflowDetailSelect = {
  slug: true,
  title: true,
  headlineResult: true,
  problem: true,
  approach: true,
  results: true,
  workflowJson: true,
  integrations: true,
  metrics: true,
  coverImage: true,
  cardOutcome: true,
  displayOrder: true,
  featured: true,
  published: true,
  seoTitle: true,
  seoDescription: true,
  keywords: true,
  createdAt: true,
  updatedAt: true,
  clients: { select: clientSelect },
} as const;

type CaseStudyCardRecord = {
  slug: string;
  title: string;
  coverImage: string;
  cardOutcome: string | null;
  headlineResult: string;
  featured: boolean;
  displayOrder: number | null;
  createdAt: Date;
};

function publishedCaseStudyWhere() {
  return { published: true };
}

function mapClient(
  client: {
    clientName: string;
    designation: string;
    company: string;
    content: string;
    feedback: string | null;
    image: string | null;
    logo: string | null;
    companyUrl: string | null;
  } | null,
): CaseStudyClient | null {
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
    publishedAt: record.createdAt,
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

  return b.createdAt.getTime() - a.createdAt.getTime();
}

function sortCaseStudyRecords<T extends CaseStudyCardRecord>(records: T[]) {
  return [...records].sort(compareCaseStudyRecords);
}

export async function getPublishedProjects(): Promise<CaseStudyCard[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-projects");
  cacheLife("hours");

  const projects = await prisma.projects.findMany({
    where: publishedCaseStudyWhere(),
    select: caseStudyCardSelect,
  });

  return sortCaseStudyRecords(projects).map((record) =>
    toCaseStudyCard(record, "project"),
  );
}

export async function getPublishedWorkflows(): Promise<CaseStudyCard[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-workflows");
  cacheLife("hours");

  const workflows = await prisma.n8n_workflows.findMany({
    where: publishedCaseStudyWhere(),
    select: caseStudyCardSelect,
  });

  return sortCaseStudyRecords(workflows).map((record) =>
    toCaseStudyCard(record, "workflow"),
  );
}

export async function getPublishedProjectSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-projects");
  cacheLife("hours");

  const projects = await prisma.projects.findMany({
    where: publishedCaseStudyWhere(),
    select: { slug: true },
  });

  return projects.map((project) => project.slug);
}

export async function getPublishedWorkflowSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("case-studies", "case-studies-workflows");
  cacheLife("hours");

  const workflows = await prisma.n8n_workflows.findMany({
    where: publishedCaseStudyWhere(),
    select: { slug: true },
  });

  return workflows.map((workflow) => workflow.slug);
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
  cacheLife("hours");

  const project = await prisma.projects.findFirst({
    where: {
      slug,
      ...publishedCaseStudyWhere(),
    },
    select: projectDetailSelect,
  });

  if (!project) {
    return null;
  }

  const { clients, ...rest } = project;

  return {
    kind: "project",
    ...rest,
    client: mapClient(clients),
  };
}

async function getCachedPublishedWorkflowBySlug(
  slug: string,
): Promise<WorkflowCaseStudy | null> {
  "use cache";
  cacheTag("case-studies", `case-study-workflow-${slug}`);
  cacheLife("hours");

  const workflow = await prisma.n8n_workflows.findFirst({
    where: {
      slug,
      ...publishedCaseStudyWhere(),
    },
    select: workflowDetailSelect,
  });

  if (!workflow) {
    return null;
  }

  const { clients, ...rest } = workflow;

  return {
    kind: "workflow",
    ...rest,
    client: mapClient(clients),
  };
}
