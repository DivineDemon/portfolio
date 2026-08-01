import type * as d3Force from "d3-force";
import AirflowIcon from "@/assets/img/tech/airflow.svg?url";
import AwsIcon from "@/assets/img/tech/aws.svg?url";
import AzureIcon from "@/assets/img/tech/azure.svg?url";
import BashIcon from "@/assets/img/tech/bash.svg?url";
import BunIcon from "@/assets/img/tech/bun.svg?url";
import CeleryIcon from "@/assets/img/tech/celery.svg?url";
import DockerIcon from "@/assets/img/tech/docker.svg?url";
import FastApiIcon from "@/assets/img/tech/fastapi.svg?url";
import GcpIcon from "@/assets/img/tech/gcp.svg?url";
import GitIcon from "@/assets/img/tech/git.svg?url";
import GrpcIcon from "@/assets/img/tech/grpc.svg?url";
import HuggingFaceIcon from "@/assets/img/tech/huggingface.svg?url";
import KubernetesIcon from "@/assets/img/tech/kubernetes.svg?url";
import LangChainIcon from "@/assets/img/tech/langchain.svg?url";
import LinuxIcon from "@/assets/img/tech/linux.svg?url";
import PandasIcon from "@/assets/img/tech/pandas.svg?url";
import PostgresqlIcon from "@/assets/img/tech/postgresql.svg?url";
import PythonIcon from "@/assets/img/tech/python.svg?url";
import PyTorchIcon from "@/assets/img/tech/pytorch.svg?url";
import RedisIcon from "@/assets/img/tech/redis.svg?url";
import ScikitLearnIcon from "@/assets/img/tech/scikitlearn.svg?url";
import SqlIcon from "@/assets/img/tech/sql.svg?url";
import TypeScriptIcon from "@/assets/img/tech/typescript.svg?url";

export interface GraphNode extends d3Force.SimulationNodeDatum {
  id: string;
  label: string;
  type: "hub" | "leaf";
  category: string;
  color: string;
  value?: string;
  title?: string;
  detail?: string;
  company?: string;
  radius: number;
}

export interface GraphLink extends d3Force.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

