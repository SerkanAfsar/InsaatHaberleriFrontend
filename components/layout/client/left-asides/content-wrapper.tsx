import CustomElement from "@/components/utils/custom-element";
import { cn } from "@/lib";

export default function ContentWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <CustomElement
      as="section"
      className={cn(
        "flex w-full flex-auto flex-col gap-4",
        className && className,
      )}
    >
      {children}
    </CustomElement>
  );
}
