import AddBlogForm from "../_components/add-blog-form";
import { BlogDetailWrapper } from "../_components/blog-detail-wrapper";

export default async function AddBlogPage() {
  return (
    <BlogDetailWrapper>
      <AddBlogForm type="ADD" />
    </BlogDetailWrapper>
  );
}
