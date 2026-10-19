import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import Quote from "@/components/ui/quote";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/mdx";
import { caseStudySchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const instant = false;

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: "Case Study Not Found — Mushood Hanif" };
  }

  return createMetadata({
    title: `${caseStudy.title} — Technical Case Study | Mushood Hanif`,
    description: caseStudy.description,
    path: `/work/${caseStudy.slug}`,
    type: "article",
    publishedTime: caseStudy.date,
    tags: caseStudy.tags,
  });
}

const CaseStudyPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <JsonLd data={caseStudySchema(caseStudy)} />
      <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-start justify-start gap-10 pt-28 pb-20">
        <div className="flex w-full flex-col items-start justify-center gap-6">
          <Link
            className="flex items-center justify-start gap-2 font-semibold text-primary text-xs hover:underline"
            href="/work"
          >
            <ArrowLeft className="size-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-medium text-primary text-xs uppercase tracking-wider">
              {caseStudy.type}
            </span>
            <span className="rounded-full border border-border bg-muted/60 px-3.5 py-1 font-mono text-muted-foreground text-xs">
              {caseStudy.clientCompany}
            </span>
            {caseStudy.role && (
              <span className="rounded-full border border-border bg-card/80 px-3.5 py-1 text-muted-foreground text-xs">
                <span className="font-semibold text-foreground">Role:</span> {caseStudy.role}
              </span>
            )}
          </div>

          <h1 className="font-bold font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
            {caseStudy.title}
          </h1>

          <Quote text={caseStudy.description} />

          {caseStudy.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {caseStudy.tags.map((tag) => (
                <span
                  className="rounded-md border border-border/80 bg-muted/50 px-2.5 py-1 font-medium text-muted-foreground text-xs"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex w-full flex-wrap items-center justify-between gap-4 border-border/50 border-t pt-5 text-muted-foreground text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              <span>{caseStudy.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="size-4 text-primary" />
              <span>{caseStudy.author}</span>
            </div>
          </div>
        </div>

        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {caseStudy.metrics.map((m) => (
              <div
                className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs"
                key={`${m.label}-${m.value}`}
              >
                <span className="font-bold font-heading text-3xl text-primary">{m.value}</span>
                <span className="font-semibold text-foreground text-sm">{m.label}</span>
                {m.subtext && <span className="text-muted-foreground text-xs">{m.subtext}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="blog-prose w-full">
          <MarkdownRenderer content={caseStudy.content} />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default CaseStudyPage;
