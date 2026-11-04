import { AsyncSection } from "../../feedback";
import {
  CategoryListWithNewsCountLoader,
  LastTwoItemsLoader,
  PopularPostsLoader,
} from "../../loaders";
import CustomElement from "../../utils/custom-element";
import CategoryListWithNewsCount from "../single-components/category-list-with-news-count";
import MostPopularArticle from "../single-components/most-popular-article";
import PopularPosts from "../single-components/popular-posts";
import RandomCategoriesWithNews from "../single-components/random-categories-with-news";
import RegisterNewsLetter from "../single-components/register-newsletter";
import MainPageAdvertisement from "./main-page-advertisement";
import MainPageLeftLastTwo from "./main-page-left-last-two";

import { MostReadedCategory } from "./most-readed-category";

export default function MainPageDivided() {
  return (
    <CustomElement className="mainPageDivided">
      <CustomElement className="lg:flex-2">
        <AsyncSection
          title="Last 2"
          className="lastTwo"
          fallback={<LastTwoItemsLoader />}
          as={"section"}
        >
          <MainPageLeftLastTwo />
        </AsyncSection>

        <AsyncSection
          title="MostReaded"
          className="mostReaded"
          fallback={<LastTwoItemsLoader />}
          as={"section"}
        >
          <MostReadedCategory />
        </AsyncSection>
        <AsyncSection
          title="Random"
          className="mostReaded"
          fallback={<div>Loading...</div>}
          as={"section"}
        >
          <RandomCategoriesWithNews />
        </AsyncSection>
      </CustomElement>

      <CustomElement className="lg:flex-1">
        <MainPageAdvertisement />
        <AsyncSection
          title="Popular"
          className="popularNews"
          fallback={<PopularPostsLoader />}
          as={"section"}
        >
          <PopularPosts categoryId={null} />
        </AsyncSection>
        <AsyncSection
          title="Categories"
          className="categoryWithNews"
          fallback={<CategoryListWithNewsCountLoader />}
        >
          <CategoryListWithNewsCount />
        </AsyncSection>
        <RegisterNewsLetter />
        {/* <AsyncSection
          title="MostPopularArticle"
          className="categoryWithNews"
          fallback={<CategoryListWithNewsCountLoader />}
        >
          <MostPopularArticle />
        </AsyncSection> */}
      </CustomElement>
    </CustomElement>
  );
}
