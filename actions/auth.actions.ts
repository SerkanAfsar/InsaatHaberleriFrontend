"use server";
import { API_URL } from "@/lib";
import { BaseFetch } from "@/lib/baseFetch";

import {
  LogOutType,
  AddAppUserType,
  RegisterClientMemberType,
  ResponseResult,
  AccessTokenType,
  ForgotPasswordType,
} from "@/types";
import { cookies } from "next/headers";

export async function getMe() {
  const result = await BaseFetch<AddAppUserType, any>({
    method: "GET",
    url: API_URL.AUTH.me,
    requireToken: true,
  });
  return result;
}

// export async function changePasswordAction(values: ChangePasswordType) {
//   const result = await BaseFetch<unknown, UpdatePasswordType>({
//     method: "POST",
//     url: API_URL.AUTH.ChangePassword.apiUrl,
//     requireToken: true,
//     data: values,
//   });

//   return { success: result.success, errors: result.errors };
// }

// export async function resetPasswordAction(
//   values: ResetPasswordType & { email: string; token: string },
// ) {
//   const result = await BaseFetch<
//     unknown,
//     ResetPasswordType & {
//       eMail: string;
//       token: string;
//     }
//   >({
//     method: "POST",
//     url: AUTH_URL_DATA.resetPassword,
//     requireToken: false,
//     data: {
//       eMail: values.email,
//       token: values.token,
//       newPassword: values.newPassword,
//       newPasswordConfirm: values.newPasswordConfirm,
//     },
//   });

//   return { success: result.success, errors: result.errors };
// }

// export async function forgotPasswordAction(
//   values: ForgotPasswordType & { token?: string },
// ) {
//   const result = await BaseFetch<unknown, ForgotPasswordType>({
//     method: "POST",
//     url: AUTH_URL_DATA.forgotPassword,
//     requireToken: false,
//     data: values,
//   });

//   return { success: result.success, errors: result.errors };
// }

export async function forgotPasswordAction(
  values: ForgotPasswordType & { token?: string },
) {
  const result = await BaseFetch<unknown, ForgotPasswordType & { token?: string }>({
    method: "POST",
    url: API_URL.AUTH.forgotPassword,
    requireToken: false,
    data: values,
  });

  return { success: result.success, errors: result.errors };
}

export async function LogOutAction(): Promise<LogOutType> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { success, errors } = await BaseFetch({
    method: "POST",
    url: API_URL.AUTH.revoke,
    requireToken: false,
    data: refreshToken,
  });
  if (success) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return {
      success: true,
      message: "Log Out SuccessFull",
    };
  }
  return {
    success: false,
    message: errors!["error"] as string,
  };
}

export async function createUserAction(
  values: RegisterClientMemberType & { token?: string },
) {
  const cookieStore = await cookies();

  const responseResult: ResponseResult<AccessTokenType> = await BaseFetch({
    method: "POST",
    requireToken: false,
    url: API_URL.AUTH.CreateUser,
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
