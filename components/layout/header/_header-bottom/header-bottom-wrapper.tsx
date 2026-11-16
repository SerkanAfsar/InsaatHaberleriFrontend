"use client";
import { CategoryType } from "@/types/entity.types";
import CustomElement from "@/components/utils/custom-element";
import HeaderBottomLeft from "./header-bottom-left";
import HeaderBottomRight from "./header-botttom-right";
import HeaderAside from "./header-aside";
import useScroll from "@/hooks/use-scroll";
import { useRef } from "react";
import { cn } from "@/lib";

export default function HeaderBottomWrapper({
  entities,
}: {
  entities: CategoryType[];
}) {
  const ref = useRef<HTMLElement>(null);
  const { isScrolled } = useScroll(ref, false, true);

  return (
    <CustomElement
      ref={ref}
      as="section"
      className={cn(
        "bg-clientdark text-lg text-white",
        // isScrolled && "animate-fade-in fixed top-0 right-0 left-0 shadow",
      )}
    >
      <CustomElement className="relative container flex items-center justify-between">
        <HeaderBottomLeft categories={entities} />
        <HeaderBottomRight categories={entities} />
        <HeaderAside categories={entities} />
      </CustomElement>
    </CustomElement>
  );
}
