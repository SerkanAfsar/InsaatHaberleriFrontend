import { getLastPaginatedNews } from "@/actions/article.actions";
import MainNewsItem from "@/components/news-item/main-news-item";

export default async function MainPageTop() {
  const result = await getLastPaginatedNews({ offset: 0, count: 3 });

  return (
    <>
      {result?.map((item) => (
        <MainNewsItem item={item} key={item.id} />
      ))}
    </>
  );
}
