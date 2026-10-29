import Link from "next/link";

export default function HeaderNav() {
  return (
    <nav className="hidden flex-row text-lg uppercase lg:flex lg:gap-2 xl:gap-4">
      <Link href={"/"} title="Anasayfa" className="inline-block p-2">
        Anasayfa
      </Link>

      <Link href={"/firmalar"} title="Firmalar" className="inline-block p-2">
        Firmalar
      </Link>

      <Link href={"/haberler/1"} title="Haberler" className="inline-block p-2">
        Haberler
      </Link>
      <Link href={"/"} title="Fuar Ve Etkinlikler" className="inline-block p-2">
        Fuar ve Etkinlikler
      </Link>
      <Link href={"/"} title="İletişim" className="inline-block p-2">
        İletişim
      </Link>
    </nav>
  );
}
