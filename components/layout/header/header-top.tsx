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
            <Link href={"/"} title="About">About </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"} title="Advertise">Advertise </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"} title="Privacy & Policy">Privacy & Policy </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"} title="Contact Us">Contact Us </Link>
          </CustomElement>
        </CustomElement>
        <CustomElement
          as="ul"
          className="flex items-center justify-center gap-4 text-[16px]"
        >
          <CustomElement as="li">
            <Link href={"/"} title="facebook" aria-label="Facebook">
              <FaFacebook aria-hidden="true" />
            </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"} title="instagram" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"} title="twitch" aria-label="Twitch">
              <FaTwitch aria-hidden="true" />
            </Link>
          </CustomElement>
          <CustomElement as="li">
            <Link href={"/"} title="linkedin" aria-label="LinkedIn">
              <FaLinkedin aria-hidden="true" />
            </Link>
          </CustomElement>
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
