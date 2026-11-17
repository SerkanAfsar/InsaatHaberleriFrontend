import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/Admin/", "/admin-login/"],
    },
    sitemap: "https://www.insaathaberleri.org/sitemap.xml",
  };
}
