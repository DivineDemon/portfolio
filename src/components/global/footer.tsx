import { cacheLife } from "next/cache";
import Link from "next/link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getPublishedPagesForFooter } from "@/lib/cms/page-helpers";

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function groupFooterLinks(
  pages: Awaited<ReturnType<typeof getPublishedPagesForFooter>>,
) {
  const services = pages.filter(
    (page) => page.pageType === "service" || page.slug.startsWith("services/"),
  );
  const personas = pages.filter((page) => page.pageType === "persona");
  const company = pages.filter((page) =>
    ["index", "process", "now"].includes(page.pageType),
  );

  return { services, personas, company };
}

const Footer = async () => {
  const [year, pages] = await Promise.all([
    getCopyrightYear(),
    getPublishedPagesForFooter(),
  ]);
  const { services, personas, company } = groupFooterLinks(pages);

  return (
    <MaxWidthWrapper parentBorder="border-none" showPlusIcons={false}>
      <footer className="w-full border-t p-5">
        <div className="mx-auto mb-6 grid max-w-4xl gap-8 text-left sm:grid-cols-3">
          {services.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-sm font-semibold">Services</h3>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                {services.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {personas.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-sm font-semibold">
                Who I work with
              </h3>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                {personas.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {company.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-sm font-semibold">Company</h3>
              <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                {company.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="mb-3 font-mono text-sm font-semibold">
              {company.length > 0 ? "More" : "Company"}
            </h3>
            <ul className="space-y-2 font-mono text-sm text-muted-foreground">
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="transition-colors hover:text-foreground"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          &copy; {year} Mushood Hanif. All rights reserved.
        </p>
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
