export type BaseEntityType = {
  id: number;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type AnnoucementType = BaseEntityType & {
  title: string;
  message: string;
  isRead: boolean;
};

export type CityType = BaseEntityType & {
  cityName: string;
  companyCount?: number;
  districts?: DistrictType[] | null;
  cityImageUrl?: string;
};

export type DistrictType = BaseEntityType & {
  districtName: string;
  cityId?: number;
  city?: CityType | null;
  id: number;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type CompanyType = BaseEntityType & {
  title: string;
};

export type WorkerCountsType = CompanyType;

export type CategoryType = BaseEntityType & {
  categoryName: string;
  seoTitle: string;
  seoDescription: string;
  parentCategoryId: number | null;
  parentCategory: CategoryType | null;
  childCategories: CategoryType[] | null;
  companyCount: number;
};

export type CompanyEntityType = BaseEntityType & {
  companyName: string;
  companyType: CompanyType;
  year: number;
  workerCount: WorkerCountsType;
  city: CityType;
  district: DistrictType;
  responsiblePerson: string;
  phone: string;
  fax: string;
  webSite: string;
  eMail: string;
  address: string;
  about: string;
  category: CategoryType;
  isApprooved: boolean;
  showCount: number;
  categories: { categoryName: string; id: number }[];
};

export type BlogType = BaseEntityType & {
  title: string;
  subTitle: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  imageId: string | null;
  readedCount: number;
  category: CategoryType | null;
};
