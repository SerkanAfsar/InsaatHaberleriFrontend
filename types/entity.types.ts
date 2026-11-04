export type BaseEntityType = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export type AnnoucementType = BaseEntityType & {
  title: string;
  message: string;
  isRead: boolean;
};

export type CategoryType = BaseEntityType & {
  categoryName: string;
  seoTitle: string;
  seoDescription: string;
  subArticles: BlogType[] | null;
  newsCount: number | null;
};

export type BlogType = BaseEntityType & {
  title: string;
  subDescription: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  imageId: string | null;
  readedCount: number;
  category: CategoryType | null;
};
