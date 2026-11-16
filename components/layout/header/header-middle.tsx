import CustomElement from "@/components/utils/custom-element";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
export default function HeaderMiddle() {
  return (
    <CustomElement as="section" className="w-full bg-white">
      <CustomElement className="container flex flex-col items-center justify-between md:flex-row">
        <Link href={"/"} className="md:-ml-8">
          <Image src={logo} width={300} height={200} alt="Logo" priority />
        </Link>
      </CustomElement>
    </CustomElement>
  );
}