export const GRAPH_NODES: GraphNode[] = [
  {
    id: "hub-cost",
    label: "COST & EFFICIENCY",
    type: "hub",
    category: "Cost & Efficiency",
    color: "#10b981",
    title: "Cost & Efficiency Hub",
    detail:
      "Metrics around turnaround times, vendor cost savings, token efficiency, and GPU infrastructure optimization.",
    radius: 9,
  },
  {
    id: "cost-1",
    label: "92%",
    type: "leaf",
    category: "Cost & Efficiency",
    color: "#10b981",
    value: "92%",
    title: "92% Processing Time Cut",
    detail:
      "Cut manual logistics document processing time from 3 days to under 4 hours using a 6-agent LangGraph orchestration layer.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "cost-2",
    label: "3d → 4h",
    type: "leaf",
    category: "Cost & Efficiency",
    color: "#10b981",
    value: "3d → <4h",
    title: "3 Days to Under 4 Hours",
    detail:
      "Transformed manual logistics intake into an automated multi-agent extraction and validation pipeline.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "cost-3",
    label: "55%",
    type: "leaf",
    category: "Cost & Efficiency",
    color: "#10b981",
    value: "55%",
    title: "55% Per-Document Cost Savings",
    detail:
      "Replaced third-party vendor OCR+LLM API calls with in-house QLoRA fine-tuned LLaMA-3 extraction models.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "cost-4",
    label: "64%",
    type: "leaf",
    category: "Cost & Efficiency",
    color: "#10b981",
    value: "64%",
    title: "64% Compute Cost Reduction",
    detail:
      "Right-sized Azure GPU instance types and introduced queue-depth autoscaling for streaming inference.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "cost-5",
    label: "40%",
    type: "leaf",
    category: "Cost & Efficiency",
    color: "#10b981",
    value: "40%",
    title: "40% Token Cost Reduction",
    detail:
      "Quantized production embedding models from FP32 to INT8 without losing retrieval precision.",
    company: "Confiz",
    radius: 5,
  },

  {
    id: "hub-accuracy",
    label: "ACCURACY & QUALITY",
    type: "hub",
    category: "Accuracy & Quality",
    color: "#f59e0b",
    title: "Accuracy & Quality Hub",
    detail:
      "F1 extraction accuracy, hallucination reduction, bilingual classification, and false-positive fraud metrics.",
    radius: 9,
  },
  {
    id: "acc-1",
    label: "96%",
    type: "leaf",
    category: "Accuracy & Quality",
    color: "#f59e0b",
    value: "96% F1",
    title: "96% F1 Extraction Accuracy",
    detail:
      "Fine-tuned domain LLaMA-3 models with QLoRA on a single on-prem A100 GPU for strict data residency.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "acc-2",
    label: "11% → <2%",
    type: "leaf",
    category: "Accuracy & Quality",
    color: "#f59e0b",
    value: "<2%",
    title: "Sub-2% Hallucination Rate",
    detail:
      "Introduced citation-grounding and self-verification steps into multi-agent decision pipelines.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "acc-3",
    label: "14% → 3.5%",
    type: "leaf",
    category: "Accuracy & Quality",
    color: "#f59e0b",
    value: "3.5%",
    title: "3.5% False Positive Rate",
    detail:
      "Lowered false fraud alerts from 14% to 3.5% while increasing fraud catch-rate by 22% across 1.2M+ transactions.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "acc-4",
    label: "89%",
    type: "leaf",
    category: "Accuracy & Quality",
    color: "#f59e0b",
    value: "89%",
    title: "89% Sentiment Classification",
    detail:
      "Fine-tuned bilingual Urdu-English BERT variant on 12,000 customer feedback support tickets.",
    company: "Confiz",
    radius: 5,
  },
  {
    id: "acc-5",
    label: "62% → 80%",
    type: "leaf",
    category: "Accuracy & Quality",
    color: "#f59e0b",
    value: "+18 pts",
    title: "+18 Points Search Accuracy",
    detail: "Introduced TF-IDF reranking ahead of legacy keyword search for FAQ ticket retrieval.",
    company: "Confiz",
    radius: 5,
  },

  {
    id: "hub-scale",
    label: "SCALE & PERFORMANCE",
    type: "hub",
    category: "Scale & Performance",
    color: "#06b6d4",
    title: "Scale & Performance Hub",
    detail:
      "High-throughput streaming, low p95 latency microservices, and automated LLM release evaluation harnesses.",
    radius: 9,
  },
  {
    id: "scale-1",
    label: "1.2M+",
    type: "leaf",
    category: "Scale & Performance",
    color: "#06b6d4",
    value: "1.2M+",
    title: "1.2M+ Daily Transactions",
    detail:
      "Scored 1.2M+ real-time events daily using a streaming GPU-backed fraud detection pipeline.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "scale-2",
    label: "<180ms",
    type: "leaf",
    category: "Scale & Performance",
    color: "#06b6d4",
    value: "<180ms",
    title: "<180ms p95 Latency",
    detail:
      "Cut end-to-end inference latency from 2.1s to under 180ms via Azure streaming microservices.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "scale-3",
    label: "8×",
    type: "leaf",
    category: "Scale & Performance",
    color: "#06b6d4",
    value: "8×",
    title: "8× Throughput Boost (12 → 95 req/s)",
    detail:
      "Migrated request processing pipeline to async FastAPI + Celery architecture while keeping p95 < 400ms.",
    company: "Confiz",
    radius: 5,
  },
  {
    id: "scale-4",
    label: "40,000+",
    type: "leaf",
    category: "Scale & Performance",
    color: "#06b6d4",
    value: "40k+",
    title: "40,000+ Monthly Conversations",
    detail:
      "Bilingual Urdu/English RAG support chatbot handling customer support at enterprise scale.",
    company: "Confiz",
    radius: 5,
  },
  {
    id: "scale-5",
    label: "1,200+",
    type: "leaf",
    category: "Scale & Performance",
    color: "#06b6d4",
    value: "1,200+",
    title: "1,200+ Automated Evals",
    detail:
      "Standardized company-wide LLM evaluation harness executed automatically per product release.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "scale-6",
    label: "340ms → 60ms",
    type: "leaf",
    category: "Scale & Performance",
    color: "#06b6d4",
    value: "60ms",
    title: "60ms Vector Retrieval",
    detail:
      "Rebuilt FAQ search with FAISS HNSW vector index, cutting retrieval latency from 340ms to 60ms.",
    company: "Confiz",
    radius: 5,
  },

  {
    id: "hub-reliability",
    label: "RELIABILITY & OPS",
    type: "hub",
    category: "Reliability & Ops",
    color: "#a855f7",
    title: "Reliability & Ops Hub",
    detail:
      "MTTR incident reductions, zero-unsupervised compliance gates, and GPU idle time optimization.",
    radius: 9,
  },
  {
    id: "rel-1",
    label: "50m → 8m",
    type: "leaf",
    category: "Reliability & Ops",
    color: "#a855f7",
    value: "~8m",
    title: "8-Min Incident MTTR",
    detail:
      "Cut production MTTR from ~50 to ~8 minutes using canary deployments and automated rollback frameworks.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "rel-2",
    label: "100%",
    type: "leaf",
    category: "Reliability & Ops",
    color: "#a855f7",
    value: "100%",
    title: "Zero Unsupervised Failures",
    detail: "Delivered 1,000+ weekly logistics documents with human-in-the-loop validation gates.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "rel-3",
    label: "35%",
    type: "leaf",
    category: "Reliability & Ops",
    color: "#a855f7",
    value: "35%",
    title: "35% GPU Idle Time Cut",
    detail:
      "Implemented dynamic request batching and queuing scheduler across on-prem inference cluster.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "rel-4",
    label: "78%",
    type: "leaf",
    category: "Reliability & Ops",
    color: "#a855f7",
    value: "78%",
    title: "78% Faster Resolution",
    detail:
      "Cut average customer ticket resolution time from 42 to 9 minutes via bilingual RAG chatbot.",
    company: "Confiz",
    radius: 5,
  },
  {
    id: "rel-5",
    label: "80%",
    type: "leaf",
    category: "Reliability & Ops",
    color: "#a855f7",
    value: "80%",
    title: "80% Fewer Drift Incidents",
    detail:
      "Built automated feature-drift detection and retraining triggers across active ML pipelines.",
    company: "Afiniti",
    radius: 5,
  },

  {
    id: "hub-robotics",
    label: "PHYSICAL AI & ROBOTICS",
    type: "hub",
    category: "Physical AI & Robotics",
    color: "#3b82f6",
    title: "Physical AI & Robotics Hub",
    detail:
      "Haga core physics verification layer, MuJoCo stress testing, and world model violation detection.",
    radius: 9,
  },
  {
    id: "rob-1",
    label: "haga-core",
    type: "leaf",
    category: "Physical AI & Robotics",
    color: "#3b82f6",
    value: "haga-core",
    title: "Physics Benchmark Engine",
    detail: "Mass & friction degradation curves on MuJoCo and Robosuite policy environments.",
    company: "Haga Labs",
    radius: 5,
  },
  {
    id: "rob-2",
    label: "CogVideoX",
    type: "leaf",
    category: "Physical AI & Robotics",
    color: "#3b82f6",
    value: "CogVideoX",
    title: "World Model Physics Verifier",
    detail:
      "Detects physics violations (teleportation, hovering, impulse) in video generation models.",
    company: "Haga Labs",
    radius: 5,
  },
  {
    id: "rob-3",
    label: "100%",
    type: "leaf",
    category: "Physical AI & Robotics",
    color: "#3b82f6",
    value: "100%",
    title: "100% Precision/Recall",
    detail: "Achieved 100% precision and recall on synthetic physics violation benchmarks.",
    company: "Haga Labs",
    radius: 5,
  },
  {
    id: "rob-4",
    label: "haga-web",
    type: "leaf",
    category: "Physical AI & Robotics",
    color: "#3b82f6",
    value: "haga-web",
    title: "Public Evidence Browser",
    detail:
      "Interactive verification evidence browser and investor data room for robot policy evaluation.",
    company: "Haga Labs",
    radius: 5,
  },

  {
    id: "hub-breadth",
    label: "SYSTEMS BREADTH",
    type: "hub",
    category: "Systems Breadth",
    color: "#f43f5e",
    title: "Systems Breadth Hub",
    detail:
      "Multi-agent LangGraph orchestrations, MCP tool integrations, and overall career engineering trajectory.",
    radius: 9,
  },
  {
    id: "sys-1",
    label: "6-Agent",
    type: "leaf",
    category: "Systems Breadth",
    color: "#f43f5e",
    value: "6 Agents",
    title: "6-Agent LangGraph System",
    detail:
      "Multi-agent orchestration spanning intake, extraction, compliance review, and human review.",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "sys-2",
    label: "9 APIs",
    type: "leaf",
    category: "Systems Breadth",
    color: "#f43f5e",
    value: "2 Days",
    title: "2-Day Tool Onboarding",
    detail:
      "Cut integration time from 2 weeks to 2 days across 9 internal APIs via Model Context Protocol (MCP).",
    company: "Afiniti",
    radius: 5,
  },
  {
    id: "sys-3",
    label: "7 Years",
    type: "leaf",
    category: "Systems Breadth",
    color: "#f43f5e",
    value: "7 Years",
    title: "7 Years AI Engineering",
    detail:
      "Proven progression from bilingual NLP classifiers to multi-agent state machines and physical AI.",
    company: "Career",
    radius: 5,
  },
  {
    id: "sys-4",
    label: "#1 Capstone",
    type: "leaf",
    category: "Systems Breadth",
    color: "#f43f5e",
    value: "Winner",
    title: "Best Capstone Award",
    detail: "Awarded Best Commercial Capstone Award at GIFT University.",
    company: "Education",
    radius: 5,
  },
];

