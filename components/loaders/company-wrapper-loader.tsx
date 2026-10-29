"use client";
import { useSearchDetail } from "@/store/use-search-detail";
import CompanyItemGridLoader from "./company-item-grid-loader";
import CompanyItemListLoader from "./company-item-list-loader";
import CustomElement from "../utils/custom-element";
import { cn } from "@/lib";

export default function CompanyWrapperLoader() {
  const selectionType = useSearchDetail((state) => state.searchType);
  return (
    <CustomElement
      className={cn(
        "w-full",
        selectionType == "grid"
          ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          : "flex flex-col gap-4",
      )}
    >
      {Array.from({ length: 6 }).map((_, index) => {
        if (selectionType == "grid") {
          return <CompanyItemGridLoader key={index} />;
        }
        return <CompanyItemListLoader key={index} />;
      })}
    </CustomElement>
  );
}
