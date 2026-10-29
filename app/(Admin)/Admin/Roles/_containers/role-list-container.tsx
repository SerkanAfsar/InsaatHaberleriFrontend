"use client";

import { CustomDataTable } from "@/components/datatables";
import DataTableColumnHeader from "@/components/datatables/datatable-column-header";
import DatatableRowActions from "@/components/datatables/datatable-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { MainAdminMenuData } from "@/lib";

import { AddRoleType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export default function RoleListContainer() {
  const columns = useMemo<ColumnDef<AddRoleType & { roleId: string }>[]>(
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
        id: "roleId",
        accessorKey: "roleId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="roleId" />
        ),
        cell: ({ row }) => <div className="w-20">{row.getValue("roleId")}</div>,
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Id Numarası",
        },
      },
      {
        id: "roleName",
        accessorKey: "roleName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rol Adı" />
        ),
        cell: ({ row }) => {
          return <div>{row.getValue("roleName")}</div>;
        },
        enableSorting: true,
        enableHiding: true,
        meta: {
          title: "Rol Adı",
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
              dataItem={MainAdminMenuData.Roles}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        size: 50,
        meta: {
          updateTitle: "Rol Güncelleme",
          updateDescription: "Rol Güncelleme İşlemleri",
        },
      },
    ],
    [],
  );
  return (
    <CustomDataTable columns={columns} dataItem={MainAdminMenuData.Roles} />
  );
}
