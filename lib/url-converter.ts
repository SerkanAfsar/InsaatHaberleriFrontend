import { slugUrl } from "./utils";

export const newsUrlConverter = ({
  id,
  categoryName,
  title,
}: {
  id: number;
  categoryName: string;
  title: string;
}) => `/haber/${slugUrl(categoryName)}/${slugUrl(title)}/${id}`;

export const categoryUrlConverter = ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => `/kategori/${slugUrl(`${title}`)}/${id}`;
