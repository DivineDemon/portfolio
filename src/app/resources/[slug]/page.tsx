import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import {
  ExecutiveRoiCalculator,
  LeadMagnetCaptureForm,
} from "@/components/leads/lead-magnet-forms";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getPublishedLeadMagnetBySlug } from "@/lib/cms/get-lead-magnets";
import { SITE_URL } from "@/lib/constants";

async function getMagnet(slug: string) {
  return getPublishedLeadMagnetBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const magnet = await getMagnet(slug);
  if (!magnet) return { title: "Resource not found" };

  const title = magnet.seoTitle ?? magnet.title;
  const description = magnet.seoDescription ?? magnet.description;
  const canonical = `${SITE_URL}/resources/${slug}`;

  return {
    title,
    description,
    keywords: magnet.keywords?.length ? magnet.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Mushood Hanif",
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const magnet = await getMagnet(slug);

  if (!magnet) {
    notFound();
  }

  return (
    <MaxWidthWrapper parentBorder="border-none">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Link
          href="/resources"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to resources
        </Link>

        <header className="mb-8 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {magnet.magnetType === "calculator" ? "Calculator" : "PDF guide"}
          </p>
          <h1 className="font-mono text-3xl font-semibold tracking-tight md:text-4xl">
            {magnet.title}
          </h1>
          <CaseStudyMarkdown content={magnet.description} />
        </header>

        {magnet.magnetType === "calculator" ? (
          <ExecutiveRoiCalculator
            magnetSlug={magnet.slug}
            magnetTitle={magnet.title}
          />
        ) : (
          <LeadMagnetCaptureForm
            magnetSlug={magnet.slug}
            magnetTitle={magnet.title}
            pdfUrl={magnet.pdfUrl}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
}
