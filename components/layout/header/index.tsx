import CustomElement from "@/components/utils/custom-element";
import HeaderTop from "./header-top";
import HeaderMiddle from "./header-middle";

import { AsyncSection } from "@/components/feedback";
import HeaderBottom from "./_header-bottom";

export default function Header() {
  return (
    <CustomElement as="header" className="block w-full">
      <HeaderTop />
      <HeaderMiddle />
      <AsyncSection
        fallback={<CustomElement className="bg-clientdark block w-full p-7" />}
        title="Categories"
      >
        <HeaderBottom />
      </AsyncSection>
    </CustomElement>
  );
}
