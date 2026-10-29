import CustomElement from "@/components/utils/custom-element";

export type CustomItemProps = {
  title: string;
  children?: React.ReactNode;
};
export default function CustomItem({ title, children }: CustomItemProps) {
  return (
    <CustomElement className="flex w-full flex-col items-start justify-start gap-4">
      <CustomElement
        as="h6"
        className="text-secondary text-lg font-semibold tracking-tight uppercase"
      >
        {title}
      </CustomElement>
      <CustomElement>{children}</CustomElement>
    </CustomElement>
  );
}
