import { DatatableRowActionProps } from "@/types";
import DataTableDeleteComponent from "./datatable-delete-component";
import DatatableUpdateComponent from "./datatable-update-component";

export default function DatatableRowActions<TData extends object>({
  row,
  table,
  dataItem,
  deleteCacheKeys,
  ...rest
}: DatatableRowActionProps<TData>) {
  const rowOriginal = row.original as any;

  const newId = rowOriginal.id ?? rowOriginal.userId ?? rowOriginal.roleId;

  return (
    <div className="flex items-center justify-start gap-4">
      <DatatableUpdateComponent id={newId} dataItem={dataItem} {...rest} />
      <DataTableDeleteComponent
        row={row}
        table={table}
        dataItem={dataItem}
        deleteCacheKeys={deleteCacheKeys}
      />
    </div>
  );
}
