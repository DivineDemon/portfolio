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
      <div className="relative aspect-video w-full overflow-hidden border border-border bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
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

export function CaseStudyGallery({
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
    <section className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-semibold text-foreground">
        Gallery
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
