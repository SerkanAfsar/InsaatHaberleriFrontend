import { BaseFetch } from "@/lib/baseFetch";
import { MainAdminMenuData } from "@/lib";
import RoleDetailContainer from "./role-detail-container";
import { AddRoleType } from "@/types";

export default async function RoleDetailWrapper({ id }: { id: string }) {
  const { entity, success } = await BaseFetch({
    method: "GET",
    requireToken: false,
    url: `${MainAdminMenuData.Roles.apiUrl}/${id}`,
  });
  if (!success) {
    return <div>Error</div>;
  }
  return (
    <RoleDetailContainer
      type="UPDATE"
      defaultValues={entity as AddRoleType}
      id={id}
    />
  );
}
