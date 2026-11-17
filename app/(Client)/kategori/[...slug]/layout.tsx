import { getCategoryDetail } from "@/actions/category.actions";

import LayoutContent from "@/components/layout/layout-content";

import {
  API_URL,
  BaseFetch,
  GetDetailParameters,
  getErrResult,
  slugUrl,
} from "@/lib";
import { CategoryType } from "@/types/entity.types";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/kategori/[...slug]">) {
  const id = await GetDetailParameters({ params });
  const category = await getCategoryDetail({ id });

  return (
    <LayoutContent id={id} type="Category" category={category}>
      {children}
    </LayoutContent>
  );
}

export async function generateStaticParams() {
  const { entities, success, errors } = await BaseFetch<CategoryType, any>({
    method: "GET",
    requireToken: false,
    url: API_URL.CATEGORIES.AllData,
  });
  if (!success && errors) {
    const err = getErrResult(errors);
    throw new Error(err);
  }
  return (
    entities?.map((item) => ({
      slug: [`${slugUrl(item.categoryName)}`, `${item.id.toString}`],
    })) ?? []
  );
}
