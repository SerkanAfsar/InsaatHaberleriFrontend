"use client";

import { loginAction } from "@/actions/login.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CloudflareCaptcha from "@/components/utils/CloudflareCaptcha";

import { setErrors } from "@/lib/utils";
import { loginShema } from "@/schemas";
import { LoginType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

function LoginSection() {
  const [token, setToken] = useState<string>("");
  const router = useRouter();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginShema),
    mode: "onChange",
    defaultValues: {
      eMail: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginType) {
    const result = await loginAction({ ...values, token });
    if (!result.success && result.errors) {
      return setErrors({ error: result.errors, form });
    }
    return router.push("/Admin/Dashboard");
  }

  return (
    <section className="flex h-full w-full flex-col items-start justify-center bg-white xl:w-[50%]">
      <div className="mx-auto w-md space-y-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-black">Portal Giriş</h1>
        <h2 className="text-sm text-gray-400">
          Portala Giriş Yapmak İçin E-Posta Adresinizi ve Şifrenizi Giriniz
        </h2>
        {/* <div className="flex w-full items-center justify-between">
          <Button
            variant={"ghost"}
            className="flex w-50 cursor-pointer items-center justify-center bg-gray-100 p-3"
          >
            <GoogleIcon />
            Google İle Giriş
          </Button>
          <Button
            variant={"ghost"}
            className="flex w-50 cursor-pointer items-center justify-center bg-gray-100 p-3"
          >
            <TwitterIcon />
            Twitter İle Giriş
          </Button>
        </div> */}
        <div className="relative block h-px w-full bg-gray-200 text-gray-400">
          <span className="absolute top-[50½] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
            Veya
          </span>
        </div>

        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-left"
        >
          <FieldGroup>
            <Controller
              name="eMail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">E-Posta</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="E-Posta Adresiniz..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Şifre</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Şifreniz"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                className="data-[state=checked]:bg-admin-primary h-5 w-5 data-[state=checked]:border-gray-500"
              />
              <Label htmlFor="terms" className="cursor-pointer text-gray-600">
                Beni Hatırla
              </Label>
            </div>
            <Link href={"#"} className="text-admin-primary text-sm">
              Şifremi Unuttum
            </Link>
          </div>
          <Button
            type="submit"
            className="bg-admin-primary disabled:bg-admin-primary/50 hover:bg-admin-primary/80 h-auto w-full cursor-pointer p-3 text-center text-white"
          >
            Giriş
          </Button>
          <CloudflareCaptcha
            onVerify={setToken}
            onExpire={() => setToken("")}
            optionsRest={{ size: "flexible" }}
          />
          {form.formState.errors.root && (
            <b className="block text-center text-red-500">
              {form.formState.errors.root.message}
            </b>
          )}
        </form>
      </div>
    </section>
  );
}

export default LoginSection;
