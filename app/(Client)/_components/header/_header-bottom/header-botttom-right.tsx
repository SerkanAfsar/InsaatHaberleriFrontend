"use client";
import CustomElement from "@/components/utils/custom-element";
import { cn } from "@/lib";
import { CategoryType } from "@/types/entity.types";
import { Menu, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import HeaderSearch from "./header-search";
import { useClickOutside } from "@/hooks/use-click-outside";

export default function HeaderBottomRight({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [opened, setIOpened] = useState<boolean>(false);
  const [searchOpened, setSearchOpened] = useState<boolean>(false);

  const refElem = useRef<HTMLFormElement | null>(null);

  const Component = opened ? X : Menu;
  useClickOutside(refElem, () => setSearchOpened(!searchOpened));
  return (
    <>
      <CustomElement className="flex items-center gap-4">
        <SearchIcon
          className="cursor-pointer"
          onClick={() => setSearchOpened(!searchOpened)}
        />
        <Component
          className="cursor-pointer"
          onClick={() => setIOpened(!opened)}
        />
      </CustomElement>
      <HeaderBottomCategoryList categories={categories} opened={opened} />
      {searchOpened && <HeaderSearch refElem={refElem} />}
    </>
  );
}

function HeaderBottomCategoryList({
  categories,
  opened,
}: {
  categories: CategoryType[];
  opened: boolean;
}) {
  const chunkedCategories = Array.from(
    { length: Math.ceil((categories.length - 6) / 8) },
    (_, i) => categories.slice(6 + i * 8, 6 + (i + 1) * 8),
  );
  return (
    <CustomElement
      className={cn(
        "invisible absolute top-full right-0 left-0 z-10 flex w-full gap-12 bg-white p-8 text-black opacity-0 shadow",
        opened && "animate-menu-fade-in visible opacity-100",
      )}
    >
      {chunkedCategories.map((item, index) => (
        <CustomElement
          as="ul"
          key={index}
          className="flex flex-col gap-4 text-[16px]"
        >
          {item.map((elem) => (
            <CustomElement as="li" key={elem.id}>
              <Link href={"/"}>{elem.categoryName}</Link>
            </CustomElement>
          ))}
        </CustomElement>
      ))}
    </CustomElement>
  );
}
