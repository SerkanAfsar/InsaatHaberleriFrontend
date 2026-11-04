import React, { Suspense } from "react";
import { SectionErrorBoundary } from ".";
import CustomElement from "../utils/custom-element";
import { cn } from "@/lib";

interface Props<T extends React.ElementType> {
  title: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  as?: T;
}

export default function AsyncSection<T extends React.ElementType>({
  children,
  fallback,
  title,
  as,
  className,
}: Props<T>) {
  return (
    <CustomElement
      as={as || "div"}
      aria-label={title}
      className={cn(className && className)}
    >
      <SectionErrorBoundary title={title}>
        <Suspense fallback={fallback}>{children}</Suspense>
      </SectionErrorBoundary>
    </CustomElement>
  );
}
