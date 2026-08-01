import { useEffect, useState } from "react";
import LogoDark from "@/assets/img/logo-dark.svg";
import LogoLight from "@/assets/img/logo-light.svg";
import { TRAJECTORY_DATA } from "@/lib/constants";
import MaxWidthWrapper from "../max-width-wrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import SectionBadge from "../ui/section-badge";

const Trajectory = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

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
      className="flex min-h-screen w-full flex-col items-center justify-center gap-10"
      id="experience"
    >
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="experience & education" />
        <h2 className="w-full text-left font-bold text-7xl">The Trajectory.</h2>
      </div>

      <Accordion className="w-full border-dashed" collapsible defaultValue="haga" type="single">
        {TRAJECTORY_DATA.map((item) => {
          const logoSrc = item.logo === "haga" ? (isDark ? LogoDark : LogoLight) : item.logo;

          return (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="w-full">
                <div className="flex w-full items-center gap-4 text-left">
                  <img
                    alt={item.company}
                    className="size-10 shrink-0 rounded-xl border bg-background object-contain shadow-xs"
                    src={logoSrc}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 pr-2">
                      <h3 className="font-semibold text-base text-foreground md:text-lg">
                        {item.role}
                      </h3>
                      <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary text-xs">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {item.company} &bull; {item.location}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 pr-2 pl-14">
                  <p className="text-foreground text-sm leading-relaxed">{item.description}</p>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    {item.type}
                  </p>
                  <ul className="flex flex-col gap-2 text-muted-foreground text-sm">
                    {item.achievements.map((ach) => (
                      <li className="flex items-start gap-2.5" key={ach}>
                        <div className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.skills.map((skill) => (
                      <span
                        className="rounded-md border border-border/80 bg-muted/50 px-2.5 py-1 font-medium text-muted-foreground text-xs"
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
