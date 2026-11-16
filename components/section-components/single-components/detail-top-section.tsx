import CustomElement from "@/components/utils/custom-element";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { CategoryType } from "@/types/entity.types";
import { categoryUrlConverter } from "@/lib";

export default async function DetailTopSection<
  T extends object,
  K extends keyof T,
>({
  id,
  func,
  selectItem,
  keyName,
}: {
  id: number;
  func({ id }: { id: number }): Promise<T | null>;
  selectItem: keyof T;
  keyName?: K;
}) {
  const item = await func({ id });
  if (!item) return null;

  const value = item[selectItem] as string;

  let secondValue = undefined;

  if (keyName) {
    secondValue = item[keyName] as CategoryType;
  }

  return (
    <CustomElement className="flex w-full flex-col items-center justify-center gap-3 bg-gray-100 p-6 text-center">
      <CustomElement
        as="h1"
        className="text-clientprimary text-2xl font-semibold uppercase lg:text-3xl"
      >
        {value}
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
          {secondValue && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={categoryUrlConverter({
                      id: secondValue.id,
                      title: secondValue.categoryName,
                    })}
                    title={secondValue.categoryName}
                  >
                    {secondValue.categoryName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{value}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </CustomElement>
  );
}
