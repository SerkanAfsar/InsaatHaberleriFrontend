import { getMostPopularArticle } from "@/actions/article.actions";
import BigNewsItem from "@/components/news-item/big-new-item";
import CustomElement from "@/components/utils/custom-element";

export default async function MostPopularArticle() {
  const result = await getMostPopularArticle();
  return (
    <>
      <CustomElement
        as="h3"
        className="mb-4 border-b border-gray-300 pb-4 text-xl font-semibold text-black"
      >
        En Çok Okunan
      </CustomElement>
      <BigNewsItem item={result!} compType="other" />
    </>
  );
}
