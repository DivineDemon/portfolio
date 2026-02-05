import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import grainImage from "@/assets/images/grain.jpg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

interface CaseStudyPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const id = Number(projectId);
  if (Number.isNaN(id)) return { title: "Case Study" };

  const caseStudy = await api.caseStudy.getCaseStudyByProjectId({ projectId: id });
  if (!caseStudy) return { title: "Case Study" };

  return {
    title: `${caseStudy.title} | ${caseStudy.projects.project_name}`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { projectId } = await params;

  const id = Number(projectId);
  if (Number.isNaN(id)) notFound();

  const caseStudyData = await api.caseStudy.getCaseStudyByProjectId({ projectId: id });
  if (!caseStudyData) notFound();

  const images = caseStudyData.images ? JSON.parse(caseStudyData.images) : [];
  const project = caseStudyData.projects;
  const company = project.companies;

  return (
    <div className="relative w-full py-32">
      <div className="absolute inset-0 -z-10 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }} />
      <div className="container relative z-10 flex min-h-full flex-col items-start justify-start gap-5 overflow-y-auto p-0 md:gap-10 md:p-5 lg:p-0">
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center gap-2.5 md:gap-5">
          <div className="flex w-full items-center justify-center gap-5">
            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                }),
              )}
            >
              <ChevronLeft />
            </Link>
            <p className="flex-1 bg-linear-to-r from-emerald-300 to-sky-400 bg-clip-text text-left font-semibold text-transparent uppercase tracking-widest">
              {project.project_name}
            </p>
          </div>
          <h2 className="text-left font-serif text-3xl md:text-5xl">{caseStudyData.title}</h2>
          <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">{caseStudyData.description}</p>
        </div>
        {images[0] && (
          <Image
            src={images[0]}
            alt={`${project.project_name} Header`}
            width={800}
            height={400}
            className="w-full rounded-3xl shadow"
          />
        )}
        <div className="mx-auto grid max-w-screen-md grid-cols-1 items-start justify-start gap-5 md:grid-cols-3 md:gap-10">
          <div className="col-span-1 hidden w-full flex-col items-start justify-start gap-5 md:flex">
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Headquarters</span>
              <span className="w-full text-left font-light text-[20px] leading-[20px]">{company.hq}</span>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Founded</span>
              <span className="w-full text-left font-light text-[20px] leading-[20px]">{company.founded}</span>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Industry</span>
              <span className="w-full text-left font-light text-[20px] leading-[20px]">{company.industry}</span>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Revenue</span>
              <span className="w-full text-left font-light text-[20px] leading-[20px]">{company.revenue}</span>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Company Size</span>
              <span className="w-full text-left font-light text-[20px] leading-[20px]">{company.size}</span>
            </div>
          </div>
          <div className="col-span-1 flex w-full flex-col items-start justify-start gap-5 md:col-span-2">
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <h2 className="w-full text-left font-serif text-xl md:text-4xl">Challenge</h2>
              <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">{caseStudyData.challenge}</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <h2 className="w-full text-left font-serif text-xl md:text-4xl">Results</h2>
              <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">{caseStudyData.results}</p>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-3 items-center justify-center gap-2.5 md:col-span-3">
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">
                {caseStudyData.onboarding_improved}%
              </span>
              <span className="w-full text-left font-light text-[12px] leading-[12px]">
                Improved Onboarding Process.
              </span>
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">
                {caseStudyData.retention_increase}%
              </span>
              <span className="w-full text-left font-light text-[12px] leading-[12px]">
                Increase in User Retention.
              </span>
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
              <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">
                {caseStudyData.time_spent_increase}%
              </span>
              <span className="w-full text-left font-light text-[12px] leading-[12px]">
                Increase in time spent on website.
              </span>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2.5 md:gap-5">
          {images[1] && (
            <Image
              src={images[1]}
              alt={`${project.project_name} Process Image 1`}
              width={400}
              height={400}
              className="aspect-square w-full rounded-3xl object-cover object-top-left shadow"
            />
          )}
          {images[2] && (
            <Image
              src={images[2]}
              alt={`${project.project_name} Process Image 2`}
              width={400}
              height={400}
              className="aspect-square w-full rounded-3xl object-cover object-top-left shadow"
            />
          )}
        </div>
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-start justify-start">
          <h2 className="w-full text-left font-serif text-xl md:text-4xl">Process</h2>
          <p className="mt-2.5 w-full text-left text-white/60 md:mt-5 md:text-lg lg:text-xl">
            <strong>Research & Analysis:</strong> {caseStudyData.research}
          </p>
          <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
            <strong>Information Architecture:</strong>&nbsp;
            {caseStudyData.architecture}
          </p>
          <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
            <strong>Wireframing & Prototyping:</strong>&nbsp;
            {caseStudyData.wireframing}
          </p>
          <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
            <strong>Usability Testing:</strong> {caseStudyData.testing}
          </p>
          <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
            <strong>Visual Design & Style Guide:</strong> {caseStudyData.design}
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-start justify-start">
          <h2 className="mb-5 w-full text-left font-serif text-xl md:text-4xl">Stack</h2>
          <div className="flex w-full items-center justify-around rounded-lg bg-black/50 p-5">
            {JSON.parse(caseStudyData.tech_stack_urls)?.map((url: string, idx: number) => (
              <Image key={idx} src={url} alt="stack" width={24} height={24} className="aspect-square w-12" />
            ))}
          </div>
        </div>
        {images[3] && (
          <Image
            src={images[3]}
            alt={`${project.project_name} Showcase`}
            width={800}
            height={400}
            className="w-full rounded-3xl shadow"
          />
        )}
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-start justify-start gap-5">
          <p className="w-full text-left font-[450] text-[18px] text-white/60 leading-[24px] lg:text-[24px] lg:leading-[30px]">
            &quot;{caseStudyData.ceo_statement}&quot;
          </p>
          <div className="flex w-full items-center justify-center gap-5">
            <div className="flex size-13 items-center justify-center rounded-full bg-gray-700">
              <span className="text-[18px] text-white leading-[18px]">{company.ceo_name.charAt(0)}</span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <span className="w-full font-light text-[18px] leading-[18px]">{company.ceo_name}</span>
              <span className="w-full font-light text-[18px] leading-[18px]">
                {company.ceo_title} | {company.name}
              </span>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2.5 md:gap-5">
          {images[4] && (
            <Image
              src={images[4]}
              alt={`${project.project_name} Final Image 1`}
              width={400}
              height={400}
              className="aspect-square w-full rounded-3xl object-cover object-top-left shadow"
            />
          )}
          {images[5] && (
            <Image
              src={images[5]}
              alt={`${project.project_name} Final Image 2`}
              width={400}
              height={400}
              className="aspect-square w-full rounded-3xl object-cover object-top-left shadow"
            />
          )}
        </div>
        <div className="mx-auto mb-5 flex w-full max-w-screen-md flex-col items-start justify-start gap-2.5 md:mb-0 md:gap-5 lg:mb-5">
          <h2 className="w-full text-left font-serif text-xl md:text-4xl">Conclusion</h2>
          <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">{caseStudyData.conclusion}</p>
        </div>
      </div>
    </div>
  );
}
