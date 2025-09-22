import Image from "next/image";
import Link from "next/link";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import Github from "@/assets/icons/git.svg";
import Card from "@/components/card";
import SectionHeader from "@/components/section-header";

interface ProjectSectionProps {
  projects: ProjectProps[];
}

const ProjectsSection = ({ projects }: ProjectSectionProps) => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real-world results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences."
        />
        <div className="mt-6 flex w-full items-center justify-center">
          <Link
            href="https://github.com/DivineDemon"
            className="flex gap-1 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 px-6 py-2 font-medium text-gray-950"
          >
            View More on <Github className="size-6" />
          </Link>
        </div>
        <div className="mt-10 flex flex-col gap-20 md:mt-20">
          {projects.map((project, idx) => (
            <Card
              key={idx}
              className="sticky px-8 pt-8 pb-0 md:px-10 md:pt-12 lg:px-20 lg:pt-16"
              style={{
                top: `calc(64px + ${idx * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="inline-flex gap-2 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text font-bold text-sm text-transparent uppercase tracking-widest">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.start_year}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl md:mt-5 md:text-4xl">{project.project_name}</h3>
                  <hr className="mt-4 border-white/5 border-t-2 md:mt-5" />
                  <ul className="mt-4 flex flex-col gap-4 md:mt-5">
                    {project.features.split(",").map((result, id) => (
                      <li key={id} className="flex gap-2 text-sm text-white/50 md:text-base">
                        <CheckCircleIcon className="size-5 shrink-0 md:size-6" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${project.link}`}
                    target="_blank"
                    className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-950 md:w-auto"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </div>
                <div className="relative">
                  <Image
                    src={`${project.image}`}
                    alt={project.project_name}
                    width={500}
                    height={500}
                    className="mb:-mb-0 -mb-4 mt-8 rounded-t-2xl lg:absolute lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
