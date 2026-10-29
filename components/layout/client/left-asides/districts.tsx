"use client";
import { CustomCombobox } from "@/components/custom-ui/custom-combobox";
import ItemWrapper from "./item-wrapper";
import { useSearchDetail } from "@/store/use-search-detail";
import { useEffect, useState } from "react";
import { API_URL, BaseFetch, getArrayData } from "@/lib";
import { DistrictType } from "@/types/entity.types";
import { CustomComboboxItemProps } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

import { useRouter } from "nextjs-toploader/app";

export default function Districts({
  isSearchable,
}: {
  isSearchable?: boolean;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<CustomComboboxItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cityId = useSearchDetail((state) => state.cityId);
  const districtId = useSearchDetail((state) => state.districtId);
  const setDistrictId = useSearchDetail((state) => state.setDistrictId);

  useEffect(() => {
    if (isSearchable && data.length) {
      setDistrictId(Number(searchParams.get("districtId")) ?? undefined);
    } else {
      setDistrictId(undefined);
    }
  }, [setDistrictId, isSearchable, searchParams, data]);

  const handleChange = (val?: number) => {
    if (isSearchable) {
      const params = new URLSearchParams(searchParams.toString());

      if (val) {
        params.set("districtId", val.toString());
      } else {
        params.delete("districtId");
      }
      params.delete("page");

      router.push(`${pathName}?${params.toString()}`);
    }

    setDistrictId(val);
  };

  useEffect(() => {
    if (cityId) {
      const getDAta = async () => {
        setIsLoading(true);
        const result = await BaseFetch<DistrictType, any>({
          method: "GET",
          requireToken: false,
          url: API_URL.DISTRICTS.GetByCityId(cityId),
        });
        if (result.success) {
          setData(getArrayData(result.entities ?? [], "id", "districtName"));
        }
        setIsLoading(false);
      };
      setDistrictId(undefined);
      getDAta();
    }
  }, [cityId, setDistrictId]);

  if (!cityId) return null;

  return (
    <ItemWrapper title="İlçeler">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CustomCombobox
          items={data}
          value={districtId}
          placeHolder="İlçe Seçiniz"
          onChange={(val) => handleChange(val)}
        />
      )}
    </ItemWrapper>
  );
}
