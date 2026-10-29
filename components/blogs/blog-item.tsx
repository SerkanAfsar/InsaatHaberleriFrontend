import CustomElement from "@/components/utils/custom-element";
import Image from "next/image";
import img from "@/public/images/blog01.jpg";
import { ArrowRight, Eye } from "lucide-react";
import { BlogType } from "@/types/entity.types";
import { getImageFromCdn, getSubString, newsUrlConverter } from "@/lib";
import Link from "next/link";
export default function BlogItem({ item }: { item: BlogType }) {
  const imgUrl = getImageFromCdn({ imageId: item.imageId, type: "Big" });
  return (
    <CustomElement
      as="article"
      className="relative flex w-full flex-col overflow-hidden rounded-md"
    >
      <CustomElement as="header" className="relative border border-gray-300">
        <Image
          src={imgUrl ?? img}
          width={300}
          height={250}
          className="h-50 w-full object-cover object-top"
          alt="Haber"
        />
        <CustomElement
          as="h5"
          className="bg-primary tacking-[2px] absolute top-2 left-2 rounded-md p-1.5 text-xs text-white"
        >
          Haberler
        </CustomElement>
      </CustomElement>
      <CustomElement className="flex flex-auto flex-col border border-gray-200 bg-white p-6">
        <CustomElement as="h3" className="line-clamp-2 text-lg font-semibold">
          {item.title}
        </CustomElement>
        <CustomElement
          as="p"
          className="my-2 mb-4 text-sm leading-6"
          dangerouslySetInnerHTML={{
            __html: getSubString(item.subTitle ?? "") ?? "",
          }}
        ></CustomElement>
        <Link
          href={newsUrlConverter({ id: item.id, title: item.title })}
          className="text-primary mt-auto mb-4 flex items-center gap-2 font-semibold"
        >
          <ArrowRight size={18} />
          <CustomElement
            as="span"
            className="text-sm underline underline-offset-2"
          >
            Okumaya Devam Et..
          </CustomElement>
        </Link>
        <CustomElement className="flex items-center justify-between text-sm text-gray-600">
          <CustomElement>
            {new Date(item.createdAt).toLocaleDateString()}
          </CustomElement>
          <CustomElement className="flex items-center justify-center gap-2">
            <Eye size={15} />
            66 Görüntülenme
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
