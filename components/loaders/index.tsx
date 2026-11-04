import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const MainNewsItemLoader = () => {
  return (
    <article
      role="status"
      aria-label="Öne çıkan haber yükleniyor"
      className="relative h-[230px] min-h-full w-full overflow-hidden bg-gray-200 text-white"
    >
      <span className="sr-only">Öne çıkan haber yükleniyor</span>

      <Skeleton className="absolute inset-0 size-full rounded-none bg-gray-200" />
      <div className="absolute inset-0 bg-black/10" aria-hidden="true" />

      <Skeleton className="absolute top-2 left-2 z-10 h-8 w-24 rounded-md bg-white/30" />
      <div className="absolute right-2 bottom-2 left-2 z-10 flex min-h-16 items-end">
        <Skeleton className="h-6 w-3/4 rounded bg-white/40" />
      </div>
    </article>
  );
};

export const BigNewsItemLoader = () => {
  return (
    <article
      role="status"
      aria-label="Haber yükleniyor"
      className="flex w-full flex-col items-start justify-start gap-4 text-sm md:flex-row"
    >
      <span className="sr-only">Haber yükleniyor</span>
      <Skeleton className="aspect-[355/280] h-full w-full flex-1 shrink-0 grow-0 rounded-none bg-gray-300 md:w-auto" />

      <div className="flex w-full flex-1 flex-col items-start justify-start gap-2 md:w-auto">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24 rounded-sm bg-gray-300" />
          <Skeleton className="h-4 w-36 bg-gray-300" />
        </div>
        <Skeleton className="mt-1 h-6 w-4/5 bg-gray-300" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-3/4 bg-gray-300" />
        </div>
        <Skeleton className="mt-1 h-10 w-28 rounded-none bg-gray-300" />
      </div>
    </article>
  );
};

export const LatestNewsAsideLoader = () => {
  <div className="bg-card w-100 shrink-0 grow-0 overflow-hidden rounded-xl border shadow-sm">
    {/* Header */}
    <div className="border-b px-4 py-5">
      <Skeleton className="h-6 w-32" />
    </div>

    {/* News List */}
    <div className="space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-5">
          {/* Image */}
          <Skeleton className="h-[70px] w-[100px] shrink-0 rounded-xl" />

          {/* Title */}
          <div className="flex-1">
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
      ))}
    </div>
  </div>;
};

export const PopularPostsLoader = () => {
  return (
    <div role="status" aria-label="Popüler haberler yükleniyor">
      <span className="sr-only">Popüler haberler yükleniyor</span>
      <div className="mb-6 border-b border-gray-300 pb-6">
        <Skeleton className="h-6 w-52 rounded-none bg-gray-200" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <article key={index} className="flex w-full gap-5 md:items-stretch">
            <Skeleton className="h-[103px] w-[125px] shrink-0 rounded-none bg-gray-200" />
            <div className="flex min-w-0 flex-1 flex-col items-start justify-start gap-1 text-sm">
              <Skeleton className="h-4 w-28 rounded-none bg-gray-200" />
              <div className="w-full space-y-1">
                <Skeleton className="h-5 w-full rounded-none bg-gray-200" />
                <Skeleton className="h-5 w-4/5 rounded-none bg-gray-200" />
              </div>
              <Skeleton className="h-4 w-24 rounded-none bg-gray-200" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const CategoryListWithNewsCountLoader = () => {
  return (
    <div role="status" aria-label="Kategoriler yükleniyor">
      <span className="sr-only">Kategoriler yükleniyor</span>
      <div className="mb-3 border-b border-gray-300 pb-3">
        <Skeleton className="h-7 w-36 rounded-none bg-gray-200" />
      </div>
      <ul className="flex w-full flex-col gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex w-full items-center justify-between p-1"
          >
            <Skeleton className="h-4 w-2/3 rounded-none bg-gray-200" />
            <Skeleton className="h-4 w-8 rounded-none bg-gray-200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const DatatableLoader = () => {
  const columns = 7;
  const rows = 5;

  return (
    <div className="w-full space-y-5 dark:**:data-[slot=skeleton]:bg-white">
      {/* Üst Alan */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Skeleton className="h-8 w-100 rounded-md" />
          <Skeleton className="h-8 w-38 rounded-md" />
        </div>

        <Skeleton className="h-8 w-33 rounded-md" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton
                    className={
                      i === 0 ? "size-5" : i === 6 ? "h-4 w-16" : "h-4 w-24"
                    }
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    {colIndex === 0 ? (
                      <Skeleton className="size-5 rounded" />
                    ) : colIndex === 5 ? (
                      <Skeleton className="h-8 w-28 rounded-md" />
                    ) : colIndex === 6 ? (
                      <div className="flex items-center gap-4">
                        <Skeleton className="size-6 rounded-md" />
                        <Skeleton className="size-6 rounded-md" />
                      </div>
                    ) : (
                      <Skeleton
                        className={
                          colIndex === 1
                            ? "h-4 w-12"
                            : colIndex === 2
                              ? "h-4 w-32"
                              : "h-4 w-24"
                        }
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Alt Pagination */}
      <div className="flex items-center justify-between px-2 pt-4">
        <div className="flex items-center gap-8">
          <Skeleton className="h-5 w-52" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-10" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const AdminMenuItemLoader = () => {
  return (
    <div className="border-input flex size-12 items-center justify-center rounded-full border p-4">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export const MainPageTopLoader = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <MainNewsItemLoader key={index} />
  ));
};

export const MainPageFourItemsLoader = () => {
  return Array.from({ length: 4 }).map((_, index) => (
    <MainNewsItemLoader key={index} />
  ));
};

export const LastTwoItemsLoader = () => {
  return Array.from({ length: 2 }).map((_, index) => (
    <BigNewsItemLoader key={index} />
  ));
};
