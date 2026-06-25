import { CaseStudyMarkdown } from "@/components/case-study/markdown";

export function ClientTestimonial({ content }: { content: string }) {
  if (!content?.trim()) return null;

  return (
    <section className="border-b bg-muted/20 p-5">
      <blockquote className="border-l-2 border-foreground/20 pl-4">
        <CaseStudyMarkdown content={content} />
      </blockquote>
    </section>
  );
}
