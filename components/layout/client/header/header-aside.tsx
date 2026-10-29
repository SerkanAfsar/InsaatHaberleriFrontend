"use client";
import CustomElement from "@/components/utils/custom-element";
import { menuList } from "./menu-list";
import Link from "next/link";
import { cn } from "@/lib";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { X } from "lucide-react";
import { useLayoutEffect } from "react";

export type HeaderAsideProps = {
  opened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function HeaderAside({ opened, setIsOpened }: HeaderAsideProps) {
  useLayoutEffect(() => {
    if (opened) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [opened]);

  return (
    <CustomElement
      as="aside"
      className={cn(
        "invisible fixed inset-0 block h-full w-full opacity-0",
        opened && "visible opacity-100",
      )}
    >
      <CustomElement
        className={cn(
          "fixed inset-0 h-full w-full translate-x-[101%] bg-black/40 transition-all duration-300",
          opened && "translate-x-0",
        )}
      >
        <CustomElement
          className={cn(
            "absolute top-0 right-0 bottom-0 w-65 translate-x-[101%] bg-white shadow transition-all delay-500",
            opened && "translate-x-0",
          )}
        >
          <CustomElement className="bg-primary absolute top-0 left-0 z-10 flex size-8 -translate-x-full items-center justify-center p-4">
            <X
              className="shrink-0 grow-0 cursor-pointer text-white"
              size={20}
              onClick={() => setIsOpened(false)}
            />
          </CustomElement>
          <Image src={logo} width={220} height={120} alt="Firma Rehberi" />
          <CustomElement as="nav">
            <CustomElement
              as="ul"
              className="flex flex-col overflow-y-auto overscroll-contain"
            >
              {menuList.map((item, key) => {
                return (
                  <li key={key}>
                    <Link
                      className="block w-full border-b border-gray-200/60 p-2 text-sm text-black"
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </CustomElement>
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
