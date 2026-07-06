import type { BlogCardPost } from "@/lib/types/blog";

export type CaseStudyKind = "project" | "workflow";

export type CaseStudyCard = BlogCardPost & {
  kind: CaseStudyKind;
};

export type CaseStudyClient = {
  clientName: string;
  designation: string;
  company: string;
  content: string;
  feedback: string | null;
  image: string | null;
  logo: string | null;
  companyUrl: string | null;
};

export type ProjectCaseStudy = {
  kind: "project";
  slug: string;
  title: string;
  headlineResult: string;
  industry: string | null;
  role: string;
  engagementModel: string | null;
  teamSize: number | null;
  durationInMonths: number | null;
  problem: string;
  situation: string | null;
  approach: string;
  architecture: string;
  execution: string;
  whatMadeThisHard: string | null;
  whatWeBuilt: string;
  results: string;
  metrics: unknown;
  techStack: string[];
  infrastructure: string[];
  integrations: string[];
  coverImage: string;
  galleryImages: string[];
  galleryCaptions: string[];
  demoUrl: string | null;
  repositoryUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  businessOutcome: string | null;
  beforeAfter: string | null;
  engagementType: string | null;
  cardOutcome: string | null;
  displayOrder: number | null;
  isLive: boolean;
  client: CaseStudyClient | null;
};

export type WorkflowCaseStudy = {
  kind: "workflow";
  slug: string;
  title: string;
  headlineResult: string;
  problem: string;
  approach: string;
  results: string;
  workflowJson: unknown;
  integrations: string[];
  metrics: unknown;
  coverImage: string;
  cardOutcome: string | null;
  displayOrder: number | null;
  featured: boolean;
  published: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  client: CaseStudyClient | null;
};

export function getCaseStudyHref(kind: CaseStudyKind, slug: string) {
  return kind === "project"
    ? `/case-studies/projects/${slug}`
    : `/case-studies/workflows/${slug}`;
}
