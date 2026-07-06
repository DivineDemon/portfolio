import { SIDEBAR_ITEMS, SIDEBAR_PATH_LABELS } from "@/lib/constants";

export type BreadcrumbItem = { name: string; href: string };

const ROOT_CRUMB: BreadcrumbItem = {
  name: SIDEBAR_ITEMS.find((item) => item.href === "/")?.title ?? "Home",
  href: "/",
};

function formatSegmentLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getLabelForHref(href: string): string | undefined {
  return (
    SIDEBAR_PATH_LABELS[href] ??
    SIDEBAR_ITEMS.find((item) => item.href === href)?.title ??
    SIDEBAR_ITEMS.flatMap((item) => item.items ?? []).find(
      (item) => item.href === href,
    )?.title
  );
}

export function getBreadcrumbsFromPathname(pathname: string): BreadcrumbItem[] {
  const normalizedPath =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (normalizedPath === "/") {
    return [ROOT_CRUMB];
  }

  const segments = normalizedPath.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [ROOT_CRUMB];

  let href = "";

  for (const segment of segments) {
    href += `/${segment}`;
    const name = getLabelForHref(href) ?? formatSegmentLabel(segment);
    items.push({ name, href });
  }

  return items;
}
