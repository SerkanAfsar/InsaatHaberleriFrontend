import CustomElement from "@/components/utils/custom-element";
import Header from "./_components/header";
import Footer from "./_components/footer";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <CustomElement as="main">{children}</CustomElement>
      <Footer />
    </>
  );
}
