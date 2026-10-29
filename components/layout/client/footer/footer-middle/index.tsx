import CustomElement from "@/components/utils/custom-element";
import Link from "next/link";

export default function FooterMiddle() {
  return (
    <CustomElement className="mt-6 block w-full border-t border-b border-gray-100/20 py-4 text-sm text-white/80">
      <CustomElement className="container flex items-center justify-center xl:justify-between">
        <CustomElement
          as="ul"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <li>
            <Link href={"#"}>Anasayfa</Link>
          </li>
          <li>
            <Link href={"#"}>Hakkımızda</Link>
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
      </CustomElement>
    </CustomElement>
  );
}
