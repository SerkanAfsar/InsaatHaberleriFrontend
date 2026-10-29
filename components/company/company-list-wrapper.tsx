"use client";
import { useSearchDetail } from "@/store/use-search-detail";
import { CompanyEntityType } from "@/types/entity.types";
import CompanyItemGrid from "../company/company-item-grid";
import CompanyItemList from "../company/company-item-list";

import CompanyPagination from "../company/company-pagination";
import React from "react";
import { cn } from "@/lib";
import CustomElement from "../utils/custom-element";

export default function CompanyListWrapper({
  data,
  pageIndex,
  rowCount,
  setPageIndex,
}: {
  data?: CompanyEntityType[] | null;
  pageIndex: number;
  rowCount: number;
  setPageIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const selectionType = useSearchDetail((state) => state.searchType);

  const paginateCondition = data && rowCount > 9;
  return (
    <>
      <CustomElement
        className={cn(
          "w-full",
          selectionType == "grid"
            ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-4",
        )}
      >
        {data?.map((item, index) => {
          return selectionType == "grid" ? (
            <CompanyItemGrid key={index} item={item} />
          ) : (
            <CompanyItemList key={index} item={item} />
          );
        })}
      </CustomElement>
      {paginateCondition && (
        <CompanyPagination
          pageIndex={pageIndex}
          rowCount={rowCount}
          setPageIndex={setPageIndex}
        />
      )}
    </>
  );
}
