import CustomElement from "@/components/utils/custom-element";
import FooterTop from "./footer-top";
import FooterBottom from "./footer-bottom";
import { Suspense } from "react";
import FooterMiddle from "./footer-middle";

export default function Footer() {
  return (
    <CustomElement as="footer" className="bg-client-footer-bg w-full">
      <FooterTop />
      <FooterMiddle />
      <Suspense>
        <FooterBottom />
      </Suspense>
    </CustomElement>
  );
}
