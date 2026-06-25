import { cn } from "@/lib/utils";

export function CaseStudySection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b p-5 last:border-b-0", className)}>
      <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-3 font-mono text-sm leading-relaxed text-foreground">
        {children}
      </div>
    </section>
  );
}
