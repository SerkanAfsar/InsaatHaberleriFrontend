import { Suspense } from "react";
import CategoryListContainer from "./_containers/categories-container";
import { MainAdminMenuData } from "@/lib";

export default function Page() {
  return (
    <Suspense>
      <CategoryListContainer dataItem={MainAdminMenuData.Categories} />
    </Suspense>
  );
}
