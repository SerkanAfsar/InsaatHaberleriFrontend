import { getArticleDetail } from "@/actions/article.actions";
import { GetDetailParameters, newsUrlConverter } from "@/lib";
import { notFound } from "next/navigation";
import NewsDetail from "../_components/news-detail";
import { CustomMetaProps } from "../../kategori/[...slug]/page";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: CustomMetaProps): Promise<Metadata> {
  const id = await GetDetailParameters({ params });
  const article = await getArticleDetail({ id });
  if (!article) return notFound();

  const url =
    "https://insaathaberleri.org" +
    newsUrlConverter({
      id: article.id,
      categoryName: article.category?.categoryName ?? "",
      title: article.title,
    });

  return {
    metadataBase: new URL("https://insaathaberleri.org"),

    title: `${article.seoTitle}`,

    description: article.seoDescription,

    keywords: [
      "haber",
      "son dakika",
      "güncel haberler",
      "sektörel haberler",
      article.title,
    ],

    authors: [{ name: "İnşaat Sektörü Haber Portalı" }],

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: url,
      siteName: "İnşaat Sektörü Haber Portalı",
      images: [
        {
          url: "/images/logo.png",
          width: 1200,
          height: 630,
          alt: "İnşaat Sektörü Haber Portalı",
        },
      ],
      locale: "tr_TR",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${article.seoTitle}`,
      description: article.seoDescription,
      images: ["/images/logo.png"],
    },
  };
}

export default async function Page({ params }: PageProps<"/haber/[...slug]">) {
  const id = await GetDetailParameters({ params });

  const article = await getArticleDetail({ id });
  if (!article) return notFound();

  return <NewsDetail article={article} />;
}
