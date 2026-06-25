import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import type { projects } from "@/generated/prisma/client";
import { server } from "@/lib/elysia/server";
import { cn } from "@/lib/utils";

function parseProjects(res: unknown): projects[] {
  if (Array.isArray(res)) return res;
  const data = (res as { data?: projects[] })?.data;
  return data ?? [];
}

function ProjectCard({
  project,
  isHero = false,
}: {
  project: projects;
  isHero?: boolean;
}) {
  const outcome = project.cardOutcome || project.headlineResult;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex col-span-1 h-full shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        "transition-all duration-200 hover:border-border/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isHero && "md:col-span-2",
      )}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={
            isHero
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {project.industry && (
          <span className="w-fit rounded-md border border-primary/25 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-medium text-primary">
            {project.industry}
          </span>
        )}
        <h3 className="font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-foreground/90">
          {project.title}
        </h3>
        <p className="line-clamp-2 font-mono text-sm leading-relaxed text-muted-foreground">
          {outcome}
        </p>
      </div>
    </Link>
  );
}

const Projects = async () => {
  const [featuredRes, otherRes] = await Promise.all([
    server.project.get({ query: { featured: "true" } }),
    server.project.get({ query: { featured: "false" } }),
  ]);

  const featuredProjects = parseProjects(featuredRes.data);
  const otherProjects = parseProjects(otherRes.data);

  return (
    <section id="projects" className="scroll-mt-20">
      <MaxWidthWrapper parentBorder="border-b">
        <h2 className="w-full border-b p-5 text-left font-mono text-2xl font-semibold tracking-tight">
          Projects
        </h2>
        <div className="relative grid w-full grid-cols-1 items-stretch justify-center gap-5 p-5 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHero={index === 0}
            />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <>
            <h3 className="w-full border-t border-b p-5 text-left font-mono text-lg font-semibold tracking-tight text-muted-foreground">
              Other Projects
            </h3>
            <div className="relative grid w-full grid-cols-1 items-stretch justify-center gap-5 p-5 md:grid-cols-2">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </MaxWidthWrapper>
    </section>
  );
};

export default Projects;
