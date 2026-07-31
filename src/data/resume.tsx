import { Bot, Cpu, Database, HomeIcon, NotebookIcon, Zap } from "lucide-react";
import { Icons } from "@/components/icons";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Python } from "@/components/ui/svgs/python";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";

export const DATA = {
	name: "Mushood Hanif",
	initials: "MH",
	url: "https://mushoodhanif.com",
	location: "Lahore, Pakistan (Operating Globally)",
	locationLink: "https://www.google.com/maps/place/Lahore,+Pakistan",
	title: "Senior AI Systems Architect & Consultant | Founder of Haga",
	headline: "From AI Experimentation to Enterprise Execution.",
	description:
		"I architect, deploy, and scale enterprise-grade AI automations, agentic workflows, and fine-tuned LLM infrastructure — helping founders and business leaders transform operations with bank-grade reliability.",
	summary:
		"Senior AI Engineer & Consultant with nearly 7 years of experience, specializing in bridging the gap between raw AI models and operational business workflows. From 6-agent LangGraph orchestration layers and real-time streaming fraud scoring (1.2M+ daily transactions) to on-prem QLoRA LLM fine-tuning and physical AI/robotics verification (Haga), I build resilient, high-throughput AI systems with bank-grade security, deterministic guardrails, and quantifiable ROI.",
	avatarUrl: "https://github.com/DivineDemon.png",

	impactMetrics: [
		{ value: "$1.3M+", label: "Annualized Operational Savings Delivered" },
		{ value: "92%", label: "Manual Workflow Time Reduction" },
		{ value: "1.2M+", label: "Daily Streaming Transactions Scaled" },
		{ value: "1,200+", label: "Automated AI Evaluation Tests Executed" },
	],

	services: [
		{
			id: "agentic-automation",
			title: "Agentic Workflow Automation",
			subtitle: "Autonomous Multi-Agent Orchestration & Tool Routing",
			description:
				"Move beyond fragile single-prompt scripts. I design deterministic multi-agent systems (LangGraph, MCP) that handle multi-step reasoning, document intake, compliance verification, and human-in-the-loop review.",
			icon: Bot,
			features: [
				"LangGraph Multi-Agent Orchestration",
				"Model Context Protocol (MCP) Tool Integration",
				"Automated Document & Invoice Intelligence",
				"Citation Grounding & Zero-Hallucination Guardrails",
				"Human-in-the-Loop Escalation Gates",
			],
		},
		{
			id: "custom-llm-rag",
			title: "Enterprise RAG & Custom Fine-Tuned LLMs",
			subtitle: "Domain-Specific Models & On-Prem Vector Search",
			description:
				"Keep your data sovereign while drastically reducing third-party API costs. I fine-tune domain-adapted models (QLoRA, PEFT) and deploy sub-60ms vector retrieval layers (FAISS, HNSW) for enterprise search.",
			icon: Database,
			features: [
				"On-Premise & Cloud QLoRA/PEFT Fine-Tuning",
				"vLLM High-Throughput Serving & Dynamic Adapter Swapping",
				"FAISS & HNSW Hybrid RAG Retrieval Engines",
				"Bilingual (Urdu/English) NLP & Custom Tokenizers",
				"Zero-Data-Retention Data Sovereignty Standards",
			],
		},
		{
			id: "streaming-infrastructure",
			title: "Real-Time Streaming Systems & High-Throughput Engineering",
			subtitle: "Sub-180ms Latency Infrastructure & MLOps",
			description:
				"Architecting resilient, async microservices that score millions of events per day. From real-time fraud detection to GPU streaming inference migration with automated canary rollbacks.",
			icon: Zap,
			features: [
				"Async FastAPI, Celery, Redis & PyTorch Architectures",
				"Sub-180ms Real-Time Streaming & Fraud Scoring",
				"Azure/AWS/GCP Auto-scaling GPU Clusters",
				"Circuit-Breaker Pattern & 5-Min Automated Rollbacks",
				"Feature Stores & Automated Population Drift Monitoring",
			],
		},
		{
			id: "ai-enablement-2nd-brain",
			title: "Enterprise AI Enablement & Executive 2nd Brain Systems",
			subtitle: "Workforce Upskilling & Knowledge Architecture",
			description:
				"Empowering executives and engineering teams with self-improving AI environments. Building tailored Obsidian + Hermes AI Agent control towers, MLOps evaluation frameworks, and internal CoE playbooks.",
			icon: Cpu,
			features: [
				"Executive 2nd Brain Vaults (Obsidian + Hermes AI Agent)",
				"Company-Wide LLM Evaluation Harnesses (1,200+ Test Suite)",
				"Internal AI Engineering Workshops & Enablement",
				"CRM, Lead Tracking & Automated Workflow Integration",
				"AI Architecture Blueprints & Tech Stack Audits",
			],
		},
	],

	skills: [
		{ name: "Python", icon: Python },
		{ name: "TypeScript", icon: Typescript },
		{ name: "React / Next.js", icon: ReactLight },
		{ name: "PostgreSQL", icon: Postgresql },
		{ name: "Docker", icon: Docker },
		{ name: "Kubernetes", icon: Kubernetes },
	],

	navbar: [
		{ href: "/", icon: HomeIcon, label: "Home" },
		{ href: "/#services", icon: Bot, label: "Services" },
		{ href: "/#case-studies", icon: Zap, label: "Case Studies" },
		{ href: "/blog", icon: NotebookIcon, label: "Blog" },
		{ href: "/#contact", icon: NotebookIcon, label: "Book Audit" },
	],

	contact: {
		email: "mohdmushood@yahoo.com",
		tel: "",
		social: {
			GitHub: {
				name: "GitHub",
				url: "https://github.com/DivineDemon",
				icon: Icons.github,
				navbar: true,
			},
			LinkedIn: {
				name: "LinkedIn",
				url: "https://linkedin.com/in/mushood-hanif",
				icon: Icons.linkedin,
				navbar: true,
			},
			Haga: {
				name: "Haga AI",
				url: "https://haga.mushoodhanif.com",
				icon: Icons.globe,
				navbar: true,
			},
			Email: {
				name: "Send Email",
				url: "mailto:mohdmushood@yahoo.com",
				icon: Icons.email,
				navbar: true,
			},
		},
	},

	work: [
		{
			company: "Afiniti",
			href: "https://afiniti.com",
			badges: ["Enterprise AI Architecture"],
			location: "Lahore, Pakistan",
			title: "Senior AI Engineer",
			logoUrl: "/logos/afiniti.svg",
			start: "Sep 2025",
			end: "May 2026",
			description:
				"Cut manual document-processing time by ~92% (3 days to <4 hours) for enterprise logistics by architecting a 6-agent LangGraph orchestration layer. Raised extraction accuracy from 81% to 96.1% F1 via on-prem QLoRA LLaMA-3 fine-tuning on a single A100 GPU. Standardized evaluation company-wide with an automated 1,200+ test case harness and built an MCP tool-routing layer connecting 9 internal APIs.",
		},
		{
			company: "Afiniti",
			href: "https://afiniti.com",
			badges: ["MLOps & High Throughput"],
			location: "Lahore, Pakistan",
			title: "AI Engineer",
			logoUrl: "/logos/afiniti.svg",
			start: "Jul 2023",
			end: "Aug 2025",
			description:
				"Slashed batch inference latency from 2.1s to <180ms p95 (~92% reduction) and per-transaction compute cost by 64% by migrating on-prem batch systems to Azure GPU streaming microservices. Designed real-time fraud scoring for 1.2M+ daily transactions, reducing false alerts from 14% to 3.5% while increasing catch rate by 22%. Reduced incident MTTR from ~50 to ~8 minutes via canary deployments and automated circuit breakers.",
		},
		{
			company: "Confiz",
			href: "https://www.confiz.com",
			badges: ["Bilingual NLP & RAG"],
			location: "Lahore, Pakistan",
			title: "Machine Learning Engineer",
			logoUrl: "/logos/confiz.png",
			start: "Apr 2022",
			end: "Jun 2023",
			description:
				"Reduced customer ticket resolution time from 42 to 9 minutes (78%) across 40,000+ monthly conversations by building a bilingual (Urdu/English) RAG chatbot. Boosted throughput 8x (12 to 95 req/s) with async FastAPI + Celery while keeping p95 latency under 400ms. Built FAISS HNSW vector search with sub-60ms retrieval and FP32 to INT8 quantization.",
		},
		{
			company: "Confiz",
			href: "https://www.confiz.com",
			badges: ["Active Learning"],
			location: "Lahore, Pakistan",
			title: "Junior Machine Learning Engineer",
			logoUrl: "/logos/confiz.png",
			start: "Nov 2019",
			end: "Mar 2022",
			description:
				"Built bilingual sentiment classification and active-learning loops that cut labeling backlog from 3,000 to <200 tickets. Raised FAQ retrieval accuracy by 18 points (62% to 80%+) through TF-IDF reranking ahead of legacy search.",
		},
	],

	education: [
		{
			school: "GIFT University",
			href: "https://www.gift.edu.pk",
			degree: "BS, Software Engineering (Hons.) — CGPA 3.0/4.0",
			logoUrl: "/logos/gift-university.ico",
			start: "2014",
			end: "2019",
		},
	],

	projects: [
		{
			id: "adcp",
			title: "Agentic Document Compliance Pipeline (ADCP)",
			href: "https://github.com/DivineDemon/adcp",
			githubUrl: "https://github.com/DivineDemon/adcp",
			websiteUrl: "https://mushoodhanif.com/#contact",
			dates: "2025 - 2026",
			active: true,
			impact: "92% Processing Time Reduction | $1.3M+ Annual Savings",
			description:
				"Enterprise 6-agent LangGraph orchestration pipeline for autonomous document extraction, regulatory compliance verification, citation grounding, and HITL review. Processes 1,000+ weekly logistics documents with zero unsupervised compliance failures.",
			problem:
				"Enterprise logistics client faced 3-day document processing backlogs and an 11% hallucination rate from third-party vendor OCR calls, resulting in compliance risks and $1.3M+ in annual overhead.",
			architecture:
				"6-Agent LangGraph orchestration architecture: Intake Agent → QLoRA Fine-Tuned Extraction Agent → Citation Grounding Verifier Agent → Compliance Engine → Confidence Router → Human-in-the-Loop Gate. Integrated via custom Model Context Protocol (MCP) exposing 9 enterprise APIs.",
			keyFeatures: [
				"Sub-4-Hour Processing (reduced from 3 days, ~92% faster)",
				"Extraction Accuracy raised from 81% to 96.1% F1 on single A100 GPU",
				"Hallucination Rate slashed from 11.0% to <1.8% via Citation Grounding",
				"MCP Tool Routing Layer for tariff lookups, HS code validation, and Incoterms engine",
				"Dynamic GPU request batching scheduler cutting idle time by 35%",
			],
			technologies: [
				"Python",
				"LangGraph",
				"Model Context Protocol (MCP)",
				"LLaMA-3",
				"QLoRA",
				"FastAPI",
				"Docker",
			],
		},
		{
			id: "rtfsp",
			title: "Real-Time Streaming Fraud Scoring Engine (RTFSP)",
			href: "https://github.com/DivineDemon/rtfsp",
			githubUrl: "https://github.com/DivineDemon/rtfsp",
			websiteUrl: "https://mushoodhanif.com/#contact",
			dates: "2024 - 2025",
			active: true,
			impact: "1.2M+ Daily Transactions | <180ms p95 Latency",
			description:
				"High-throughput, low-latency streaming fraud detection system combining gradient-boosted trees, real-time Redis sliding window feature stores, and automated population drift monitoring. Reduced false alerts from 14% to 3.5%.",
			problem:
				"Legacy batch fraud scoring suffered 2.1-second latencies and a 14% false-alert rate across 1.2 million daily financial transactions, incurring huge operational review overhead.",
			architecture:
				"Async FastAPI streaming server with PyTorch dynamic tensor batching, Redis sub-5ms sliding-window feature store, LightGBM primary classifier, and secondary Random Forest ensemble for ambiguous score bands [0.45, 0.80]. Automated Population Stability Index (PSI) drift monitoring triggering weekly retraining.",
			keyFeatures: [
				"Sub-180ms p95 Latency (92% reduction from 2.1s batch pipeline)",
				"64% Compute Cost Savings ($1,332/mo savings per 1M daily requests)",
				"False Alerts Slashed from 14.0% to 3.5% while raising recall by +22%",
				"Canary Deployment Framework cutting MTTR from 50m to <8m",
				"Automated PSI Drift Detection triggering retraining when PSI > 0.25",
			],
			technologies: [
				"Python",
				"FastAPI",
				"LightGBM",
				"Redis",
				"PyTorch",
				"Azure AKS",
				"Docker",
			],
		},
		{
			id: "oplftsf",
			title: "On-Prem LLM Fine-Tuning & Serving Framework (OPLFTSF)",
			href: "https://github.com/DivineDemon/oplftsf",
			githubUrl: "https://github.com/DivineDemon/oplftsf",
			websiteUrl: "https://mushoodhanif.com/#contact",
			dates: "2025",
			active: true,
			impact: "Deployment Time 6 Wks → 9 Days | 45% GPU Memory Savings",
			description:
				"Enterprise-grade framework for on-premise QLoRA fine-tuning and vLLM serving with dynamic 4-bit adapter swapping over a shared base model, ensuring complete data residency and privacy.",
			problem:
				"Internal product teams spent 6+ weeks setting up custom LLM deployments with massive GPU memory duplication, violating strict on-premise data residency rules.",
			architecture:
				"Centralized QLoRA fine-tuning pipeline (NF4 4-bit quantization) paired with high-performance vLLM serving. Dynamically swaps LoRA adapters over a shared 4-bit base model (Meta-Llama-3-8B-Instruct) using in-memory LRU caching.",
			keyFeatures: [
				"Model-to-Production Time Slashed from 6 weeks to 9 days (~78% faster)",
				"45% GPU Memory Footprint Reduction via dynamic adapter swapping",
				"Self-Serve CLI for internal engineering pods",
				"Strict On-Premise Zero-Data-Retention Data Sovereignty Compliance",
			],
			technologies: [
				"Python",
				"QLoRA (NF4)",
				"vLLM",
				"Meta LLaMA-3",
				"FastAPI",
				"PyTorch",
				"Docker",
			],
		},
		{
			id: "haga",
			title: "Haga Physical AI & Robotics Verification Suite",
			href: "https://haga.mushoodhanif.com",
			githubUrl: "https://github.com/DivineDemon/haga-core",
			websiteUrl: "https://haga.mushoodhanif.com",
			dates: "2025 - Present",
			active: true,
			impact: "Independent Trust & Physics Violation Verification Layer",
			description:
				"Core benchmark engine for robot learning policies and generative world models. Features mass/friction degradation stress curves in MuJoCo/MJX and automated physics violation detection across video data.",
			problem:
				"Generative world models and robotics policies suffer from unverified physics hallucinations (hovering, teleportation, interpenetration) that break physical AI stress tests in production environments.",
			architecture:
				"Python 3.12 core engine running MuJoCo/MJX parallel physics degradation simulation, CoTracker video motion analysis, CogVideoX consistency verifier, and Next.js public evidence browser.",
			keyFeatures: [
				"Pillar 1: Mass & Friction Policy Stress Curves on MuJoCo / Robosuite",
				"Pillar 2: Automated Physics Violation Detector (Teleportation, Interpenetration)",
				"100% Precision/Recall on Synthetic Physics Violations",
				"Public Benchmarks & Private Investor Data Room",
			],
			technologies: [
				"Python 3.12",
				"MuJoCo",
				"MJX",
				"JAX",
				"Robosuite",
				"CoTracker",
				"CogVideoX",
				"Next.js",
			],
		},
		{
			id: "brsc",
			title: "Bilingual Enterprise RAG Support System (BRSC)",
			href: "https://github.com/DivineDemon/brsc",
			githubUrl: "https://github.com/DivineDemon/brsc",
			websiteUrl: "https://mushoodhanif.com/#contact",
			dates: "2022 - 2023",
			active: true,
			impact: "40,000+ Monthly Chats | 78% Ticket Resolution Acceleration",
			description:
				"Production RAG assistant for bilingual (Urdu & English) enterprise support. Features sub-60ms FAISS HNSW vector search, FP32 to INT8 quantization, and dual-threshold routing that cut hallucinations by 80%.",
			problem:
				"Customer support teams faced 42-minute average ticket resolution times across 40,000+ monthly bilingual conversations with heavy manual QA logging overhead.",
			architecture:
				"FastAPI + Celery async processing pipeline, paraphrase-multilingual embedding model quantized from FP32 to INT8 via ONNX, FAISS HNSW vector search index (sub-60ms O(log N) retrieval), and confidence-based escalation gates.",
			keyFeatures: [
				"Ticket Resolution Accelerated from 42 to 9 minutes (78% reduction)",
				"Sustains 95+ req/s at p95 latency <400ms",
				"Containment Rate raised from 48% to 71%",
				"75% Memory Reduction via ONNX INT8 Quantization (470MB to 117MB)",
			],
			technologies: [
				"FastAPI",
				"Celery",
				"Redis",
				"FAISS HNSW",
				"ONNX Quantization",
				"Docker",
			],
		},
		{
			id: "ezra-bid-assistant",
			title: "Ezra Bid Assistant & Freelance Automation Suite",
			href: "https://eba.ezraglobal.co.za",
			githubUrl: "https://github.com/DivineDemon/ezra-bid-assistant",
			websiteUrl: "https://eba.ezraglobal.co.za",
			dates: "2026",
			active: true,
			impact: "Private Chrome Extension & AI Proposal Generator",
			description:
				"Private Chrome Extension and backend service for Ezra Global drafting targeted, AI-grounded Freelancer.com proposals from live project pages with human review gates.",
			problem:
				"Freelance business operations spent hours manually reviewing project pages and drafting customized proposals for high-value client opportunities.",
			architecture:
				"TypeScript Chrome extension integrating with Next.js API route powered by Gemini API, Zod schema validation, and structured proposal evaluation criteria.",
			keyFeatures: [
				"Live Project Page Context Extraction & Parsing",
				"AI-Grounded Custom Proposal Generation in Seconds",
				"Human Review Gate (Never Auto-Submitted without verification)",
				"Strict Client Privacy & Custom Prompt Rules",
			],
			technologies: [
				"TypeScript",
				"Chrome Extension",
				"Next.js",
				"Gemini API",
				"Tailwind CSS",
				"Zod",
			],
		},
	],

	hackathons: [
		{
			title: "Individual Delivery Excellence — $1.3M+ Annualized Savings",
			dates: "2026",
			location: "Coforge / HSBC Account",
			description:
				"Recognized for solving a critical voice analytics pipeline throughput bottleneck in 1 week, eliminating GIL thread locks with CPU-pinned parallel workers.",
			image: "/logos/confiz.png",
			links: [],
		},
		{
			title: "Guinness World Record — Agentic AI Day",
			dates: "July 2025",
			location: "Google Cloud | Hack2Skill",
			description:
				"Command Centre Operations lead for record-breaking global Agentic AI event.",
			image: "",
			links: [],
		},
		{
			title: "Enterprise AI Technical Instructor",
			dates: "2025 – 2026",
			location: "Enterprise Training",
			description:
				"Trained 130+ enterprise engineers on Java Spring AI & LLM integration across 5 intensive sessions.",
			image: "/logos/afiniti.svg",
			links: [],
		},
	],
} as const;
