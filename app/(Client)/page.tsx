import { AsyncSection } from "@/components/feedback";
import {
  MainNewsItemLoader,
  MainPageFourItemsLoader,
  MainPageTopLoader,
} from "@/components/loaders";

import MainPageDivided from "@/components/section-components/main-page-divided";
import MainPageFourItems from "@/components/section-components/single-components/main-page-four-items";
import MainPageTop from "@/components/section-components/single-components/main-page-top";

import CustomElement from "@/components/utils/custom-element";

export default function Home() {
  return (
    <CustomElement className="container">
      <AsyncSection
        title="Main Page Top"
        as="section"
        className="mainPageTop"
        fallback={<MainPageTopLoader />}
      >
        <MainPageTop />
      </AsyncSection>
      <AsyncSection
        title="Main Page Top Bottom"
        as="section"
        className="mainPageTopBottom"
        fallback={<MainPageFourItemsLoader />}
      >
        <MainPageFourItems />
      </AsyncSection>
      <MainPageDivided />
    </CustomElement>
  );
}
