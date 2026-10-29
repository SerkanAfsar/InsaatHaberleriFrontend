"use server";

import { API_URL } from "@/lib/api-url-data";
import { BaseFetch } from "@/lib/baseFetch";

import { AccessTokenType, LoginType, ResponseResult } from "@/types";
import { cookies } from "next/headers";

export async function loginAction(values: LoginType & { token?: string }) {
  const cookieStore = await cookies();

  const responseResult: ResponseResult<AccessTokenType> = await BaseFetch({
    method: "POST",
    requireToken: false,
    url: API_URL.AUTH.Login,
    data: values,
  });

  if (!responseResult.success) {
    return {
      success: false,
      errors: responseResult.errors,
    };
  }

  const entity = responseResult.entity!;

  cookieStore.set("accessToken", entity.accessToken!, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    expires: new Date(entity.accessTokenExpiration),
    sameSite: "strict",
    path: "/",
  });

  cookieStore.set("refreshToken", entity.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    expires: new Date(entity.refreshTokenExpiration),
    sameSite: "strict",
    path: "/",
  });

  return {
    success: true,
    message: "Başarılı",
  };
}
