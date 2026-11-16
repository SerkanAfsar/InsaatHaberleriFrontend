import CustomElement from "@/components/utils/custom-element";
import logo from "@/public/images/logo-dark.png";
import Image from "next/image";
export default function FooterTop() {
  return (
    <CustomElement as="section" className="mt-16">
      <CustomElement className="container">
        <CustomElement className="flex w-full flex-col items-center justify-between gap-4 border-t border-b border-gray-100/15 text-center max-lg:py-10 lg:flex-row">
          <Image
            src={logo}
            width={300}
            height={200}
            alt="İnşaat Haberleri"
            className="-ml-4 max-lg:-mt-6"
          />
          <CustomElement
            as="span"
            className="mt-2 tracking-[7px] text-white uppercase max-lg:-mt-3 max-md:-mt-2 xl:text-[22px]"
          >
            E-Bültene Kayıt Olun
          </CustomElement>
          <CustomElement className="relative max-md:w-full">
            <CustomElement
              as="input"
              type="email"
              className="font-opensans max-w-full border-b border-gray-100/15 py-3 pr-10 text-[16px] text-white outline-none placeholder:text-sm placeholder:text-white focus:ring-0 max-md:w-full md:min-w-87"
              placeholder="E-Posta Adresiniz.."
            />
            <CustomElement
              as="button"
              className="absolute right-0 bottom-3 bg-none text-white outline-none focus:outline-0"
            >
              Kayıt Ol
            </CustomElement>
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
