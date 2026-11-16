import { AsyncSection } from "@/components/feedback";
import {
  MainPageFourItemsLoader,
  MainPageTopLoader,
} from "@/components/loaders";
import MainPageDivided from "@/components/section-components/main-page-divided";
import MainPageFourItems from "@/components/section-components/single-components/main-page-four-items";
import MainPageTop from "@/components/section-components/single-components/main-page-top";
import CustomElement from "@/components/utils/custom-element";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.insaathaberleri.org"),

  title: "İnşaat Sektörüne Ait Güncel Haberler",

  description:
    "İnşaat Sektörüne ait Güncel haberler, son dakika gelişmeleri ve sektörel haberler.",

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
    canonical: "/",
  },

  openGraph: {
    title: "İnşaat Sektörü Haber Portalı",
    description:
      "İnşaat Sektörü İnşaat SektörüGüncel haberler ve son gelişmeler.",
    url: "/",
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
    title: "İnşaat Sektörü Haber Portalı",
    description: "Güncel haberler ve son gelişmeler.",
    images: ["/images/logo.png"],
  },
};

export default function Home() {
  return (
    <CustomElement className="container">
      <AsyncSection
        title="Main Page Top"
        as="section"
        className="mainPageTop"
        fallback={<MainPageTopLoader />}
      >
        <MainPageTop />
      </AsyncSection>
      <AsyncSection
        title="Main Page Top Bottom"
        as="section"
        className="mainPageTopBottom"
        fallback={<MainPageFourItemsLoader />}
      >
        <MainPageFourItems />
      </AsyncSection>
      <MainPageDivided />
    </CustomElement>
  );
}
