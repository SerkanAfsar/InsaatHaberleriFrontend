"use client";

import DataTableColumnHeader from "@/components/datatables/datatable-column-header";
import { CustomDataTable } from "@/components/datatables";
import type { BlogType } from "@/types/entity.types";
import { getImageFromCdn, MainAdminMenuData } from "@/lib";
import { formatLocaleDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Image from "next/image";
import DatatableRowActions from "@/components/datatables/datatable-row-actions";

export default function BlogListContainer() {
  const columns = useMemo<ColumnDef<BlogType>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Id" />
        ),

        enableSorting: true,
        meta: { title: "Id" },
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Başlık" />
        ),
        cell: ({ row }) => (
          <span className="block max-w-sm truncate font-medium text-slate-800">
            {row.original.title}
          </span>
        ),
        enableSorting: true,
        meta: { title: "Başlık" },
      },
      {
        id: "category.categoryName",
        accessorKey: "category.categoryName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori Adı" />
        ),

        enableSorting: true,
        meta: { title: "Kategori Adı" },
      },
      {
        id: "imageId",
        accessorKey: "imageId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Başlık" />
        ),
        cell: ({ row }) => {
          const imageId = row.original.imageId as string | null;

          if (imageId == null) {
            return null;
          }

          const img = getImageFromCdn({ imageId: imageId, type: "Small" });
          if (img == null) {
            return null;
          }
          return <Image src={img} width={200} height={200} alt="" />;
        },
        enableSorting: false,
        meta: { title: "Resim" },
      },
      {
        id: "readedCount",
        accessorKey: "readedCount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Okunma" />
        ),
        cell: ({ row }) => row.original.readedCount,
        enableSorting: true,
        meta: { title: "Okunma" },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Eklenme Tarihi" />
        ),
        cell: ({ row }) => formatLocaleDate(row.original.createdAt),
        enableSorting: true,
        meta: { title: "Eklenme Tarihi" },
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
              dataItem={MainAdminMenuData.Blogs}
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
    <CustomDataTable columns={columns} dataItem={MainAdminMenuData.Blogs} />
  );
}
