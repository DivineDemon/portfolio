import Image from "next/image";
import Link from "next/link";
import GithubIcon from "@/assets/icons/github.svg";
import ProjectCard from "@/components/project-card";
import SectionHeader from "@/components/section-header";

interface ProjectSectionProps {
  projects: ProjectProps[];
  caseStudiesData: Array<{
    projectId: number;
    caseStudy: CaseStudyProps | null;
  }>;
}

const ProjectsSection = ({ projects, caseStudiesData }: ProjectSectionProps) => {
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
            className="flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 px-6 py-3 font-medium text-black"
          >
            View More on
            <Image src={GithubIcon} alt="Github" className="size-6" />
          </Link>
        </div>
        <div className="mt-10 flex flex-col gap-20 md:mt-20">
          {projects.map((project, idx) => {
            const caseStudyData = caseStudiesData.find((cs) => cs.projectId === project.id)?.caseStudy;
            return <ProjectCard key={idx} project={project} id={idx} caseStudyData={caseStudyData} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
