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
    title: "SaaS Architecture & Product Engineering",
    description:
      "Designing and building scalable, multi-tenant SaaS platforms from the ground up. From product definition to production infrastructure, I architect systems with long-term maintainability, performance, and security in mind.Whether you're launching a new platform or restructuring an existing one, I build the technical foundation that supports scale — not just version one.",
    includes: [
      "Multi-tenant architecture & RBAC",
      "High-performance Next.js & React applications",
      "Backend systems in Node.js / Python",
      "PostgreSQL schema design & optimization",
      "Event-driven and serverless workflows",
    ],
  },
  {
    id: 2,
    icon: "Bot",
    title: "AI & Automation Systems",
    description:
      "Turning manual processes into intelligent, automated infrastructure. I design AI- powered workflows that eliminate operational friction, increase efficiency, and create compounding advantages through automation.From document ingestion to intelligent scoring and decision pipelines, I build systems that reduce cost and increase precision.",
    includes: [
      "OpenAI & LLM integrations",
      "LangChain-based pipelines",
      "n8n production-grade workflows",
      "AI-assisted data processing systems",
      "Intelligent lead scoring & automation",
    ],
  },
  {
    id: 3,
    icon: "Gauge",
    title: "System Optimization & Technical Leadership",
    description:
      "Improving performance, structure, and execution across growing engineering teams. When products scale, complexity compounds.I step in to restructure frontend architecture, optimize backend performance, establish engineering standards, and align product execution with business outcomes.",
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
    title: "End-to-End Product Ownership",
    description:
      "From concept to production — with full accountability. I operate across strategy, engineering, and execution to ensure products don't just ship — they perform.This means defining technical direction, aligning stakeholders, structuring delivery pipelines, and maintaining architectural integrity from day one. I take ownership of the outcome, not just the implementation.",
    includes: [
      "Product scoping & technical feasibility analysis",
      "Architecture decision-making & system design",
      "Roadmap structuring & execution planning",
      "Cross-functional coordination (design, backend, frontend, ops)",
      "Delivery oversight & iterative optimization",
      "Post-launch performance and scalability refinement",
    ],
  },
];
