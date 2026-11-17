import DetailTopSection from "@/components/section-components/single-components/detail-top-section";
import { AsyncSection } from "../../feedback";
import {
  CategoryListWithNewsCountLoader,
  DetailTopSectionLoader,
  PopularPostsLoader,
} from "../../loaders";
import MainPageAdvertisement from "../../section-components/main-page-divided/main-page-advertisement";
import MostPopularArticle from "../../section-components/single-components/most-popular-article";
import PopularPosts from "../../section-components/single-components/popular-posts";
import RegisterNewsLetter from "../../section-components/single-components/register-newsletter";
import CustomElement from "../../utils/custom-element";
import { CategoryType } from "@/types/entity.types";
import { getArticleDetail } from "@/actions/article.actions";
import { getCategoryDetail } from "@/actions/category.actions";

export default function LayoutContent({
  children,
  id,
  type,
  category,
}: {
  children: React.ReactNode;
  type: "Article" | "Category";
  id: number;
  category?: CategoryType;
}) {
  const Component =
    type == "Article" ? (
      <DetailTopSection
        id={id}
        func={getArticleDetail}
        selectItem="title"
        keyName="category"
      />
    ) : (
      <DetailTopSection
        id={id}
        func={getCategoryDetail}
        selectItem="categoryName"
      />
    );

  return (
    <CustomElement className="container mt-5 mb-10">
      <AsyncSection
        title="Title"
        fallback={<DetailTopSectionLoader />}
        as={"section"}
      >
        {Component}
      </AsyncSection>
      <CustomElement className="mt-5 flex w-full flex-col gap-4 lg:flex-row">
        <CustomElement className="flex-2">{children}</CustomElement>
        <CustomElement as="aside" className="flex-1">
          <MainPageAdvertisement />
          <AsyncSection
            title="Popular"
            className="popularNews"
            fallback={<PopularPostsLoader />}
            as={"section"}
          >
            <PopularPosts
              categoryId={category?.id ?? id}
              categoryName={category?.categoryName}
            />
          </AsyncSection>
          <RegisterNewsLetter />
          <AsyncSection
            title="MostPopularArticle"
            className="categoryWithNews"
            fallback={<CategoryListWithNewsCountLoader />}
          >
            <MostPopularArticle
              categoryId={category?.id ?? id}
              categoryName={category?.categoryName}
            />
          </AsyncSection>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
