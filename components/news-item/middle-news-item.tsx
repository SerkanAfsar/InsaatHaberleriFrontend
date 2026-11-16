import {
  categoryUrlConverter,
  formatLocaleDate,
  getImageFromCdn,
  newsUrlConverter,
} from "@/lib";
import { BlogType } from "@/types/entity.types";
import CustomElement from "../utils/custom-element";
import Image from "next/image";
import Link from "next/link";

export default function MiddleNewsItem({ item }: { item: BlogType }) {
  const img = getImageFromCdn({ imageId: item.imageId, type: "Medium" });
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
    <CustomElement
      as="article"
      className="flex h-full w-full flex-col items-start justify-start gap-2"
    >
      <Link href={newsUrl} title={item.title}>
        <Image
          src={img!}
          width={270}
          height={190}
          className="h-47 w-full object-cover object-center"
          alt={item.title}
        />
      </Link>
      <CustomElement className="flex w-full items-center justify-between">
        <CustomElement
          as="h4"
          className="bg-clientprimary p-2 text-xs text-white hover:underline"
        >
          {item.category && (
            <Link title={item.category.categoryName} href={categoryUrl}>
              {item.category?.categoryName}
            </Link>
          )}
        </CustomElement>
        {item.createdAt && (
          <CustomElement as="span" className="text-xs font-semibold">
            {formatLocaleDate(item.createdAt)}
          </CustomElement>
        )}
      </CustomElement>
      <CustomElement
        as="h5"
        className="line-clamp-2 text-sm font-semibold text-black hover:underline"
      >
        <Link title={item.title} href={newsUrl}>
          {item.title}
        </Link>
      </CustomElement>
    </CustomElement>
  );
}
