import CustomElement from "@/components/utils/custom-element";

export default function CategoryDetailWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomElement className="grid flex-1 gap-6 md:grid-cols-2">
      {children}
    </CustomElement>
  );
}
