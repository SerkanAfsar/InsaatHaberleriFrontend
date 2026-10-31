"use client";
import AdminModalSubmit from "@/components/utils/admin-modal-submit";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCrudData, useGetAllData } from "@/hooks/use-queries";
import { MainAdminMenuData } from "@/lib";
import { setErrors } from "@/lib/utils";
import { addCategorySourceSchema, NewsSites } from "@/schemas";
import {
  AddCategorySourceType,
  AddFormRef,
  AddUpdateContainerProps,
  CustomComboboxItemProps,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { memo, useEffect, useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { CategoryType } from "@/types/entity.types";
import { CustomCombobox } from "@/components/custom-ui/custom-combobox";
const initialValues: AddCategorySourceType = {
  categoryId: 0,
  newsSite: 1,
  url: "",
};

const AddUpdateCategorySourceDetail = React.forwardRef<
  AddFormRef,
  AddUpdateContainerProps<AddCategorySourceType>
>(({ type, idNumber, setOpened, defaultValues, ...rest }, ref) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<AddCategorySourceType>({
    resolver: zodResolver(addCategorySourceSchema),
    defaultValues: defaultValues ?? initialValues,
  });

  const apiUrl = `${MainAdminMenuData.CategorySources.apiUrl}${idNumber ? `/${idNumber}` : ""}`;

  const { mutateAsync, isSuccess, error } = useCrudData(
    apiUrl,
    type == "ADD" ? "POST" : "PUT",
    MainAdminMenuData.CategorySources.validateKey,
  );

  const { data: categoryList } = useGetAllData<CategoryType>(
    MainAdminMenuData.Categories.apiUrl,
    MainAdminMenuData.Categories.validateKey,
  );

  const categorydata: CustomComboboxItemProps[] =
    categoryList?.data?.map((item) => ({
      id: item.id,
      value: item.categoryName,
    })) || [];

  const newsSiteOptions: CustomComboboxItemProps[] = Object.entries(NewsSites)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([label, value]) => ({
      value: label,
      id: Number(value),
    }));

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setOpened((prev: boolean) => !prev);
    }
  }, [isSuccess, form, type, setOpened]);

  async function onSubmit(values: AddCategorySourceType) {
    await mutateAsync(values);
  }

  useImperativeHandle(ref, () => ({
    submit() {
      form.handleSubmit(onSubmit)();
    },
    reset() {
      form.reset(initialValues);
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
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="categoryName">Kategori Adı</FieldLabel>

              <CustomCombobox
                items={categorydata}
                placeHolder="Kategori Seçiniz.."
                value={field.value}
                onChange={(value?: number) => {
                  field.onChange(value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="Url">Url</FieldLabel>
              <Input
                {...field}
                id="Url Giriniz"
                aria-invalid={fieldState.invalid}
                placeholder="Url giriniz..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="newsSite"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newsSite">Kaynak Haber Sitesi</FieldLabel>
              <CustomCombobox
                items={newsSiteOptions}
                placeHolder="Kaynak Seçiniz.."
                value={field.value}
                onChange={(value?: number) => {
                  field.onChange(value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <AdminModalSubmit loading={form.formState.isSubmitting} />
    </form>
  );
});
AddUpdateCategorySourceDetail.displayName = "AddUpdateCategorySourceDetail";

export default memo(AddUpdateCategorySourceDetail);
