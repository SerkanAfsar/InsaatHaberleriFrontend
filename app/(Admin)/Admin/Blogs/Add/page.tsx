import AddBlogForm from "./_components/add-blog-form";

export default function AddBlogPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-teal-700 uppercase">
          İçerik Yönetimi / Haberler
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Yeni Haber
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Haber içeriğini ve yayın bilgilerini girin.
        </p>
      </header>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <AddBlogForm />
      </div>
    </section>
  );
}
