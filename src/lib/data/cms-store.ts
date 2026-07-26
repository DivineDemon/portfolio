import "server-only";

import cms from "@/data/cms.json";
import type { CaseStudyClient } from "@/lib/types/case-study";

type CmsClient = CaseStudyClient;

type CmsBlogPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

type CmsProject = {
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
  createdAt: string;
  updatedAt: string;
  businessOutcome: string | null;
  beforeAfter: string | null;
  engagementType: string | null;
  cardOutcome: string | null;
  displayOrder: number | null;
  isLive: boolean;
  clients: CmsClient | null;
};

type CmsWorkflow = {
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
  createdAt: string;
  updatedAt: string;
  clients: CmsClient | null;
};

type CmsTestimonial = {
  id: number;
  clientName: string;
  designation: string;
  company: string;
  content: string;
  image: string | null;
  featured: boolean;
};

type CmsDump = {
  dumpedAt: string;
  blogPosts: CmsBlogPost[];
  projects: CmsProject[];
  workflows: CmsWorkflow[];
  clients: CmsTestimonial[];
};

const dump = cms as CmsDump;

function isPublishedBlog(post: CmsBlogPost, now = Date.now()) {
  if (!post.published) {
    return false;
  }
  if (!post.publishedAt) {
    return true;
  }
  return new Date(post.publishedAt).getTime() <= now;
}

export function getCmsBlogPosts() {
  return dump.blogPosts.filter((post) => isPublishedBlog(post));
}

export function getCmsProjects() {
  return dump.projects.filter((project) => project.published);
}

export function getCmsWorkflows() {
  return dump.workflows.filter((workflow) => workflow.published);
}

export function getCmsClients() {
  return dump.clients;
}

export function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}
