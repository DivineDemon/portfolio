import { useState } from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import Quote from "../ui/quote";
import SectionBadge from "../ui/section-badge";
import { type Skill, STACK_CATEGORIES } from "./constants";

const Stack = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Technologies" },
    ...STACK_CATEGORIES.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  const displayedSkills: Skill[] =
    activeCategory === "all"
      ? STACK_CATEGORIES.flatMap((cat) => cat.skills)
      : STACK_CATEGORIES.find((cat) => cat.id === activeCategory)?.skills || [];

  return (
    <MaxWidthWrapper
      className="flex min-h-screen w-full flex-col items-center justify-center gap-10 py-16"
      id="stack"
    >
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="stack" />
        <h2 className="mb-5 w-full text-left font-bold text-7xl">What I run in production.</h2>
        <Quote text="Profiled under load. Not just imported." />
      </div>

      <div className="flex w-full flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            className={`rounded-full border px-4 py-2 font-medium text-xs transition-all ${
              activeCategory === cat.id
                ? "border-primary bg-primary text-primary-foreground shadow-xs"
                : "border-border/60 bg-card/60 text-muted-foreground hover:border-primary/40 hover:bg-card hover:text-foreground"
            }`}
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            type="button"
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {displayedSkills.map((skill) => (
          <div
            className="group relative flex flex-col justify-start gap-3 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg"
            key={`${skill.name}-${skill.category}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background/90 p-2 shadow-xs transition-colors group-hover:border-primary/40">
                <img
                  alt={skill.name}
                  className="size-7 object-contain transition-transform duration-300 group-hover:scale-110"
                  src={skill.icon}
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <h4 className="truncate font-bold font-heading text-base text-foreground transition-colors group-hover:text-primary">
                  {skill.name}
                </h4>
                <span className="font-medium font-mono text-[10px] text-primary uppercase tracking-wider">
                  {skill.category}
                </span>
              </div>
            </div>

            <p className="pt-1 text-muted-foreground text-xs leading-relaxed">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Stack;
