import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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
          <h2 className="font-bold font-heading text-5xl md:text-6xl">Systems in Production.</h2>
          <Link
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary text-sm hover:underline"
            to="/work"
          >
            <span>View All Projects</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {topProjects.map((project) => (
          <Link
            className="group relative flex flex-col justify-between gap-4 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg"
            key={project.slug}
            to={`/work/${project.slug}`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary text-xs uppercase tracking-wider">
                  {project.type}
                </span>
                <span className="font-mono text-muted-foreground text-xs">
                  {project.clientCompany}
                </span>
              </div>

              <h3 className="font-bold font-heading text-foreground text-xl transition-colors group-hover:text-primary">
                {project.title}
              </h3>

              <p className="line-clamp-3 text-muted-foreground text-xs leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-border/50 border-t pt-4 font-medium text-primary text-xs">
              <span className="group-hover:underline">Read Case Study</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default WorkTeaser;
