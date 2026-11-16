import { Suspense } from "react";
import CategoryListContainer from "./_containers/categories-container";

export default function Page() {
  return (
    <Suspense>
      <CategoryListContainer />
    </Suspense>
  );
}
