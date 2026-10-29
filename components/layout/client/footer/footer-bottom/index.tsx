"use client";
import CustomElement from "@/components/utils/custom-element";
import Link from "next/link";

export default function FooterBottom() {
  return (
    <CustomElement className="container flex items-center justify-center py-4 text-sm text-white">
      <CustomElement as="span">
        Copyright © {new Date().getFullYear().toString()} Firma Rehberi. Powered
        By
      </CustomElement>
      <Link href={"#"} className="text-secondary ml-1 underline">
        Serkan Afşar
      </Link>
    </CustomElement>
  );
}
