import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Quote from "@/components/ui/quote";
import { getBlogPostBySlug } from "@/lib/mdx";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <MaxWidthWrapper className="flex min-h-screen flex-col items-center justify-center gap-6 pt-32">
        <h1 className="font-bold font-heading text-4xl">Article Not Found</h1>
        <p className="text-muted-foreground text-sm">
          The requested publication &ldquo;{slug}&rdquo; could not be located.
        </p>
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 font-semibold text-primary text-xs"
          to="/blog"
        >
          <ArrowLeft className="size-4" />
          <span>Back to All Articles</span>
        </Link>
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
