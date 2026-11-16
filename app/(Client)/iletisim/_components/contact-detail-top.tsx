import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CustomElement from "@/components/utils/custom-element";
import Link from "next/link";

export default function ContactDetailTop() {
  return (
    <CustomElement className="flex w-full flex-col items-center justify-center gap-3 bg-gray-100 p-6 text-center">
      <CustomElement
        as="h1"
        className="text-clientprimary text-2xl font-semibold uppercase lg:text-3xl"
      >
        İletişim
      </CustomElement>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" title="Anasayfa">
                Anasayfa
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>İletişim</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </CustomElement>
  );
}
