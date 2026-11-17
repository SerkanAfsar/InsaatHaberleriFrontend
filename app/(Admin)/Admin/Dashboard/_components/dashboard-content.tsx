"use client";

import { useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowUpRight,
  Eye,
  FolderTree,
  Globe2,
  Link2,
  Newspaper,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllData } from "@/hooks/use-queries";
import { categoryUrlConverter, MainAdminMenuData } from "@/lib";
import { NewsSites, type GetAllDataServiceType } from "@/types";
import type { BlogType, CategoryType } from "@/types/entity.types";
import {
  formatNumber,
  formatShare,
  getDashboardStats,
  getExternalUrl,
  TOP_ARTICLE_COUNT,
  type DashboardSource,
} from "../_lib/dashboard-stats";
import {
  DashboardPanel,
  DashboardRowsSkeleton,
  DashboardState,
  MetricCard,
} from "./dashboard-ui";

const articleFilter: GetAllDataServiceType = {
  offset: 0,
  count: TOP_ARTICLE_COUNT,
  globalFilter: "",
  sorting: [{ id: "readedCount", desc: true }],
  filters: "[]",
};

const siteNames: Record<NewsSites, string> = {
  [NewsSites.InsaatDeryasi]: "İnşaat Deryası",
  [NewsSites.YapiComTr]: "Yapı.com.tr",
  [NewsSites.YapiGundem]: "Yapı Gündem",
};

