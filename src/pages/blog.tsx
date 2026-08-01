import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Quote from "@/components/ui/quote";
import SectionBadge from "@/components/ui/section-badge";
import { type BlogPost, getAllBlogPosts } from "@/lib/mdx";

const BlogPage = () => {
  const posts = getAllBlogPosts();

  return (
    <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-center justify-start gap-10 pt-28 pb-20">
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="writing & research" />
        <h1 className="font-bold font-heading text-4xl tracking-tight sm:text-6xl md:text-7xl">
          Technical Publications.
        </h1>
        <Quote
          text="In-depth analysis on agentic AI loop engineering, multi-agent orchestration, open-weight
          model fine-tuning, physical verification, and AI cost optimization."
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post: BlogPost) => (
          <Link
            className="group relative flex flex-col justify-between gap-5 rounded-3xl border border-border/80 bg-card/90 p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl sm:p-8"
            key={post.slug}
            to={`/blog/${post.slug}`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 text-muted-foreground text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-primary" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-medium text-[10px] text-primary">
                  <Clock className="size-3" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h2 className="font-bold font-heading text-foreground text-xl transition-colors group-hover:text-primary sm:text-2xl">
                {post.title}
              </h2>

              <p className="line-clamp-3 text-muted-foreground text-xs leading-relaxed sm:text-sm">
                {post.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-border/50 border-t pt-4 font-semibold text-primary text-xs">
              <span className="group-hover:underline">Read Full Article</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogPage;
