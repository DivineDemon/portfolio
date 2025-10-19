"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Card from "./card";
import CaseStudy from "./case-study";

interface ProjectCardProps {
  project: ProjectProps;
  id: number;
}

const ProjectCard = ({ project, id }: ProjectCardProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Card
        className="sticky px-8 pt-8 pb-0 md:px-10 md:pt-12 lg:px-20 lg:pt-16"
        style={{
          top: `calc(64px + ${id * 40}px)`,
        }}
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="lg:pb-16">
            <div className="inline-flex gap-2 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text font-bold text-sm text-transparent uppercase tracking-widest">
              <span>{project.companies.name}</span>
              <span>&bull;</span>
              <span>{project.start_year}</span>
            </div>
            <h3 className="mt-2 font-serif text-2xl md:mt-5 md:text-4xl">{project.project_name}</h3>
            <hr className="mt-4 border-white/5 border-t-2 md:mt-5" />
            <ul className="mt-4 flex flex-col gap-4 md:mt-5">
              {JSON.parse(project.features).map((result: string, id: number) => (
                <li key={id} className="flex gap-2 text-sm text-white/50 md:text-base">
                  <CircleCheck className="size-5 shrink-0 md:size-6" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-950 md:w-auto"
            >
              View Case Study
            </button>
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
      <CaseStudy open={open} project={project} onOpenChange={setOpen} />
    </>
  );
};

export default ProjectCard;
