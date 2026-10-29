"use client";
import ItemWrapper from "./item-wrapper";
import CustomCheckBox from "@/components/custom-ui/custom-checkbox";
import CustomElement from "@/components/utils/custom-element";
import { CompanyType } from "@/types/entity.types";
import { ResponseResult } from "@/types";
import { useSearchDetail } from "@/store/use-search-detail";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";

export default function CompanyTypes({
  result,
  isSearchable = false,
}: {
  result: ResponseResult<CompanyType>;
  isSearchable?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const addCompanyType = useSearchDetail((state) => state.addCompanyType);
  const removeCompanyType = useSearchDetail((state) => state.removeCompanyType);
  const setCompanyTypesAll = useSearchDetail(
    (state) => state.setCompanyTypesAll,
  );
  const companyTypeIds = useSearchDetail((state) => state.companyTypeIds);

  useEffect(() => {
    if (isSearchable) {
      const params = new URLSearchParams(searchParams);
      const values = params.get("companyTypes");
      setCompanyTypesAll(
        values && values.length > 0 ? values.split("-").map(Number) : [],
      );
    } else {
      setCompanyTypesAll([]);
    }
  }, [setCompanyTypesAll, isSearchable]);

  useEffect(() => {
    if (isSearchable) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("companyTypes");
      params.delete("page");
      if (companyTypeIds.length > 0) {
        params.append("companyTypes", companyTypeIds.join("-"));
      }

      router.push(`${pathName}?${params.toString()}`);
    }
  }, [companyTypeIds, isSearchable]);

  return (
    <ItemWrapper
      title="Firma Tipleri"
      selectCount={companyTypeIds.length}
      onClick={() => setCompanyTypesAll([])}
    >
      <CustomElement className="flex max-h-60 w-full flex-col gap-3 overflow-y-scroll overscroll-contain">
        {result.entities?.map((item) => (
          <CustomCheckBox
            id={item.id}
            title={item.title}
            idTitle={"company-types"}
            key={item.id}
            checked={companyTypeIds.indexOf(item.id) > -1}
            onCheckBox={(checked) => {
              const id = item.id;
              return checked ? addCompanyType(id) : removeCompanyType(id);
            }}
          />
        ))}
      </CustomElement>
    </ItemWrapper>
  );
}
