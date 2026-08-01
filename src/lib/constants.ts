import { Briefcase, BriefcaseBusiness, Info, Mail, Medal, Package, Rss } from "lucide-react";
import AfinitiLogo from "@/assets/img/afiniti.svg?url";
import ConfizLogo from "@/assets/img/confiz.png";
import UniversityLogo from "@/assets/img/gift-university.png";
import HagaLogo from "@/assets/img/haga.png";
import type { ProjectData } from "./types";

export const NAV_ITEMS = [
  {
    id: 1,
    name: "About",
    link: "#about",
    icon: Info,
  },
  {
    id: 2,
    name: "Experience",
    link: "#experience",
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    name: "Impact",
    link: "#impact",
    icon: Medal,
  },
  {
    id: 4,
    name: "Work",
    link: "/work",
    icon: Briefcase,
  },
  {
    id: 5,
    name: "Stack",
    link: "#stack",
    icon: Package,
  },
  {
    id: 6,
    name: "Blog",
    link: "/blog",
    icon: Rss,
  },
  {
    id: 7,
    name: "Contact",
    link: "#contact",
    icon: Mail,
  },
];

export const FIRST_ROW = ["MLOPS", "GENAI", "PyTorch", "LLM", "RAG", "GCP"];

export const TRAJECTORY_DATA = [
  {
    id: "haga",
    company: "Haga Labs",
    role: "Founder & AI Systems Architect",
    period: "Jun 2026 - Present",
    type: "Founder",
    location: "Lahore, Pakistan (Remote)",
    logo: HagaLogo,
    description:
      "Building the independent trust, benchmarking, and physics-consistency verification layer for robot learning policies and generative world models.",
    achievements: [
      "Architected haga-core: Mass & friction degradation curves on MuJoCo / Robosuite environments.",
      "Engineered physical violation detection (teleportation, hovering, impulse) across CogVideoX & CoTracker datasets.",
      "Shipped public benchmark evidence browser (haga-web) and automated data room for investor diligence.",
    ],
    skills: ["Python", "JAX", "PyTorch", "MuJoCo", "Next.js", "Bun"],
  },
  {
    id: "afiniti",
    company: "Afiniti",
    role: "Senior AI Engineer",
    period: "Jul 2023 - May 2026",
    type: "Senior AI Engineer (Sep '25 - May '26) • AI Engineer (Jul '23 - Aug '25)",
    location: "Lahore, Pakistan",
    logo: AfinitiLogo,
    description:
      "Led agentic systems architecture, on-prem LLM fine-tuning infrastructure, and real-time streaming decision pipelines.",
    achievements: [
      "Architected a 6-agent LangGraph document processing pipeline cutting logistics turnaround time by 92% (3 days to <4 hours).",
      "Fine-tuned domain LLaMA-3 models with QLoRA on a single on-prem A100 GPU, raising extraction F1 to 96% under strict data residency rules.",
      "Built real-time streaming fraud detection pipeline scoring 1.2M+ daily transactions at <180ms p95 latency, dropping false positives from 14% to 3.5%.",
      "Standardized company-wide evaluation harness running 1,200+ automated test cases per release, reducing hallucination rate from 11% to <2%.",
    ],
    skills: ["LangGraph", "QLoRA", "vLLM", "LLaMA-3", "PyTorch", "Azure", "FastAPI"],
  },
  {
    id: "confiz",
    company: "Confiz",
    role: "Machine Learning Engineer",
    period: "Nov 2019 - Jun 2023",
    type: "ML Engineer (Apr '22 - Jun '23) • Jr. ML Engineer (Nov '19 - Mar '22)",
    location: "Lahore, Pakistan",
    logo: ConfizLogo,
    description:
      "Designed and deployed enterprise NLP pipelines, vector retrieval engines, and high-throughput async API services.",
    achievements: [
      "Deployed a bilingual (Urdu/English) RAG support chatbot handling 40,000+ monthly conversations, cutting ticket resolution time by 78% (42 to 9 mins).",
      "Migrated request pipeline to async FastAPI + Celery, boosting throughput 8× (12 → 95 req/s) with p95 latency under 400ms.",
      "Rebuilt FAQ search with FAISS HNSW vector index, reducing retrieval latency from 340ms to 60ms and cutting hallucinations by ~80%.",
      "Built bilingual sentiment classifier and active-learning labeling loop cutting annotation backlog from 3,000 to <200 tickets.",
    ],
    skills: ["Python", "FastAPI", "Celery", "FAISS", "Hugging Face", "RAG"],
  },
  {
    id: "education",
    company: "GIFT University",
    role: "BS, Software Engineering (Hons.)",
    period: "Oct 2014 - Aug 2019",
    type: "Higher Education",
    location: "Gujranwala, Pakistan",
    logo: UniversityLogo,
    description:
      "Specialized in software engineering fundamentals, algorithm design, and system boundaries.",
    achievements: [
      "Awarded Best Commercial Capstone Award.",
      "Technical Head, Young Computer Professionals Society (YCPS).",
      "Vice President, Drama Society.",
    ],
    skills: ["Software Architecture", "Algorithms", "Data Structures", "System Design"],
  },
];

