import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyItemListLoader() {
  return (
    <div
      role="status"
      aria-label="Firma bilgileri yükleniyor"
      className="flex flex-col gap-4 rounded-md bg-white p-4 shadow md:flex-row"
    >
      <div
        aria-hidden="true"
        className="relative w-full shrink-0 grow-0 md:w-50"
      >
        <Skeleton className="h-40 w-full rounded-md" />
        <Skeleton className="bg-background/70 absolute top-2 right-2 left-2 h-7 rounded-sm" />
      </div>

      <div
        aria-hidden="true"
        className="flex w-full min-w-0 flex-auto flex-col"
      >
        <Skeleton className="h-7 w-3/4 max-w-72" />
        <div className="mt-2 mb-4 flex max-w-md flex-col flex-wrap items-start gap-2 md:flex-row lg:mt-4 lg:mb-6 lg:items-center lg:gap-4">
          {["w-32", "w-28", "w-32", "w-36"].map((width, index) => (
            <div key={index} className="flex max-w-full items-center gap-2">
              <Skeleton className="size-[18px] shrink-0 rounded-full" />
              <Skeleton className={`h-5 ${width}`} />
            </div>
          ))}
        </div>
        <div className="mt-auto flex w-full items-center justify-between gap-2">
          <Skeleton className="h-9 w-28 rounded-sm" />
          <Skeleton className="h-8 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
