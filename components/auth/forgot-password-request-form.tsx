"use client";

import { forgotPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { setErrors } from "@/lib/utils";
import { forgotPasswordSchema } from "@/schemas";
import { ForgotPasswordType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPasswordRequestForm({
  onBackToLogin,
  token,
}: {
  onBackToLogin?: () => void;
  token?: string;
}) {
  const [successMessage, setSuccessMessage] = useState("");
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { eMail: "" },
  });

  async function onSubmit(values: ForgotPasswordType) {
    setSuccessMessage("");
    const result = await forgotPasswordAction({ ...values, token });

    if (!result.success) {
      setErrors({
        error: result.errors ?? { error: "Bağlantı gönderilemedi." },
        form,
      });
      return;
    }

    setSuccessMessage(
      "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
    );
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-teal-50 text-[#0E4D63] dark:bg-teal-950 dark:text-teal-300">
          <Mail className="size-6" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-bold">Şifrenizi mi unuttunuz?</h1>
        <p className="text-muted-foreground text-balance">
          E-posta adresinizi girin. Şifrenizi sıfırlamanız için size bir
          bağlantı gönderelim.
        </p>
      </div>

      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.eMail}>
          <FieldLabel htmlFor="forgot-password-email">E-posta</FieldLabel>
          <Input
            {...form.register("eMail")}
            id="forgot-password-email"
            type="email"
            placeholder="E-posta adresiniz..."
            autoComplete="email"
            aria-invalid={!!form.formState.errors.eMail}
            disabled={form.formState.isSubmitting}
          />
          <FieldError errors={[form.formState.errors.eMail]} />
        </Field>

        {form.formState.errors.root?.message && (
          <p role="alert" className="text-destructive text-center text-sm">
            {form.formState.errors.root.message}
          </p>
        )}
        {successMessage && (
          <p
            role="status"
            className="text-center text-sm text-teal-700 dark:text-teal-300"
          >
            {successMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-12 w-full gap-2 bg-[#0E4D63] hover:bg-[#0B3F52]"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          )}
          {form.formState.isSubmitting
            ? "Bağlantı gönderiliyor..."
            : "Sıfırlama Bağlantısı Gönder"}
        </Button>

        <FieldDescription className="text-center">
          Şifrenizi hatırladınız mı?{" "}
          {onBackToLogin ? (
            <button
              type="button"
              onClick={onBackToLogin}
              className="hover:text-primary cursor-pointer underline underline-offset-4"
            >
              Giriş Yapın
            </button>
          ) : (
            <Link
              href="/client-login"
              className="hover:text-primary underline underline-offset-4"
            >
              Giriş Yapın
            </Link>
          )}
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
