import { formatLocaleDate, getImageFromCdn } from "@/lib";
import { BlogType } from "@/types/entity.types";
import CustomElement from "../utils/custom-element";
import Image from "next/image";

export default function MiddleNewsItem({ item }: { item: BlogType }) {
  const img = getImageFromCdn({ imageId: item.imageId, type: "Medium" });
  return (
    <CustomElement
      as="article"
      className="flex h-full w-full flex-col items-start justify-start gap-2"
    >
      <Image
        src={img!}
        width={270}
        height={190}
        className="h-47 w-full object-cover object-center"
        alt={item.title}
      />
      <CustomElement className="flex w-full items-center justify-between">
        <CustomElement
          as="h4"
          className="bg-clientprimary p-2 text-xs text-white"
        >
          {item.category?.categoryName}
        </CustomElement>
        {item.createdAt && (
          <CustomElement as="span" className="text-xs font-semibold">
            {formatLocaleDate(item.createdAt)}
          </CustomElement>
        )}
      </CustomElement>
      <CustomElement
        as="h5"
        className="line-clamp-2 text-sm font-semibold text-black"
      >
        {item.title}
      </CustomElement>
    </CustomElement>
  );
}
