"use client";

import { getMe } from "@/actions/auth.actions";
import CustomElement from "@/components/utils/custom-element";
import { URL_LIST } from "@/lib";
import { CirclePlus, LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthItems() {
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof getMe>
  > | null>(null);

  useEffect(() => {
    let active = true;

    getMe()
      .then((result) => {
        if (active) setResult(result);
      })
      .catch(() => {
        if (active) setResult(null);
      });

    return () => {
      active = false;
    };
  }, []);

  if (result == null) {
    return (
      <CustomElement className="hidden shrink-0 grow-0 items-center gap-4 lg:flex">
        <CirclePlus size={14} />
      </CustomElement>
    );
  }

  return (
    <CustomElement className="hidden shrink-0 grow-0 items-center gap-4 lg:flex">
      {result?.success && result.entity ? (
        <Link
          href={URL_LIST.Client.ADD_COMPANY}
          className="bg-primary flex items-center justify-center gap-2 rounded-md px-5 py-2 text-sm font-semibold text-white"
        >
          <CirclePlus size={14} />
          <span>
            {result.entity.name} {result.entity.surname} Panel
          </span>
        </Link>
      ) : (
        <>
          {/* <Link
            href={URL_LIST.Client.LOGIN}
            className="gap-2 px-5 py-2 bg-secondary text-primary justify-center rounded-md text-sm font-semibold flex items-center"
          >
            <LogIn size={14} />
            <span>Giriş Yap</span>
          </Link> */}
          <Link
            href={`${URL_LIST.Client.LOGIN}?path=register`}
            className="bg-primary flex items-center justify-center gap-2 rounded-md px-5 py-2 text-sm font-semibold text-white"
          >
            <CirclePlus size={14} />
            <span>Ücretsiz Üye Ol</span>
          </Link>
        </>
      )}
    </CustomElement>
  );
}
