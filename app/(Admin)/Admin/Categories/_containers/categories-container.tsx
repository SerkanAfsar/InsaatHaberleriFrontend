"use client";

import DataTableColumnHeader from "@/components/datatables/datatable-column-header";
import DatatableRowActions from "@/components/datatables/datatable-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { AddCategoryType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { CustomDataTable } from "@/components/datatables";
import { MainAdminMenuData } from "@/lib";

export default function CategoryListContainer() {
  const columns = useMemo<ColumnDef<AddCategoryType & { id: number }>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 10,
      },
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id" />
        ),
        cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Id Numarası",
        },
      },
      {
        id: "categoryName",
        accessorKey: "categoryName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori Adı" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("categoryName")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Kategori Adı",
        },
      },

      //   {
      //     id: "queue",
      //     accessorKey: "queue",
      //     header: ({ column }) => (
      //       <DataTableColumnHeader column={column} title="Sırası" />
      //     ),
      //     cell: ({ row }) => {
      //       return <div>{row.getValue("queue")}</div>;
      //     },
      //     enableSorting: true,
      //     enableHiding: true,
      //     meta: {
      //       title: "Sırası",
      //     },
      //   },
      {
        id: "actions",
        header: () => {
          return <span>İşlemler</span>;
        },
        cell: ({ row, table }) => {
          return (
            <DatatableRowActions
              row={row}
              table={table}
              dataItem={MainAdminMenuData.Categories}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        size: 50,
        meta: {
          updateTitle: "Kategori Güncelleme",
          updateDescription: "Kategori Güncelleme İşlemleri",
        },
      },
    ],
    [],
  );
  return (
    <CustomDataTable
      columns={columns}
      dataItem={MainAdminMenuData.Categories}
    />
  );
}
