import CustomElement from "@/components/utils/custom-element";
import ContactDetailTop from "./_components/contact-detail-top";
import ContactForm from "./_components/contact-form";
import ContactLeft from "./_components/contact-left";

export default function Page() {
  return (
    <CustomElement className="container mt-5">
      <ContactDetailTop />
      <CustomElement className="mt-10 flex flex-col gap-6 lg:flex-row">
        <ContactLeft />
        <ContactForm />
      </CustomElement>
    </CustomElement>
  );
}
