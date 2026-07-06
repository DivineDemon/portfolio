import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import type { BlogCardPost } from "@/lib/types/blog";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogCardPost;
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function formatPublishedDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogCard({ post, href, className, onClick }: BlogCardProps) {
  const { slug, title, excerpt, coverImage, publishedAt } = post;

  return (
    <Link
      href={href ?? `/blog/${slug}`}
      onClick={onClick}
      className={cn(
        "group flex flex-col overflow-hidden bg-card text-card-foreground transition-colors",
        className,
      )}
    >
      {coverImage ? (
        <div className="relative min-h-48 w-full overflow-hidden">
          <Image
            alt={title}
            src={coverImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="h-full max-h-64 flex flex-col gap-5 p-5">
        <h3
          title={title}
          className="text-xl font-semibold line-clamp-1 text-card-foreground underline-offset-4 group-hover:underline"
        >
          {title}
        </h3>
        {excerpt ? (
          <p
            title={excerpt}
            className="text-sm text-muted-foreground line-clamp-3"
          >
            {excerpt}
          </p>
        ) : null}
        {publishedAt ? (
          <time
            dateTime={new Date(publishedAt).toISOString()}
            className="mt-auto block text-sm font-medium text-muted-foreground"
          >
            {formatPublishedDate(publishedAt)}
          </time>
        ) : null}
      </div>
    </Link>
  );
}
