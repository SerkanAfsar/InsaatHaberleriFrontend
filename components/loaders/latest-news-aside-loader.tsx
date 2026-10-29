import { Skeleton } from "@/components/ui/skeleton";

export default function LatestNewsAsideLoader() {
  return (
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
    </div>
  );
}
