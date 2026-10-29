import { AdminMenuDataType } from "@/types";

export const MainAdminMenuData = {
  Categories: {
    url: "/Admin/Categories",
    validateKey: "Categories",
    title: "Kategoriler",
    apiUrl: "/Categories",
    component: "Categories",
    icon: "LayoutGrid",
  },

  Blogs: {
    url: "/Admin/Blogs",
    validateKey: "Articles",
    title: "Haberler",
    apiUrl: "/Articles",
    addUrl: "/Admin/Blogs/Add",
    icon: "Newspaper",
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
} as const satisfies AdminMenuDataType;
