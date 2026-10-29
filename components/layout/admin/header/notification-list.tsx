"use client";

import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BaseComponentType } from "@/types";
import { useRouter } from "nextjs-toploader/app";
import { LucideIcon } from "lucide-react";
import { useGetAllData } from "@/hooks/use-queries";
import { AnnoucementType } from "@/types/entity.types";
import { API_URL, cn } from "@/lib";
import AnnoucementItem from "./notification-item";

export const ANNOUCEMENTS_QUERY_KEY = "annoucements:last-four";

type CustomNotificationListProps = BaseComponentType & {
  title?: string;
  allUrl?: string;
  icon?: keyof typeof Icons;
};
export default function CustomNotificationList({
  className,
  allUrl,
  title,
  icon,
}: CustomNotificationListProps) {
  const router = useRouter();
  const { data, error, isPending } = useGetAllData<AnnoucementType>(
    API_URL.Annoucements.Paginated,
    ANNOUCEMENTS_QUERY_KEY,
    {
      offset: 0,
      count: 4,
      globalFilter: "",
      filters: "[]",
      sorting: [{ id: "CreatedAt", desc: true }],
    },
  );

  const annoucements = data?.data?.slice(0, 4) ?? [];
  const itemCount = annoucements.filter((item) => !item.isRead).length;
  const Icon = icon
    ? (Icons[icon] as LucideIcon)
    : (Icons["Mail"] as LucideIcon);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant="outline"
          size="icon"
          className={cn("relative size-10 rounded-full", className)}
        >
          <Icon className="size-4" />

          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full p-0">
              {itemCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-80 overflow-hidden rounded-md border-0 p-0 shadow-xl"
      >
        <div className="relative bg-blue-700 px-3 py-2.5 text-white">
          <div className="absolute -top-2 right-5 size-4 rotate-45 bg-blue-700" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold">{title}</h3>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          <div>
            {isPending ? (
              <p className="text-muted-foreground px-3 py-4 text-sm">
                Duyurular yükleniyor...
              </p>
            ) : error ? (
              <p className="text-muted-foreground px-3 py-4 text-sm">
                Duyurular yüklenemedi.
              </p>
            ) : annoucements.length === 0 ? (
              <p className="text-muted-foreground px-3 py-4 text-sm">
                Henüz duyuru yok.
              </p>
            ) : (
              annoucements.map((item) => (
                <AnnoucementItem key={item.id} item={item} />
              ))
            )}
          </div>
        </div>

        {allUrl && (
          <div className="p-2">
            <Button
              onClick={() => router.push(allUrl)}
              className="h-auto w-full bg-blue-700 p-2 hover:bg-blue-800"
            >
              Hepsini Görüntüle
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
