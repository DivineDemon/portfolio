import { ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import Quote from "@/components/ui/quote";
import SectionBadge from "@/components/ui/section-badge";
import { type CaseStudy, getAllCaseStudies } from "@/lib/mdx";

const WorkPage = () => {
  const caseStudies = getAllCaseStudies();

  return (
    <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-center justify-start gap-10 pt-28 pb-20">
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="portfolio & systems" />
        <h1 className="mb-2.5 font-bold font-heading text-4xl sm:text-6xl md:text-7xl">
          Engineering Archive.
        </h1>
        <Quote text="A comprehensive catalog of production AI microservices, multi-agent LLM systems, fine-tuning frameworks, and physical AI evaluation suites built across my career." />
      </div>

      <div className="relative flex w-full flex-col gap-8">
        {caseStudies.map((cs: CaseStudy) => (
          <Link
            className="flex w-full flex-col items-center justify-center gap-5 rounded-2xl border border-border/80 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl"
            key={cs.slug}
            to={`/work/${cs.slug}`}
          >
            <div className="flex w-full items-center justify-center gap-2.5">
              <Badge variant="outline">{cs.type}</Badge>
              <Badge>{cs.clientCompany}</Badge>
              <ArrowUpRight className="ml-auto size-4.5 text-primary" />
            </div>
            <h2 className="w-full text-left font-bold font-heading text-2xl text-foreground transition-colors group-hover:text-primary sm:text-3xl">
              {cs.title}
            </h2>
            <div className="line-clamp-3 text-muted-foreground text-xs leading-relaxed sm:text-sm [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_p]:inline [&_strong]:font-semibold [&_strong]:text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{cs.description}</ReactMarkdown>
            </div>
            {cs.tags && cs.tags.length > 0 && (
              <div className="flex w-full flex-wrap items-start justify-start gap-2">
                {cs.tags.map((tag) => (
                  <span
                    className="rounded-md border border-border/70 bg-muted/40 px-2.5 py-1 font-medium text-[11px] text-muted-foreground"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {cs.metrics && cs.metrics.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-4 border-border/50 border-t pt-5 sm:grid-cols-3">
                {cs.metrics.map((m) => (
                  <div className="flex flex-col gap-1" key={`${m.label}-${m.value}`}>
                    <span className="font-bold font-heading text-2xl text-primary">{m.value}</span>
                    <span className="font-semibold text-foreground text-xs">{m.label}</span>
                    {m.subtext && (
                      <span className="text-[11px] text-muted-foreground">{m.subtext}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default WorkPage;
