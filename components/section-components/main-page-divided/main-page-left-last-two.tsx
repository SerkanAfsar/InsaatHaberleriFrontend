import { getLastPaginatedNews } from "@/actions/article.actions";
import BigNewsItem from "../../news-item/big-new-item";

export default async function MainPageLeftLastTwo() {
  const result = await getLastPaginatedNews({ offset: 7, count: 2 });

  return (
    <>
      {result?.map((item) => {
        return <BigNewsItem item={item} key={item.id} />;
      })}
    </>
  );
}
