import CustomElement from "@/components/utils/custom-element";
import { categoryUrlConverter } from "@/lib";
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
            title="Anasayfa"
            className="hover:bg-clientprimary -ml-4 block px-3 py-4 transition-all"
          >
            Anasayfa
          </Link>
        </CustomElement>

        {categories?.slice(0, 5).map((item) => (
          <CustomElement as="li" className="block" key={item.id}>
            <Link
              href={categoryUrlConverter({
                id: item.id,
                title: item.categoryName,
              })}
              title={item.categoryName}
              className="hover:bg-clientprimary block px-3 py-4 text-nowrap transition-all"
            >
              {item.categoryName}
            </Link>
          </CustomElement>
        ))}
        <CustomElement as="li" className="block">
          <Link
            title="İletişim"
            href={"/iletisim"}
            className="hover:bg-clientprimary block px-3 py-4 transition-all"
          >
            İletişim
          </Link>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
