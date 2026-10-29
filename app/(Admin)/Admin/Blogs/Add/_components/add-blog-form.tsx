"use client";

import { updateNewsCacheAction } from "@/actions/cache.actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CACHE_TAGS, MainAdminMenuData } from "@/lib";
import { setErrors } from "@/lib/utils";
import { useCrudData } from "@/hooks/use-queries";
import { addBlogSchema } from "@/schemas";
import type { AddNewsType } from "@/types";
import type { BlogType } from "@/types/entity.types";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const ClientSideCustomEditor = dynamic(
  () => import("@/components/custom-ui/custom-editor"),
  { ssr: false },
);

const initialValues: AddNewsType = {
  title: "",
  subTitle: "",
  seoTitle: "",
  seoDescription: "",
  content: "",
  image: undefined,
};

export default function AddBlogForm() {
  const router = useRouter();
  const form = useForm<AddNewsType>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: initialValues,
  });
  const blogMenu = MainAdminMenuData.Blogs;
  const { mutateAsync, isSuccess, isPending, error } = useCrudData<
    BlogType,
    AddNewsType
  >(
    blogMenu.apiUrl,
    "POST",
    blogMenu.validateKey,
    [CACHE_TAGS.ARTICLES.ARTICLE_LIST],
    "formdata",
    updateNewsCacheAction,
  );

  useEffect(() => {
    if (error) setErrors({ error, form });
  }, [error, form]);

  useEffect(() => {
    if (isSuccess) router.push(blogMenu.url);
  }, [isSuccess, router, blogMenu.url]);

  async function onSubmit(values: AddNewsType) {
    await mutateAsync(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup className="grid gap-5 md:grid-cols-2">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="blog-title">Başlık</FieldLabel>
              <Input
                {...field}
                id="blog-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="blog-image">Kapak Görseli</FieldLabel>
              <Input
                id="blog-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                aria-invalid={fieldState.invalid}
                onChange={(event) => field.onChange(event.target.files?.[0])}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="seoTitle"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="blog-seo-title">SEO Başlığı</FieldLabel>
              <Input
                {...field}
                id="blog-seo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="seoDescription"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="blog-seo-description">
                SEO Açıklaması
              </FieldLabel>
              <Input
                {...field}
                id="blog-seo-description"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="subTitle"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="md:col-span-2">
              <FieldLabel htmlFor="blog-subtitle">Alt Başlık</FieldLabel>
              <ClientSideCustomEditor
                id="blog-subtitle"
                data={field.value}
                onChange={(_, editor) => field.onChange(editor.getData())}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="md:col-span-2">
              <FieldLabel htmlFor="blog-content">İçerik</FieldLabel>
              <ClientSideCustomEditor
                id="blog-content"
                data={field.value}
                onChange={(_, editor) => field.onChange(editor.getData())}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {form.formState.errors.root?.message && (
        <p role="alert" className="text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : "Haberi Kaydet"}
        </Button>
      </div>
    </form>
  );
}
