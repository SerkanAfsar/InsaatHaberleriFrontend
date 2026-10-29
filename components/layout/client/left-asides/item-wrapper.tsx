import CustomElement from "@/components/utils/custom-element";
import { X } from "lucide-react";
import React from "react";

type ItemWrapperProps = {
  title: string;
  selectCount?: number;
  children: React.ReactNode;
  onClick?: () => void;
};
export default function ItemWrapper({
  children,
  selectCount,
  title,
  onClick,
}: ItemWrapperProps) {
  return (
    <CustomElement className="mb-4 rounded-md bg-white shadow last:mb-0">
      <CustomElement
        as="h3"
        className="flex items-center justify-between border-b border-gray-300/50 px-4 py-2 font-semibold text-black"
      >
        {title}
        {(selectCount ?? 0) > 0 && (
          <span className="flex cursor-pointer items-center justify-between gap-2 py-2 text-xs before:absolute">
            {selectCount} (Seçili)
            <X size={18} onClick={onClick} />
          </span>
        )}
      </CustomElement>
      <CustomElement className="p-4">{children}</CustomElement>
    </CustomElement>
  );
}
