import { formatLocaleDate, getImageFromCdn } from "@/lib";
import { BlogType } from "@/types/entity.types";
import NewsCounter from "../_components/news-counter";
import Image from "next/image";
import CustomElement from "@/components/utils/custom-element";
import { Calendar } from "lucide-react";

export default function NewsDetail({ article }: { article: BlogType }) {
  const img = getImageFromCdn({ imageId: article.imageId, type: "ExtraLarge" });
  return (
    <CustomElement as="article" className="flex w-full flex-col">
      <CustomElement as="header" className="flex w-full flex-col">
        <Image
          src={img ?? ""}
          width={800}
          height={450}
          priority
          className="h-auto w-full object-cover object-center"
          alt={article.title}
        />
        <CustomElement
          as="h2"
          className="mt-4 text-xl font-semibold text-black"
        >
          {article.title}
        </CustomElement>
        <CustomElement className="mt-2 flex w-full flex-row items-center gap-2 text-sm text-gray-500">
          <CustomElement className="flex flex-row items-center gap-2">
            <Calendar size={15} />
            {formatLocaleDate(new Date(article.createdAt))}
          </CustomElement>
          <NewsCounter count={article.readedCount} newsId={article.id} />
        </CustomElement>
      </CustomElement>

      <CustomElement
        className="mt-4 w-full leading-7 font-semibold"
        dangerouslySetInnerHTML={{ __html: article.subDescription }}
      ></CustomElement>
      <CustomElement
        className="article-content mt-2"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      ></CustomElement>
      {article.sourceUrl && (
        <CustomElement
          as="span"
          className="mt-2 flex flex-col items-start justify-start gap-1 text-sm leading-6"
        >
          <CustomElement as="span">Kaynak</CustomElement>
          {article.sourceUrl}
        </CustomElement>
      )}
    </CustomElement>
  );
}
