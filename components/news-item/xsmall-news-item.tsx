import { BlogType } from "@/types/entity.types";
import CustomElement from "../utils/custom-element";
import { formatLocaleDate, getImageFromCdn } from "@/lib";
import Image from "next/image";

export default function XSmallNewsItem({ item }: { item: BlogType }) {
  const img = getImageFromCdn({ imageId: item.imageId, type: "Small" });

  return (
    <CustomElement as="article" className="flex w-full gap-4 md:items-stretch">
      <Image
        src={img!}
        width={100}
        height={85}
        className="block h-21 w-25 flex-none shrink-0 grow-0 border border-gray-400 object-cover object-center"
        alt={item.title}
      />
      <CustomElement className="flex flex-col items-stretch justify-stretch gap-1 text-sm">
        <CustomElement as="span" className="text-[12px] text-gray-600">
          {item.category?.categoryName}
        </CustomElement>
        <CustomElement
          as="h4"
          className="line-clamp-2 font-semibold text-black"
        >
          {item.title}
        </CustomElement>
        <CustomElement as="span" className="text-xs text-gray-500">
          {formatLocaleDate(new Date(item.createdAt))}
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
