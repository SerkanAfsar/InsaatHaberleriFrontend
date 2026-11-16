export const API_URL = {
  AUTH: {
    Login: "/Auth",
    me: "/Auth/me",
    revoke: "/Auth/revoke",
    url: "/Auth",
    validateKey: "Auth",
    cacheKey: "Auth",
    confirm: "/Auth/Confirm",
    updatePassword: "/Auth/Confirm",
    CreateUser: "/Auth/CreateUser",
    resetPassword: "/Auth/reset-password",
    forgotPassword: "/Auth/forgot-password",
  },
  ARTICLES: {
    Paginated: "/Articles/Paginated",
    All: "/Articles",
    GetLast: "/Articles/LastNews",
    Popular: "/Articles/Popular",
    MostPopular: "/Articles/MostPopular",
    Detail: ({ id }: { id: number }) => `/Articles/${id}`,
    IncreaseReadCount: ({ id }: { id: number }) =>
      `/Articles/${id}/IncreaseReadCount`,
  },

  CATEGORIES: {
    AllData: "/Categories",
    MostReaded: "/Categories/MostReaded",
    RandomCategories: "/Categories/RandomCategories",
    Detail: (id: number) => `/Categories/${id}`,
    TopCategories: (id: number | null) =>
      `/Categories/GetCategoryListByTopCategory?topCategoryId=${id}`,
  },
  DISTRICTS: {
    GetByCityId: (cityId: number) => `/Districts/GetByCityId/${cityId}`,
  },
  Annoucements: {
    Paginated: "/Annoucements/Paginated",
    Read: (id: number) => `/Annoucements/${id}/Read`,
  },
  CATEGORY_NEWS_URL: {
    AllData: "/CategoryNewsUrls",
    Detail: (id: number) => `/CategoryNewsUrls/${id}`,
  },
  MESSAGES: {
    AllData: "/Messages",
    Detail: (id: number) => `/Messages/${id}`,
  },
};
