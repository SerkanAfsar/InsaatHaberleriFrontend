import { getAllCategories } from "@/actions/category.actions";
import CustomElement from "@/components/utils/custom-element";
import HeaderBottomLeft from "./header-bottom-left";
import HeaderBottomRight from "./header-botttom-right";
import HeaderAside from "./header-aside";

export default async function HeaderBottom() {
  const entities = await getAllCategories();

  return (
    <CustomElement as="section" className="bg-clientdark text-lg text-white">
      <CustomElement className="relative container flex items-center justify-between">
        <HeaderBottomLeft categories={entities ?? []} />
        <HeaderBottomRight categories={entities ?? []} />
        <HeaderAside categories={entities ?? []} />
      </CustomElement>
    </CustomElement>
  );
}
