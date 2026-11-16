import { BigNewsItemLoader } from "@/components/loaders";
import CategoryDetailWrapper from "./_components/category-detail-wrapper";

export default function Page() {
  return (
    <CategoryDetailWrapper>
      {Array.from({ length: 9 }).map((_, index) => {
        return <BigNewsItemLoader compType="other" key={index} />;
      })}
    </CategoryDetailWrapper>
  );
}
