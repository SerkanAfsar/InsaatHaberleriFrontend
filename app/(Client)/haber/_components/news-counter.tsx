"use client";

import { revalidateKeys } from "@/actions/cache.actions";
import CustomElement from "@/components/utils/custom-element";
import { API_URL, BaseFetch, CACHE_TAGS } from "@/lib";
import { BlogType } from "@/types/entity.types";
import { Book } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewsCounter({
  count,
  newsId,
}: {
  count: number;
  newsId: number;
}) {
  const [value, setValue] = useState<number>(count);

  useEffect(() => {
    const process = async () => {
      const { success, entity } = await BaseFetch<BlogType, any>({
        method: "POST",
        requireToken: false,
        url: `${API_URL.ARTICLES.IncreaseReadCount({ id: newsId })}`,
      });
      if (success && entity) {
        setValue(entity.readedCount);
        revalidateKeys([
          `${CACHE_TAGS.ARTICLES.ARTICLE_DETAIL({ id: newsId })}`,
          CACHE_TAGS.ARTICLES.POPULAR_LIST,
          CACHE_TAGS.CATEGORIES.MOST_READED,
        ]);
      }
    };
    process();
  }, []);

  return (
    <CustomElement className="flex flex-row items-center gap-2">
      <Book size={15} />
      <CustomElement as="span">{value}</CustomElement>
    </CustomElement>
  );
}
