import { Suspense } from "react";
import { SectionErrorBoundary } from ".";
import CustomElement from "../utils/custom-element";

interface Props {
  title: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

const AsyncSection = ({ title, fallback, children }: Props) => {
  return (
    <CustomElement aria-label={title}>
      <SectionErrorBoundary title={title}>
        <Suspense fallback={fallback}>{children}</Suspense>
      </SectionErrorBoundary>
    </CustomElement>
  );
};

export default AsyncSection;
