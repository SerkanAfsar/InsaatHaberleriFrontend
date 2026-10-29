import CustomElement from "@/components/utils/custom-element";
import CustomItem from "./custom-item";
import Link from "next/link";
import { Mail } from "lucide-react";
import CustomInput from "@/components/custom-ui/custom-input";

export default async function FooterTopSection() {
  return (
    <CustomElement as="section">
      <CustomElement className="container grid grid-cols-1 gap-6 text-white sm:grid-cols-2 lg:grid-cols-4">
        <CustomItem title="Firma Rehberi">
          <CustomElement as="p" className="text-sm leading-6 text-white/80">
            Farklı sektörlerden firmaları tek bir yerde keşfedin. İhtiyacınıza
            uygun işletmeleri bulun, ürün ve hizmetlerini inceleyin, iletişim
            bilgilerine kolayca ulaşın.
          </CustomElement>
        </CustomItem>
        <CustomItem title="Hızlı Menü">
          <CustomElement
            as="ul"
            className="grid grid-cols-2 gap-x-8 gap-y-2 text-[15px]"
          >
            <li>
              <Link href={"#"}>Anasayfa</Link>
            </li>
            <li>
              <Link href={"#"}>Hakkımızda</Link>
            </li>
            <li>
              <Link href={"#"}>Kategoriler</Link>
            </li>
            <li>
              <Link href={"#"}>Firma Arama</Link>
            </li>
            <li>
              <Link href={"#"}>Blog</Link>
            </li>
            <li>
              <Link href={"#"}>İletişim</Link>
            </li>
          </CustomElement>
        </CustomItem>
        <CustomItem title="İletişim">
          <CustomElement className="flex items-center gap-2 text-sm">
            <Mail size={18} />
            <CustomElement as="span">info@firmarehberi.com</CustomElement>
          </CustomElement>
        </CustomItem>
        <CustomItem title="E-Bülten">
          <CustomElement as="p" className="text-sm leading-6 text-white/80">
            Yeni eklenen firmalar ve sektörel gelişmelerden haberdar olmak için
            e-bültenimize abone olun.
          </CustomElement>
          <CustomElement className="flex w-full flex-col gap-3">
            <CustomInput
              placeholder="E-Posta Adresiniz..."
              className="mt-4 rounded-sm bg-white p-3 text-sm text-black placeholder:text-gray-400"
            />
            <CustomElement
              as="button"
              className="bg-secondary text-primary flex h-auto items-center justify-center rounded-md p-3 text-sm font-semibold"
            >
              Subscribe
            </CustomElement>
          </CustomElement>
        </CustomItem>
      </CustomElement>
    </CustomElement>
  );
}
