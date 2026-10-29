"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AdminMenuDataType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomAdminBreadCrumb({
  mainNavData,
}: {
  mainNavData: AdminMenuDataType;
}) {
  const pathName = usePathname();

  const pathOne = Object.values(mainNavData).find((elem) => {
    if (
      elem.url == pathName ||
      pathName.includes(elem.url) ||
      elem.subPages?.some((a) => a.addUrl == pathName)
    ) {
      return true;
    }
    return false;
  });

  const pathTwo = pathOne?.subPages?.find(
    (a) => a.addUrl == pathName || pathName.includes(a.addUrl),
  )?.title;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href={"/Admin/Dashboard"}>Anasayfa</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{pathOne?.title}</BreadcrumbPage>
        </BreadcrumbItem>
        {pathTwo && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pathTwo}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
