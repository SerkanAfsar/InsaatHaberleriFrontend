"use client";

import { useRouter } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReactPaginate from "react-paginate";

type CategoryPaginateProps = {
  pageCount: number;
  currentPage: number;
};

const pageLinkClassName =
  "flex h-[38px] min-w-[42px] cursor-pointer items-center justify-center bg-[#f7f7fb] px-[15px] text-[14px] font-medium text-[#252525] shadow-[0_2px_0_#e5e5e5] transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 aria-[current=page]:text-red-600";

export default function CategoryPaginate({
  pageCount,
  currentPage,
}: CategoryPaginateProps) {
  const router = useRouter();

  if (pageCount <= 1) return null;

  const goToPage = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(page));
    router.push(`${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <nav aria-label="Kategori sayfalari" className="max-w-full overflow-x-auto">
      <div className="flex w-max items-center gap-2 py-1">
        <button
          type="button"
          onClick={() => goToPage(1)}
          disabled={currentPage <= 1}
          className={`${pageLinkClassName} min-w-[48px] disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label="\u0130lk sayfaya git"
        >
          <ChevronsLeft className="size-4" aria-hidden="true" />
        </button>
        <ReactPaginate
          pageCount={pageCount}
          forcePage={Math.min(Math.max(currentPage - 1, 0), pageCount - 1)}
          onPageChange={({ selected }) => goToPage(selected + 1)}
          disableInitialCallback
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          renderOnZeroPageCount={null}
          previousLabel={<ChevronLeft className="size-4" aria-hidden="true" />}
          nextLabel={<ChevronRight className="size-4" aria-hidden="true" />}
          breakLabel="..."
          containerClassName="flex w-max items-center gap-2 py-1"
          pageClassName="shrink-0"
          pageLinkClassName={pageLinkClassName}
          previousClassName="shrink-0"
          nextClassName="shrink-0"
          previousLinkClassName={pageLinkClassName}
          nextLinkClassName={pageLinkClassName}
          breakClassName="shrink-0"
          breakLinkClassName={pageLinkClassName}
          disabledClassName="opacity-50"
          disabledLinkClassName="pointer-events-none"
          ariaLabelBuilder={(page) => `${page}. sayfaya git`}
          previousAriaLabel="\u00D6nceki sayfa"
          nextAriaLabel="Sonraki sayfa"
        />
        <button
          type="button"
          onClick={() => goToPage(pageCount)}
          disabled={currentPage >= pageCount}
          className={`${pageLinkClassName} min-w-[48px] disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label="Son sayfaya git"
        >
          <ChevronsRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
