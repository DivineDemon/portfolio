import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Quote from "@/components/ui/quote";
import SectionBadge from "@/components/ui/section-badge";
import { type CaseStudy, getAllCaseStudies } from "@/lib/mdx";

const WorkPage = () => {
  const caseStudies = getAllCaseStudies();

  return (
    <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-center justify-start gap-10 pt-28 pb-20">
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="portfolio & systems" />
        <h1 className="font-bold font-heading text-6xl md:text-7xl">Engineering Archive.</h1>
        <Quote text="A comprehensive catalog of production AI microservices, multi-agent LLM systems, fine-tuning frameworks, and physical AI evaluation suites built across my career." />
      </div>

      <div className="relative flex w-full flex-col gap-8">
        {caseStudies.map((cs: CaseStudy) => (
          <Link
            className="group relative flex w-full flex-col justify-between gap-5 rounded-3xl border border-border/80 bg-card/90 p-8 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl"
            key={cs.slug}
            to={`/work/${cs.slug}`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 font-medium text-primary text-xs uppercase tracking-wider">
                  {cs.type}
                </span>
                <span className="font-mono text-muted-foreground text-xs">{cs.clientCompany}</span>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="font-bold font-heading text-3xl text-foreground transition-colors group-hover:text-primary">
                  {cs.title}
                </h2>
                <p className="text-muted-foreground text-sm italic">{cs.description}</p>
              </div>
            </div>

            {cs.metrics && cs.metrics.length > 0 && (
              <div className="grid grid-cols-1 gap-4 border-border/50 border-t pt-5 sm:grid-cols-3">
                {cs.metrics.map((m) => (
                  <div className="flex flex-col gap-0.5" key={m.label}>
                    <span className="font-bold font-heading text-2xl text-primary">{m.value}</span>
                    <span className="font-semibold text-foreground text-xs">{m.label}</span>
                    {m.subtext && (
                      <span className="text-[11px] text-muted-foreground">{m.subtext}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-border/40 border-t pt-4 font-semibold text-primary text-xs">
              <span className="group-hover:underline">Read Full Case Study</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default WorkPage;
