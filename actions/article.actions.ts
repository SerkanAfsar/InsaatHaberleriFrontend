import { API_URL, BaseFetch, CACHE_TAGS, getErrResult } from "@/lib";
import { BlogType } from "@/types/entity.types";
import { cacheLife, cacheTag } from "next/cache";

export async function getLastPaginatedNews({
  offset,
  count,
}: {
  offset: number;
  count: number;
}) {
  "use cache";
  cacheTag(CACHE_TAGS.ARTICLES.ARTICLE_LIST);
  cacheTag(`${CACHE_TAGS.ARTICLES.ARTICLE_LIST}:${offset}:${count}`);
  cacheLife("days");

  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("");
  //   }, 5000);
  // });

  const params = new URLSearchParams({
    offset: offset.toString(),
    count: count.toString(),
  });

  const { entities, errors, success } = await BaseFetch<BlogType, any>({
    method: "GET",
    requireToken: false,
    url: `${API_URL.ARTICLES.GetLast}?${params.toString()}`,
  });

  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }
  return entities;
}

export async function getMainPagePopularPosts({
  categoryId,
}: {
  categoryId: number | null;
}) {
  "use cache";
  cacheTag(CACHE_TAGS.ARTICLES.POPULAR_LIST);
  cacheTag(`${CACHE_TAGS.ARTICLES.POPULAR_LIST}:${categoryId}`);
  cacheLife("days");

  const params = new URLSearchParams();
  if (categoryId) {
    params.append("categoryId", categoryId.toString());
  }

  const { entities, errors, success } = await BaseFetch<BlogType, any>({
    method: "GET",
    requireToken: false,
    url: `${API_URL.ARTICLES.Popular}?${params.toString()}`,
  });

  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }
  return entities;
}

export async function getMostPopularArticle() {
  "use cache";
  cacheTag(CACHE_TAGS.ARTICLES.POPULAR_LIST);
  cacheLife("days");

  const { entity, errors, success } = await BaseFetch<BlogType, any>({
    method: "GET",
    requireToken: false,
    url: API_URL.ARTICLES.MostPopular,
  });

  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }
  return entity;
}
