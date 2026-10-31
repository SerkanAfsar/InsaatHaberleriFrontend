import CustomElement from "@/components/utils/custom-element";
import { CategoryType } from "@/types/entity.types";
import Link from "next/link";

export default function HeaderBottomLeft({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <CustomElement as="nav" className="hidden md:block">
      <CustomElement
        as="ul"
        className="flex items-center justify-center text-[16px]"
      >
        <CustomElement as="li" className="block">
          <Link
            href={"/"}
            className="hover:bg-clientprimary -ml-4 block p-4 transition-all"
          >
            Anasayfa
          </Link>
        </CustomElement>
        {categories?.slice(0, 6).map((item) => (
          <CustomElement as="li" className="block" key={item.id}>
            <Link
              href={"/"}
              className="hover:bg-clientprimary block p-4 transition-all"
            >
              {item.categoryName}
            </Link>
          </CustomElement>
        ))}
      </CustomElement>
    </CustomElement>
  );
}
