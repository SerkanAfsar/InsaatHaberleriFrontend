import { getLastPaginatedNews } from "@/actions/article.actions";
import MiddleNewsItem from "@/components/news-item/middle-news-item";

export default async function MainPageFourItems() {
  const result = await getLastPaginatedNews({ offset: 3, count: 4 });

  return (
    <>
      {result?.map((item) => (
        <MiddleNewsItem item={item} key={item.id} />
      ))}
    </>
  );
}
