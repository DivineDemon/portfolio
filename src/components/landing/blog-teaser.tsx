import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/mdx";
import MaxWidthWrapper from "../max-width-wrapper";
import SectionBadge from "../ui/section-badge";

const BlogTeaser = () => {
  const allPosts = getAllBlogPosts();
  const topPosts = allPosts.slice(0, 2);

  return (
    <MaxWidthWrapper
      className="flex w-full flex-col items-center justify-center gap-10 py-16"
      id="blog"
    >
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <SectionBadge label="writing & thoughts" />
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-bold font-heading text-5xl md:text-6xl">Technical Insights.</h2>
          <a
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary text-sm hover:underline"
            href="/blog"
          >
            <span>Read All Articles</span>
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {topPosts.map((post) => (
          <a
            className="group relative flex flex-col justify-between gap-4 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-lg"
            href={`/blog/${post.slug}`}
            key={post.slug}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-muted-foreground text-xs">{post.date}</span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-medium text-[10px] text-primary">
                  {post.readingTime}
                </span>
              </div>

              <h3 className="font-bold font-heading text-foreground text-xl transition-colors group-hover:text-primary">
                {post.title}
              </h3>

              <p className="line-clamp-3 text-muted-foreground text-xs leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-border/50 border-t pt-4 font-medium text-primary text-xs">
              <span className="group-hover:underline">Read Article</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogTeaser;
