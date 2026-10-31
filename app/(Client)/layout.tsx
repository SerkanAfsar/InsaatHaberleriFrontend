import CustomElement from "@/components/utils/custom-element";
import Header from "./_components/header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    // <div>
    //   Deneme
    //   {children}
    // </div>
    <>
      <Header />
      <CustomElement as="main">{children}</CustomElement>
    </>
  );
}
