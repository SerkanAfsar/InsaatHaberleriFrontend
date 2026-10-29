import Image from "next/image";
import CustomElement from "../utils/custom-element";
import img from "@/public/images/company.jpg";
import { ChartBarStacked, Eye, MapPinCheckInside, Phone } from "lucide-react";
import Link from "next/link";
import { CompanyEntityType } from "@/types/entity.types";
import { companyDetailUrlConverter } from "@/lib";
export default function CompanyItemList({ item }: { item: CompanyEntityType }) {
  const url = companyDetailUrlConverter({ item });
  return (
    <CustomElement
      as="article"
      className="flex flex-col gap-4 rounded-md bg-white p-4 shadow md:flex-row"
    >
      <CustomElement className="relative w-full shrink-0 grow-0 md:w-auto">
        <Image
          src={img}
          width={200}
          height={150}
          className="block h-40 w-full rounded-md object-cover object-center md:w-50"
          alt="Company"
        />
        <CustomElement
          as="span"
          className="bg-primary absolute top-2 mr-2 ml-2 inline-block rounded-sm p-1.5 text-xs text-white"
        >
          {item.category?.categoryName}
        </CustomElement>
      </CustomElement>
      <CustomElement className="flex w-full flex-auto flex-col">
        <CustomElement as="h3" className="text-lg font-semibold">
          {item.companyName}
        </CustomElement>
        <CustomElement className="mt-2 mb-4 flex max-w-md flex-col flex-wrap items-start gap-2 text-sm text-gray-800 md:flex-row lg:mt-4 lg:mb-6 lg:items-center lg:gap-4">
          <CustomElement className="flex items-center gap-2">
            <MapPinCheckInside size={18} className="text-[#8995a7]" />
            <CustomElement as="span">
              {item.city.cityName} / {item.district.districtName}
            </CustomElement>
          </CustomElement>
          <CustomElement className="flex items-center gap-2">
            <Phone size={18} className="text-[#8995a7]" />
            <CustomElement as="span">{item.phone}</CustomElement>
          </CustomElement>
          <CustomElement className="flex items-center gap-2">
            <Eye size={18} className="text-[#8995a7]" />
            <CustomElement as="span"> 487 Görüntülenme </CustomElement>
          </CustomElement>
          <CustomElement className="flex items-center gap-2">
            <ChartBarStacked size={18} className="text-[#8995a7]" />
            <CustomElement as="span">
              {item.category.categoryName}
            </CustomElement>
          </CustomElement>
        </CustomElement>
        <CustomElement className="mt-auto flex w-full items-center justify-between">
          <Link
            href={url}
            className="bg-primary flex items-center gap-2 rounded-sm px-2 py-2 text-sm text-white"
          >
            <Eye size={15} />
            Detaylı İncele
          </Link>
          <Link
            href={""}
            className="bg-secondary text-primary flex min-w-16 items-center gap-2 rounded-sm p-2 text-xs"
          >
            <Phone size={15} />
            Arama Yap
          </Link>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
