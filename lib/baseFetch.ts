"use server";
import { BaseFetchProps, ResponseResult } from "@/types";
import { cookies } from "next/headers";
import { AppendFormData, EnvValues } from "./utils";

async function getContent<T>(response: Response) {
  const contentHeader = response.headers.get("Content-Type");

  return contentHeader && contentHeader.includes("application/json")
    ? ((await response.json()) as ResponseResult<T>)
    : null;
}

export async function BaseFetch<EntityType, DataType>({
  method,
  url,
  data,
  requireToken = true,
  token,
  formType = "json",
}: BaseFetchProps<EntityType, DataType | undefined>): Promise<
  ResponseResult<EntityType>
> {
  let accessToken = token;
  const newUrl = EnvValues.BaseApiUrl + url;

  if (requireToken && !token) {
    const cookieStore = await cookies();
    accessToken = cookieStore.get("accessToken")?.value;
  }

  const request = ({
    tokenString,
  }: {
    tokenString: string | undefined;
  }): RequestInit => {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${tokenString}`);

    if (formType == "json") {
      headers.set("Content-Type", "application/json; charset=utf-8");
    }

    const body =
      formType == "json"
        ? JSON.stringify(data)
        : AppendFormData(data as Record<string, string | Blob> | undefined);

    return {
      headers,
      method,
      body,
    };
  };

  try {
    const response = await fetch(newUrl, request({ tokenString: accessToken }));
    const result = await getContent<EntityType>(response);
    if (!result) {
      throw new Error("Backend Not Working");
    }

    return {
      ...result,
      statusCode: result.statusCode || response.status,
    } as ResponseResult<EntityType>;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      entities: null,
      entity: null,
      errors: {
        error: error?.message ?? "Base Fetch Error",
      },
      statusCode: error?.statusCode ?? 0,
    } as ResponseResult<EntityType>;
  }
}
