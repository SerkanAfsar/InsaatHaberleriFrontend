import type { AdminComponents } from "@/lib/admin-components";
import { SortingState } from "@tanstack/react-table";
import * as Lucide from "lucide-react";

export type AdminMenuPageType = {
  url: string;
  validateKey: string;
  title: string;
  apiUrl: `/${string}`;
  subPages?: {
    addUrl: string;
    title: string;
  }[];
  icon?: keyof typeof Lucide;
  component?: keyof typeof AdminComponents;
  deleteUrl?: `/${string}`;
  cacheKeys?: string[];
  addUrl?: string;
  cacheActions?: () => Promise<void>;
};

export type EnvDataType = {
  BaseApiUrl: string;
  SiteName: string;
  CDN_ACCOUNT_ID: string;
  CDN_ACCOUNT_TOKEN: string;
  ACCOUNT_KEY: string;
  PaginationCount: number;
};

export type ResponseResult<T> = {
  entity: T | null;
  entities: T[] | null;
  statusCode: number;
  success: boolean;
  errors: {
    [key: string]: string;
  } | null;
  rowCount?: number;
};

export type GetAllDataServiceType = {
  offset: number;
  count: number;
  globalFilter: string;
  sorting?: SortingState;
  filters: string;
};

export type AccessTokenType = {
  accessToken: string;
  accessTokenExpiration: Date;
  refreshToken: string;
  refreshTokenExpiration: Date;
};

export type BaseFetchProps<EntityType, DataType> = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: DataType;
  url: string;
  requireToken: boolean;
  token?: string;
  formType?: "json" | "formdata";
};

export type CustomComboboxProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
  items: CustomComboboxItemProps[];
  placeHolder: string;
  className?: string;
  error?: boolean;
  setFirst?: boolean;
  icon?: keyof typeof Lucide;
};

export type CustomComboboxItemProps = {
  id: number;
  value: string;
};

export type CustomOptionItemProps = {
  label: string;
  value?: number | string;
  options?: CustomOptionItemProps[];
};

export type LogOutType =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export type AdminMenuDataType = Record<string, AdminMenuPageType>;

export type BaseComponentType = {
  className?: string;
};

export type DetailContainerProps<T> = {
  type: "ADD" | "UPDATE";
  defaultValues?: T;
  id?: string;
};
