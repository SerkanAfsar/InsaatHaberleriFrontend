import CustomElement from "@/components/utils/custom-element";
import ScrollTop from "./scroll-top";
import FooterTopSection from "./footer-top";
import FooterMiddle from "./footer-middle";
import FooterBottom from "./footer-bottom";
import { Suspense } from "react";

export default function Footer() {
  return (
    <>
      <CustomElement
        as="footer"
        className="bg-primary font-roboto mt-auto block w-full pt-6 xl:pt-12"
      >
        <FooterTopSection />
        <FooterMiddle />
        <Suspense>
          <FooterBottom />
        </Suspense>
      </CustomElement>
      <ScrollTop />
    </>
  );
}
