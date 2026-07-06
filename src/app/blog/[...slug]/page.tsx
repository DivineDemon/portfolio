import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogPostViewTracker from "@/components/analytics/blog-post-view-tracker";
import { BlogPostFooter } from "@/components/blog/blog-post-footer";
import { Markdown } from "@/components/content/markdown";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getBlogFooterCaseStudy,
  getPublishedBlogPostBySlug,
  getPublishedBlogSlugs,
  getRelatedBlogPosts,
} from "@/lib/data/blog";
import { toIsoDate } from "@/lib/json-ld";
import { buildArticleJsonLd, resolveImageUrl } from "@/lib/seo/article-json-ld";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";

type BlogPostPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();

  return slugs.map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length !== 1) {
    return {};
  }

  const post = await getPublishedBlogPostBySlug(slug[0]);

  if (!post) {
    return {};
  }

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  const path = `/blog/${slug[0]}`;

  return buildPageMetadata({
    title,
    description,
    path,
    keywords: post.keywords.length ? post.keywords : undefined,
    openGraph: {
      type: "article",
      publishedTime: toIsoDate(post.publishedAt),
      images: post.coverImage
        ? [{ url: post.coverImage, alt: post.title }]
        : undefined,
    },
    twitter: {
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (slug.length !== 1) {
    notFound();
  }

  const post = await getPublishedBlogPostBySlug(slug[0]);

  if (!post) {
    notFound();
  }

  const [relatedPosts, caseStudy] = await Promise.all([
    getRelatedBlogPosts(slug[0], post.keywords),
    getBlogFooterCaseStudy(slug[0]),
  ]);

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  const canonical = absoluteUrl(`/blog/${slug[0]}`);
  const articleJsonLd = buildArticleJsonLd({
    canonical,
    title,
    description,
    imageUrl: resolveImageUrl(post.coverImage),
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    keywords: post.keywords,
    breadcrumbs: [
      { name: "About", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: post.title, href: `/blog/${slug[0]}` },
    ],
  });

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <BlogPostViewTracker slug={slug[0]} title={post.title} />
      <article className="w-full max-w-3xl flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>
          {post.publishedAt ? (
            <time
              dateTime={new Date(post.publishedAt).toISOString()}
              className="text-sm font-medium text-muted-foreground"
            >
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(post.publishedAt))}
            </time>
          ) : null}
        </header>
        {post.coverImage ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              alt={post.title}
              src={post.coverImage}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}
        <Markdown content={post.content} />
        <BlogPostFooter
          postSlug={slug[0]}
          relatedPosts={relatedPosts}
          caseStudy={caseStudy}
        />
      </article>
    </>
  );
}
