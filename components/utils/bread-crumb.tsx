import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export type BreadCrumbProps = {
  title: string;
  urlList?: {
    url: string;
    title: string;
  }[];
};

export default function BreadCrumb({ title, urlList }: BreadCrumbProps) {
  return (
    <section className="w-full bg-white py-4 shadow">
      <div className="container flex items-center justify-between gap-2">
        <h3 className="text-center text-lg font-semibold text-black">
          {title}
        </h3>

        <Breadcrumb className="text-xl!">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/"} title="Anasayfa">
                  Anasayfa
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {urlList?.slice(0, urlList.length - 1).map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.url} title={item.title}>
                      {item.title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>
                {urlList ? urlList[urlList.length - 1].title : title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}
