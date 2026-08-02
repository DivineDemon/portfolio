import { ArrowRight, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllCaseStudies } from "@/lib/mdx";
import MaxWidthWrapper from "../max-width-wrapper";
import SectionBadge from "../ui/section-badge";

const WorkTeaser = () => {
  const allCaseStudies = getAllCaseStudies();
  const topProjects = allCaseStudies.slice(0, 2);

  return (
    <MaxWidthWrapper
      className="flex w-full flex-col items-center justify-center gap-10 py-16"
      id="work"
    >
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <SectionBadge label="featured work" />
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-bold font-heading text-4xl tracking-tight sm:text-5xl md:text-6xl">
            Systems in Production.
          </h2>
          <a
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary text-sm hover:underline"
            href="/work"
          >
            <span>View All Projects</span>
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {topProjects.map((project) => (
          <a
            className="group relative flex flex-col justify-between gap-6 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg sm:p-7"
            href={`/work/${project.slug}`}
            key={project.slug}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary text-xs uppercase tracking-wider">
                  {project.type}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-muted-foreground text-xs">
                    {project.clientCompany}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <h3 className="font-bold font-heading text-foreground text-xl transition-colors group-hover:text-primary sm:text-2xl">
                  {project.title}
                </h3>

                <div className="line-clamp-3 text-muted-foreground text-xs leading-relaxed sm:text-sm [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_p]:inline [&_strong]:font-semibold [&_strong]:text-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {project.description ?? ""}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default WorkTeaser;
