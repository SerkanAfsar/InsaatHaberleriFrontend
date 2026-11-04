import { getRandomCategoriesWithNews } from "@/actions/category.actions";
import XSmallNewsItem from "@/components/news-item/xsmall-news-item";
import CustomElement from "@/components/utils/custom-element";

export default async function RandomCategoriesWithNews() {
  const result = await getRandomCategoriesWithNews();

  return (
    <CustomElement className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
      {result?.map((category) => {
        return (
          <CustomElement className="flex flex-col gap-6" key={category.id}>
            <CustomElement
              as="h4"
              className="border-clientprimary border-l-4 pl-3 text-xl font-bold text-black uppercase"
            >
              {category.categoryName}
            </CustomElement>
            <CustomElement className="flex flex-col gap-4">
              {category.subArticles?.map((article) => {
                return (
                  <XSmallNewsItem
                    item={{ ...article, category: category }}
                    key={article.id}
                  />
                );
              })}
            </CustomElement>
          </CustomElement>
        );
      })}
    </CustomElement>
  );
}