export default function DashboardContent() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const articleQuery = useGetAllData<BlogType>(
    `${MainAdminMenuData.Blogs.apiUrl}/Paginated`,
    MainAdminMenuData.Blogs.validateKey,
    articleFilter,
  );
  const categoryQuery = useGetAllData<CategoryType>(
    MainAdminMenuData.Categories.apiUrl,
    MainAdminMenuData.Categories.validateKey,
  );
  const sourceQuery = useGetAllData<DashboardSource>(
    MainAdminMenuData.CategorySources.apiUrl,
    MainAdminMenuData.CategorySources.validateKey,
  );

  const articles = articleQuery.data?.data ?? [];
  const categories = categoryQuery.data?.data ?? [];
  const sources = sourceQuery.data?.data ?? [];
  const stats = getDashboardStats(articles, categories, sources);
  const hasError = Boolean(
    articleQuery.error || categoryQuery.error || sourceQuery.error,
  );

  async function refresh() {
    setRefreshing(true);
    try {
      await Promise.all(
        [
          MainAdminMenuData.Blogs,
          MainAdminMenuData.Categories,
          MainAdminMenuData.CategorySources,
        ].map((item) =>
          queryClient.invalidateQueries({ queryKey: [item.validateKey] }),
        ),
      );
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <section className="min-w-0 space-y-6 pb-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] text-teal-700 uppercase">
            Genel Bakış
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-500">
            Haber performansı, kategoriler ve kaynak bağlantıları bir arada.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500">
            Tüm zamanlar
          </span>
          <Button
            variant="outline"
            disabled={refreshing}
            onClick={refresh}
            className="h-10 gap-2 border-slate-200 bg-white px-4 text-slate-600 hover:bg-teal-50 hover:text-teal-800"
          >
            <RefreshCw
              aria-hidden="true"
              className={refreshing ? "size-4 animate-spin" : "size-4"}
            />
            {refreshing ? "Yenileniyor" : "Yenile"}
          </Button>
        </div>
      </header>

      {hasError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            Bazı veriler güncellenemedi. İstatistikleri yenileyerek tekrar
            deneyebilirsiniz. Yüklenemeyen değerler çizgi ile gösterilir.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Toplam haber"
          value={articleQuery.data?.rowCount}
          detail="Sistemde kayıtlı tüm haberler"
          icon={Newspaper}
          iconClassName="bg-teal-50 text-teal-700"
          loading={articleQuery.isPending}
        />
        <MetricCard
          title={`İlk ${TOP_ARTICLE_COUNT} haberin okunması`}
          value={articleQuery.data ? stats.topArticleReads : undefined}
          detail="En çok okunan haberlerin toplam okunması"
          icon={Eye}
          iconClassName="bg-sky-50 text-sky-600"
          loading={articleQuery.isPending}
        />
        <MetricCard
          title="Toplam kategori"
          value={categoryQuery.data ? categories.length : undefined}
          detail="Haberlerin gruplandığı kategoriler"
          icon={FolderTree}
          iconClassName="bg-violet-50 text-violet-600"
          loading={categoryQuery.isPending}
        />
        <MetricCard
          title="Kategori URL'si"
          value={sourceQuery.data ? sources.length : undefined}
          detail="Haber alımı için tanımlı kaynak bağlantıları"
          icon={Link2}
          iconClassName="bg-amber-50 text-amber-600"
          loading={sourceQuery.isPending}
        />
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <DashboardPanel
          title="En çok okunan haberler"
          description={`Okunma sayısına göre ilk ${TOP_ARTICLE_COUNT} haber · Tüm zamanlar`}
          href={MainAdminMenuData.Blogs.url}
        >
          {articleQuery.isPending ? (
            <DashboardRowsSkeleton />
          ) : articleQuery.data && articles.length ? (
            <ol className="divide-y divide-slate-100 px-5">
              {articles.map((article, index) => (
                <li
                  key={article.id}
                  className="flex items-center gap-3 py-4 sm:gap-4"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums ${index === 0 ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"}`}
                  >
                    {index === 0 ? (
                      <Trophy aria-label="Birinci" className="size-4" />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`${MainAdminMenuData.Blogs.url}/${article.id}/edit`}
                      className="line-clamp-2 rounded-sm text-sm leading-6 font-medium text-slate-800 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                      {article.title}
                    </Link>
                    <p className="mt-1 text-xs text-slate-400">
                      {article.category?.categoryName ?? "Kategorisiz"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-semibold text-slate-800 tabular-nums">
                      {formatNumber(article.readedCount)}
                    </span>
                    <span className="mt-1 block text-[10px] text-slate-400">
                      okunma
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <DashboardState
              error={Boolean(articleQuery.error)}
              empty="Henüz görüntülenecek haber bulunmuyor."
            />
          )}
        </DashboardPanel>

        <div className="min-w-0 space-y-5">
          <DashboardPanel
            title="Kategori dağılımı"
            description="En fazla haber bulunan 6 kategori"
          >
            {categoryQuery.isPending ? (
              <DashboardRowsSkeleton />
            ) : categoryQuery.data && stats.categoryDistribution.length ? (
              <div className="space-y-5 p-5">
                {stats.categoryDistribution.map((category) => (
                  <div key={category.id}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                      <span className="truncate font-medium text-slate-700">
                        {category.categoryName}
                      </span>
                      <span className="shrink-0 text-slate-500 tabular-nums">
                        {formatNumber(category.newsCount ?? 0)} haber{" "}
                        <span className="ml-1 text-slate-400">
                          (
                          {formatShare(
                            category.newsCount ?? 0,
                            stats.categorizedArticleCount,
                          )}
                          )
                        </span>
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="h-2 overflow-hidden rounded-full bg-slate-100"
                    >
                      <div
                        className="h-full rounded-full bg-teal-500"
                        style={{
                          width: `${stats.categorizedArticleCount > 0 ? ((category.newsCount ?? 0) / stats.categorizedArticleCount) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
                <p className="border-t border-slate-100 pt-3 text-xs leading-5 text-slate-400">
                  Oranlar, tüm kategorilerdeki toplam haber sayısına göredir.
                </p>
              </div>
            ) : (
              <DashboardState
                error={Boolean(categoryQuery.error)}
                empty="Dağılımı gösterecek kategori haberi bulunmuyor."
              />
            )}
          </DashboardPanel>

          <DashboardPanel
            title="Kaynak dağılımı"
            description="Haber sitelerine göre tanımlı kategori URL'leri"
          >
            {sourceQuery.isPending ? (
              <DashboardRowsSkeleton />
            ) : sourceQuery.data && sources.length ? (
              <div className="space-y-4 p-5">
                {stats.siteDistribution.map((site) => (
                  <div key={site.id} className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Globe2 aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
                      {siteNames[site.id as NewsSites] ?? "Diğer kaynak"}
                    </span>
                    <span className="text-xs text-slate-500 tabular-nums">
                      {formatNumber(site.count)} URL
                    </span>
                    <span className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-500 tabular-nums">
                      {formatShare(site.count, sources.length)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <DashboardState
                error={Boolean(sourceQuery.error)}
                empty="Henüz haber kaynağı tanımlanmamış."
              />
            )}
          </DashboardPanel>
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <DashboardPanel
          title="Kategoriler"
          description="Kategori başına haber sayısı ve kaynak URL kapsamı"
          href={MainAdminMenuData.Categories.url}
        >
          {categoryQuery.isPending ? (
            <DashboardRowsSkeleton />
          ) : categoryQuery.data && categories.length ? (
            <>
              <div className="max-h-[28rem] overflow-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow className="border-slate-100 hover:bg-slate-50">
                      <TableHead
                        scope="col"
                        className="pl-5 text-xs text-slate-500"
                      >
                        Kategori
                      </TableHead>
                      <TableHead
                        scope="col"
                        className="text-right text-xs text-slate-500"
                      >
                        Haber
                      </TableHead>
                      <TableHead
                        scope="col"
                        className="pr-5 text-right text-xs text-slate-500"
                      >
                        Kaynak URL
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.categoryRows.map((category) => (
                      <TableRow
                        key={category.id}
                        className="border-slate-100 hover:bg-teal-50/40"
                      >
                        <TableCell className="py-3 pl-5">
                          <Link
                            href={categoryUrlConverter({
                              id: category.id,
                              title: category.categoryName,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-slate-700 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600"
                            aria-label={`${category.categoryName} kategorisini görüntüle (yeni sekme)`}
                          >
                            {category.categoryName}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-3 shrink-0 text-slate-400"
                            />
                          </Link>
                        </TableCell>
                        <TableCell className="text-right text-xs text-slate-600 tabular-nums">
                          {category.newsCount == null
                            ? "—"
                            : formatNumber(category.newsCount)}
                        </TableCell>
                        <TableCell className="pr-5 text-right">
                          <span
                            className={`inline-flex min-w-7 justify-center rounded-md px-2 py-1 text-xs font-medium tabular-nums ${sourceQuery.data && category.sourceCount > 0 ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-400"}`}
                          >
                            {sourceQuery.data ? category.sourceCount : "—"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="border-t border-slate-100 px-5 py-3 text-xs leading-5 text-slate-500">
                {sourceQuery.data
                  ? `${formatNumber(stats.categoriesWithSources)} / ${formatNumber(categories.length)} kategoride kaynak URL tanımlı.`
                  : "Kaynak URL kapsamı henüz hesaplanamadı."}
              </p>
            </>
          ) : (
            <DashboardState
              error={Boolean(categoryQuery.error)}
              empty="Henüz kategori eklenmemiş."
            />
          )}
        </DashboardPanel>

        <DashboardPanel
          title="Kategori URL'leri"
          description="Haberlerin alındığı kaynak bağlantıları"
          href={MainAdminMenuData.CategorySources.url}
        >
          {sourceQuery.isPending ? (
            <DashboardRowsSkeleton />
          ) : sourceQuery.data && sources.length ? (
            <ul className="max-h-[31rem] divide-y divide-slate-100 overflow-y-auto px-5">
              {sources.map((source) => {
                const externalUrl = getExternalUrl(source.url);
                return (
                  <li key={source.id} className="flex items-start gap-3 py-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                      <Link2 aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-xs font-semibold text-slate-700">
                          {stats.categoryNames.get(source.categoryId) ??
                            `Kategori #${source.categoryId}`}
                        </span>
                        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                          {siteNames[source.newsSite] ?? "Diğer kaynak"}
                        </span>
                      </div>
                      {externalUrl ? (
                        <a
                          href={externalUrl.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-2 rounded-sm text-xs leading-5 text-slate-500 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                          aria-label={`${source.url} kaynağını aç (yeni sekme)`}
                        >
                          <span className="min-w-0 flex-1 break-all">
                            {source.url}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="mt-0.5 size-3.5 shrink-0 text-slate-400 group-hover:text-teal-700"
                          />
                        </a>
                      ) : (
                        <p className="text-xs leading-5 break-all text-slate-500">
                          {source.url || "URL belirtilmemiş"}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <DashboardState
              error={Boolean(sourceQuery.error)}
              empty="Henüz kategori URL'si eklenmemiş."
            />
          )}
        </DashboardPanel>
      </div>
      <p className="text-xs leading-6 text-slate-400">
        Okunma sayıları tekil ziyaretçi sayısını değil, haberlerin toplam
        okunmasını gösterir. Yenile düğmesiyle güncel değerleri alabilirsiniz.
      </p>
    </section>
  );
}
