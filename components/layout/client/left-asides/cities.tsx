"use client";
import ItemWrapper from "./item-wrapper";
import { CustomCombobox } from "@/components/custom-ui/custom-combobox";
import { getArrayData } from "@/lib";
import { useSearchDetail } from "@/store/use-search-detail";
import { ResponseResult } from "@/types";
import { CityType } from "@/types/entity.types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";

export default function Cities({
  result,
  isSearchable = false,
}: {
  result: ResponseResult<CityType>;
  isSearchable?: boolean;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const items = getArrayData(result.entities ?? [], "id", "cityName");
  const setCityId = useSearchDetail((state) => state.setCityId);
  const cityId = useSearchDetail((state) => state.cityId);

  useEffect(() => {
    if (isSearchable) {
      setCityId(Number(searchParams.get("cityId")) ?? undefined);
    } else {
      setCityId(undefined);
    }
  }, [setCityId, searchParams, isSearchable]);

  const handleChange = (val?: number) => {
    if (isSearchable) {
      const params = new URLSearchParams(searchParams.toString());

      if (val) {
        params.set("cityId", val.toString());
      } else {
        params.delete("cityId");
      }
      params.delete("districtId");
      params.delete("page");
      router.push(`${pathName}?${params.toString()}`);
    }

    setCityId(val);
  };

  return (
    <ItemWrapper title="Şehirler">
      <CustomCombobox
        items={items}
        placeHolder="Şehir Seçiniz"
        value={cityId}
        onChange={(val) => handleChange(val)}
      />
    </ItemWrapper>
  );
}
