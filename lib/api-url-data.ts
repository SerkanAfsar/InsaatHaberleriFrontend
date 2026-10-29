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
  },

  CATEGORIES: {
    AllData: "/Categories",
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
};
