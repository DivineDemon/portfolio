import { ArrowLeft, Calendar, FolderX, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Mermaid from "@/components/ui/mermaid";
import Quote from "@/components/ui/quote";
import { getCaseStudyBySlug } from "@/lib/mdx";
import { cn } from "@/lib/utils";

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!caseStudy) {
    return (
      <MaxWidthWrapper className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center gap-6 pt-32">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderX />
            </EmptyMedia>
            <EmptyTitle>Case Study not Found.</EmptyTitle>
            <EmptyDescription>
              The requested case study &ldquo;{slug}&rdquo; could not be located.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Link
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "lg",
                }),
              )}
              to="/work"
            >
              <ArrowLeft />
              Back to All Projects
            </Link>
          </EmptyContent>
        </Empty>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-start justify-start gap-10 pt-28 pb-20">
      <div className="flex w-full flex-col items-start justify-center gap-6">
        <Link
          className="flex items-center justify-start gap-2 font-semibold text-primary text-xs hover:underline"
          to="/work"
        >
          <ArrowLeft className="size-4" />
          <span>Back to All Projects</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-medium text-primary text-xs uppercase tracking-wider">
            {caseStudy.type}
          </span>
          <span className="rounded-full border border-border bg-muted/60 px-3.5 py-1 font-mono text-muted-foreground text-xs">
            {caseStudy.clientCompany}
          </span>
          {caseStudy.role && (
            <span className="rounded-full border border-border bg-card/80 px-3.5 py-1 text-muted-foreground text-xs">
              <span className="font-semibold text-foreground">Role:</span> {caseStudy.role}
            </span>
          )}
        </div>

        <h1 className="font-bold font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
          {caseStudy.title}
        </h1>

        <Quote text={caseStudy.description} />

        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {caseStudy.tags.map((tag) => (
              <span
                className="rounded-md border border-border/80 bg-muted/50 px-2.5 py-1 font-medium text-muted-foreground text-xs"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex w-full flex-wrap items-center justify-between gap-4 border-border/50 border-t pt-5 text-muted-foreground text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <span>{caseStudy.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="size-4 text-primary" />
            <span>{caseStudy.author}</span>
          </div>
        </div>
      </div>

      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {caseStudy.metrics.map((m) => (
            <div
              className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs"
              key={`${m.label}-${m.value}`}
            >
              <span className="font-bold font-heading text-3xl text-primary">{m.value}</span>
              <span className="font-semibold text-foreground text-sm">{m.label}</span>
              {m.subtext && <span className="text-muted-foreground text-xs">{m.subtext}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-full space-y-6 overflow-x-auto text-foreground/90 text-sm leading-relaxed sm:text-base [&>blockquote]:border-primary/60 [&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:text-muted-foreground [&>blockquote]:italic [&>code]:rounded-md [&>code]:bg-muted [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:font-mono [&>code]:text-xs [&>h2]:border-border/40 [&>h2]:border-b [&>h2]:pt-6 [&>h2]:pb-2 [&>h2]:font-bold [&>h2]:font-heading [&>h2]:text-2xl [&>h3]:pt-4 [&>h3]:font-heading [&>h3]:font-semibold [&>h3]:text-xl [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6 [&>pre]:overflow-x-auto [&>pre]:rounded-xl [&>pre]:bg-muted/80 [&>pre]:p-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&_img]:my-4 [&_img]:rounded-xl [&_img]:border [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border/40 [&_td]:p-3 [&_th]:border [&_th]:border-border/60 [&_th]:bg-muted/60 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold">
        <ReactMarkdown
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isMermaid = match && match[1] === "mermaid";

              if (isMermaid) {
                return <Mermaid chart={String(children).replace(/\n$/, "")} />;
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {caseStudy.content}
        </ReactMarkdown>
      </div>
    </MaxWidthWrapper>
  );
};

export default CaseStudyPage;
