import {
  AlertCircle,
  ArrowUpRight,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "../_lib/dashboard-stats";

export function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
  iconClassName,
  loading,
}: {
  title: string;
  value: number | undefined;
  detail: string;
  icon: LucideIcon;
  iconClassName: string;
  loading: boolean;
}) {
  return (
    <Card className="gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm ring-0">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className={`shrink-0 rounded-xl p-2.5 ${iconClassName}`}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      {loading ? (
        <Skeleton className="h-9 w-24 bg-slate-100" />
      ) : (
        <p className="text-3xl font-semibold tracking-tight tabular-nums">
          {value === undefined ? "—" : formatNumber(value)}
        </p>
      )}
      <p className="text-xs leading-5 text-slate-500">{detail}</p>
    </Card>
  );
}

export function DashboardPanel({
  title,
  description,
  href,
  children,
}: {
  title: string;
  description: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <Card className="min-w-0 gap-0 rounded-2xl border border-slate-200 bg-white py-0 text-slate-900 shadow-sm ring-0">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 p-5">
        <div className="min-w-0 space-y-1">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <p className="text-xs leading-5 text-slate-500">{description}</p>
        </div>
        {href && (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-1 rounded-md text-xs font-semibold text-teal-700 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
          >
            Tümünü gör <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        )}
      </div>
      {children}
    </Card>
  );
}

export function DashboardState({
  error,
  empty,
}: {
  error: boolean;
  empty: string;
}) {
  const Icon = error ? AlertCircle : FolderOpen;
  return (
    <div
      role={error ? "alert" : "status"}
      className="flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <span
        className={`rounded-full p-3 ${error ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-400"}`}
      >
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <p className="max-w-xs text-sm leading-6 text-slate-500">
        {error
          ? "Veriler yüklenemedi. Yenile düğmesiyle tekrar deneyebilirsiniz."
          : empty}
      </p>
    </div>
  );
}

export function DashboardRowsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="İstatistikler yükleniyor"
      className="space-y-6 p-5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-3/4 bg-slate-100" />
          <Skeleton className="h-3 w-1/2 bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Dashboard yükleniyor"
      className="space-y-6"
    >
      <Skeleton className="h-8 w-48 bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-44 rounded-2xl bg-slate-200" />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Skeleton className="h-96 rounded-2xl bg-slate-200" />
        <Skeleton className="h-96 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
