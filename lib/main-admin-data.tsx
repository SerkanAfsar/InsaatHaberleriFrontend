import { AdminMenuDataType } from "@/types";
import { CACHE_TAGS } from "./cache-tags";

export const MainAdminMenuData = {
  Categories: {
    url: "/Admin/Categories",
    validateKey: "Categories",
    title: "Kategoriler",
    apiUrl: "/Categories",
    component: "Categories",
    icon: "LayoutGrid",
    cacheKeys: [
      CACHE_TAGS.CATEGORIES.MOST_READED,
      CACHE_TAGS.CATEGORIES.ALL_CATEGORIES,
      CACHE_TAGS.CATEGORIES.MAIN_PAGE_CATEGORIES,
    ],
    mainCacheKey: CACHE_TAGS.CATEGORIES.ALL_CATEGORIES,
  },
  CategorySources: {
    url: "/Admin/CategorySources",
    validateKey: "CategorySources",
    title: "Kategori Url",
    apiUrl: "/CategoryNewsUrls",
    component: "CategoryNewsUrl",
    icon: "LayoutGrid",
  },

  Blogs: {
    url: "/Admin/Blogs",
    validateKey: "Articles",
    title: "Haberler",
    apiUrl: "/Articles",
    addUrl: "/Admin/Blogs/Add",
    icon: "Newspaper",
    cacheKeys: [
      CACHE_TAGS.CATEGORIES.MOST_READED,
      CACHE_TAGS.ARTICLES.ARTICLE_LIST,
      CACHE_TAGS.ARTICLES.POPULAR_LIST,
    ],
    mainCacheKey: CACHE_TAGS.ARTICLES.ARTICLE_LIST,
  },
  Users: {
    url: "/Admin/Users",
    validateKey: "Users",
    title: "Kullanıcılar",
    apiUrl: "/Users",
    component: "Members",
    icon: "Users",
  },
  Roles: {
    url: "/Admin/Roles",
    validateKey: "Roles",
    title: "Roller",
    apiUrl: "/Roles",
    addUrl: "/Admin/Roles/Add",
    icon: "ShieldCheck",
  },
  Messages: {
    url: "/Admin/Messages",
    validateKey: "Messages",
    title: "Mesajlar",
    apiUrl: "/Messages",
    icon: "ShieldCheck",
    component: "MessageDetail",
  },
} as const satisfies AdminMenuDataType;
