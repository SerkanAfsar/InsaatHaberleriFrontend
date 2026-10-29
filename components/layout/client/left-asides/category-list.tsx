"use client";
import { CustomCombobox } from "@/components/custom-ui/custom-combobox";
import ItemWrapper from "./item-wrapper";
import { CustomComboboxItemProps } from "@/types";
import { CategoryType } from "@/types/entity.types";
import { API_URL, BaseFetch, getArrayData } from "@/lib";
import { useSearchDetail } from "@/store/use-search-detail";
import { useEffect, useState } from "react";

export default function CategoryList({
  topCategoryId,
}: {
  topCategoryId: number | null;
}) {
  const [categoryList, setCategoryList] = useState<CustomComboboxItemProps[]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const setCategoryId = useSearchDetail((state) => state.setCategoryId);

  // useEffect(() => {
  //   setCategoryId(undefined);
  // }, [pathName]);

  useEffect(() => {
    const process = async () => {
      setSelectedCategory(null);
      setCategoryList([]);
      const result = await BaseFetch<CategoryType, any>({
        method: "GET",
        requireToken: false,
        url: API_URL.CATEGORIES.TopCategories(topCategoryId),
      });
      const data = result.entities ?? [];
      console.log(data, "data is");
      setCategoryList(getArrayData(data, "id", "categoryName"));
    };
    process();
  }, [topCategoryId]);

  if (categoryList.length == 0) return null;

  return (
    <>
      <ItemWrapper title={topCategoryId == 0 ? "Kategori" : "Alt Kategori "}>
        <CustomCombobox
          items={categoryList}
          placeHolder={
            topCategoryId == 0 ? "Kategori Seçiniz" : "Alt Kategori Seçiniz"
          }
          value={selectedCategory ?? undefined}
          onChange={(val) => {
            setCategoryId(val);
            setSelectedCategory(val!);
          }}
        />
      </ItemWrapper>
      {selectedCategory != null && (
        <CategoryList topCategoryId={selectedCategory!} />
      )}
    </>
  );
}
