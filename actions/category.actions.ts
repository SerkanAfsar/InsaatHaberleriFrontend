import { API_URL, BaseFetch, CACHE_TAGS, getErrResult } from "@/lib";
import { CategoryType } from "@/types/entity.types";
import { cacheLife, cacheTag } from "next/cache";

export async function getAllCategories() {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.CATEGORIES.ALL_CATEGORIES);

  const { entities, success, errors } = await BaseFetch<CategoryType, any>({
    method: "GET",
    requireToken: false,
    url: `${API_URL.CATEGORIES.AllData}`,
  });
  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }

  return entities;
}

export async function getCategoryDetail({ id }: { id: number }) {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.CATEGORIES.ALL_CATEGORIES);
  cacheTag(`${CACHE_TAGS.CATEGORIES.ALL_CATEGORIES}:${id}`);

  const { entity, errors, success } = await BaseFetch<CategoryType, any>({
    method: "GET",
    requireToken: false,
    url: API_URL.CATEGORIES.Detail(id),
  });

  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }
  return entity;
}

export async function getMostReadedCategories() {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.CATEGORIES.MOST_READED);

  const { entities, success, errors } = await BaseFetch<CategoryType, any>({
    method: "GET",
    requireToken: false,
    url: `${API_URL.CATEGORIES.MostReaded}`,
  });
  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }

  return entities;
}

export async function getRandomCategoriesWithNews() {
  "use cache";
  cacheLife("days");

  const { entities, success, errors } = await BaseFetch<CategoryType, any>({
    method: "GET",
    requireToken: false,
    url: `${API_URL.CATEGORIES.RandomCategories}`,
  });
  if (!success && errors) {
    const errResult = getErrResult(errors);
    throw new Error(errResult);
  }

  return entities;
}
