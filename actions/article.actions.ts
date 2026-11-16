import { API_URL, BaseFetch, CACHE_TAGS, getErrResult } from "@/lib";
import { BlogType } from "@/types/entity.types";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

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

export async function getMostPopularArticle({
  categoryId,
}: {
  categoryId?: number;
}) {
  "use cache";
  cacheTag(CACHE_TAGS.ARTICLES.POPULAR_LIST);
  cacheTag(`${CACHE_TAGS.ARTICLES.POPULAR_LIST}:${categoryId}`);
  cacheLife("days");

  const params = new URLSearchParams();
  if (categoryId) {
    params.append("categoryId", categoryId.toString());
  }

  const { entity, errors, success } = await BaseFetch<BlogType, any>({
    method: "GET",
    requireToken: false,
    url: `${API_URL.ARTICLES.MostPopular}?${categoryId ? params.toString() : ""}`,
  });

  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }
  return entity;
}

export async function getArticlesByCategoryIdPaginated({
  categoryId,
  page,
}: {
  categoryId: number;
  page?: number;
}) {
  const params = new URLSearchParams({
    categoryId: categoryId.toString(),
    offSet: (((page ?? 1) - 1) * 10).toString(),
    count: "10",
    dateSort: "true",
  });

  const { success, errors, entities, rowCount, statusCode } = await BaseFetch<
    BlogType,
    any
  >({
    method: "GET",
    requireToken: false,
    url: `${API_URL.ARTICLES.Paginated}?${params.toString()}`,
  });
  if (!success && statusCode == 404) {
    return notFound();
  }

  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }
  return { entities, rowCount };
}

export async function getArticleDetail({ id }: { id: number }) {
  "use cache";
  cacheTag(CACHE_TAGS.ARTICLES.ARTICLE_DETAIL({ id }));
  cacheLife("max");

  const { entity, errors, statusCode, success } = await BaseFetch<
    BlogType,
    any
  >({
    method: "GET",
    requireToken: false,
    url: API_URL.ARTICLES.Detail({ id }),
  });
  if (!success && statusCode == 404) {
    return notFound();
  }
  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }
  return entity;
}

// export async function increaseArticleReadCount({ id }: { id: number }) {
//   const { entity, errors, statusCode, success } = await BaseFetch<
//     BlogType,
//     any
//   >({
//     method: "POST",
//     requireToken: false,
//     url: API_URL.ARTICLES.IncreaseReadCount({ id }),
//   });
//   if (!success && statusCode == 404) {
//     throw new Error("Article Not Found");
//   }
//   if (!success && errors) {
//     const errResult = getErrResult(errors);
//     throw new Error(errResult);
//   }
//   revalidateKeys([
//     `${CACHE_TAGS.ARTICLES.ARTICLE_DETAIL({ id })}`,
//     CACHE_TAGS.ARTICLES.POPULAR_LIST,
//     CACHE_TAGS.CATEGORIES.MOST_READED,
//   ]);
//   return entity;
// }
