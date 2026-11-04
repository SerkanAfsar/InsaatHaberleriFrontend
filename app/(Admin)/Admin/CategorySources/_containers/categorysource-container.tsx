"use client";

import DataTableColumnHeader from "@/components/datatables/datatable-column-header";
import DatatableRowActions from "@/components/datatables/datatable-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { AddCategorySourceType, NewsSites } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { CustomDataTable } from "@/components/datatables";
import { CategoryType } from "@/types/entity.types";

import { MainAdminMenuData } from "@/lib";

export default function CategorySourceListContainer() {
  const columns = useMemo<
    ColumnDef<AddCategorySourceType & { id: number; category: CategoryType }>[]
  >(
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
        id: "url",
        accessorKey: "url",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Url" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("url")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Url",
        },
      },
      {
        id: "category.categoryName",
        accessorKey: "category.categoryName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori Adı" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("category.categoryName")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Kategori Adı",
        },
      },
      {
        id: "newsSite",
        accessorKey: "newsSite",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Haber Kaynak" />
        ),
        cell: ({ row }) => {
          const sourceId = row.original.newsSite;
          const val = NewsSites[sourceId];
          return <div>{val}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Kaynak",
        },
      },

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
              dataItem={MainAdminMenuData.CategorySources}
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
      dataItem={MainAdminMenuData.CategorySources}
    />
  );
}
