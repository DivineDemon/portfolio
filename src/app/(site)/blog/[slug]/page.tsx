import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import MarkdownRenderer from "@/components/ui/markdown-renderer";
import Quote from "@/components/ui/quote";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx";
import { blogPostSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const instant = false;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found — Mushood Hanif" };
  }

  return createMetadata({
    title: `${post.title} — Mushood Hanif`,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={blogPostSchema(post)} />
      <MaxWidthWrapper className="flex min-h-screen w-full flex-col items-start justify-start gap-10 pt-28 pb-20">
        <div className="flex w-full flex-col items-start justify-center gap-5">
          <Link
            className="flex items-center justify-start gap-2 font-semibold text-primary text-xs hover:underline"
            href="/blog"
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

        <div className="blog-prose w-full">
          <MarkdownRenderer content={post.content} />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default BlogPostPage;
