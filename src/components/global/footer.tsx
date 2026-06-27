import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { footerMoreLinks, footerWhoIWorkWithLinks } from "@/lib/constants";
import { HOMEPAGE_DEFAULTS } from "@/lib/seo/defaults";

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const Footer = async () => {
  const year = await getCopyrightYear();

  return (
    <MaxWidthWrapper parentBorder="border-t" showPlusIcons>
      <footer className="w-full font-mono">
        <div className="grid gap-10 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:p-8">
          <div className="flex flex-col gap-3 md:pr-4">
            <Link
              href="/"
              className="group inline-flex w-fit items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <Image
                alt=""
                width={20}
                height={20}
                src="/logo.svg"
                className="size-5 dark:invert"
              />
              <span className="text-sm font-semibold tracking-tight">
                Mushood Hanif
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {HOMEPAGE_DEFAULTS.heroBadge}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
              Who I work with
            </h3>
            <ul className="space-y-2.5">
              {footerWhoIWorkWithLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
              More
            </h3>
            <ul className="space-y-2.5">
              {footerMoreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t px-6 py-4 md:px-8">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Mushood Hanif. All rights reserved.
          </p>
        </div>
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
