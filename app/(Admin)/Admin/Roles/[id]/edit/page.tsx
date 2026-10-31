import { notFound } from "next/navigation";
import RoleDetailWrapper from "../../_containers/role-detail-wrapper";

export default async function Page({
  params,
}: PageProps<"/Admin/Roles/[id]/edit">) {
  const { id } = await params;
  if (!id) return notFound();
  return <RoleDetailWrapper id={id} />;
}
