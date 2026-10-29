"use client";
import CustomElement from "@/components/utils/custom-element";
import MenuList from "./menu-list";
import AuthItems from "./auth-items";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib";
import useScroll from "@/hooks/use-scroll";
import { Menu } from "lucide-react";
import HeaderAside from "./header-aside";
export default function Header() {
  const [opened, setIsOpened] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);
  const { isScrolled } = useScroll(ref);
  return (
    <CustomElement
      ref={ref}
      as="header"
      className={cn(
        "font-roboto block w-full bg-white shadow",
        isScrolled && "animate-fade-in fixed top-0 right-0 left-0 z-40",
      )}
    >
      <CustomElement className="h-header container flex items-center justify-between">
        <CustomElement>
          <Image
            src={logo}
            width={220}
            height={120}
            priority
            alt="Firma Rehberi"
          />
        </CustomElement>
        {/* <Suspense fallback={<div>Loading...</div>}>
          
        </Suspense> */}
        <MenuList />
        <AuthItems />
        <Menu
          className="block cursor-pointer lg:hidden"
          onClick={() => setIsOpened(true)}
        />
        <HeaderAside opened={opened} setIsOpened={setIsOpened} />
      </CustomElement>
    </CustomElement>
  );
}
