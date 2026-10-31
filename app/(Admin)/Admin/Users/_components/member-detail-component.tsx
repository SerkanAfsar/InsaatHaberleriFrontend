"use client";
import AdminModalSubmit from "@/components/utils/admin-modal-submit";
import CustomSelect from "@/components/custom-ui/custom-select";
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
import { addMemberDetailSchema } from "@/schemas";

import {
  AddAppUserType,
  AddFormRef,
  AddRoleType,
  AddUpdateContainerProps,
  CustomOptionItemProps,
} from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect, useImperativeHandle, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

const AddUpdateMemberDetail = React.forwardRef<
  AddFormRef,
  AddUpdateContainerProps<AddAppUserType>
>(({ type, idNumber, setOpened, defaultValues, ...rest }, ref) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const initialValues: AddAppUserType = {
    email: "",
    name: "",
    password: "",
    roles: [],
    surname: "",
  };

  const form = useForm<AddAppUserType>({
    resolver: zodResolver(addMemberDetailSchema(type == "ADD")),
    defaultValues: defaultValues ?? initialValues,
  });

  const apiUrl = `${MainAdminMenuData.Users.apiUrl}${idNumber ? `/${idNumber}` : ""}`;

  const { mutateAsync, isSuccess, error } = useCrudData(
    apiUrl,
    type == "ADD" ? "POST" : "PUT",
    MainAdminMenuData.Users.validateKey,
  );

  const {
    data: rolesData,
    error: rolesError,
    isPending: rolesPending,
  } = useGetAllData<AddRoleType & { roleId: string }>(
    MainAdminMenuData.Roles.apiUrl,
    MainAdminMenuData.Roles.validateKey,
  );

  const roleItems =
    rolesData?.data?.map((item) => ({
      label: item.roleName as string,
      value: item.roleId,
    })) || [];

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setOpened((prev: boolean) => !prev);
    }
  }, [isSuccess, form, type, setOpened]);

  async function onSubmit(values: AddAppUserType) {
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
  if (rolesPending) {
    return <div>Roles Pending...</div>;
  }
  if (rolesError) {
    return <div>{rolesError.message}</div>;
  }

  return (
    <form
      ref={formRef}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-full flex-col"
      {...rest}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="categoryName">E-Mail</FieldLabel>

              <Input
                {...field}
                type="email"
                id="categoryName"
                aria-invalid={fieldState.invalid}
                placeholder="E-Mail Giriniz..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">İsim</FieldLabel>

              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="İsim Giriniz..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="surname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="surname">Soyisim</FieldLabel>

              <Input
                {...field}
                id="surname"
                aria-invalid={fieldState.invalid}
                placeholder="Soyisim Giriniz..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Şifre</FieldLabel>

              <Input
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Şifre Giriniz..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="roles"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="roles">Roller</FieldLabel>
              <CustomSelect
                {...field}
                id="roles"
                placeholder="Rolleri Seçiniz"
                options={roleItems}
                isMulti
                value={roleItems.filter((item) =>
                  field.value?.includes(item.value),
                )}
                onChange={(vals: any) =>
                  field.onChange(
                    vals.map((elem: CustomOptionItemProps) => elem.value),
                  )
                }
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
AddUpdateMemberDetail.displayName = "AddUpdateMemberDetail";

export default AddUpdateMemberDetail;
