import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { EnvValues, getJwtValue } from "./lib/utils";
import { AccessTokenType, ResponseResult } from "./types";
import { RoleConstants, URL_LIST } from "./lib/data";

const redirectTo = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  if (pathName.includes("/Admin"))
    return NextResponse.redirect(
      new URL(`${URL_LIST.Admin.LOGIN}?auth=UnAuth`, request.url),
    );
  else if (pathName.includes("/client-admin"))
    return NextResponse.redirect(new URL(URL_LIST.Client.LOGIN, request.url));
  else
    return NextResponse.redirect(new URL(URL_LIST.Client.LOGIN, request.url));
};

const roleResult = (req: NextRequest, token: string) => {
  const values = getJwtValue(
    token,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  );

  const rolesArr = Array.isArray(values)
    ? (values as string[])
    : [values as string];

  const pathName = req.nextUrl.pathname;
  const rootAdminCondition = rolesArr.includes(RoleConstants.RootAdmin);

  if (pathName.includes("/Admin/") && !rootAdminCondition) {
    return NextResponse.redirect(new URL(URL_LIST.Admin.LOGIN, req.nextUrl));
  }

  return null;
};

async function isValidToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return true;
  } catch {
    return false;
  }
}

// export async function proxy(request: NextRequest) {
//   const token = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;
//   const res = NextResponse.next();

//   if (!token && !refreshToken && request.method == "GET") {
//     return redirectTo(request);
//   }

//   if (token && (await isValidToken(token))) {
//     const roleResponse = roleResult(request, token);

//     if (roleResponse) {
//       return roleResponse;
//     }

//     return res;
//   }

//   if (!refreshToken && request.method === "GET") {
//     return redirectTo(request);
//   }

//   const response = await fetch(`${EnvValues.BaseApiUrl}/Auth/refreshToken`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//     },
//     body: JSON.stringify(refreshToken),
//   });

//   if (response.ok) {
//     const result = (await response.json()) as ResponseResult<AccessTokenType>;

//     if (!result.success && request.method == "GET") {
//       return redirectTo(request);
//     }
//     const data = result.entity as AccessTokenType;
//     res.cookies.set("accessToken", data.accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV == "production",
//       expires: new Date(data.accessTokenExpiration),
//       sameSite: "strict",
//       path: "/",
//     });

//     res.cookies.set("refreshToken", data.refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV == "production",
//       expires: new Date(data.refreshTokenExpiration),
//       sameSite: "strict",
//       path: "/",
//     });
//     return res;
//   }
//   if (request.method == "GET") {
//     return redirectTo(request);
//   }

//   return res;
// }

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 1. Access token geçerliyse devam et
  if (token && (await isValidToken(token))) {
    const roleResponse = roleResult(request, token);

    if (roleResponse) {
      return roleResponse;
    }

    return NextResponse.next();
  }

  // 2. Refresh token yoksa girişe yönlendir
  if (!refreshToken) {
    return redirectTo(request);
  }

  try {
    // 3. Access token geçersiz veya expire olmuşsa yenile
    const response = await fetch(`${EnvValues.BaseApiUrl}/Auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(refreshToken),
      cache: "no-store",
    });

    if (!response.ok) {
      return redirectTo(request);
    }

    const result = (await response.json()) as ResponseResult<AccessTokenType>;

    if (!result.success || !result.entity) {
      return redirectTo(request);
    }

    const data = result.entity;

    // 4. Yeni token doğrulaması
    if (!(await isValidToken(data.accessToken))) {
      return redirectTo(request);
    }

    // 5. Yeni token üzerinden rol kontrolü
    const roleResponse = roleResult(request, data.accessToken);

    if (roleResponse) {
      return roleResponse;
    }

    // 6. Cookie güncelle
    const res = NextResponse.next();

    res.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(data.accessTokenExpiration),
      sameSite: "strict",
      path: "/",
    });

    res.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(data.refreshTokenExpiration),
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Refresh token error:", error);

    return redirectTo(request);
  }
}

export const config = {
  matcher: ["/Admin/((?!Login$).*)", "/client-admin/((?!login$).*)"],
};
