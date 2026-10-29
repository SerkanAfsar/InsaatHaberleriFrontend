import {
  Column,
  ColumnDef,
  Row,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { AdminMenuPageType } from "./util.types";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  customMeta?: any;
  dataItem: AdminMenuPageType;
  showAddButton?: boolean;
  initialSorting?: SortingState;
};

export interface DatatableColumnHeader<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export type DatatableRowActionProps<TData extends object> = {
  table?: Table<TData>;
  row: Row<TData>;
  dataItem: AdminMenuPageType;
  deleteCacheKeys?: string[];
};

export type AddUpdateContainerProps = {
  type: "ADD" | "UPDATE";
  idNumber?: number | string;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: any;
} & React.HtmlHTMLAttributes<HTMLFormElement>;

export type AddFormRef = {
  submit: () => void;
  reset: () => void;
};

export type AddUpdateComponentType = React.ForwardRefExoticComponent<
  AddUpdateContainerProps & React.RefAttributes<AddFormRef>
>;

export type AddUpdateComponentProps = {
  id?: number | string;
  children?: React.ReactNode;
  dataItem: AdminMenuPageType;
};

export type DeleteComponentProps<TData extends object> = {
  table?: Table<TData>;
  row: Row<TData>;
  dataItem: AdminMenuPageType;
  deleteCacheKeys?: string[];
};
