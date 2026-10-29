import { API_URL, cn, formatLocaleDate } from "@/lib";
import { AnnoucementType } from "@/types/entity.types";
import { ANNOUCEMENTS_QUERY_KEY } from "./notification-list";
import { ClientAdminMenuData } from "@/lib/client-admin-data";
import { useCrudData } from "@/hooks/use-queries";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AnnoucementItem({ item }: { item: AnnoucementType }) {
  const { mutateAsync, isPending } = useCrudData<AnnoucementType, undefined>(
    API_URL.Annoucements.Read(item.id),
    "PUT",
    [ANNOUCEMENTS_QUERY_KEY, ClientAdminMenuData.Notifications.validateKey],
  );

  return (
    <div
      className={cn(
        "grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-2 border-b border-l-2 border-l-transparent py-2 pr-4 pl-3 last:border-b-0",
        !item.isRead && "border-l-blue-600 bg-blue-50 dark:bg-blue-950/30",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {!item.isRead && (
            <span
              className="size-1.5 shrink-0 rounded-full bg-blue-600"
              aria-hidden="true"
            />
          )}
          <h4
            className={cn(
              "min-w-0 truncate text-sm",
              item.isRead
                ? "text-muted-foreground font-medium"
                : "text-foreground font-semibold",
            )}
          >
            {item.title}
          </h4>
        </div>
        <p className="text-foreground/75 mt-0.5 truncate text-xs">
          {item.message}
        </p>
        <span className="text-muted-foreground mt-0.5 block text-xs">
          {formatLocaleDate(item.createdAt)}
        </span>
      </div>

      {item.isRead ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 rounded-full"
          aria-label="Okundu"
          disabled
        >
          <Icons.CheckCheck className="size-5" />
        </Button>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
              aria-label="Okundu olarak işaretle"
              disabled={isPending}
              onClick={() => void mutateAsync(undefined).catch(() => {})}
            >
              <Icons.CheckCheck className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Okundu olarak işaretle</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
