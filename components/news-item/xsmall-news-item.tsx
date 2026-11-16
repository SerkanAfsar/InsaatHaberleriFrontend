import { BlogType } from "@/types/entity.types";
import CustomElement from "../utils/custom-element";
import {
  categoryUrlConverter,
  formatLocaleDate,
  getImageFromCdn,
  newsUrlConverter,
} from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default function XSmallNewsItem({ item }: { item: BlogType }) {
  const img = getImageFromCdn({ imageId: item.imageId, type: "Small" });

  const newsUrl = newsUrlConverter({
    categoryName: item.category?.categoryName ?? "",
    id: item.id,
    title: item.title,
  });
  const categoryUrl = categoryUrlConverter({
    id: item.category?.id ?? 0,
    title: item.category?.categoryName ?? "",
  });

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
        <Link href={categoryUrl} title={item.category?.categoryName}>
          <CustomElement
            as="span"
            className="text-[12px] text-gray-600 hover:underline"
          >
            {item.category?.categoryName}
          </CustomElement>
        </Link>
        <CustomElement
          as="h4"
          className="line-clamp-2 font-semibold text-black hover:underline"
        >
          <Link href={newsUrl} title={item.title}>
            {item.title}
          </Link>
        </CustomElement>
        <CustomElement as="span" className="text-xs text-gray-500">
          {formatLocaleDate(new Date(item.createdAt))}
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
