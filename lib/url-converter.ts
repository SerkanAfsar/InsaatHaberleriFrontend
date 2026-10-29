import { CompanyEntityType } from "@/types/entity.types";
import { slugUrl } from "./utils";

export const newsUrlConverter = ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => `/haber/${slugUrl(title)}/${id}`;

export const categoryUrlConverter = ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => `/kategoriler/${slugUrl(`${title} firmaları`)}/${id}`;

export const companyDetailUrlConverter = ({
  item,
}: {
  item: CompanyEntityType;
}) =>
  `/firma-detay/${slugUrl(`${item.category.categoryName} firmaları`)}/${slugUrl(item.companyName)}/${item.id}`;