export const GRAPH_LINKS: GraphLink[] = [
  { source: "hub-cost", target: "cost-1" },
  { source: "hub-cost", target: "cost-2" },
  { source: "hub-cost", target: "cost-3" },
  { source: "hub-cost", target: "cost-4" },
  { source: "hub-cost", target: "cost-5" },

  { source: "hub-accuracy", target: "acc-1" },
  { source: "hub-accuracy", target: "acc-2" },
  { source: "hub-accuracy", target: "acc-3" },
  { source: "hub-accuracy", target: "acc-4" },
  { source: "hub-accuracy", target: "acc-5" },

  { source: "hub-scale", target: "scale-1" },
  { source: "hub-scale", target: "scale-2" },
  { source: "hub-scale", target: "scale-3" },
  { source: "hub-scale", target: "scale-4" },
  { source: "hub-scale", target: "scale-5" },
  { source: "hub-scale", target: "scale-6" },

  { source: "hub-reliability", target: "rel-1" },
  { source: "hub-reliability", target: "rel-2" },
  { source: "hub-reliability", target: "rel-3" },
  { source: "hub-reliability", target: "rel-4" },
  { source: "hub-reliability", target: "rel-5" },

  { source: "hub-robotics", target: "rob-1" },
  { source: "hub-robotics", target: "rob-2" },
  { source: "hub-robotics", target: "rob-3" },
  { source: "hub-robotics", target: "rob-4" },

  { source: "hub-breadth", target: "sys-1" },
  { source: "hub-breadth", target: "sys-2" },
  { source: "hub-breadth", target: "sys-3" },
  { source: "hub-breadth", target: "sys-4" },

  { source: "hub-cost", target: "hub-accuracy" },
  { source: "hub-accuracy", target: "hub-scale" },
  { source: "hub-scale", target: "hub-reliability" },
  { source: "hub-reliability", target: "hub-robotics" },
  { source: "hub-robotics", target: "hub-breadth" },
  { source: "hub-breadth", target: "hub-cost" },
];

