"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Trash2 } from "lucide-react";
import { DeleteComponentProps } from "@/types";
import { useCrudData } from "@/hooks/use-queries";
import { revalidateKeys } from "@/actions/cache.actions";

export default function DataTableDeleteComponent<TData extends object>({
  row,
  table,
  dataItem,
  deleteCacheKeys,
}: DeleteComponentProps<TData>) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { id, userId, roleId } = row.original as any;

  const { customValidateKey } = (table?.options.meta as any) || {};

  const apiUrl = `${dataItem.deleteUrl ?? dataItem.apiUrl}/${id ?? userId ?? roleId}`;

  const { mutateAsync, isPending } = useCrudData<TData, object>(
    apiUrl,
    "DELETE",
    customValidateKey ?? dataItem.validateKey,
    dataItem.cacheKeys,
    "json",
    dataItem.cacheActions,
  );

  return (
    <AlertDialog defaultOpen={isOpened} onOpenChange={setIsOpened}>
      <AlertDialogTrigger>
        <Tooltip>
          <TooltipTrigger className="cursor-pointer" asChild>
            <Trash2 className="size-5" onClick={() => setIsOpened(true)} />
          </TooltipTrigger>
          <TooltipContent>Sil</TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="w-full">
          <AlertDialogTitle className="flex w-full items-center justify-between">
            <span className="text-title-sm text-2xl font-semibold text-gray-800 dark:text-white/90">
              Silme İşlemi
            </span>
            <button
              onClick={() => setIsOpened(!isOpened)}
              className="z-999 flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:h-11 sm:w-11 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            ></button>
          </AlertDialogTitle>
          <AlertDialogDescription className="my-4 text-[16px]">
            {/* {Object.values(row.original)[1]} Verisi Kalıcı Olarak */}
            Seçtiğiniz Veri Kalıcı Olarak Silinecektir.. Onaylıyor musunuz?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await mutateAsync();
              if (deleteCacheKeys?.length) {
                await revalidateKeys(deleteCacheKeys);
              }
              setIsOpened(false);
            }}
            disabled={isPending}
          >
            {isPending ? "Siliniyor" : "Değişiklikleri Kaydet"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
