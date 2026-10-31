"use client";

import { catchError, type ErrorInfo } from "next/error";
import ErrorState from "./error-state";

interface Props {
  title: string;
}

const SectionErrorBoundary = (
  { title }: Props,
  { retry, error }: ErrorInfo,
) => {
  const result =
    error instanceof Error
      ? error.message
      : `Couldn't load ${title.toLowerCase()}`;

  return <ErrorState title={result} onRetry={retry} />;
};

export default catchError(SectionErrorBoundary);
