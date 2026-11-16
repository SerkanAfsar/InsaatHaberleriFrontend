"use client";

import DataTableColumnHeader from "@/components/datatables/datatable-column-header";
import DatatableRowActions from "@/components/datatables/datatable-row-actions";
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { CustomDataTable } from "@/components/datatables";
import { cn, formatLocaleDate, MainAdminMenuData } from "@/lib";
import { MessageType } from "@/types/entity.types";

export default function MessagesContainer() {
  const columns = useMemo<ColumnDef<MessageType>[]>(
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
        id: "nameSurname",
        accessorKey: "nameSurname",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ad Soyad" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("nameSurname")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Ad Soyad",
        },
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="EMail" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("email")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "EMail",
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tarihi" />
        ),
        cell: ({ row }) => {
          const createdTime = row.original.createdAt;
          const time = formatLocaleDate(new Date(createdTime));
          return <div>{time}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Mesaj Tarihi",
        },
      },
      {
        id: "isReaded",
        accessorKey: "isReaded",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Okundu mu?" />
        ),
        cell: ({ row }) => {
          const readed = row.original.isReaded;
          return (
            <div className={cn(readed === false && "text-lg font-semibold")}>
              {readed === true ? "Okundu" : "Okunmadı"}
            </div>
          );
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Okundu mu?",
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
              dataItem={MainAdminMenuData.Messages}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        size: 50,
        meta: {
          updateTitle: "Mesaj Okuma",
          updateDescription: "Mesaj Okuma İşlemleri",
        },
      },
    ],
    [],
  );
  return (
    <CustomDataTable columns={columns} dataItem={MainAdminMenuData.Messages} />
  );
}
