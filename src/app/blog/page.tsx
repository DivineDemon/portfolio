import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getPublishedBlogPosts } from "@/lib/cms/get-published-blog-posts";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Mushood Hanif",
  description:
    "Articles on fractional CTO leadership, SaaS architecture, AI automation, and n8n workflows for founders and executives.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <MaxWidthWrapper parentBorder="border-none">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <header className="mb-10 space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Insights
          </p>
          <h1 className="font-mono text-3xl font-semibold tracking-tight md:text-4xl">
            Blog
          </h1>
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            Practical writing on technical leadership, SaaS architecture, and AI
            automation — for founders and executives who need systems that ship.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            New articles coming soon.
          </p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border pb-8">
                <article className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt.toISOString()}
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {post.publishedAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    )}
                    {post.featured && (
                      <span className="rounded-full border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="font-mono text-xl font-semibold">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && <CaseStudyMarkdown content={post.excerpt} />}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block font-mono text-sm text-blue-300 underline-offset-2 hover:underline"
                  >
                    Read article →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
