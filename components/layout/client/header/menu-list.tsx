"use client";
import CustomElement from "@/components/utils/custom-element";
import { cn } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const menuList = [
  {
    url: "/",
    title: "Anasayfa",
    description: "Firma Rehberi Anasayfa",
    hasContainer: false,
  },
  {
    url: "/hakkimizda",
    title: "Hakkımızda",
    description: "Firma Rehberi Hakkında",
    hasContainer: false,
  },
  {
    url: "/firma-arama",
    title: "Firma Arama",
    description: "Detaylı Firma Arama Sayfası",
    hasContainer: true,
  },
  {
    url: "/blog",
    title: "Blog",
    description: "Sektöre Ait Son Gelişmeler",
    hasContainer: true,
  },
  {
    url: "/iletisim",
    title: "İletişim",
    description: "Bizimle İletişime Geçin",
    hasContainer: true,
  },
] as const;

export default function MenuList() {
  const pathName = usePathname();
  return (
    <CustomElement as="nav" className="hidden lg:block">
      <CustomElement as="ul" className="flex gap-6">
        {menuList.map((item, key) => {
          const condition = item.url == pathName;
          return (
            <li key={key}>
              <Link
                className={cn(
                  "before:bg-primary relative block rounded-md text-[16px] font-semibold text-gray-600 before:absolute before:-bottom-1 before:left-0 before:block before:h-0.5 before:w-0 before:transition-all before:delay-150 before:duration-300 before:content-['']",
                  condition && "before:w-full",
                )}
                href={item.url}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </CustomElement>
    </CustomElement>
  );
}
