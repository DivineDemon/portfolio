import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getTrustedByLogos } from "@/lib/cms/get-trusted-by-logos";

const TrustedBy = async () => {
  const logos = await getTrustedByLogos();

  if (logos.length === 0) {
    return null;
  }

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <section id="trusted-by" className="w-full scroll-mt-20">
        <h2 className="w-full border-b p-5 text-left font-mono text-2xl font-semibold tracking-tight">
          Trusted By
        </h2>
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo) => {
            const inner = (
              <>
                <div className="relative mb-2 size-12 overflow-hidden rounded-md border border-border/60 bg-muted">
                  <Image
                    src={logo.image}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <span className="line-clamp-2 text-center font-mono text-xs text-muted-foreground">
                  {logo.name}
                </span>
              </>
            );

            if (logo.url) {
              return (
                <Link
                  key={logo.name}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/30"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <div
                key={logo.name}
                className="flex flex-col items-center rounded-lg p-3"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default TrustedBy;
