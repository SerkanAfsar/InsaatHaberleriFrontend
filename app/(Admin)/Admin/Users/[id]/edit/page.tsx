import { Suspense } from "react";

export default async function Page({
  params,
}: PageProps<"/Admin/Roles/[id]/edit">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {params.then(({ id }) => (
          <div>{id}</div>
        ))}
      </div>
    </Suspense>
  );
}
