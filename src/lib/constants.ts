export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mushoodhanif.com";

import Cursor from "@/assets/img/tech/cursor.svg";
import Docker from "@/assets/img/tech/docker.svg";
import FastAPI from "@/assets/img/tech/fastapi.svg";
import Gemini from "@/assets/img/tech/gemini.svg";
import Inngest from "@/assets/img/tech/inngest.svg";
import MySQL from "@/assets/img/tech/mysql.svg";
import N8N from "@/assets/img/tech/n8n.svg";
import Neon from "@/assets/img/tech/neon.svg";
import Nextjs from "@/assets/img/tech/nextjs.svg";
import Nginx from "@/assets/img/tech/nginx.svg";
import OpenAI from "@/assets/img/tech/openai.svg";
import Postgresql from "@/assets/img/tech/postgresql.svg";
import Python from "@/assets/img/tech/python.svg";
import React from "@/assets/img/tech/react.svg";
import Redis from "@/assets/img/tech/redis.svg";
import Redux from "@/assets/img/tech/redux.svg";
import Tanstack from "@/assets/img/tech/tanstack.svg";
import Vite from "@/assets/img/tech/vite.svg";

export const techStack = [
  { image: Cursor, name: "Cursor", invert: true },
  { image: Docker, name: "Docker", invert: false },
  { image: FastAPI, name: "FastAPI", invert: false },
  { image: Gemini, name: "Gemini", invert: false },
  { image: Inngest, name: "Inngest", invert: true },
  { image: MySQL, name: "MySQL", invert: true },
  { image: N8N, name: "N8N", invert: false },
  { image: Neon, name: "Neon", invert: false },
  { image: Nextjs, name: "Next.js", invert: false },
  { image: Nginx, name: "Nginx", invert: false },
  { image: OpenAI, name: "OpenAI", invert: true },
  { image: Postgresql, name: "PostgreSQL", invert: false },
  { image: Python, name: "Python", invert: false },
  { image: React, name: "React", invert: false },
  { image: Redis, name: "Redis", invert: false },
  { image: Redux, name: "Redux", invert: false },
  { image: Tanstack, name: "Tanstack", invert: false },
  { image: Vite, name: "Vite", invert: false },
];

export const services = [
  {
    id: 1,
    icon: "Layers",
    title: "Product Engineering",
    description:
      "Scale without expensive rewrites. I design SaaS platforms that grow with your business — from product definition to production, with long-term maintainability, performance, and security built in. Whether you're launching a new platform or restructuring an existing one, you get a foundation that supports scale, not just version one.",
    includes: [
      "Fast, reliable web apps that keep users productive (Next.js)",
      "Scalable multi-tenant setups and access control",
      "Backend systems in Node.js / Python",
      "Database design that scales with usage",
      "Event-driven and serverless workflows",
    ],
  },
  {
    id: 2,
    icon: "Bot",
    title: "AI & Automation Systems",
    description:
      "Cut costs and save time. I turn manual processes into intelligent automation that eliminates operational friction and compounds over time. From document ingestion to intelligent scoring and decision pipelines, you get systems that reduce cost, increase precision, and free your team for higher-value work.",
    includes: [
      "Production-grade automation that replaces repetitive work (n8n)",
      "OpenAI and LLM integrations",
      "LangChain-based pipelines",
      "AI-assisted data processing",
      "Intelligent lead scoring and workflow automation",
    ],
  },
  {
    id: 3,
    icon: "Gauge",
    title: "Technical Leadership",
    description:
      "Ship faster with less friction. I help engineering teams keep pace as products grow — improving performance, clarifying structure, and aligning execution with business outcomes. Your team scales without burning out or rewriting everything when complexity compounds.",
    includes: [
      "Performance optimization that protects user experience",
      "Architecture refactoring that reduces future delivery risk",
      "Frontend system standardization",
      "Engineering mentorship",
      "Product-technical alignment",
    ],
  },
  {
    id: 4,
    icon: "Rocket",
    title: "E2E Product Ownership",
    description:
      "Deliver results from concept to production — with full accountability. I operate across strategy, engineering, and execution so products don't just ship, they move the business forward. That means clear direction, aligned stakeholders, structured delivery, and a system that holds up from day one. I own the outcome, not just the implementation.",
    includes: [
      "Scoping and feasibility analysis",
      "System design that supports growth",
      "Roadmap structuring and execution planning",
      "Cross-functional coordination",
      "Delivery oversight and iterative optimization",
      "Post-launch scalability refinement",
    ],
  },
];

export const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Workflows", href: "/#workflows" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
