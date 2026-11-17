import type { AddCategorySourceType } from "@/types/schema.types";
import type { BlogType, CategoryType } from "@/types/entity.types";

export type DashboardSource = AddCategorySourceType & { id: number };

export const TOP_ARTICLE_COUNT = 10;

const numberFormatter = new Intl.NumberFormat("tr-TR");
const percentFormatter = new Intl.NumberFormat("tr-TR", {
  style: "percent",
  maximumFractionDigits: 1,
});

export const formatNumber = (value: number) => numberFormatter.format(value);
export const formatShare = (value: number, total: number) =>
  percentFormatter.format(total > 0 ? value / total : 0);

export function getExternalUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

export function getDashboardStats(
  articles: BlogType[],
  categories: CategoryType[],
  sources: DashboardSource[],
) {
  const sourceCounts = new Map<number, number>();
  const siteCounts = new Map<number, number>();

  for (const source of sources) {
    sourceCounts.set(
      source.categoryId,
      (sourceCounts.get(source.categoryId) ?? 0) + 1,
    );
    siteCounts.set(source.newsSite, (siteCounts.get(source.newsSite) ?? 0) + 1);
  }

  const categoryRows = categories
    .map((category) => ({
      ...category,
      sourceCount: sourceCounts.get(category.id) ?? 0,
    }))
    .sort(
      (a, b) =>
        (b.newsCount ?? 0) - (a.newsCount ?? 0) ||
        a.categoryName.localeCompare(b.categoryName, "tr"),
    );

  return {
    topArticleReads: articles.reduce(
      (total, article) => total + article.readedCount,
      0,
    ),
    categoryRows,
    categoryNames: new Map(
      categories.map((category) => [category.id, category.categoryName]),
    ),
    categoryDistribution: categoryRows
      .filter((category) => (category.newsCount ?? 0) > 0)
      .slice(0, 6),
    categorizedArticleCount: categories.reduce(
      (total, category) => total + (category.newsCount ?? 0),
      0,
    ),
    categoriesWithSources: categories.filter((category) =>
      sourceCounts.has(category.id),
    ).length,
    siteDistribution: Array.from(siteCounts, ([id, count]) => ({
      id,
      count,
    })).sort((a, b) => b.count - a.count || a.id - b.id),
  };
}
