import { getAllCategories } from "@/actions/category.actions";
import CustomElement from "@/components/utils/custom-element";
import { categoryUrlConverter } from "@/lib";
import Link from "next/link";

export default async function FooterMiddle() {
  const result = await getAllCategories();
  const arr1 = result?.slice(0, 6);
  const arr2 = result?.slice(6, 12);
  const arr3 = result?.slice(12, 18);
  const arr4 = result?.slice(18, 24);
  return (
    <CustomElement as="section" className="block w-full py-10 text-[#9e9e9e]">
      <CustomElement className="container">
        <CustomElement className="grid w-full gap-6 lg:grid-cols-4">
          <AboutItem />
          <CustomElement className="lg:col-span-3">
            <CustomElement
              as="h6"
              className="font-poppins font-semibold text-white"
            >
              Menü
            </CustomElement>
            <CustomElement className="mt-4 grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
              <CustomElement as="ul" className="flex flex-col gap-3">
                {arr1?.map((item) => (
                  <CustomElement as="li" key={item.id}>
                    <Link
                      href={categoryUrlConverter({
                        id: item.id,
                        title: item.categoryName,
                      })}
                      title={item.categoryName}
                    >
                      {item.categoryName}
                    </Link>
                  </CustomElement>
                ))}
              </CustomElement>
              <CustomElement as="ul" className="flex flex-col gap-3">
                {arr2?.map((item) => (
                  <CustomElement as="li" key={item.id}>
                    <Link
                      href={categoryUrlConverter({
                        id: item.id,
                        title: item.categoryName,
                      })}
                      title={item.categoryName}
                    >
                      {item.categoryName}
                    </Link>
                  </CustomElement>
                ))}
              </CustomElement>
              <CustomElement as="ul" className="flex flex-col gap-3">
                {arr3?.map((item) => (
                  <CustomElement as="li" key={item.id}>
                    <Link
                      href={categoryUrlConverter({
                        id: item.id,
                        title: item.categoryName,
                      })}
                      title={item.categoryName}
                    >
                      {item.categoryName}
                    </Link>
                  </CustomElement>
                ))}
              </CustomElement>
              <CustomElement as="ul" className="flex flex-col gap-3">
                {arr4?.map((item) => (
                  <CustomElement as="li" key={item.id}>
                    <Link
                      href={categoryUrlConverter({
                        id: item.id,
                        title: item.categoryName,
                      })}
                      title={item.categoryName}
                    >
                      {item.categoryName}
                    </Link>
                  </CustomElement>
                ))}
              </CustomElement>
            </CustomElement>
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}

function AboutItem() {
  return (
    <CustomElement className="flex w-full flex-col gap-3">
      <CustomElement as="h6" className="font-poppins font-semibold text-white">
        Hakkımızda
      </CustomElement>
      <CustomElement
        as="p"
        className="font-opensans col-span-1 text-left text-[14px] leading-7"
      >
        İnşaat Haberleri, inşaat ve yapı sektöründeki güncel gelişmeleri,
        sektörel yenilikleri ve önemli haberleri okuyucularıyla buluşturan
        bağımsız bir haber platformudur. Sektörün nabzını tutarak doğru, güncel
        ve güvenilir bilgi sunmayı amaçlıyoruz.
      </CustomElement>
    </CustomElement>
  );
}