export const FIVE_BEST_PROJECTS: ProjectData[] = [
  {
    id: "haga-verification",
    title: "Haga Physical Verification Layer",
    type: "Personal / Startup",
    clientCompany: "Haga Labs",
    description:
      "Independent trust, benchmarking, and physics-consistency verification layer for robot policies.",
    context:
      "Generative world models and robot policies suffer from unphysical hallucinations (teleportation, hovering) during policy rollout.",
    approach:
      "Mass & friction degradation stress curves on MuJoCo paired with automated video physics violation detectors.",
    system:
      "JAX/PyTorch evaluation engine, Bun/Next.js evidence browser, and automated investor data room.",
    outcome:
      "100% precision/recall on synthetic physics violation benchmarks; public evidence browser.",
  },
  {
    id: "agentic-document-compliance",
    title: "Agentic Document Compliance Pipeline",
    type: "Company",
    clientCompany: "Afiniti",
    description:
      "Multi-agent LLM orchestration system automating logistics document intake, extraction, and compliance review.",
    context:
      "Logistics document processing required 3 days of manual review per batch, causing severe operational bottlenecks.",
    approach:
      "6-agent LangGraph orchestration state machine with QLoRA fine-tuning and confidence-scored human-in-the-loop review.",
    system:
      "LangGraph state machine, FastAPI microservices, on-prem QLoRA LLaMA-3 models, and full request tracing.",
    outcome:
      "Cut processing turnaround from 3 days to <4 hours (92% reduction) with zero unsupervised compliance failures.",
  },
  {
    id: "on-prem-fine-tuning",
    title: "On-Prem LLM Fine-Tuning & Serving",
    type: "Company",
    clientCompany: "Afiniti",
    description:
      "Standardized self-serve QLoRA fine-tuning and vLLM serving framework for strict data residency.",
    context:
      "Strict enterprise data residency prohibited third-party LLM APIs, while duplicate model deployments wasted GPU memory.",
    approach:
      "Standardized QLoRA fine-tuning with 4-bit quantization, adapter swapping, and vLLM serving on a single A100 GPU.",
    system:
      "PyTorch, Hugging Face PEFT, vLLM, Docker, and self-serve CLI tooling for product teams.",
    outcome:
      "Raised extraction F1 accuracy from 81% to 96%, reduced model-to-prod time from 6 weeks to 9 days, and cut VRAM by 45%.",
  },
  {
    id: "real-time-fraud-scoring",
    title: "Real-Time Fraud Scoring Pipeline",
    type: "Company",
    clientCompany: "Afiniti",
    description:
      "High-throughput streaming fraud detection pipeline scoring over 1.2M daily financial transactions.",
    context:
      "High transaction volume suffered from 14% false-positive fraud declines and high processing latency (>2s).",
    approach:
      "Combined gradient-boosted models with a real-time feature store and secondary ensemble validation.",
    system:
      "Azure ML, streaming microservices, feature store, and automated feature-drift monitoring.",
    outcome:
      "Lowered false positives from 14% to 3.5%, raised fraud catch rate by 22% across 1.2M+ daily events at <180ms p95 latency.",
  },
  {
    id: "bilingual-rag-chatbot",
    title: "Bilingual RAG Support Chatbot",
    type: "Client",
    clientCompany: "Confiz / Retail Client",
    description:
      "Urdu/English Retrieval-Augmented Generation chatbot handling 40,000+ monthly support conversations.",
    context:
      "High customer support ticket volume caused 42-minute average resolution times and manual QA overhead.",
    approach:
      "Engineered a bilingual RAG chatbot with confidence-based escalation thresholds and INT8 quantized embeddings.",
    system:
      "Async FastAPI, Celery task queue, FAISS vector index, and confidence escalation routing.",
    outcome:
      "Cut average ticket resolution time from 42 to 9 minutes (78% reduction) and scaled throughput 8× (12 → 95 req/s).",
  },
];
