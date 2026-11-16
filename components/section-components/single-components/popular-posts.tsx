import { getMainPagePopularPosts } from "@/actions/article.actions";
import XSmallNewsItem from "@/components/news-item/xsmall-news-item";
import CustomElement from "@/components/utils/custom-element";

export default async function PopularPosts({
  categoryId,
  categoryName,
}: {
  categoryId: number | null;
  categoryName?: string;
}) {
  const result = await getMainPagePopularPosts({ categoryId });
  return (
    <>
      <CustomElement
        as="h3"
        className="mb-4 border-b border-gray-300 pb-4 text-lg font-semibold text-black"
      >
        {categoryName} Popüler Haberler
      </CustomElement>
      <CustomElement className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {result?.map((item) => {
          return <XSmallNewsItem item={item} key={item.id} />;
        })}
      </CustomElement>
    </>
  );
}
