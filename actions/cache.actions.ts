"use server";

import { revalidateTag, cacheTag, cacheLife } from "next/cache";
import { BaseFetch } from "@/lib/baseFetch";
import { CategoryType, BlogType } from "@/types/entity.types";
import { CACHE_TAGS } from "@/lib";

export async function revalidateKeys(keys: string[]) {
  for (const item of keys) {
    revalidateTag(item, "default");
  }
}

export async function updateNewsCacheAction() {
  revalidateTag(CACHE_TAGS.ARTICLES.ARTICLE_LIST, "default");
}

export async function getCategoryList() {
  const result = await BaseFetch<CategoryType, any>({
    method: "GET",
    url: "/Categories",
    requireToken: false,
  });
  if (!result.success) {
    throw new Error("Category List Error");
  }
  return result.entities;
}

export async function GetArticleData({ id }: { id: number }) {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.ARTICLES.ARTICLE_LIST);

  const result = await BaseFetch<BlogType, any>({
    method: "GET",
    requireToken: false,
    url: `/Blogs/Paginated?Offset=${(id - 1) * 9}&Count=9&DateSort=true`,
  });
  return result;
}
