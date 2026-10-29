import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyItemGridLoader() {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="p-4">
        {/* Image */}
        <div className="relative">
          <Skeleton className="h-32 w-full rounded-xl" />

          {/* Category badge */}
          <Skeleton className="absolute top-3 left-3 h-9 w-64 rounded-lg" />
        </div>

        {/* Company name */}
        <Skeleton className="mt-4 h-6 w-56 rounded-md" />

        {/* Informations */}
        <div className="mt-4 space-y-3">
          {/* Address */}
          <div className="flex items-start gap-3">
            <Skeleton className="mt-0.5 size-5 shrink-0 rounded-full" />

            <div className="w-full space-y-2">
              <Skeleton className="h-5 w-[95%]" />
              <Skeleton className="h-5 w-[60%]" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Skeleton className="size-5 shrink-0 rounded-full" />
            <Skeleton className="h-5 w-36" />
          </div>

          {/* Views */}
          <div className="flex items-center gap-3">
            <Skeleton className="size-5 shrink-0 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Category */}
          <div className="flex items-center gap-3">
            <Skeleton className="size-5 shrink-0 rounded-md" />
            <Skeleton className="h-5 w-60" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}
