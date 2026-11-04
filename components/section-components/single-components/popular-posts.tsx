import { getMainPagePopularPosts } from "@/actions/article.actions";
import XSmallNewsItem from "@/components/news-item/xsmall-news-item";
import CustomElement from "@/components/utils/custom-element";

export default async function PopularPosts({
  categoryId,
}: {
  categoryId: number | null;
}) {
  const result = await getMainPagePopularPosts({ categoryId });
  return (
    <>
      <CustomElement
        as="h3"
        className="mb-6 border-b border-gray-300 pb-6 text-xl font-semibold text-black"
      >
        Popüler Haberler
      </CustomElement>
      <CustomElement className="flex flex-col gap-4">
        {result?.map((item) => {
          return <XSmallNewsItem item={item} key={item.id} />;
        })}
      </CustomElement>
    </>
  );
}
