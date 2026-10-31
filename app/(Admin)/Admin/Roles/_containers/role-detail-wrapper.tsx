import { BaseFetch } from "@/lib/baseFetch";
import { MainAdminMenuData } from "@/lib";
import RoleDetailContainer from "./role-detail-container";
import { AddRoleType } from "@/types";
import { notFound } from "next/navigation";

export default async function RoleDetailWrapper({ id }: { id: string }) {
  const { entity, success, errors, statusCode } = await BaseFetch({
    method: "GET",
    requireToken: false,
    url: `${MainAdminMenuData.Roles.apiUrl}/${id}`,
  });
  if (statusCode == 404) {
    return notFound();
  }
  if (!success) {
    throw new Error((errors && errors["error"]) ?? "Unknown Error");
  }

  return (
    <RoleDetailContainer
      type="UPDATE"
      defaultValues={entity as AddRoleType}
      id={id}
    />
  );
}
