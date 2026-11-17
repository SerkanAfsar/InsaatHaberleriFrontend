import { Suspense } from "react";
import DashboardContent from "./_components/dashboard-content";
import { DashboardSkeleton } from "./_components/dashboard-ui";

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
