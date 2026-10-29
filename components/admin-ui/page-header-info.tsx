"use client";

import { ClientAdminMenuData } from "@/lib";
import { cn } from "@/lib/utils";
import { BaseComponentType } from "@/types";
import { usePathname } from "next/navigation";

type PageHeaderInfoProps = BaseComponentType & {};
export default function PageHeaderInfo({ className }: PageHeaderInfoProps) {
  const pathName = usePathname();

  const path = Object.values(ClientAdminMenuData)
    .sort((a, b) => b.url.length - a.url.length)
    .find(
      (item) => pathName === item.url || pathName.startsWith(`${item.url}/`),
    );
  return (
    <section
      className={cn(
        "text-muted-foreground flex w-full items-center gap-2 text-sm",
        className,
      )}
    >
      <span>Yönetim Paneli</span>
      <span aria-hidden="true">/</span>
      <span className="text-foreground font-medium">{path?.title}</span>
    </section>
  );
}
