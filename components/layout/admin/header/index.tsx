import CustomElement from "@/components/utils/custom-element";
import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";
import HeaderUserAccount from "./header-user-account";
import { getMe } from "@/actions/auth.actions";
import { Suspense } from "react";

export default function Header() {
  const func = getMe();
  return (
    <CustomElement
      as="header"
      className="font-exo2 sticky inset-0 z-20 flex h-(--header-height) w-full items-center bg-white/80 shadow backdrop-blur-lg"
    >
      <CustomElement className="container flex flex-wrap items-center justify-center gap-4 sm:justify-between lg:flex-nowrap">
        <HeaderLogo />
        <HeaderNav />
        <Suspense>
          <HeaderUserAccount func={func} />
        </Suspense>
      </CustomElement>
    </CustomElement>
  );
}
