import type { LucideIcon } from "lucide-react";
import { Bot, Gauge, Layers, Rocket } from "lucide-react";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { services } from "@/lib/constants";
import DitherSplitter from "../global/dither-splitter";

const serviceIcons: Record<string, LucideIcon> = {
  Layers,
  Bot,
  Gauge,
  Rocket,
};

const Services = () => {
  return (
    <>
      <MaxWidthWrapper parentBorder="border-b">
        <div
          id="services"
          className="w-full flex flex-col items-center justify-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight p-5 text-left w-full border-b font-mono">
            Services
          </h2>
          {services.slice(0, 2).map((service, index) => {
            const Icon = service.icon ? serviceIcons[service.icon] : null;
            return (
              <article
                key={service.id}
                className="flex flex-col p-5 border-b last:border-b-0"
              >
                <div className="w-full flex items-center justify-center gap-5">
                  <div className="size-[45px] p-2 bg-muted rounded-lg shrink-0 flex items-center justify-center">
                    {Icon ? (
                      <Icon className="size-full text-foreground" />
                    ) : null}
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="w-full text-left font-mono text-xs text-muted-foreground tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="w-full text-left mt-1.5 text-lg font-semibold tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {service.description}&nbsp;This includes:
                </p>
                <ul className="mt-4 flex flex-col gap-1.5 list-disc list-inside">
                  {service.includes.map((item) => (
                    <li key={item} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </MaxWidthWrapper>
      <DitherSplitter />
      <MaxWidthWrapper parentBorder="border-b">
        <div className="w-full flex flex-col items-center justify-center">
          {services.slice(2, 4).map((service) => {
            const Icon = service.icon ? serviceIcons[service.icon] : null;

            return (
              <article
                key={service.id}
                className="flex flex-col p-5 border-b last:border-b-0"
              >
                <div className="w-full flex items-center justify-center gap-5">
                  <div className="size-[45px] p-2 bg-muted rounded-lg shrink-0 flex items-center justify-center">
                    {Icon ? (
                      <Icon className="size-full text-foreground" />
                    ) : null}
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="w-full text-left font-mono text-xs text-muted-foreground tabular-nums">
                      {String(service.id).padStart(2, "0")}
                    </span>
                    <h3 className="w-full text-left mt-1.5 text-lg font-semibold tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {service.description}&nbsp;This includes:
                </p>
                <ul className="mt-4 flex flex-col gap-1.5 list-disc list-inside">
                  {service.includes.map((item) => (
                    <li key={item} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Services;
