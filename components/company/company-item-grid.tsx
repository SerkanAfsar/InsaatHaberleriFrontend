import Image from "next/image";
import CustomElement from "../utils/custom-element";
import img from "@/public/images/company.jpg";
import { ChartBarStacked, Eye, MapPinCheckInside, Phone } from "lucide-react";
import Link from "next/link";
import { CompanyEntityType } from "@/types/entity.types";
import { companyDetailUrlConverter } from "@/lib";

export default function CompanyItemGrid({ item }: { item: CompanyEntityType }) {
  const url = companyDetailUrlConverter({ item });
  return (
    <CustomElement
      as="article"
      className="flex w-full flex-col overflow-hidden rounded-md bg-white shadow"
    >
      <CustomElement as="header" className="w-full p-4">
        <CustomElement className="relative block w-full">
          <Image
            src={img}
            width={270}
            height={200}
            className="min-w-lg:h-50 h-44 w-full rounded-md object-cover object-center"
            alt="Company"
          />
          <CustomElement
            as="span"
            className="bg-primary absolute top-2 mr-2 ml-2 inline-block rounded-md p-1.5 px-2 text-xs text-white"
          >
            {item.category?.categoryName}
          </CustomElement>
        </CustomElement>
        <CustomElement className="mt-2 flex w-full flex-col gap-2 text-sm text-gray-800">
          <CustomElement as="h3" className="text-left text-lg font-semibold">
            {item.companyName}
          </CustomElement>
          <CustomElement className="flex items-start gap-2">
            <MapPinCheckInside
              size={18}
              className="shrink-0 grow-0 text-[#8995a7]"
            />
            <CustomElement as="span">
              {item.city.cityName} / {item.district.districtName}
            </CustomElement>
          </CustomElement>
          <CustomElement className="flex items-center gap-2">
            <Phone size={18} className="shrink-0 grow-0 text-[#8995a7]" />
            <CustomElement as="span">{item.phone}</CustomElement>
          </CustomElement>
          <CustomElement className="flex items-center gap-2">
            <Eye size={18} className="shrink-0 grow-0 text-[#8995a7]" />
            <CustomElement as="span"> 487 Görüntülenme </CustomElement>
          </CustomElement>
          <CustomElement className="flex items-center gap-2">
            <ChartBarStacked
              size={18}
              className="shrink-0 grow-0 text-[#8995a7]"
            />
            <CustomElement as="span">
              {item.category.categoryName}
            </CustomElement>
          </CustomElement>
        </CustomElement>
      </CustomElement>
      <CustomElement className="mt-auto border-t border-gray-300/30 p-4">
        <Link
          href={url}
          className="bg-primary flex items-center justify-center rounded-sm p-2 text-sm text-white"
        >
          View Details
        </Link>
      </CustomElement>
    </CustomElement>
  );
}
