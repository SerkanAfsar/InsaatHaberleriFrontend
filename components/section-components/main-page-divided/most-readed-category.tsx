import { getMostReadedCategories } from "@/actions/category.actions";
import CategorySlideList from "@/components/utils/category-slide-list";

export async function MostReadedCategory() {
  const result = await getMostReadedCategories();

  return (
    <>
      <CategorySlideList categories={result ?? []} />
    </>
  );
}
