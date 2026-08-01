import { useEffect, useState } from "react";
import LogoDark from "@/assets/img/logo-dark.svg?url";
import LogoLight from "@/assets/img/logo-light.svg?url";
import { TRAJECTORY_DATA } from "@/lib/constants";
import { getImageSrc } from "@/lib/utils";
import MaxWidthWrapper from "../max-width-wrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import SectionBadge from "../ui/section-badge";

const Trajectory = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <MaxWidthWrapper
      className="flex w-full flex-col items-center justify-center gap-10 pt-16"
      id="trajectory"
    >
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="experience & focus" />
        <h2 className="font-bold font-heading text-3xl tracking-tight sm:text-5xl">
          Trajectory & Impact.
        </h2>
      </div>

      <Accordion className="w-full border-dashed" collapsible defaultValue="haga" type="single">
        {TRAJECTORY_DATA.map((item) => {
          const logoObj = item.id === "haga" ? (isDark ? LogoDark : LogoLight) : item.logo;
          const logoSrc = getImageSrc(logoObj);

          return (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="w-full">
                <div className="flex w-full items-center gap-3 text-left sm:gap-4">
                  <img
                    alt={item.company}
                    className="size-8 shrink-0 rounded-lg object-contain sm:size-10"
                    src={logoSrc}
                    suppressHydrationWarning
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-bold font-heading text-foreground text-sm sm:text-base">
                      {item.role}
                    </span>
                    <span className="truncate font-medium text-muted-foreground text-xs sm:text-sm">
                      {item.company} &bull;&nbsp;
                      <span className="text-primary text-xs">{item.period}</span>
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <div className="flex flex-col gap-4 pl-11 sm:pl-14">
                  <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                    {item.description}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {item.achievements.map((h: string) => (
                      <li
                        className="flex items-start gap-2 text-foreground/90 text-xs sm:text-sm"
                        key={`${item.id}-${h.slice(0, 20)}`}
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {item.skills.map((skill) => (
                      <span
                        className="rounded-md border border-border/80 bg-muted/60 px-2 py-0.5 font-medium text-[10px] text-muted-foreground sm:text-xs"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </MaxWidthWrapper>
  );
};

export default Trajectory;
