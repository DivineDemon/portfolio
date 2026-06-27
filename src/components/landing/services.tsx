import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bot, Gauge, Layers, Rocket } from "lucide-react";
import TrackedLink from "@/components/analytics/tracked-link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { ANALYTICS_EVENTS } from "@/lib/analytics/track";
import { getPublishedServicePages } from "@/lib/cms/get-published-service-pages";
import { services as fallbackServices } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

  const content = (
    <>
      <div className="w-full flex items-center justify-center gap-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          <span className="w-full text-left font-mono text-xs tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="w-full text-left font-mono text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
        {description}
      </p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  const cardClassName = cn(
    "group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm",
    "transition-all duration-200 hover:border-primary/30 hover:shadow-md",
    href &&
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  );

  if (!href) {
    return <article className={cardClassName}>{content}</article>;
  }

  return (
    <TrackedLink
      href={href}
      eventName={ANALYTICS_EVENTS.CTA_CLICK}
      eventParams={{
        cta_label: title,
        cta_location: "services",
      }}
      className={cardClassName}
    >
      {content}
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
          description: service.description,
          href: undefined as string | undefined,
          iconKey: service.icon ?? service.title,
        }));

  return (
    <section id="services" className="scroll-mt-20">
      <MaxWidthWrapper parentBorder="border-b">
        <h2 className="w-full border-b p-5 text-left font-mono text-2xl font-semibold tracking-tight">
          Services
        </h2>
        <div className="grid w-full grid-cols-1 gap-5 p-5 md:grid-cols-2">
          {items.map(({ key, ...item }) => (
            <ServiceCard key={key} {...item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Services;
