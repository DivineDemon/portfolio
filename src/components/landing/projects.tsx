import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import type { projects } from "@/generated/prisma/client";
import { server } from "@/lib/elysia/server";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: projects }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex min-w-[300px] max-w-[340px] shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        "transition-all duration-200 hover:border-border/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.industry && (
          <span className="absolute left-3 top-3 rounded-md border border-border/80 bg-background/90 px-2 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
            {project.industry}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-foreground/90">
          {project.title}
        </h3>
        <p className="line-clamp-2 font-mono text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>
        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

const Projects = async () => {
  const res = await server.project.get();
  const rawProjects = Array.isArray(res)
    ? res
    : (res as { data?: projects[] })?.data;
  const projects = rawProjects ?? [];

  return (
    <section id="projects" className="scroll-mt-20">
      <MaxWidthWrapper parentBorder="border-b">
        <h2 className="w-full border-b p-5 text-left font-mono text-2xl font-semibold tracking-tight">
          Projects
        </h2>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden p-5">
          <Marquee pauseOnHover>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Projects;
