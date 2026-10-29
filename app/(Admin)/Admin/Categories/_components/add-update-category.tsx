"use client";
import AdminModalSubmit from "@/components/utils/admin-modal-submit";
import { CustomCombobox } from "@/components/custom-ui/custom-combobox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCrudData } from "@/hooks/use-queries";
import { CACHE_TAGS, MainAdminMenuData } from "@/lib";
import { setErrors } from "@/lib/utils";
import { addCategorySchema } from "@/schemas";
import { AddCategoryType, AddFormRef, AddUpdateContainerProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { memo, useEffect, useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

type AddCategoryFormValues = AddCategoryType & {
  lucideReactIconName?: string | null;
};

const AddUpdateCategory = React.forwardRef<AddFormRef, AddUpdateContainerProps>(
  ({ type, idNumber, setOpened, defaultValues, ...rest }, ref) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const initialValues: AddCategoryType = defaultValues ?? {
      categoryName: "",
      seoTitle: "",
      seoDescription: "",
      queue: 0,
      parentCategoryId: 0,
      lucideReactIconName: null,
    };

    const form = useForm<AddCategoryFormValues, unknown, AddCategoryType>({
      resolver: zodResolver(addCategorySchema),
      defaultValues: initialValues,
    });

    const categoryEndPoint = MainAdminMenuData.Categories;

    const apiUrl = `${categoryEndPoint.apiUrl}${idNumber ? `/${idNumber}` : ""}`;

    const { mutateAsync, isSuccess, error } = useCrudData(
      apiUrl,
      type == "ADD" ? "POST" : "PUT",
      categoryEndPoint.validateKey,
      [
        CACHE_TAGS.CATEGORIES.ALL_CATEGORIES,
        `${CACHE_TAGS.CATEGORIES.ALL_CATEGORIES}:${idNumber}`,
      ],
    );

    useEffect(() => {
      if (isSuccess) {
        form.reset();
        setOpened((prev: boolean) => !prev);
      }
    }, [isSuccess, form, type, setOpened]);

    async function onSubmit(values: AddCategoryType) {
      await mutateAsync(values);
    }

    useImperativeHandle(ref, () => ({
      submit() {
        form.handleSubmit(onSubmit)();
      },
      reset() {
        form.reset({ categoryName: "", seoTitle: "", seoDescription: "" });
      },
    }));

    useEffect(() => {
      if (error) {
        setErrors({ error, form });
      }
    }, [error, form]);

    return (
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
        {...rest}
      >
        <FieldGroup>
          <Controller
            name="categoryName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="categoryName">Kategori Adı</FieldLabel>
                <Input
                  {...field}
                  id="categoryName"
                  aria-invalid={fieldState.invalid}
                  placeholder="Kategori Adı Giriniz..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="seoTitle"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="seoTitle">SEO Başlığı</FieldLabel>
                <Input
                  {...field}
                  id="seoTitle"
                  aria-invalid={fieldState.invalid}
                  placeholder="SEO başlığı giriniz..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="seoDescription"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="seoDescription">SEO Açıklaması</FieldLabel>
                <Textarea
                  {...field}
                  id="seoDescription"
                  aria-invalid={fieldState.invalid}
                  placeholder="SEO açıklaması giriniz..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <AdminModalSubmit />
      </form>
    );
  },
);
AddUpdateCategory.displayName = "AddUpdateCategory";

export default memo(AddUpdateCategory);
