"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type BreadcrumbItem,
  getBreadcrumbsFromPathname,
} from "@/lib/breadcrumbs";
import { SITE_URL } from "@/lib/constants";

function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
    </script>
  );
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const items = getBreadcrumbsFromPathname(pathname);

  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav
        aria-label="Breadcrumb"
        className="px-5 py-3 font-mono text-xs font-medium text-primary"
      >
        <ol className="flex list-none flex-wrap items-center gap-2">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              )}
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.href} className="opacity-70 hover:opacity-100">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
