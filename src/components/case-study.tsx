import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import NeonIcon from "@/assets/icons/neon.svg";
import NextIcon from "@/assets/icons/nextjs.svg";
import PostgreSQLIcon from "@/assets/icons/postgresql.svg";
import PrismaIcon from "@/assets/icons/prisma.svg";
import TailwindIcon from "@/assets/icons/tailwindcss.svg";
import TypeScriptIcon from "@/assets/icons/typescript.svg";
import CoeusHeader from "@/assets/images/coeus/coeus.png";
import CoeusOne from "@/assets/images/coeus/coeus2.png";
import CoeusTwo from "@/assets/images/coeus/coeus3.png";
import CoeusThree from "@/assets/images/coeus/coeus4.png";
import grainImage from "@/assets/images/grain.jpg";
import { Drawer, DrawerContent } from "./ui/drawer";

interface CaseStudyProps {
  open: boolean;
  project: ProjectProps;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const CaseStudy = ({ open, project, onOpenChange }: CaseStudyProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="!h-[95vh] !max-h-[95vh] !rounded-t-3xl !border-none !bg-gray-800 !outline-none !ring-0">
        <div className="-z-10 absolute inset-0 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }} />
        <div className="container relative z-10 flex h-full flex-col items-start justify-start gap-5 overflow-y-auto p-0 md:gap-10 md:p-5 lg:p-0">
          <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center gap-2.5 md:gap-5">
            <p className="w-full bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-left font-semibold text-transparent uppercase tracking-widest">
              {project.project_name}
            </p>
            <h2 className="text-left font-serif text-3xl md:text-5xl">
              Modernizing a Subscription Management Platform
            </h2>
            <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">
              Complete overhaul of a subscription management platform to improve usability, streamline workflows, and
              enhance overall user experience. The goal was to create a more intuitive and efficient platform for both
              administrators and end-users.
            </p>
          </div>
          <Image src={CoeusHeader} alt="Coeus Header" className="w-full rounded-3xl shadow" />
          <div className="mx-auto grid max-w-screen-md grid-cols-1 items-start justify-start gap-5 md:grid-cols-3 md:gap-10">
            <div className="col-span-1 hidden w-full flex-col items-start justify-start gap-5 md:flex">
              <div className="flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Headquarters</span>
                <span className="w-full text-left font-light text-[20px] leading-[20px]">Ottawa, Ontario, Canada</span>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Founded</span>
                <span className="w-full text-left font-light text-[20px] leading-[20px]">2006</span>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Industry</span>
                <span className="w-full text-left font-light text-[20px] leading-[20px]">Software Development</span>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Revenue</span>
                <span className="w-full text-left font-light text-[20px] leading-[20px]">$1.578 billion (2019)</span>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Company Size</span>
                <span className="w-full text-left font-light text-[20px] leading-[20px]">5,000+</span>
              </div>
            </div>
            <div className="col-span-1 flex w-full flex-col items-start justify-start gap-5 md:col-span-2">
              <div className="flex w-full flex-col items-center justify-center gap-2.5">
                <h2 className="w-full text-left font-serif text-xl md:text-4xl">Challenge</h2>
                <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">
                  The original platform had an outdated interface that was difficult to navigate, causing frustration
                  among users. The complex workflows and lack of clear visual hierarchy made it challenging for users to
                  manage their subscriptions effectively. Our task was to simplify the user journey, reduce cognitive
                  load, and incorporate modern design principles to make the platform more user-friendly and visually
                  appealing.
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2.5">
                <h2 className="w-full text-left font-serif text-xl md:text-4xl">Results</h2>
                <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">
                  Post-redesign, user engagement significantly increased with a 25% reduction in task completion time
                  and a 30% decrease in user error rates. User satisfaction ratings improved from 3.2 to 4.6 stars. The
                  streamlined workflows and modern interface resulted in a 20% increase in new subscriptions within the
                  first six months of the launch.
                </p>
              </div>
            </div>
            <div className="col-span-1 grid grid-cols-3 items-center justify-center gap-2.5 md:col-span-3">
              <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">35%</span>
                <span className="w-full text-left font-light text-[12px] leading-[12px]">
                  Improved Onboarding Process.
                </span>
              </div>
              <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">25%</span>
                <span className="w-full text-left font-light text-[12px] leading-[12px]">
                  Increase in User Retention.
                </span>
              </div>
              <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
                <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">84%</span>
                <span className="w-full text-left font-light text-[12px] leading-[12px]">
                  Increase in time spent on website.
                </span>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2.5 md:gap-5">
            <Image
              src={CoeusOne}
              alt="Coeus One"
              className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
            />
            <Image
              src={CoeusTwo}
              alt="Coeus Two"
              className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
            />
          </div>
          <div className="mx-auto flex w-full max-w-screen-md flex-col items-start justify-start">
            <h2 className="w-full text-left font-serif text-xl md:text-4xl">Process</h2>
            <p className="mt-2.5 w-full text-left text-white/60 md:mt-5 md:text-lg lg:text-xl">
              <strong>Research & Analysis:</strong> We conducted user interviews, surveys, and analyzed in-app analytics
              to understand the pain points and user needs. We also studied competitor apps and industry trends to
              gather insights
            </p>
            <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
              <strong>Information Architecture:</strong> Based on the research findings, we restructured the app's
              navigation and content, prioritizing features and information according to user needs.
            </p>
            <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
              <strong>Wireframing & Prototyping:</strong> We designed low-fidelity wireframes to visualize the new
              layout and navigation, iteratively refining them based on user feedback. Afterward, we built a
              high-fidelity, interactive prototype to test the design.
            </p>
            <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
              <strong>Usability Testing:</strong> We conducted usability tests with a diverse group of users to validate
              the design and identify areas for improvement. Based on the feedback, we made necessary adjustments to the
              design.
            </p>
            <p className="mt-5 w-full text-left text-white/60 md:mt-10 md:text-lg lg:text-xl">
              <strong>Visual Design & Style Guide:</strong> We developed a cohesive visual language, including color
              schemes, typography, and iconography, ensuring consistency throughout the app. We also created a style
              guide to maintain design consistency in future updates.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-screen-md flex-col items-start justify-start">
            <h2 className="mb-5 w-full text-left font-serif text-xl md:text-4xl">Stack</h2>
            <div className="flex w-full items-center justify-around rounded-lg bg-black/50 p-5">
              <Image src={TypeScriptIcon} alt="TypeScript" width={24} height={24} className="aspect-square w-12" />
              <Image src={NextIcon} alt="Next.js" width={24} height={24} className="aspect-square w-12" />
              <Image src={TailwindIcon} alt="Tailwind CSS" width={24} height={24} className="aspect-square w-12" />
              <Image src={PrismaIcon} alt="Prisma" width={24} height={24} className="aspect-square w-12" />
              <Image src={NeonIcon} alt="Neon" width={24} height={24} className="aspect-square w-12" />
              <Image src={PostgreSQLIcon} alt="PostgreSQL" width={24} height={24} className="aspect-square w-12" />
            </div>
          </div>
          <Image src={CoeusThree} alt="Coeus Three" className="w-full rounded-3xl shadow" />
          <div className="mx-auto flex w-full max-w-screen-md flex-col items-start justify-start gap-5">
            <p className="w-full text-left font-[450] text-[18px] text-white/60 leading-[24px] lg:text-[24px] lg:leading-[30px]">
              "With our new visual branding and language in place, the new Shopify brand clearly captures the essence of
              our current and target customer base, our employees, and our values.With our new visual branding and
              language in place, the new Shopify brand clearly captures the essence of our current and target customer
              base, our employees, and our values."
            </p>
            <div className="flex w-full items-center justify-center gap-5">
              <Image
                src="https://ui.shadcn.com/avatars/01.png"
                alt="User"
                width={40}
                height={40}
                className="size-13 rounded-full"
              />
              <div className="flex flex-1 flex-col items-center justify-center gap-3">
                <span className="w-full font-light text-[18px] leading-[18px]">Tobias Lütke</span>
                <span className="w-full font-light text-[18px] leading-[18px]">CEO, Co-founder | Shopify</span>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2.5 md:gap-5">
            <Image
              src={CoeusOne}
              alt="Coeus One"
              className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
            />
            <Image
              src={CoeusTwo}
              alt="Coeus Two"
              className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
            />
          </div>
          <div className="mx-auto mb-5 flex w-full max-w-screen-md flex-col items-start justify-start gap-2.5 md:mb-0 md:gap-5 lg:mb-5">
            <h2 className="w-full text-left font-serif text-xl md:text-4xl">Conclusion</h2>
            <p className="w-full text-left text-white/60 md:text-lg lg:text-xl">
              The modernization of the subscription management platform successfully addressed the core usability issues
              and improved the overall user experience. By focusing on simplifying the interface and optimizing
              workflows, we were able to create a more efficient and enjoyable platform for users. The significant
              improvements in user engagement, satisfaction, and subscription rates underscore the importance of
              user-centric design in achieving business success.
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CaseStudy;
