import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getPublishedLeadMagnets } from "@/lib/cms/get-lead-magnets";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resources | Mushood Hanif",
  description:
    "Free tools and guides for founders and executives — technical audit checklist and executive ROI calculator for automation.",
  alternates: { canonical: `${SITE_URL}/resources` },
};

export default async function ResourcesIndexPage() {
  const magnets = await getPublishedLeadMagnets();

  return (
    <MaxWidthWrapper parentBorder="border-none">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <header className="mb-10 space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Free resources
          </p>
          <h1 className="font-mono text-3xl font-semibold tracking-tight md:text-4xl">
            Resources
          </h1>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            Practical tools for founders and executives evaluating technical
            risk, automation ROI, and when to bring in fractional leadership.
          </p>
        </header>

        {magnets.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            New resources coming soon.
          </p>
        ) : (
          <ul className="space-y-6">
            {magnets.map((magnet) => (
              <li key={magnet.slug}>
                <Link
                  href={`/resources/${magnet.slug}`}
                  className="block rounded-lg border border-border p-6 transition-colors hover:border-primary/40"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {magnet.magnetType === "calculator"
                      ? "Calculator"
                      : "PDF guide"}
                  </p>
                  <h2 className="mt-2 font-mono text-xl font-semibold">
                    {magnet.title}
                  </h2>
                  <CaseStudyMarkdown content={magnet.description} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
