import Image from "next/image";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { techStack } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

const Skills = () => {
  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden p-5">
        <Marquee>
          {techStack.map((skill) => (
            <Image
              width={50}
              height={50}
              key={skill.name}
              alt={skill.name}
              src={skill.image}
              className={cn("size-10 mx-2.5", {
                "invert dark:invert-0": skill.invert,
                "invert-0 dark:invert": skill.name === "Next.js",
              })}
            />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
      </div>
    </MaxWidthWrapper>
  );
};

export default Skills;
