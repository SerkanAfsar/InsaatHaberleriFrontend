"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

type PaginateProps = Pick<
  ReactPaginateProps,
  "pageCount" | "forcePage" | "onPageChange"
> & {
  type?: "normal" | "link";
  linkUrl?: string;
};

const linkClassName =
  "flex h-9 box-border cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background py-0 text-sm leading-none font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:text-white aria-[current=page]:shadow-sm motion-reduce:transition-none";

export default function Paginate({
  type = "normal",
  linkUrl = "",
  ...props
}: PaginateProps) {
  const router = useRouter();

  const handlePageChange: NonNullable<PaginateProps["onPageChange"]> = (
    selection,
  ) => {
    if (type == "normal") {
      if (props.onPageChange) {
        props.onPageChange(selection);
        return;
      }

      const url = new URL(window.location.href);
      url.searchParams.set("page", String(selection.selected + 1));
      router.push(`${url.pathname}${url.search}${url.hash}`);
    }
    return router.push(`${linkUrl}/${selection.selected + 1}`);
  };

  if (props.pageCount === 0) return null;

  return (
    <nav aria-label="Sayfalama" className="max-w-full">
      <ReactPaginate
        {...props}
        onPageChange={handlePageChange}
        disableInitialCallback
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        previousLabel={
          <>
            <ChevronLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Önceki</span>
          </>
        }
        nextLabel={
          <>
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="size-4" aria-hidden="true" />
          </>
        }
        breakLabel={<MoreHorizontal className="size-4" aria-hidden="true" />}
        previousAriaLabel="Önceki sayfaya git"
        nextAriaLabel="Sonraki sayfaya git"
        ariaLabelBuilder={(page) => `${page}. sayfaya git`}
        breakAriaLabels={{
          forward: "İlerideki sayfalara git",
          backward: "Önceki sayfalara git",
        }}
        containerClassName="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end sm:gap-2"
        pageClassName="shrink-0"
        pageLinkClassName={`${linkClassName} w-9 px-0 tabular-nums`}
        previousClassName="shrink-0"
        nextClassName="shrink-0"
        previousLinkClassName={`${linkClassName} w-9 px-0 sm:w-24 sm:px-3`}
        nextLinkClassName={`${linkClassName} w-9 px-0 sm:w-24 sm:px-3`}
        breakLinkClassName={`${linkClassName} w-9 px-0`}
        disabledClassName="cursor-not-allowed opacity-40"
        disabledLinkClassName="pointer-events-none"
      />
    </nav>
  );
}
