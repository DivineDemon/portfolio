import { Markdown } from "@/components/content/markdown";

type CaseStudySectionProps = {
  title: string;
  content: string;
};

export function CaseStudySection({ title, content }: CaseStudySectionProps) {
  if (!content.trim()) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3 border-t border-border pt-6 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h2>
      <Markdown content={content} className="max-w-none" />
    </section>
  );
}
