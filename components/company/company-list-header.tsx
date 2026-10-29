"use client";
import { useSearchDetail } from "@/store/use-search-detail";

import { List, Grid2X2 } from "lucide-react";
import { cn } from "@/lib";
import { CustomCombobox } from "../custom-ui/custom-combobox";
import CustomElement from "../utils/custom-element";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

export default function CompanyListHeader({
  isSearchable = false,
}: {
  isSearchable?: boolean;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const searchType = useSearchDetail((state) => state.searchType);
  const setSearchType = useSearchDetail((state) => state.setSearchType);

  const orderType = useSearchDetail((state) => state.orderType);
  const setOrderType = useSearchDetail((state) => state.setOrderType);

  const handleChange = (val: number | undefined) => {
    if (isSearchable) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("orderType", String(val || 0));
      params.delete("page");
      router.push(`${pathName}?${params.toString()}`);
    }
    setOrderType(val);
  };

  return (
    <CustomElement className="flex w-full flex-col items-center justify-between rounded-sm bg-white px-4 py-3 font-semibold shadow lg:flex-row">
      <CustomElement as="h4">Showing 1 to 6 of 30 entries</CustomElement>
      <CustomElement className="mt-4 flex shrink-0 grow-0 flex-col items-center justify-center gap-4 lg:mt-0 lg:flex-row xl:pr-10">
        <CustomElement className="flex items-center justify-center">
          <CustomElement
            onClick={() => setSearchType("list")}
            className={cn(
              "cursor-pointer rounded-sm rounded-tr-none rounded-br-none border border-r-0 border-gray-400/30 p-3",
              searchType == "list" && "bg-primary text-secondary",
            )}
          >
            <List size={18} strokeWidth={2} className="shrink-0 grow-0" />
          </CustomElement>
          <CustomElement
            onClick={() => setSearchType("grid")}
            className={cn(
              "cursor-pointer rounded-sm rounded-tl-none rounded-bl-none border border-l-0 border-gray-400/30 p-3",
              searchType == "grid" && "bg-primary text-secondary",
            )}
          >
            <Grid2X2 size={18} strokeWidth={2} className="shrink-0 grow-0" />
          </CustomElement>
        </CustomElement>
        <CustomCombobox
          value={orderType}
          items={[
            { id: 1, value: "En Yeni" },
            { id: 2, value: "En Eski" },
            { id: 3, value: "Alfabetik Artan" },
            { id: 4, value: "Alfabetik Azalan" },
          ]}
          onChange={handleChange}
          placeHolder="Sıralama Seçiniz"
        />
      </CustomElement>
    </CustomElement>
  );
}
