"use client";

import { useState } from "react";
import { type CaseStudy, CaseStudyModal } from "@/components/case-study-modal";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
	const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
		null,
	);

	return (
		<section id="case-studies" className="scroll-mt-20">
			<div className="flex min-h-0 flex-col gap-y-8">
				<div className="flex flex-col gap-y-4 items-center justify-center">
					<div className="flex items-center w-full">
						<div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent" />
						<div className="border bg-primary/10 border-primary/20 text-primary z-10 rounded-full px-4 py-1">
							<span className="text-xs font-semibold uppercase tracking-wider">
								Enterprise Case Studies
							</span>
						</div>
						<div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-transparent" />
					</div>
					<div className="flex flex-col gap-y-2 items-center justify-center text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Proven Business Impact & AI Systems
						</h2>
						<p className="text-muted-foreground max-w-xl md:text-base text-balance">
							Click any case study below to open the complete technical
							architecture and ROI breakdown.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
					{DATA.projects.map((project, id) => {
						const caseStudyItem: CaseStudy = {
							id: project.id,
							title: project.title,
							href: project.href,
							githubUrl:
								"githubUrl" in project
									? (project.githubUrl as string)
									: undefined,
							websiteUrl:
								"websiteUrl" in project
									? (project.websiteUrl as string)
									: undefined,
							dates: project.dates,
							impact:
								"impact" in project ? (project.impact as string) : undefined,
							description: project.description,
							problem:
								"problem" in project ? (project.problem as string) : undefined,
							architecture:
								"architecture" in project
									? (project.architecture as string)
									: undefined,
							keyFeatures:
								"keyFeatures" in project
									? (project.keyFeatures as readonly string[])
									: undefined,
							technologies: project.technologies,
						};

						return (
							<BlurFade
								key={project.title}
								delay={BLUR_FADE_DELAY * 12 + id * 0.05}
								className="h-full"
							>
								<ProjectCard
									githubUrl={caseStudyItem.githubUrl}
									websiteUrl={caseStudyItem.websiteUrl}
									title={project.title}
									description={project.description}
									dates={project.dates}
									impact={caseStudyItem.impact}
									tags={project.technologies}
									onOpenModal={() => setSelectedCaseStudy(caseStudyItem)}
								/>
							</BlurFade>
						);
					})}
				</div>
			</div>

			{/* Case Study Modal */}
			<CaseStudyModal
				caseStudy={selectedCaseStudy}
				isOpen={!!selectedCaseStudy}
				onClose={() => setSelectedCaseStudy(null)}
			/>
		</section>
	);
}
