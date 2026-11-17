import { BlogType } from "@/types/entity.types";
import CustomElement from "../utils/custom-element";
import { categoryUrlConverter, getImageFromCdn, newsUrlConverter } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default function MainNewsItem({ item }: { item: BlogType }) {
  const img = getImageFromCdn({ imageId: item.imageId, type: "Big" });

  const categoryUrl = categoryUrlConverter({
    id: item.category?.id ?? 0,
    title: item.category?.categoryName ?? "",
  });

  const newsUrl = newsUrlConverter({
    categoryName: item.category?.categoryName ?? "",
    id: item.id,
    title: item.title,
  });

  return (
    <CustomElement
      as="article"
      className="relative h-95 min-h-full w-full text-white before:absolute before:z-10 before:size-full before:bg-black/30 before:content-['']"
    >
      <Image
        src={img!}
        width={500}
        height={400}
        className="h-full w-full object-cover object-center"
        alt={item.title}
        priority
      />
      <Link
        href={categoryUrl}
        title={item.category?.categoryName}
        className="bg-clientprimary absolute top-4 left-4 z-20 inline-block w-auto max-w-[calc(100%-4rem)] rounded-md p-2 text-xs hover:underline"
      >
        {item.category?.categoryName}
      </Link>
      <Link
        title={item.title}
        href={newsUrl}
        className="absolute right-4 bottom-4 left-4 z-20 flex min-h-16 items-start text-lg font-semibold hover:underline"
      >
        {item.title}
      </Link>
    </CustomElement>
  );
}
