export default async function Page({
  params,
}: PageProps<"/Admin/Roles/[id]/edit">) {
  const { id } = await params;
  return <div>{id}</div>;
}
