import { getArticlesByCategoryIdPaginated } from "@/actions/article.actions";
import BigNewsItem from "@/components/news-item/big-new-item";
import CustomElement from "@/components/utils/custom-element";
import CategoryDetailWrapper from "./_components/category-detail-wrapper";
import CategoryPaginate from "./_components/category-paginate";
import { Metadata, ResolvingMetadata } from "next";
import { getCategoryDetail } from "@/actions/category.actions";
import { notFound } from "next/navigation";
import { categoryUrlConverter } from "@/lib";

export type CustomMetaProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: CustomMetaProps): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const categoryId = Number(slug[slug.length - 1]);

  const category = await getCategoryDetail({
    id: categoryId,
  });

  if (!category) return notFound();

  let url = `https://www.insaathaberleri.org/${categoryUrlConverter({ id: category.id, title: category.categoryName })}`;
  if (page) {
    url += `page=${page}`;
  }

  return {
    metadataBase: new URL("https://www.insaathaberleri.org"),

    title: `${category.categoryName} Güncel Haberler`,

    description: `${category.categoryName} ait Güncel haberler, son dakika gelişmeleri ve sektörel haberler.`,

    keywords: ["haber", "son dakika", "güncel haberler", "sektörel haberler"],

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
      title: `${category.categoryName} Güncel Haberler`,
      description: `${category.categoryName} ait Güncel haberler, son dakika gelişmeleri ve sektörel haberler.`,
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
      title: `${category.categoryName} Güncel Haberler`,
      description: `${category.categoryName} ait Güncel haberler, son dakika gelişmeleri ve sektörel haberler.`,
      images: ["/images/logo.png"],
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: PageProps<"/kategori/[...slug]">) {
  const { page } = await searchParams;
  const { slug } = await params;
  const categoryId = Number(slug[slug.length - 1]);
  const currentPage = Math.max(
    1,
    Number(Array.isArray(page) ? page[0] : page) || 1,
  );

  const result = await getArticlesByCategoryIdPaginated({
    categoryId,
    page: currentPage,
  });

  return (
    <>
      <CategoryDetailWrapper>
        {result.entities?.map((item) => {
          return <BigNewsItem item={item} compType="other" key={item.id} />;
        })}
      </CategoryDetailWrapper>
      <CustomElement className="mt-8 flex justify-center md:justify-start">
        <CategoryPaginate
          pageCount={Math.ceil((result.rowCount ?? 0) / 10)}
          currentPage={currentPage}
        />
      </CustomElement>
    </>
  );
}
