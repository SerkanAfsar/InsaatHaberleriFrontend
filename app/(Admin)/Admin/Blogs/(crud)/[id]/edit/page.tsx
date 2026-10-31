import { notFound } from "next/navigation";
import { BlogDetailWrapper } from "../../_components/blog-detail-wrapper";
import { BaseFetch, MainAdminMenuData } from "@/lib";
import { BlogType } from "@/types/entity.types";
import AddBlogForm from "../../_components/add-blog-form";

export default async function Page({
  params,
}: PageProps<"/Admin/Blogs/[id]/edit">) {
  const { id } = await params;
  if (!id) return notFound();

  const { entity, success, errors, statusCode } = await BaseFetch<
    BlogType,
    any
  >({
    method: "GET",
    requireToken: false,
    url: `${MainAdminMenuData.Blogs.apiUrl}/${id}`,
  });
  if (statusCode == 404) {
    return notFound();
  }
  if (!success || !entity) {
    throw new Error((errors && errors["error"]) ?? "Unknown Error");
  }

  return (
    <BlogDetailWrapper>
      <AddBlogForm type="UPDATE" id={id} defaultValues={entity} />
    </BlogDetailWrapper>
  );
}
