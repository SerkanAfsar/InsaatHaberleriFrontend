import CustomElement from "@/components/utils/custom-element";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <CustomElement as="main">{children}</CustomElement>
      <Footer />
    </>
  );
}
