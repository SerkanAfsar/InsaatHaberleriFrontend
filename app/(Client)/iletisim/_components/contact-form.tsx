"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import CloudflareCaptcha from "@/components/utils/CloudflareCaptcha";
import CustomElement from "@/components/utils/custom-element";
import { useCrudData } from "@/hooks/use-queries";
import { API_URL, MainAdminMenuData } from "@/lib";

import { contactSchema } from "@/schemas";
import { ContactFormType } from "@/types";
import { MessageType } from "@/types/entity.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ContactForm() {
  const [token, setToken] = useState<string>("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      messageText: "",
      nameSurname: "",
      subject: "",
    },
  });

  const { isSuccess, isPending, mutateAsync } = useCrudData<
    MessageType,
    ContactFormType & { token: string }
  >(
    MainAdminMenuData.Messages.apiUrl,
    "POST",
    MainAdminMenuData.Messages.validateKey,
  );

  async function onSubmit(values: ContactFormType) {
    await mutateAsync({ ...values, token });
    setToken("");
    setCaptchaKey((prev) => prev + 1);
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex-1 space-y-6 text-left"
    >
      <CustomElement as="h3" className="text-xl font-semibold">
        İLETİŞİM FORMU
      </CustomElement>
      <FieldGroup className="grid w-full gap-4 md:grid-cols-2">
        <Controller
          name="nameSurname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                İsim Soyisim
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="İsim Soyisim..."
                autoComplete="off"
                className="rounded-none border border-black focus-visible:ring-0"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">E-Mail</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="E-Mail Adresiniz..."
                autoComplete="off"
                className="rounded-none border border-black focus-visible:ring-0"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="w-full">
        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Konu</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Konu..."
                autoComplete="off"
                className="rounded-none border border-black focus-visible:ring-0"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="w-full">
        <Controller
          name="messageText"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Mesaj</FieldLabel>
              {/* <Input
                {...field}
                type="textarea"
                className="h-52 w-full rounded-none border border-black focus-visible:ring-0"
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Mesaj..."
                autoComplete="off"
              /> */}
              <textarea
                {...field}
                className="h-40 w-full rounded-none border border-black p-4 focus-visible:ring-0"
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Mesaj..."
                autoComplete="off"
              ></textarea>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-clientdark disabled:bg-admin-primary/50 hover:bg-primary/80 h-auto w-full cursor-pointer rounded-none p-3 text-center text-white"
      >
        Gönder
      </Button>
      <CloudflareCaptcha
        className="float-right block w-75 rounded-md!"
        onVerify={setToken}
        optionsRest={{ size: "normal" }}
        onExpire={() => setToken("")}
        key={captchaKey}
      />
      {form.formState.errors.root && (
        <b className="block text-center text-red-500">
          {form.formState.errors.root.message}
        </b>
      )}
    </form>
  );
}
