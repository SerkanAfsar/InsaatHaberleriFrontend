"use client";

import { memo, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Pencil } from "lucide-react";
import { AddFormRef, AddUpdateComponentProps } from "@/types";
import { useSingleItemById } from "@/hooks/use-queries";
import { AdminComponents } from "@/lib/admin-components";
import Link from "next/link";
import DatatableUpdateLoader from "./datatable-update-loader";
function DatatableUpdateComponent({
  id,
  dataItem,
  ...rest
}: AddUpdateComponentProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const ref = useRef<AddFormRef>(null);

  const Component =
    dataItem.component == undefined
      ? (`${dataItem.url}/${id}/edit` as string)
      : AdminComponents[dataItem.component as keyof typeof AdminComponents];

  const apiUrl = `${dataItem.apiUrl}/${id}`;

  const { data, error, isLoading } = useSingleItemById(
    id!,
    apiUrl,
    dataItem.validateKey,
    Boolean(id && isOpened && typeof Component != "string"),
  );

  if (typeof Component == "string") {
    return (
      <Tooltip>
        <Link href={Component} className="cursor-pointer">
          <Pencil className="size-5" />
        </Link>
        <TooltipContent>Detay</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Sheet open={isOpened} onOpenChange={setIsOpened}>
      <SheetTrigger>
        <Tooltip>
          <TooltipTrigger asChild className="cursor-pointer">
            <Pencil className="size-5" />
          </TooltipTrigger>
          <TooltipContent
            onClick={() => {
              setIsOpened(true);
            }}
          >
            Güncelle
          </TooltipContent>
        </Tooltip>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{dataItem.title}</SheetTitle>
          <SheetDescription>
            {dataItem.title} Güncelle İşlemleri
          </SheetDescription>
        </SheetHeader>
        <div className="flex-auto gap-6 overflow-auto px-4">
          {isLoading && <DatatableUpdateLoader />}
          {error && <div>{error.message}</div>}
          {!!data && (
            <Component
              ref={ref}
              defaultValues={data as any}
              setOpened={setIsOpened}
              type="UPDATE"
              idNumber={id!}
              {...rest}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default memo(DatatableUpdateComponent);
