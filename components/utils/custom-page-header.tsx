import CustomHeader from "../section-components/custom-header";
import BreadCrumb from "./bread-crumb";

type CustomPageHeaderProps = {
  title: string;
  subTitle: string;
};
export default function CustomPageHeader({
  subTitle,
  title,
}: CustomPageHeaderProps) {
  return (
    <>
      <CustomHeader title={title} subTitle={subTitle} />
      <BreadCrumb title={title} />
    </>
  );
}
