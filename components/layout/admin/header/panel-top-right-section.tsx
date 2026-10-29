import { cn } from "@/lib/utils";
import { BaseComponentType } from "@/types";
import ChangeTheme from "./change-theme";
import CustomNotificationList from "@/components/layout/admin/header/notification-list";

import HeaderUserAccount from "./header-user-account";
import { getMe } from "@/actions/auth.actions";
import { Suspense } from "react";
import AdminMenuItemLoader from "@/components/loaders/admin-menu-item-loader";

type PanelTopRightSectionProps = BaseComponentType & {};
export default function PanelTopRightSection({
  className,
}: PanelTopRightSectionProps) {
  const func = getMe();
  return (
    <div
      className={cn(
        "mr-4 ml-auto flex items-center justify-center gap-3",
        className,
      )}
    >
      <ChangeTheme />
      <Suspense
        fallback={<div className="border-input size-10 rounded-full border" />}
      >
        <CustomNotificationList title="Duyurular" icon="BellRing" />
      </Suspense>
      <Suspense fallback={<AdminMenuItemLoader />}>
        <HeaderUserAccount func={func} />
      </Suspense>
    </div>
  );
}
