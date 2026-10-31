import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section
      aria-label="Haber formu yükleniyor"
      className="mx-auto w-full max-w-5xl space-y-6"
    >
      <header className="space-y-2">
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-8 w-48 sm:h-9" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {["Başlık", "Kapak görseli", "SEO başlığı", "SEO açıklaması"].map(
            (field) => (
              <div key={field} className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
            ),
          )}

          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-36 w-full rounded-lg" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>
    </section>
  );
}
