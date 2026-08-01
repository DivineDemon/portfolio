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
    <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-center justify-start gap-10 pt-28 pb-20">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <Link
          className="flex w-full items-center justify-start gap-2.5 text-primary text-xs"
          to="/blog"
        >
          <ArrowLeft className="size-4" />
          <span>Back to All Articles</span>
        </Link>
        <h1 className="font-bold font-heading text-4xl leading-tight md:text-5xl">{post.title}</h1>

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

      <div className="flex w-full flex-col items-start justify-start gap-5">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogPostPage;
