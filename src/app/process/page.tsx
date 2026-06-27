import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageBreadcrumbs } from "@/components/cms/page-breadcrumbs";
import DitherSplitter from "@/components/global/dither-splitter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { SITE_URL } from "@/lib/constants";
import { safeJsonLdStringify, WEBSITE_SCHEMA_ID } from "@/lib/json-ld";

const TITLE = "Process";
const DESCRIPTION =
  "How I take SaaS products, AI automations, and n8n workflows from scoped problem to production — as a hands-on fullstack builder and fractional CTO.";

export const metadata: Metadata = {
  title: "How I Work | Mushood Hanif",
  description: DESCRIPTION,
  keywords: [
    "fullstack development process",
    "SaaS build process",
    "AI automation workflow",
    "fractional CTO engagement",
  ],
  alternates: { canonical: `${SITE_URL}/process` },
  openGraph: {
    title: "How I Work | Mushood Hanif",
    description: DESCRIPTION,
    url: `${SITE_URL}/process`,
    type: "website",
    siteName: "Mushood Hanif",
  },
  twitter: {
    card: "summary_large_image",
    title: "How I Work | Mushood Hanif",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const STEPS = [
  {
    number: "01",
    title: "Map the problem to what gets built",
    body: "We start with the operational or product pain — not a feature wishlist. I translate that into a concrete build: a Next.js product surface, a FastAPI or Node backend, an n8n automation, an LLM pipeline, or an architecture refactor your team is blocked on. You leave with a written scope, feasibility read, milestones, and success metrics.",
  },
  {
    number: "02",
    title: "Design the full stack for production",
    body: "Before code hits main, I design the system end to end — React/Next.js frontends, PostgreSQL schemas, API boundaries, auth and multi-tenant access, event-driven jobs (Inngest), and AI/automation layers (OpenAI, LangChain, n8n). The goal is a foundation that survives real usage, not a prototype that needs a rewrite in six months.",
  },
  {
    number: "03",
    title: "Ship working software in short cycles",
    body: "I build across the stack myself: UI, APIs, integrations, Docker configs, and deployment. Each cycle ends with something you can click through or run in staging — live demos, not slide decks. Weekly sync or async updates, your preference. Same person who scoped and architected it writes and ships it.",
  },
  {
    number: "04",
    title: "Launch, document, and stay useful",
    body: "Production deployment, monitoring, runbooks, and handoff so your team can extend what we built. For fractional or advisory work, I stay embedded — unblocking delivery, refactoring what won't scale, and aligning engineering with business outcomes. For scoped builds, you get a system that holds up after I step back.",
  },
] as const;

const ENGAGEMENT_FORMATS = [
  {
    label: "Scoped build",
    detail:
      "Fixed milestones, defined outcome — product features, automation systems, or platform refactors.",
  },
  {
    label: "Ongoing development",
    detail:
      "Sustained product work as your platform, integrations, and AI workflows evolve.",
  },
  {
    label: "Fractional & advisory",
    detail:
      "Technical leadership, architecture direction, and execution oversight without a full-time hire.",
  },
] as const;

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/process#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: TITLE,
          item: `${SITE_URL}/process`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/process#webpage`,
      name: "How I Work | Mushood Hanif",
      description: DESCRIPTION,
      url: `${SITE_URL}/process`,
      isPartOf: { "@id": WEBSITE_SCHEMA_ID },
    },
  ],
};

export default function ProcessPage() {
  return (
    <>
      <script type="application/ld+json">
        {safeJsonLdStringify(pageJsonLd)}
      </script>
      <article className="min-h-screen">
        <MaxWidthWrapper parentBorder="border-b">
          <div className="mx-auto max-w-3xl p-5">
            <PageBreadcrumbs
              items={[{ label: "Home", href: "/" }, { label: TITLE }]}
              className="mb-4"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              How I work
            </p>
            <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight md:text-4xl">
              {TITLE}
            </h1>
            <p className="mt-3 font-mono text-sm text-muted-foreground md:text-base">
              From scoped SaaS builds to AI automation pipelines — one builder
              owning the problem from first call to production.
            </p>
          </div>
        </MaxWidthWrapper>
        <DitherSplitter />
        <MaxWidthWrapper parentBorder="border-b">
          <div className="mx-auto max-w-3xl">
            {STEPS.map((step) => (
              <section
                key={step.number}
                className="border-b border-border p-5 last:border-b-0"
              >
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {step.number}
                </span>
                <h2 className="mt-1.5 font-mono text-lg font-semibold tracking-tight">
                  {step.title}
                </h2>
                <p className="mt-2.5 font-mono text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </section>
            ))}
          </div>
        </MaxWidthWrapper>
        <DitherSplitter />
        <MaxWidthWrapper parentBorder="border-b">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-2 border-b border-border p-5">
              <h2 className="font-mono text-base font-semibold tracking-tight text-foreground">
                Engagement formats
              </h2>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                Same delivery model — scoped to how much of the stack you need
                me in.
              </p>
            </div>
            {ENGAGEMENT_FORMATS.map((format, index) => (
              <section
                key={format.label}
                className="border-b border-border p-5 last:border-b-0"
              >
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 font-mono text-lg font-semibold tracking-tight">
                  {format.label}
                </h3>
                <p className="mt-2.5 font-mono text-sm leading-relaxed text-muted-foreground">
                  {format.detail}
                </p>
              </section>
            ))}
          </div>
        </MaxWidthWrapper>
        <DitherSplitter />
        <MaxWidthWrapper parentBorder="border-none">
          <div className="mx-auto max-w-3xl p-5">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-blue-300 transition-colors hover:text-blue-200"
            >
              Tell me what you&apos;re building
              <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </MaxWidthWrapper>
      </article>
    </>
  );
}
