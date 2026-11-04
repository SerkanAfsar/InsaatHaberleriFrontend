"use client";
import CustomElement from "@/components/utils/custom-element";

export default function FooterBottom() {
  return (
    <CustomElement
      as="section"
      className="font-opensans flex w-full items-center justify-center border-t border-b border-gray-100/10 py-5 text-[14px] text-[#9e9e9e]"
    >
      © Copyrights {new Date().getFullYear()}. Tüm Hakları Saklıdır.
    </CustomElement>
  );
}
