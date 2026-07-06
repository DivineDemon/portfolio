export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://mushoodhanif.com";

import type { LucideIcon } from "lucide-react";
import {
  Book,
  Brain,
  Briefcase,
  Info,
  Mail,
  MessageCircle,
  Shield,
} from "lucide-react";

export type SidebarSubItem = {
  title: string;
  href: string;
};

export type SidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  items?: SidebarSubItem[];
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "About",
    href: "/",
    icon: Info,
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    icon: Briefcase,
    items: [
      { title: "Projects", href: "/case-studies/projects" },
      { title: "Workflows", href: "/case-studies/workflows" },
    ],
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    icon: MessageCircle,
  },
  {
    title: "Skills",
    href: "/skills",
    icon: Brain,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: Book,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
  },
  {
    title: "Privacy",
    href: "/privacy",
    icon: Shield,
  },
];

export const SIDEBAR_PATH_LABELS: Record<string, string> = {
  "/case-studies": "Case Studies",
  "/case-studies/projects": "Projects",
  "/case-studies/workflows": "Workflows",
  "/privacy": "Privacy",
};
