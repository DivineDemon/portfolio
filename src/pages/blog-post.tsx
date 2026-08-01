import { ArrowLeft, Calendar, Clock, FolderX } from "lucide-react";
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
import { getBlogPostBySlug } from "@/lib/mdx";
import { cn } from "@/lib/utils";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <MaxWidthWrapper className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center gap-6 pt-32">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderX />
            </EmptyMedia>
            <EmptyTitle>Article not Found.</EmptyTitle>
            <EmptyDescription>
              The requested publication &ldquo;{slug}&rdquo; could not be located.
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
              Back to All Articles
            </Link>
          </EmptyContent>
        </Empty>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-start justify-start gap-10 pt-28 pb-20">
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <Link
          className="flex items-center justify-start gap-2 font-semibold text-primary text-xs hover:underline"
          to="/blog"
        >
          <ArrowLeft className="size-4" />
          <span>Back to All Articles</span>
        </Link>
        <h1 className="font-bold font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <Quote text={post.description} />

        <div className="flex w-full flex-wrap items-center justify-between gap-5 border-border/50 border-t pt-5 text-muted-foreground text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>

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
          {post.content}
        </ReactMarkdown>
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogPostPage;
