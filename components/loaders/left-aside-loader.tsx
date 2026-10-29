import { Skeleton } from "@/components/ui/skeleton";

export default function LeftAsideLoader() {
  return (
    <aside className="w-full max-w-75 space-y-4">
      {/* Şehirler */}
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="border-b px-4 py-4">
          <Skeleton className="h-5 w-20" />
        </div>

        <div className="p-4">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      {/* Firma Tipleri */}
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="border-b px-4 py-4">
          <Skeleton className="h-5 w-28" />
        </div>

        <div className="space-y-4 p-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-4 shrink-0 rounded-sm" />

              <Skeleton
                className={`h-4 ${
                  index % 3 === 0 ? "w-28" : index % 3 === 1 ? "w-36" : "w-32"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
