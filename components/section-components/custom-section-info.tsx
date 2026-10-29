import CustomElement from "../utils/custom-element";

export type CustomSectionInfoProps = {
  title: string;
  subDescription: string;
  description: string;
};
export default function CustomSectionInfo({
  description,
  subDescription,
  title,
}: CustomSectionInfoProps) {
  return (
    <CustomElement className="custom-info container">
      <CustomElement as="h3">{title}</CustomElement>
      <CustomElement as="h2">{subDescription}</CustomElement>
      <CustomElement as="p">{description}</CustomElement>
    </CustomElement>
  );
}
