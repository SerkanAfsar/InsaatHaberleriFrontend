import { CustomComboboxItemProps, EnvDataType, NewsSites } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CustomError } from "./errors";
import { UseFormReturn } from "react-hook-form";
import slug from "slug";
import { decodeJwt } from "jose";

import { AppJwtPayload } from "@/types/jwt.types";
import { notFound } from "next/navigation";

export const slugUrl = (value: string) => {
  if (value) {
    return slug(value, { locale: "tr", trim: true, lower: true });
  }
  return "";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EnvValues: EnvDataType = {
  BaseApiUrl: process.env.BASEAPIURL!,
  SiteName: process.env.SITE_NAME!,
  CDN_ACCOUNT_ID: process.env.NEXT_PUBLIC_CDN_ACCOUNT_ID!,
  CDN_ACCOUNT_TOKEN: process.env.NEXT_PUBLIC_CDN_ACCOUNT_TOKEN!,
  ACCOUNT_KEY: process.env.NEXT_PUBLIC_ACCOUNT_KEY!,
  PaginationCount: Number(process.env.NEXT_PUBLIC_COMPANY_PAGINATION!),
};

type ErrorResult = { [key: string]: string } | null | undefined;

export const getErrResult = (error: ErrorResult): string => {
  if (!error) {
    return "Error Null Geldi";
  }

  if ("error" in error) {
    return error["error"];
  } else {
    const elem = Object.keys(error)[0];
    return error[elem];
  }
};

export function AppendFormData(data?: Record<string, string | Blob>) {
  const formData = new FormData();

  Object.entries(data ?? {}).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });
  return formData;
}

export function setErrors({
  error,
  form,
}: {
  error: CustomError | ErrorResult;
  form: UseFormReturn<any>;
}): void {
  const errorResult = error instanceof CustomError ? error.errorResult : error;

  if (!errorResult) {
    return;
  }

  if ("error" in errorResult) {
    return form.setError("root", { message: errorResult["error"] });
  }

  return Object.entries(errorResult).forEach(([key, value]) => {
    form.setError(key, { message: value });
  });
}

export function getUnauthorizedUrl(pathname: string) {
  return pathname.startsWith("/Admin")
    ? "/admin-login?auth=expired"
    : "/client-login?auth=expired";
}

export const getImageFromCdn = ({
  imageId,
  type,
}: {
  imageId: string | null;
  type: "Big" | "Medium" | "Small" | "ExtraLarge" | "XSmall";
}) => {
  if (!imageId) {
    return null;
  }
  const url = `https://imagedelivery.net/${EnvValues.ACCOUNT_KEY}/${imageId}/${type}`;

  return url;
};

export function getJwtValue(token: string, value: keyof AppJwtPayload) {
  const payload = decodeJwt(token);
  return payload[value];
}

export function getArrayData<T extends object>(
  data: T[] | null,
  idKey: keyof T,
  valueKey: keyof T,
): CustomComboboxItemProps[] {
  return (
    data?.map((item) => ({
      id: item[idKey] as number,
      value: `${item[valueKey] as string}`,
    })) ?? []
  );
}

export function getSubString(text: string, lenght: number = 100) {
  if (text.length < lenght) return text;
  return text.substring(0, lenght) + "...";
}

export const formatLocaleDate = (date: Date): string => {
  return Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export async function GetDetailParameters({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const id = Number(slug[slug.length - 1]);
  if (isNaN(id)) return notFound();
  return id;
}

export const newsSiteOptions: CustomComboboxItemProps[] = Object.entries(
  NewsSites,
)
  .filter(([key]) => Number.isNaN(Number(key)))
  .map(([label, value]) => ({
    value: label,
    id: Number(value),
  }));
