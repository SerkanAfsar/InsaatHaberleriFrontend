import { useRef, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AddFormRef, AddUpdateComponentProps } from "@/types";
import { AdminComponents } from "@/lib/admin-components";

export default function DatatableAddModalComponent({
  children,
  dataItem,
}: AddUpdateComponentProps) {
  const ref = useRef<AddFormRef>(null);

  const Component =
    AdminComponents[dataItem.component as keyof typeof AdminComponents];

  const [opened, setOpened] = useState<boolean>(false);
  return (
    <Sheet open={opened} onOpenChange={setOpened}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="w-full shadow">
          <SheetTitle>Deneme Başlık</SheetTitle>
          <SheetDescription>Deneme Alt Başlık</SheetDescription>
        </SheetHeader>
        <div className="flex-auto gap-6 overflow-auto px-4">
          {Component && (
            <Component type="ADD" ref={ref} setOpened={setOpened} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
