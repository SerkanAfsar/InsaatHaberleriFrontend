import { getAllCategories } from "@/actions/category.actions";
import HeaderBottomWrapper from "./header-bottom-wrapper";

export default async function HeaderBottom() {
  const entities = await getAllCategories();

  return <HeaderBottomWrapper entities={entities ?? []} />;
}
