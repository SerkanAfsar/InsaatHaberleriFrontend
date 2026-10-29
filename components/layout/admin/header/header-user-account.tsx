"use client";

import { useRouter } from "nextjs-toploader/app";
import {
  ChevronRight,
  LogOut,
  Settings,
  SlidersHorizontal,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { URL_LIST } from "@/lib/data";
import { getMe, LogOutAction } from "@/actions/auth.actions";
import { toast } from "react-toastify";
import Link from "next/link";
import { use, useState } from "react";
import { cn } from "@/lib/utils";

export default function HeaderUserAccount({
  func,
}: {
  func: ReturnType<typeof getMe>;
}) {
  const router = useRouter();
  const { entity } = use(func);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  async function LogOutProcess() {
    const { success, message } = await LogOutAction();

    if (success) {
      return router.push(URL_LIST.Client.LOGIN);
    } else {
      return toast.error(message);
    }
  }
  const nameSurname = `${entity?.name} ${entity?.surname}`;

  return (
    <>
      <DropdownMenu onOpenChange={() => setIsOpened((prev) => !prev)}>
        <DropdownMenuTrigger
          asChild
          className="border-input bg-primary w-auto cursor-pointer rounded-md border p-2.5 text-sm text-white"
        >
          <button className="flex items-center outline-none">
            {nameSurname}
            <ChevronRight
              className={cn(
                "size-4 font-bold transition-all duration-300",
                isOpened && "rotate-90",
              )}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={18}
          className="w-58 overflow-visible p-0"
        >
          <div className="absolute -top-2 right-5 size-4 rotate-45 bg-blue-700" />
          <div className="P-3 relative z-10 flex items-center justify-center gap-2 bg-blue-700 p-4 text-white">
            <div className="font-semibold">
              {entity?.name} {entity?.surname}
            </div>

            <Badge className="bg-green-600 text-green-100 hover:bg-green-600">
              Üye
            </Badge>
          </div>

          {/* Menü */}
          <div className="bg-background">
            <DropdownMenuItem
              asChild
              className="cursor-pointer gap-3 rounded-none px-4 py-4"
            >
              <Link href={URL_LIST.Client.PROFILE}>
                <Settings className="text-muted-foreground size-5" />
                <span>Profil Güncelle</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem
              asChild
              className="cursor-pointer gap-3 rounded-none px-4 py-4"
            >
              <Link href={URL_LIST.Client.COMPANY_LIST}>
                <SlidersHorizontal className="text-muted-foreground size-5" />
                <span className="flex-1">Firmalarım</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem
              onClick={async () => await LogOutProcess()}
              className="cursor-pointer gap-3 rounded-none px-4 py-4"
            >
              <LogOut className="text-muted-foreground size-5" />
              <span>Güvenli Çıkış</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
