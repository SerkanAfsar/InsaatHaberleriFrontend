"use client";
import { ResponseResult } from "@/types";
import { WorkerCountsType } from "@/types/entity.types";
import ItemWrapper from "./item-wrapper";
import CustomElement from "@/components/utils/custom-element";
import CustomCheckBox from "@/components/custom-ui/custom-checkbox";
import { useSearchDetail } from "@/store/use-search-detail";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
export default function WorkerCounts({
  result,
  isSearchable,
}: {
  result: ResponseResult<WorkerCountsType>;
  isSearchable?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const addWorkerCount = useSearchDetail((state) => state.addWorkerCount);
  const removeWorkerCount = useSearchDetail((state) => state.removeWorkerCount);
  const workerCountIds = useSearchDetail((state) => state.workerCountIds);
  const setWorkerCountsAll = useSearchDetail(
    (state) => state.setWorkerCountAll,
  );

  useEffect(() => {
    if (isSearchable) {
      const params = new URLSearchParams(searchParams);
      const values = params.get("workerCounts");
      setWorkerCountsAll(
        values && values.length > 0 ? values.split("-").map(Number) : [],
      );
    } else {
      setWorkerCountsAll([]);
    }
  }, [setWorkerCountsAll, isSearchable]);

  useEffect(() => {
    if (isSearchable) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("workerCounts");
      params.delete("page");
      if (workerCountIds.length > 0) {
        params.append("workerCounts", workerCountIds.join("-"));
      }

      router.push(`${pathName}?${params.toString()}`);
    }
  }, [workerCountIds, isSearchable]);

  return (
    <ItemWrapper
      title="Çalışan Sayısı"
      selectCount={workerCountIds.length}
      onClick={() => setWorkerCountsAll([])}
    >
      <CustomElement className="flex max-h-60 w-full flex-col gap-3 overflow-y-scroll overscroll-contain">
        {result.entities?.map((item) => (
          <CustomCheckBox
            id={item.id}
            title={item.title}
            idTitle={"worker-counts"}
            key={item.id}
            checked={workerCountIds.indexOf(item.id) > -1}
            onCheckBox={(checked) => {
              const id = item.id;
              return checked ? addWorkerCount(id) : removeWorkerCount(id);
            }}
          />
        ))}
      </CustomElement>
    </ItemWrapper>
  );
}
