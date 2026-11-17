import { getAllArticles } from "@/actions/article.actions";
import { getCategoryList } from "@/actions/cache.actions";
import { categoryUrlConverter, newsUrlConverter } from "@/lib";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mainUrl = "https://www.insaathaberleri.org";

  const arr: MetadataRoute.Sitemap = [
    {
      url: mainUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const categories = await getCategoryList();
  if (categories) {
    for (let i = 0; i < categories.length; i++) {
      const categoryItem = categories[i];
      arr.push({
        url: `${mainUrl}/${categoryUrlConverter({ id: categoryItem.id, title: categoryItem.categoryName })}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
      const totalPages = Math.ceil(Number(categoryItem.newsCount ?? 0) / 10);

      for (let k = 1; k <= totalPages; k++) {
        arr.push({
          url: `${mainUrl}/${categoryUrlConverter({ id: categoryItem.id, title: categoryItem.categoryName })}?page=${k}`,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 0.8,
        });
      }
    }
  }

  const articles = await getAllArticles();
  if (articles) {
    for (let i = 0; i < articles.length; i++) {
      const articleItem = articles[i];
      arr.push({
        url: `${mainUrl}/${newsUrlConverter({ id: articleItem.id, categoryName: articleItem.category!.categoryName, title: articleItem.title })}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      });
    }
  }

  return arr;
}
