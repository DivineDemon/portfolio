import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bot, Gauge, Layers, Rocket } from "lucide-react";
import Link from "next/link";
import TrackedLink from "@/components/analytics/tracked-link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { ANALYTICS_EVENTS } from "@/lib/analytics/track";
import { getPublishedServicePages } from "@/lib/cms/get-published-service-pages";
import { services as fallbackServices } from "@/lib/constants";
import DitherSplitter from "../global/dither-splitter";

const serviceIcons: Record<string, LucideIcon> = {
  "services/product-engineering": Layers,
  "services/ai-automation": Bot,
  "services/technical-leadership": Gauge,
  "services/product-ownership": Rocket,
  Layers,
  Bot,
  Gauge,
  Rocket,
};

const fallbackIconByTitle: Record<string, LucideIcon> = {
  "Product Engineering": Layers,
  "AI & Automation Systems": Bot,
  "Technical Leadership": Gauge,
  "E2E Product Ownership": Rocket,
};

function ServiceCard({
  index,
  title,
  description,
  href,
  iconKey,
}: {
  index: number;
  title: string;
  description: string;
  href?: string;
  iconKey: string;
}) {
  const Icon = serviceIcons[iconKey] ?? fallbackIconByTitle[title] ?? Layers;

  const body = (
    <article className="flex flex-col p-5 border-b last:border-b-0">
      <div className="w-full flex items-center justify-center gap-5">
        <div className="size-[45px] p-2 bg-muted rounded-lg shrink-0 flex items-center justify-center">
          <Icon className="size-full text-foreground" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="w-full text-left font-mono text-xs text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="w-full text-left mt-1.5 text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </div>
      </div>
      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      {href && (
        <p className="mt-4 font-mono text-sm text-primary inline-flex items-center gap-1.5 group-hover:underline">
          Learn more
          <ArrowRight className="size-3.5" />
        </p>
      )}
    </article>
  );

  if (!href) {
    return body;
  }

  return (
    <TrackedLink
      href={href}
      eventName={ANALYTICS_EVENTS.CTA_CLICK}
      eventParams={{
        cta_label: title,
        cta_location: "services",
      }}
      className="block transition-colors hover:bg-muted/20"
    >
      {body}
    </TrackedLink>
  );
}

const Services = async () => {
  const cmsServices = await getPublishedServicePages();

  const items =
    cmsServices.length > 0
      ? cmsServices.map((page, index) => ({
          key: page.slug,
          index,
          title: page.title,
          description: page.excerpt?.trim() ?? page.title,
          href: `/${page.slug}`,
          iconKey: page.slug,
        }))
      : fallbackServices.map((service) => ({
          key: String(service.id),
          index: service.id - 1,
          title: service.title,
          description: `${service.description} This includes: ${service.includes.slice(0, 2).join("; ")}.`,
          href: undefined as string | undefined,
          iconKey: service.icon ?? service.title,
        }));

  const firstHalf = items.slice(0, 2);
  const secondHalf = items.slice(2);

  return (
    <>
      <MaxWidthWrapper parentBorder="border-b">
        <div
          id="services"
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="w-full border-b p-5">
            <h2 className="text-2xl font-semibold tracking-tight text-left font-mono">
              Services
            </h2>
            {cmsServices.length > 0 && (
              <p className="mt-2 font-mono text-sm text-muted-foreground">
                Explore each service area, or{" "}
                <Link href="/#contact" className="text-primary hover:underline">
                  book a call
                </Link>{" "}
                to discuss your situation.
              </p>
            )}
          </div>
          {firstHalf.map(({ key, ...item }) => (
            <ServiceCard key={key} {...item} />
          ))}
        </div>
      </MaxWidthWrapper>
      {secondHalf.length > 0 && (
        <>
          <DitherSplitter />
          <MaxWidthWrapper parentBorder="border-b">
            <div className="w-full flex flex-col items-center justify-center">
              {secondHalf.map(({ key, ...item }) => (
                <ServiceCard key={key} {...item} />
              ))}
            </div>
          </MaxWidthWrapper>
        </>
      )}
    </>
  );
};

export default Services;
