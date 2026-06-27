import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getPublishedBlogPostBySlug } from "@/lib/cms/get-published-blog-posts";
import { SITE_URL } from "@/lib/constants";

async function getPost(slug: string) {
  return getPublishedBlogPostBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  const canonical = `${SITE_URL}/blog/${slug}`;

  return {
    title,
    description,
    keywords: post.keywords?.length ? post.keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage
        ? [{ url: post.coverImage, alt: post.title, width: 1200, height: 630 }]
        : undefined,
      siteName: "Mushood Hanif",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <MaxWidthWrapper parentBorder="border-none">
      <article className="mx-auto max-w-3xl px-5 py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <header className="mb-8 space-y-4">
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
          <h1 className="font-mono text-3xl font-semibold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.coverImage && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg border border-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <CaseStudyMarkdown content={post.content} className="space-y-4" />
      </article>
    </MaxWidthWrapper>
  );
}
