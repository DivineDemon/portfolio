import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudyMarkdown } from "@/components/case-study/markdown";
import { PageBreadcrumbs } from "@/components/cms/page-breadcrumbs";
import DitherSplitter from "@/components/global/dither-splitter";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getPublishedBlogPostBySlug } from "@/lib/cms/get-published-blog-posts";
import { SITE_URL } from "@/lib/constants";
import {
  PERSON_SCHEMA_ID,
  safeJsonLdStringify,
  toAbsoluteUrl,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";

async function getPost(slug: string) {
  return getPublishedBlogPostBySlug(slug);
}

function formatPostDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }

  return undefined;
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    robots: { index: true, follow: true },
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

  const canonical = `${SITE_URL}/blog/${slug}`;
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  const publishedAt = toIsoDate(post.publishedAt);
  const updatedAt = toIsoDate(post.updatedAt);
  const imageUrl = post.coverImage ? toAbsoluteUrl(post.coverImage) : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: title,
        description,
        url: canonical,
        mainEntityOfPage: canonical,
        isPartOf: { "@id": WEBSITE_SCHEMA_ID },
        ...(imageUrl ? { image: [imageUrl] } : {}),
        author: { "@id": PERSON_SCHEMA_ID },
        publisher: { "@id": PERSON_SCHEMA_ID },
        ...(publishedAt ? { datePublished: publishedAt } : {}),
        ...(updatedAt ? { dateModified: updatedAt } : {}),
        ...(post.keywords?.length
          ? { keywords: post.keywords.join(", ") }
          : {}),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {safeJsonLdStringify(articleJsonLd)}
      </script>
      <article className="min-h-screen">
        <MaxWidthWrapper parentBorder="border-b">
          <div className="mx-auto max-w-3xl p-5">
            <PageBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
              className="mb-4"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Insights
            </p>
            <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
                {post.excerpt}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
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
          </div>
        </MaxWidthWrapper>

        {post.coverImage && (
          <>
            <DitherSplitter />
            <MaxWidthWrapper parentBorder="border-b">
              <div className="mx-auto max-w-3xl p-5">
                <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              </div>
            </MaxWidthWrapper>
          </>
        )}

        <DitherSplitter />

        <MaxWidthWrapper parentBorder="border-b">
          <div className="mx-auto max-w-3xl">
            <section className="border-b border-border p-5 last:border-b-0">
              <CaseStudyMarkdown content={post.content} />
            </section>
          </div>
        </MaxWidthWrapper>

        <DitherSplitter />
      </article>
    </>
  );
}
