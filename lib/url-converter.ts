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
