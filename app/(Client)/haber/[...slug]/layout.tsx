import { getArticleDetail } from "@/actions/article.actions";
import { AsyncSection } from "@/components/feedback";
import LayoutContent from "@/components/layout/layout-content";
import { DetailTopSectionLoader } from "@/components/loaders";

import DetailTopSection from "@/components/section-components/single-components/detail-top-section";

import CustomElement from "@/components/utils/custom-element";
import {
  API_URL,
  BaseFetch,
  GetDetailParameters,
  getErrResult,
  slugUrl,
} from "@/lib";
import { BlogType } from "@/types/entity.types";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/haber/[...slug]">) {
  const id = await GetDetailParameters({ params });

  const article = await getArticleDetail({ id });
  if (!article) return notFound();

  return (
    <LayoutContent
      id={id}
      category={article.category ?? undefined}
      type="Article"
    >
      {children}
    </LayoutContent>
  );
}

export async function generateStaticParams() {
  const { entities, errors, success } = await BaseFetch<BlogType, any>({
    method: "GET",
    requireToken: false,
    url: API_URL.ARTICLES.All,
  });
  if (!success && errors) {
    const err = getErrResult(errors);
    throw new Error(err);
  }
  return (
    entities?.map((item) => ({
      slug: [
        `${slugUrl(item.category!.categoryName)}`,
        `${slugUrl(item.title)}`,
        `${item.id.toString}`,
      ],
    })) ?? []
  );
}
