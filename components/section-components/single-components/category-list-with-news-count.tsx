import { getAllCategories } from "@/actions/category.actions";
import CustomElement from "@/components/utils/custom-element";
import { categoryUrlConverter } from "@/lib";
import Link from "next/link";

export default async function CategoryListWithNewsCount() {
  const result = await getAllCategories();
  const lastResult = result
    ?.sort((a, b) => b.newsCount! - a.newsCount!)
    .slice(0, 9);
  return (
    <>
      <CustomElement
        as="h3"
        className="mb-3 border-b border-gray-300 pb-3 text-xl font-semibold text-black"
      >
        Kategoriler
      </CustomElement>
      <CustomElement as="ul" className="flex w-full flex-col gap-1">
        {lastResult?.map((item) => (
          <CustomElement as="li" className="block w-full" key={item.id}>
            <Link
              href={categoryUrlConverter({
                id: item.id,
                title: item.categoryName,
              })}
              title={item.categoryName}
              className="flex w-full items-center justify-between p-1 text-sm"
            >
              <CustomElement as="span" className="font-semibold">
                {item.categoryName}
              </CustomElement>{" "}
              <CustomElement as="span" className="text-sm">
                {item.newsCount}
              </CustomElement>
            </Link>
          </CustomElement>
        ))}
      </CustomElement>
    </>
  );
}
