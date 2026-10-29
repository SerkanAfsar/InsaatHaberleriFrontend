import CustomElement from "@/components/utils/custom-element";
import Cities from "./cities";
import CompanyTypes from "./company-types";
import { getFullCityList } from "@/actions/cities.actions";
import { getCompanyTypesData } from "@/actions/company-types.actions";
import { getAllWorkerCountsData } from "@/actions/worker-count.actions";
import WorkerCounts from "./worker-counts";
import Districts from "./districts";

import CategoryList from "./category-list";

export default async function LeftAside({
  includeCategory = false,
  isSearchable = false,
}: {
  includeCategory?: boolean;
  isSearchable?: boolean;
}) {
  const [cityResult, companyResult, workerCountsResult] = await Promise.all([
    getFullCityList(),
    getCompanyTypesData(),
    getAllWorkerCountsData(),
  ]);
  return (
    <CustomElement
      as="aside"
      className="shrink-0 grow-0 md:max-w-62 xl:max-w-75"
    >
      <Cities result={cityResult} isSearchable={isSearchable} />
      <Districts isSearchable={isSearchable} />
      {includeCategory && <CategoryList topCategoryId={0} />}
      <CompanyTypes result={companyResult} isSearchable={isSearchable} />
      <WorkerCounts result={workerCountsResult} isSearchable={isSearchable} />
    </CustomElement>
  );
}
