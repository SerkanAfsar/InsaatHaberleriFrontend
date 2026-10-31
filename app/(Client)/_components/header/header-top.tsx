import CustomElement from "@/components/utils/custom-element";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitch, FaLinkedin } from "react-icons/fa6";

export default function HeaderTop() {
  return (
    <CustomElement
      as="section"
      className="bg-clientdark font-opensans py-4 text-xs text-white"
    >
      <CustomElement className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <CustomElement
          as="ul"
          className="flex items-center justify-center gap-4"
        >
          <CustomElement as="li">
            <Link href={"/"}>About </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"}>Advertise </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"}>Privacy & Policy </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"}>Contact Us </Link>
          </CustomElement>
        </CustomElement>
        <CustomElement
          as="ul"
          className="flex items-center justify-center gap-4 text-[16px]"
        >
          <CustomElement as="li">
            <Link href={"/"}>
              <FaFacebook />
            </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"}>
              <FaInstagram />
            </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"}>
              <FaTwitch />
            </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"}>
              <FaLinkedin />
            </Link>
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
