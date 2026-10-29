import BlogListContainer from "./_containers/blog-list-container";

export default function BlogsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-teal-700 uppercase">
          İçerik Yönetimi
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Haberler
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Haber içeriklerini görüntüleyin ve yeni haber ekleyin.
        </p>
      </header>
      <BlogListContainer />
    </section>
  );
}
