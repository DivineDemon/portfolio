import Image from "next/image";
import { cn } from "@/lib/utils";

function GalleryImage({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden", className)}>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function getGalleryAlt(title: string, index: number, total: number): string {
  if (total === 1) return `${title} screenshot`;
  return `${title} screenshot ${index + 1}`;
}

function getCaption(
  captions: string[] | undefined,
  index: number,
  total: number,
): string | undefined {
  const caption = captions?.[index]?.trim();
  if (caption) return caption;
  if (total > 1) return `Screenshot ${index + 1} of ${total}`;
  return undefined;
}

export function InlineGallery({
  images,
  captions,
  title,
}: {
  images: string[];
  captions?: string[];
  title: string;
}) {
  const inlineImages = images.slice(0, 2);
  if (!inlineImages.length) return null;

  return (
    <section className="border-b p-5">
      <div
        className={cn(
          "grid gap-4",
          inlineImages.length > 1 ? "sm:grid-cols-2" : "grid-cols-1",
        )}
      >
        {inlineImages.map((src, index) => (
          <GalleryImage
            key={src}
            src={src}
            alt={getGalleryAlt(title, index, images.length)}
            caption={getCaption(captions, index, images.length)}
          />
        ))}
      </div>
    </section>
  );
}

export function FullGallery({
  images,
  captions,
  title,
}: {
  images: string[];
  captions?: string[];
  title: string;
}) {
  if (!images.length) return null;

  return (
    <section className="border-b p-5">
      <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Gallery
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, index) => (
          <GalleryImage
            key={src}
            src={src}
            alt={getGalleryAlt(title, index, images.length)}
            caption={getCaption(captions, index, images.length)}
          />
        ))}
      </div>
    </section>
  );
}
