"use client";
import * as React from "react";
import { NavProjects } from "@/components/utils/nav-projects";

import Link from "next/link";
import { Building2Icon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { AdminMenuDataType } from "@/types";

export function AppSidebar({
  data: layoutData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  data: AdminMenuDataType;
}) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-slate-200 bg-white text-slate-800"
      {...props}
    >
      <SidebarHeader className="border-b border-slate-200 px-4 py-5 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-4">
        <Link
          href={Object.values(layoutData)[0]?.url ?? "/"}
          aria-label="Haber App yönetim paneli"
          className="focus-visible:ring-primary flex min-h-10 items-center rounded-lg outline-none focus-visible:ring-2"
        >
          <Building2Icon className="size-8 shrink-0 rounded-lg bg-teal-700 p-1.5 text-white" />
          <span className="ml-3 truncate text-base font-semibold text-slate-900 group-data-[collapsible=icon]:hidden">
            Haber App
          </span>
        </Link>
        <span className="pl-11 text-[10px] font-medium tracking-[0.18em] text-slate-500 uppercase group-data-[collapsible=icon]:hidden">
          Admin Paneli
        </span>
      </SidebarHeader>
      <SidebarContent className="pt-3">
        {/* <NavMain items={data.navMain} /> */}
        <React.Suspense>
          <NavProjects menuitems={layoutData} />
        </React.Suspense>
      </SidebarContent>
      {/* <SidebarFooter className="border-sidebar-border border-t p-3 group-data-[collapsible=icon]:p-2">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail /> */}
    </Sidebar>
  );
}
