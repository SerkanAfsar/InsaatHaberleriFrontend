"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AdminMenuDataType } from "@/types";
import * as Lucide from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavProjects({ menuitems }: { menuitems: AdminMenuDataType }) {
  const pathName = usePathname();

  return (
    <SidebarGroup className="px-3 pt-4 group-data-[collapsible=icon]:px-2">
      <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
        Menü
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {Object.entries(menuitems).map(([key, value]) => {
          const Icon = value.icon ? (Lucide[value.icon] as Lucide.LucideIcon) : null;
          const condition = pathName === value.url || pathName.startsWith(`${value.url}/`);
          return (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton
                tooltip={value.title}
                isActive={condition}
                className="h-10 gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-800 data-active:bg-teal-50 data-active:font-semibold data-active:text-teal-800 [&_svg]:size-[18px]"
                asChild
              >
                <Link
                  href={value.url}
                  title={value.title}
                  aria-current={condition ? "page" : undefined}
                >
                  {Icon && <Icon />}
                  <span>{value.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
