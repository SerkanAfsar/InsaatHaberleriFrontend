import CustomElement from "../utils/custom-element";

export type CustomPageHeaderProps = {
  title: string;
  subTitle: string;
};
export default function CustomHeader({
  title,
  subTitle,
}: CustomPageHeaderProps) {
  return (
    <CustomElement
      as="section"
      data-space="true"
      className="register-section py-20 text-white"
    >
      <CustomElement className="container flex flex-col items-center justify-center gap-4 text-center">
        <CustomElement as="h1" className="text-3xl font-semibold">
          {title}
        </CustomElement>
        <CustomElement as="h2" className="text-xl font-semibold">
          {subTitle}
        </CustomElement>
      </CustomElement>
    </CustomElement>
  );
}