export const GRAPH_CONFIG = {
  hubDistance: 380,
  leafDistance: 145,
  chargeStrength: -450,
  linkStrength: 0.22,
  collideHubRadius: 40,
  collideLeafRadius: 35,
};

export interface Skill {
  name: string;
  icon: unknown;
  category: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export const STACK_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-ml",
    name: "AI / ML Systems & LLM Engineering",
    description:
      "Deep learning frameworks, agentic orchestrations, on-prem QLoRA fine-tuning, and high-throughput LLM serving.",
    skills: [
      {
        name: "PyTorch",
        icon: PyTorchIcon,
        category: "Deep Learning",
        description: "Primary framework for neural networks, fine-tuning & custom model pipelines.",
      },
      {
        name: "Hugging Face",
        icon: HuggingFaceIcon,
        category: "LLM & NLP",
        description: "Transformers, PEFT adapters, tokenizers & open-source model ecosystem.",
      },
      {
        name: "LangGraph & LangChain",
        icon: LangChainIcon,
        category: "Agentic Systems",
        description: "Multi-agent state machines, graph-based routing & tool orchestration.",
      },
      {
        name: "scikit-learn",
        icon: ScikitLearnIcon,
        category: "Machine Learning",
        description: "Gradient boosting, classification, evaluation & active learning loops.",
      },
    ],
  },
  {
    id: "languages",
    name: "Languages & Core Tooling",
    description:
      "Type-safe software engineering, systems scripting, and complex database analytics.",
    skills: [
      {
        name: "Python",
        icon: PythonIcon,
        category: "Core Language",
        description: "Primary language for production AI infrastructure, microservices & MLOps.",
      },
      {
        name: "TypeScript",
        icon: TypeScriptIcon,
        category: "Core Language",
        description: "Type-safe application engineering, web interfaces & full-stack tooling.",
      },
      {
        name: "SQL",
        icon: SqlIcon,
        category: "Data Querying",
        description: "Complex relational queries, analytical window functions & indexing.",
      },
      {
        name: "Bash",
        icon: BashIcon,
        category: "Scripting",
        description: "Linux shell automation, deployment scripts & cluster administration.",
      },
      {
        name: "Git",
        icon: GitIcon,
        category: "Version Control",
        description: "Distributed version control, release branching & code review pipelines.",
      },
      {
        name: "Linux",
        icon: LinuxIcon,
        category: "OS & Kernel",
        description: "Enterprise Linux administration, process management & GPU driver setups.",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend Microservices & Concurrency",
    description:
      "High-throughput async APIs, distributed task queues, in-memory caching, and low-latency RPCs.",
    skills: [
      {
        name: "FastAPI",
        icon: FastApiIcon,
        category: "Async Framework",
        description:
          "High-performance REST & streaming endpoints handling 95+ req/s at <400ms p95.",
      },
      {
        name: "Celery",
        icon: CeleryIcon,
        category: "Task Queue",
        description: "Distributed asynchronous worker queues & background task execution.",
      },
      {
        name: "Redis",
        icon: RedisIcon,
        category: "In-Memory Store",
        description: "Caching, pub/sub messaging, rate limiting & session state.",
      },
      {
        name: "PostgreSQL",
        icon: PostgresqlIcon,
        category: "Relational DB",
        description: "Enterprise relational database persistence & ACID-compliant transactions.",
      },
      {
        name: "gRPC",
        icon: GrpcIcon,
        category: "Inter-Service RPC",
        description: "Low-latency protocol buffer RPC for high-concurrency microservices.",
      },
      {
        name: "Bun & Next.js",
        icon: BunIcon,
        category: "Web & JS Runtime",
        description: "Ultra-fast JavaScript/TypeScript runtime & modern React server components.",
      },
    ],
  },
  {
    id: "data-search",
    name: "Data Infrastructure & Vector Search",
    description:
      "FAISS similarity retrieval, RAG grounding, feature store monitoring, and ETL workflows.",
    skills: [
      {
        name: "FAISS & Vector Search",
        icon: PythonIcon,
        category: "Vector Search",
        description: "HNSW dense vector indexing cutting retrieval latency from 340ms to 60ms.",
      },
      {
        name: "Apache Airflow",
        icon: AirflowIcon,
        category: "Workflow Orchestration",
        description: "Automated ETL pipeline DAGs, data movement & scheduled data processing.",
      },
      {
        name: "pandas",
        icon: PandasIcon,
        category: "Data Processing",
        description: "Data manipulation, preprocessing, active learning & evaluation analysis.",
      },
    ],
  },
  {
    id: "cloud-devops",
    name: "Cloud Platforms & MLOps Reliability",
    description:
      "Multi-cloud deployment, Kubernetes container orchestration, canary rollouts, and MTTR minimization.",
    skills: [
      {
        name: "Docker",
        icon: DockerIcon,
        category: "Containerization",
        description: "Containerized service packaging, multi-stage builds & environment isolation.",
      },
      {
        name: "Kubernetes",
        icon: KubernetesIcon,
        category: "Orchestration",
        description: "Production container orchestration, AKS & GKE cluster scaling.",
      },
      {
        name: "Microsoft Azure",
        icon: AzureIcon,
        category: "Cloud Platform",
        description: "Azure ML Studio, GPU streaming microservices & production AKS clusters.",
      },
      {
        name: "Amazon Web Services",
        icon: AwsIcon,
        category: "Cloud Platform",
        description: "EC2 GPU instances, SageMaker model training & cloud infrastructure.",
      },
      {
        name: "Google Cloud (GCP)",
        icon: GcpIcon,
        category: "Cloud Platform",
        description: "GKE Kubernetes clusters, Vertex AI & Cloud Run serverless services.",
      },
    ],
  },
];
