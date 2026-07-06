"use client";

import Image from "next/image";
import type * as React from "react";
import { NavMain } from "@/components/layout/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SIDEBAR_ITEMS } from "@/lib/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex h-16 items-start justify-center border-b p-[14px] group-data-[collapsible=icon]:justify-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={36}
          height={36}
          className="dark:invert"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_ITEMS} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
