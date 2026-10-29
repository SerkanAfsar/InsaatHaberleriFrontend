"use client";
import CustomElement from "@/components/utils/custom-element";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib";
import { MoveUp } from "lucide-react";
import { useRef } from "react";

export default function ScrollTop() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isScrolled } = useScroll(ref, true);

  return (
    <CustomElement
      ref={ref}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "bg-secondary fixed right-5 bottom-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow transition-all duration-300 hover:bg-white",
        isScrolled ? "animate-scroll-fade-in" : "invisible opacity-0",
      )}
    >
      <MoveUp className="text-primary" />
    </CustomElement>
  );
}
