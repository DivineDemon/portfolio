import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";
import DitherSplitter from "@/components/global/dither-splitter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getPublishedBlogPosts } from "@/lib/cms/get-published-blog-posts";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Mushood Hanif",
  description:
    "Articles on fractional CTO leadership, SaaS architecture, AI automation, and n8n workflows for founders and executives.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

function formatPostDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <MaxWidthWrapper parentBorder="border-none">
      <div className="mx-auto flex max-w-3xl flex-col items-start justify-start">
        <header className="flex w-full flex-col items-center justify-center gap-3.5 border-b p-5">
          <p className="w-full text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Insights
          </p>
          <h1 className="w-full text-left font-mono text-3xl font-semibold tracking-tight md:text-4xl">
            Blog
          </h1>
          <p className="w-full text-left font-mono text-sm leading-relaxed text-muted-foreground">
            Practical writing on technical leadership, SaaS architecture, and AI
            automation — for founders and executives who need systems that ship.
          </p>
        </header>
        <DitherSplitter />
        {posts.length === 0 ? (
          <p className="p-5 font-mono text-sm text-muted-foreground">
            New articles coming soon.
          </p>
        ) : (
          <ul className="w-full">
            {posts.map((post) => (
              <Fragment key={post.slug}>
                <li>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex w-full flex-wrap items-center gap-4 border-b border-border p-5 text-sm transition-colors duration-100 hover:bg-accent/50"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <span className="text-xl font-semibold group-hover:underline">
                        {post.title}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {post.featured && (
                          <>
                            <span>Featured</span>
                            <span aria-hidden>•</span>
                          </>
                        )}
                        {post.keywords[0] && (
                          <>
                            <span>{post.keywords[0]}</span>
                            <span aria-hidden>•</span>
                          </>
                        )}
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt.toISOString()}>
                            {formatPostDate(post.publishedAt)}
                          </time>
                        )}
                      </div>
                      {post.excerpt && (
                        <p className="line-clamp-2 text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    {post.coverImage && (
                      <div className="relative size-24 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    )}
                  </Link>
                </li>
                <DitherSplitter />
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
