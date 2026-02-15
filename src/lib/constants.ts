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
      "I design scalable SaaS platforms that handle growth without expensive rewrites. From product definition to production, I build systems with long-term maintainability, performance, and security in mind. Whether you're launching a new platform or restructuring an existing one, you get a foundation that supports scale — not just version one.",
    includes: [
      "Scalable multi-tenant setups & access control",
      "Fast, reliable web apps (Next.js)",
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
      "Turning manual processes into intelligent automation that cuts cost and saves time. I design AI-powered workflows that eliminate operational friction and create compounding advantages. From document ingestion to intelligent scoring and decision pipelines, you get systems that reduce cost and increase precision.",
    includes: [
      "OpenAI & LLM integrations",
      "LangChain-based pipelines",
      "Production-grade automation (n8n)",
      "AI-assisted data processing",
      "Intelligent lead scoring & automation",
    ],
  },
  {
    id: 3,
    icon: "Gauge",
    title: "Technical Leadership",
    description:
      "Helping engineering teams ship faster and with less friction as products grow. When complexity compounds, I step in to improve performance, clarify structure, and align execution with business outcomes — so your team can scale without burning out or rewriting everything.",
    includes: [
      "Performance optimization",
      "Architecture refactoring",
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
      "From concept to production — with full accountability. I operate across strategy, engineering, and execution so products don't just ship — they deliver results. That means clear direction, aligned stakeholders, structured delivery, and a system that holds up from day one. I own the outcome, not just the implementation.",
    includes: [
      "Scoping & feasibility analysis",
      "System design that supports growth",
      "Roadmap structuring & execution planning",
      "Cross-functional coordination",
      "Delivery oversight & iterative optimization",
      "Post-launch scalability refinement",
    ],
  },
];

export const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
