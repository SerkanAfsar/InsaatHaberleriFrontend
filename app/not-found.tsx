import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="public-site flex min-h-svh w-full flex-col">
      <div className="bg-main-bg grid flex-1 place-items-center px-4 py-12 sm:py-24">
        <div className="flex w-full max-w-xl flex-col items-center text-center">
          <div
            role="img"
            aria-label="404 hatası"
            className="relative mb-8 inline-flex select-none"
          >
            <span className="text-clientprimary text-[clamp(8rem,28vw,13rem)] leading-none font-extrabold tracking-tighter">
              404
            </span>
            <span className="bg-clientdark border-main-bg absolute right-0 bottom-0 flex size-14 items-center justify-center rounded-full border-4 text-white sm:size-18">
              <SearchX aria-hidden="true" className="size-6 sm:size-8" />
            </span>
          </div>

          <span aria-hidden="true" className="bg-clientprimary mb-6 h-1 w-12" />
          <h1 className="text-clientdark text-2xl leading-snug font-bold sm:text-3xl">
            Aradığınız sayfa bulunamadı
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
            Ulaşmak istediğiniz sayfa kaldırılmış, taşınmış veya hiç var olmamış
            olabilir.
          </p>
          <Link
            href="/"
            className="bg-clientprimary hover:bg-clientdark focus-visible:ring-clientprimary mt-8 inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Anasayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
}
