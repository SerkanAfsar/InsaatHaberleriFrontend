"use client";

import DataTableColumnHeader from "@/components/datatables/datatable-column-header";
import DatatableRowActions from "@/components/datatables/datatable-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { CustomDataTable } from "@/components/datatables";

import { AddAppUserType } from "@/types";
import { MainAdminMenuData } from "@/lib";

export default function MemberListContainer() {
  const columns = useMemo<ColumnDef<AddAppUserType & { appUserId: string }>[]>(
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
        meta: {
          isShown: false,
        },

        size: 10,
      },
      // {
      //   id: "appUserId",
      //   accessorKey: "appUserId",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Id" />
      //   ),
      //   cell: ({ row }) => (
      //     <div className="w-20">{row.getValue("appUserId")}</div>
      //   ),
      //   enableSorting: true,
      //   enableHiding: true,
      //   meta: {
      //     title: "Id Numarası",
      //   },
      // },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="E-Mail" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("email")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Şehir Adı",
        },
      },
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="İsim" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("name")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "İsim",
        },
      },
      {
        id: "surname",
        accessorKey: "surname",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Soyisim" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("surname")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Soyisim",
        },
      },
      //   {
      //     id: "cityName",
      //     accessorFn: (row) => row.city?.cityName,
      //     header: ({ column }) => (
      //       <DataTableColumnHeader column={column} title="Şehir" />
      //     ),
      //     cell: ({ row }) => {
      //       return <div>{row.getValue("cityName")}</div>;
      //     },
      //     enableSorting: false,
      //     enableHiding: true,
      //     meta: {
      //       title: "Şehir",
      //     },
      //   },
      //   {
      //     id: "districtName",
      //     accessorFn: (row) => row.district?.districtName,
      //     header: ({ column }) => (
      //       <DataTableColumnHeader column={column} title="İlçe" />
      //     ),
      //     cell: ({ row }) => {
      //       return <div>{row.getValue("districtName")}</div>;
      //     },
      //     enableSorting: false,
      //     enableHiding: true,
      //     meta: {
      //       title: "İlçe",
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
              dataItem={MainAdminMenuData.Users}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        size: 50,
        meta: {
          updateTitle: "Kullanıcı Güncelleme",
          updateDescription: "Kullanıcı Güncelleme İşlemleri",
        },
      },
    ],
    [],
  );
  return (
    <CustomDataTable columns={columns} dataItem={MainAdminMenuData.Users} />
  );
}
