export default function DatatableUpdateLoader() {
  return (
    <div
      className="flex min-h-full flex-col gap-6 py-6"
      role="status"
      aria-label="Form yükleniyor"
    >
      <span className="sr-only">Form yükleniyor</span>

      <div className="space-y-3">
        <div className="h-5 w-28 animate-pulse rounded bg-muted" />
        <div className="h-14 animate-pulse rounded-xl border bg-muted/50" />
      </div>
      <div className="space-y-3">
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />
        <div className="h-14 animate-pulse rounded-xl border bg-muted/50" />
      </div>
      <div className="space-y-3">
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="h-20 animate-pulse rounded-xl border bg-muted/50" />
      </div>

      <div className="mt-auto space-y-3 pt-8">
        <div className="h-14 animate-pulse rounded-xl bg-muted" />
        <div className="h-14 animate-pulse rounded-xl border bg-muted/50" />
      </div>
    </div>
  );
}
