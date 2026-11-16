export const ROLE_CLAIM_LIST = {
  cities: {
    title: "Kategoriler",
    permissions: {
      read: "permission.category.read",
      create: "permission.category.create",
      update: "permission.category.update",
      delete: "permission.category.delete",
    },
  },
  categoryUrl: {
    title: "Kategori Url",
    permissions: {
      read: "permission.categoryurl.read",
      create: "permission.categoryurl.create",
      update: "permission.categoryurl.update",
      delete: "permission.categoryurl.delete",
    },
  },

  roles: {
    title: "Roller",
    permissions: {
      read: "permission.roles.read",
      create: "permission.roles.create",
      update: "permission.roles.update",
      delete: "permission.roles.delete",
    },
  },

  users: {
    title: "Kullanıcılar",
    permissions: {
      read: "permission.users.read",
      create: "permission.users.create",
      update: "permission.users.update",
      delete: "permission.users.delete",
    },
  },

  blogs: {
    title: "Haberler",
    permissions: {
      read: "permission.newses.read",
      create: "permission.newses.create",
      update: "permission.newses.update",
      delete: "permission.newses.delete",
    },
  },
  message: {
    title: "Mesajlar",
    permissions: {
      read: "permission.message.read",
      create: "permission.message.create",
      update: "permission.message.update",
      delete: "permission.message.delete",
    },
  },
  setttings: {
    title: "Ayarlar",
    permissions: {
      read: "permission.setttings.read",
      create: "permission.setttings.create",
      update: "permission.setttings.update",
      delete: "permission.setttings.delete",
    },
  },
} as const;

export const userMenuNavigations = [
  {
    path: "/hesabim/sifre-islemleri",
    title: "Şifre İşlemleri",
    icon: "KeySquare",
  },
  {
    path: "/hesabim/profil",
    title: "Profil",
    icon: "User",
  },
  {
    path: "/hesabim/firma-ekle",
    title: "Firma Ekle",
    icon: "CirclePlus",
  },
  {
    path: "/hesabim/kayitli-firmalarim",
    title: "Kayıtlı Firmalarım",
    icon: "School",
  },
] as const;

export const URL_LIST = {
  Client: {
    PASSWORD: "/client-admin/password",
    PROFILE: "/client-admin/user",
    ADD_COMPANY: "/client-admin/companies/add",
    COMPANY_LIST: "/client-admin/companies",
    LOGIN: "/client-login",
    REGISTER: "/uyelik",
  },
  Admin: {
    PASSWORD: "/client-admin/password",
    PROFILE: "/client-admin/user",
    ADD_COMPANY: "/client-admin/add-company",
    COMPANY_LIST: "/client-admin/companies",
    LOGIN: "/admin-login",
    REGISTER: "/uyelik",
  },
} as const;

export const RoleConstants = {
  RootAdmin: "RootAdmin",
  NormalUser: "NormalUser",
} as const;
