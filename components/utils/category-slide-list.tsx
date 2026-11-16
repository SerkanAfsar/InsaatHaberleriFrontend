"use client";

import { CategoryType } from "@/types/entity.types";
import CustomElement from "./custom-element";
import { useState } from "react";
import { cn } from "@/lib";
import MiddleNewsItem from "../news-item/middle-news-item";

export default function CategorySlideList({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    categories[0],
  );
  if (!activeCategory) return null;
  return (
    <CustomElement className="flex w-full flex-col gap-4">
      <CustomElement className="flex w-full flex-col items-center justify-between bg-gray-100 md:flex-row">
        <CustomElement
          as="span"
          className="bg-clientprimary w-full p-3 text-center font-semibold text-white md:w-auto"
        >
          En Çok Okunanlar
        </CustomElement>
        <CustomElement className="flex flex-col items-center justify-center text-sm md:flex-row">
          {categories.map((item) => (
            <CustomElement
              className={cn(
                "cursor-pointer p-2 text-center font-semibold text-black",
                activeCategory.id == item.id && "text-red-500",
              )}
              onClick={() => setActiveCategory(item)}
              key={item.id}
            >
              {item.categoryName}
            </CustomElement>
          ))}
        </CustomElement>
      </CustomElement>
      {categories.map((elem) => {
        return (
          <CustomElement
            key={elem.id}
            className={cn(
              "mt-4 hidden w-full gap-6 md:grid-cols-2 xl:grid-cols-3",
              elem.id === activeCategory.id && "animate-scroll-fade-in grid",
            )}
          >
            {elem.subArticles?.map((item) => {
              return (
                <MiddleNewsItem
                  item={{ ...item, category: elem }}
                  key={item.id}
                />
              );
            })}
          </CustomElement>
        );
      })}
    </CustomElement>
  );
}
