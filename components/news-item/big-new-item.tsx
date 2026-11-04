import { BlogType } from "@/types/entity.types";
import CustomElement from "../utils/custom-element";
import { cn, formatLocaleDate, getImageFromCdn } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default function BigNewsItem({
  item,
  compType = "normal",
}: {
  item: BlogType;
  compType?: "normal" | "other";
}) {
  const img = getImageFromCdn({ imageId: item.imageId, type: "Big" });

  return (
    <CustomElement
      as="article"
      className={cn(
        "flex w-full flex-col items-stretch justify-start gap-4 text-sm md:flex-row",
        compType == "other" && "md:flex-col",
      )}
    >
      <Image
        src={img!}
        width={355}
        height={280}
        className="w-full flex-1 shrink-0 grow-0 object-cover object-center"
        alt={item.title}
      />
      <CustomElement className="flex w-full flex-1 flex-col items-start justify-start gap-3">
        <CustomElement className="flex items-center gap-4">
          <Link href={"/"} className="bg-clientprimary p-1 text-xs text-white">
            {item.category?.categoryName}
          </Link>
          <CustomElement as="span" className="text-xs font-semibold">
            {/* {new Intl.DateTimeFormat("tr-TR", { dateStyle: "full" }).format(
              new Date(item.createdAt),
            )} */}
            {formatLocaleDate(item.createdAt)}
          </CustomElement>
        </CustomElement>
        <CustomElement
          as="h4"
          className="text-left text-[16px] font-semibold text-black"
        >
          {item.title}
        </CustomElement>
        <CustomElement as="p" className="line-clamp-3 text-gray-600">
          {item.subDescription}
        </CustomElement>
        <Link
          href={"/"}
          className="min-w-28 border border-black p-2 text-center text-black transition-all duration-300 hover:bg-black hover:text-white"
        >
          DETAY
        </Link>
      </CustomElement>
    </CustomElement>
  );
}
