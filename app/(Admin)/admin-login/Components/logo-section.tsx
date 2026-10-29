import { EnvValues } from "@/lib/utils";

export default function LogoSection() {
  return (
    <section className="bg-admin-darkblue flex h-full w-full items-center justify-center bg-[url(/images/admin-login-logo.svg)] bg-contain bg-center bg-no-repeat xl:w-[50%]">
      <h2 className="mx-auto max-w-sm text-center text-4xl leading-12 text-white">
        {EnvValues.SiteName}
        <br />
        Admin Panel Giriş
      </h2>
    </section>
  );
}
