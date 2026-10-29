import { EnvValues } from "@/lib";
import Paginate from "../ui/paginate";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

export type CompanyPaginationProps = {
  setPageIndex?: React.Dispatch<React.SetStateAction<number>>;
  rowCount: number;
  pageIndex: number;
};
export default function CompanyPagination({
  rowCount,
  setPageIndex,
  pageIndex,
}: CompanyPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (setPageIndex) {
      setPageIndex(page);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", `${page + 1}`);
      router.push(`?${params.toString()}`);
    }
  };
  return (
    <div className="border-border mt-6 flex w-full justify-center border-t pt-6 sm:justify-end">
      <Paginate
        onPageChange={(e) => {
          handlePageChange(e.selected);
        }}
        pageCount={Math.ceil(Number(rowCount || 0) / EnvValues.PaginationCount)}
        forcePage={pageIndex}
      />
    </div>
  );
}
