import CustomElement from "@/components/utils/custom-element";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogItemLoader() {
  return (
    <CustomElement
      as="article"
      className="relative flex w-full flex-col overflow-hidden rounded-md"
    >
      <CustomElement as="header" className="relative">
        {/* Image - daha koyu */}
        <Skeleton className="h-50 w-full rounded-none bg-gray-300" />

        {/* Category */}
        <Skeleton className="absolute top-2 left-2 h-7 w-16 rounded-md bg-gray-300" />
      </CustomElement>

      <CustomElement className="flex flex-auto flex-col border border-gray-200 bg-white p-6">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-2/3" />
        </div>

        {/* Description */}
        <div className="my-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Read More */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="size-[18px] rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <Skeleton className="h-4 w-20" />

          <div className="flex items-center gap-2">
            <Skeleton className="size-[15px] rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CustomElement>
    </CustomElement>
  );
}
