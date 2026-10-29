import { ResponseResult } from "@/types";
import BreadCrumb from "./bread-crumb";
import CustomHeader from "../section-components/custom-header";

export type CustomAsyncPageHeaderProps<T extends object> = {
  slug: string[];
  func: ({ id }: { id: number }) => Promise<ResponseResult<T>>;
  titleKey: keyof T;
};

export default async function CustomAsyncPageHeader<T extends object>({
  slug,
  func,
  titleKey,
}: CustomAsyncPageHeaderProps<T>) {
  const id = Number(slug[slug.length - 1]);
  const data = await func({ id });

  if (data.statusCode == 404 || !data.success || !data.entity) return null;

  const entity = data.entity! as T;
  const lastTitle = (entity[titleKey] as string) ?? "No Data";

  return (
    <>
      <CustomHeader title={lastTitle} subTitle={lastTitle} />
      <BreadCrumb title={lastTitle} />
    </>
  );
}
