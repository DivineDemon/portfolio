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
              to="/blog"
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
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <Link
          className="flex w-full items-center justify-start gap-2.5 text-primary text-xs"
          to="/work"
        >
          <ArrowLeft className="size-4" />
          <span>Back to All Projects</span>
        </Link>
        <h1 className="font-bold font-heading text-4xl leading-tight md:text-5xl">
          {caseStudy.title}
        </h1>

        <Quote text={caseStudy.description} />

        <div className="flex w-full flex-wrap items-center justify-between gap-5 border-border/50 border-t pt-5 text-muted-foreground text-xs">
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
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {caseStudy.metrics.map((m) => (
            <div
              className="flex flex-col gap-1 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs"
              key={m.label}
            >
              <span className="font-bold font-heading text-3xl text-primary">{m.value}</span>
              <span className="font-semibold text-foreground text-sm">{m.label}</span>
              {m.subtext && <span className="text-muted-foreground text-xs">{m.subtext}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="flex w-full flex-col items-start justify-start gap-5">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{caseStudy.content}</ReactMarkdown>
      </div>
    </MaxWidthWrapper>
  );
};

export default CaseStudyPage;
