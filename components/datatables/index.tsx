"use client";

import { Suspense, use, useState } from "react";
import { io } from "next/cache";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DatatableAddModalComponent from "./datatable-add-modal-component";
import { useGetAllData } from "@/hooks/use-queries";
import type { DataTableProps, GetAllDataServiceType } from "@/types";
import { useRouter } from "nextjs-toploader/app";

type AdminTableQuery = {
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
};

function AdminDataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  query,
  onQueryChange,
  loading,
  error,
  addAction,
  customValidateKey,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  query: AdminTableQuery;
  onQueryChange: (query: AdminTableQuery) => void;
  loading: boolean;
  error?: string;
  addAction?: React.ReactNode;
  customValidateKey?: string;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount,
    state: { sorting: query.sorting, columnFilters: query.columnFilters },
    onSortingChange: (updater) =>
      onQueryChange({
        ...query,
        pageIndex: 0,
        sorting:
          typeof updater === "function" ? updater(query.sorting) : updater,
      }),
    meta: { customValidateKey },
  });
  const pageCount = Math.max(1, Math.ceil(rowCount / query.pageSize));

  return (
    <section className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          className="max-w-sm"
          placeholder="Arama..."
          value={query.globalFilter}
          onChange={(event) =>
            onQueryChange({
              ...query,
              pageIndex: 0,
              globalFilter: event.target.value,
            })
          }
        />
        {addAction}
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Kayıt bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>Toplam {rowCount} kayıt</span>
        <div className="flex items-center gap-2">
          <label htmlFor="admin-table-page-size">Sayfa başına</label>
          <select
            id="admin-table-page-size"
            className="h-9 rounded-md border bg-background px-2"
            value={query.pageSize}
            onChange={(event) =>
              onQueryChange({
                ...query,
                pageIndex: 0,
                pageSize: Number(event.target.value),
              })
            }
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            disabled={query.pageIndex === 0}
            onClick={() =>
              onQueryChange({ ...query, pageIndex: query.pageIndex - 1 })
            }
          >
            Önceki
          </Button>
          <span>
            {query.pageIndex + 1} / {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={query.pageIndex + 1 >= pageCount}
            onClick={() =>
              onQueryChange({ ...query, pageIndex: query.pageIndex + 1 })
            }
          >
            Sonraki
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CustomDataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  return (
    <Suspense
      fallback={
        <section
          className="w-full space-y-4"
          aria-busy="true"
          aria-label="Tablo yükleniyor"
        >
          <div className="h-10 max-w-sm animate-pulse rounded-md bg-muted" />
          <div className="h-48 w-full animate-pulse rounded-md bg-muted" />
        </section>
      }
    >
      <CustomDataTableContent {...props} />
    </Suspense>
  );
}

function CustomDataTableContent<TData, TValue>({
  columns,
  dataItem,
  customMeta,
  showAddButton = true,
  initialSorting = [],
}: DataTableProps<TData, TValue>) {
  use(io());
  const router = useRouter();
  const [query, setQuery] = useState<AdminTableQuery>({
    pageIndex: 0,
    pageSize: 10,
    globalFilter: "",
    sorting: initialSorting,
    columnFilters: [],
  });
  const { customValidateKey } = customMeta ?? {};
  const filters: GetAllDataServiceType = {
    offset: query.pageIndex * query.pageSize,
    count: query.pageSize,
    globalFilter: query.globalFilter,
    sorting: query.sorting,
    filters: JSON.stringify(query.columnFilters),
  };
  const { data, error, isPending } = useGetAllData<TData>(
    `${dataItem.apiUrl}/Paginated`,
    customValidateKey ?? dataItem.validateKey,
    filters,
  );
  const addAction = !showAddButton ? undefined : dataItem.addUrl ? (
    <Button
      variant="default"
      size="lg"
      onClick={() => router.push(dataItem.addUrl!)}
      className="h-auto cursor-pointer p-3"
    >
      Yeni Veri Ekle
    </Button>
  ) : (
    <DatatableAddModalComponent dataItem={dataItem}>
      <Button variant="default" size="lg" className="h-auto cursor-pointer p-3">
        Yeni Veri Ekle
      </Button>
    </DatatableAddModalComponent>
  );

  return (
    <AdminDataTable<TData, TValue>
      columns={columns}
      data={data?.data ?? []}
      rowCount={data?.rowCount ?? 0}
      query={query}
      onQueryChange={setQuery}
      loading={isPending}
      error={error?.message}
      addAction={addAction}
      customValidateKey={customValidateKey}
    />
  );
}
