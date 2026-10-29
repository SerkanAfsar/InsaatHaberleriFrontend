import { Suspense } from "react";
import RoleDetailWrapper from "../../_containers/role-detail-wrapper";

export default function Page({ params }: PageProps<"/Admin/Roles/[id]/edit">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {params.then((props) => {
        return <RoleDetailWrapper id={props.id} />;
      })}
    </Suspense>
  );
}
