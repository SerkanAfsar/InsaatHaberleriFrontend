import { getMostPopularArticle } from "@/actions/article.actions";
import BigNewsItem from "@/components/news-item/big-new-item";
import CustomElement from "@/components/utils/custom-element";

export default async function MostPopularArticle({
  categoryId,
  categoryName,
}: {
  categoryId?: number;
  categoryName?: string;
}) {
  const result = await getMostPopularArticle({ categoryId });
  return (
    <>
      <CustomElement
        as="h3"
        className="mb-4 border-b border-gray-300 pb-4 text-lg font-semibold text-black"
      >
        {categoryName} En Çok Okunan
      </CustomElement>
      {result && <BigNewsItem item={result} compType="other" />}
    </>
  );
}
