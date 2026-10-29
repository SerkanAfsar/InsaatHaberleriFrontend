import { API_URL, BaseFetch, CACHE_TAGS } from "@/lib";
import { CategoryType } from "@/types/entity.types";
import { cacheLife, cacheTag } from "next/cache";

export async function getAllCategories() {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.CATEGORIES.ALL_CATEGORIES);

  const result = await BaseFetch<CategoryType, any>({
    method: "GET",
    requireToken: false,

    url: `${API_URL.CATEGORIES.AllData}`,
  });
  return result;
}

export async function getCategoryDetail({ id }: { id: number }) {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.CATEGORIES.ALL_CATEGORIES);
  cacheTag(`${CACHE_TAGS.CATEGORIES.ALL_CATEGORIES}:${id}`);

  const result = await BaseFetch<CategoryType, any>({
    method: "GET",
    requireToken: false,
    url: API_URL.CATEGORIES.Detail(id),
  });
  return result;
}
