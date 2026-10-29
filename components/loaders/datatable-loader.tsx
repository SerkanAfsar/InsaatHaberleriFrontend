import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function DatatableLoader() {
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
}
