"use client";
import CustomElement from "@/components/utils/custom-element";
import { categoryUrlConverter, cn } from "@/lib";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import { CategoryType } from "@/types/entity.types";
import Link from "next/link";

export default function HeaderAside({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <CustomElement className="block py-2 md:hidden">
        <Menu className="cursor-pointer" onClick={() => setOpened(!opened)} />
      </CustomElement>
      <CustomElement
        as="aside"
        className={cn(
          "fixed inset-0 z-40 h-full w-full",
          "transition-all delay-500 duration-500 ease-in",
          opened ? "visible" : "invisible",
        )}
      >
        <CustomElement
          className={cn(
            "absolute inset-0 h-full w-full bg-black/90",
            opened && "animate-scroll-fade-in",
          )}
        ></CustomElement>
        <CustomElement
          className={cn(
            "absolute top-0 right-0 bottom-0 h-full w-full max-w-75 translate-x-full overflow-auto overscroll-contain bg-white transition-all delay-500 duration-500 ease-in-out",
            opened && "translate-x-0",
          )}
        >
          <CustomElement
            onClick={() => setOpened(!opened)}
            className="bg-clientprimary absolute top-0 left-0 flex size-8 cursor-pointer items-center justify-center"
          >
            <X />
          </CustomElement>
          <Image src={logo} width={300} height={200} alt="Logo" />
          <CustomElement
            as="nav"
            className="block w-full text-[14px] font-semibold text-black"
          >
            <CustomElement as="ul" className="flex flex-col">
              <CustomElement as="li" className="block w-full">
                <Link
                  href={"/"}
                  title="Anasayfa"
                  className="hover:bg-clientprimary block w-full border-b border-gray-200 p-2 hover:text-white"
                >
                  Anasayfa
                </Link>
              </CustomElement>
              {categories.map((item) => (
                <CustomElement as="li" key={item.id} className="block w-full">
                  <Link
                    href={categoryUrlConverter({
                      id: item.id,
                      title: item.categoryName,
                    })}
                    title={item.categoryName}
                    className="hover:bg-clientprimary block w-full border-b border-gray-200 p-2 hover:text-white"
                  >
                    {item.categoryName}
                  </Link>
                </CustomElement>
              ))}
              <CustomElement as="li" className="block w-full">
                <Link
                  href={"/iletisim"}
                  title="Anasayfa"
                  className="hover:bg-clientprimary block w-full border-b border-gray-200 p-2 hover:text-white"
                >
                  İletişim
                </Link>
              </CustomElement>
            </CustomElement>
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </>
  );
}
