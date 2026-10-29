"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";

import { useCrudData } from "@/hooks/use-queries";
import { AddRoleType } from "@/types";
import { addRoleSchema } from "@/schemas";
import { ROLE_CLAIM_LIST } from "@/lib/data";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RoleModuleItem from "../_components/role-detail-item";
import { MainAdminMenuData } from "@/lib";

type RoleDetailContainerProps = {
  type: "ADD" | "UPDATE";
  defaultValues?: AddRoleType;
  id?: string;
};

export default function RoleDetailContainer({
  type,
  defaultValues,
  id,
}: RoleDetailContainerProps) {
  const form = useForm<AddRoleType>({
    resolver: zodResolver(addRoleSchema),
    defaultValues: defaultValues ?? {
      claims: [],
      roleName: "",
    },
  });

  let apiUrl = MainAdminMenuData.Roles.apiUrl;

  if (type == "UPDATE") {
    apiUrl += "/" + id;
  }

  const { isSuccess, mutateAsync } = useCrudData(
    apiUrl,
    type == "ADD" ? "POST" : "PUT",
    MainAdminMenuData.Roles.validateKey,
  );

  async function onSubmit(values: AddRoleType) {
    await mutateAsync(values);
  }

  useEffect(() => {
    if (isSuccess && type == "ADD") {
      form.reset({ claims: [], roleName: "" });
    }
  }, [isSuccess, form, type]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col items-start justify-start"
    >
      <FieldGroup>
        <Controller
          name="roleName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Başlık</FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Başlık Giriniz..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {form.formState.errors.claims && (
          <div className="mt-4 block text-sm font-semibold text-red-500">
            {form.formState.errors.claims.message}
          </div>
        )}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {Object.keys(ROLE_CLAIM_LIST).map((item: any) => {
            return <RoleModuleItem key={item} itemKey={item} form={form} />;
          })}
        </div>
      </FieldGroup>
      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="mt-4 ml-auto inline-block h-auto w-auto cursor-pointer justify-end self-end p-4 disabled:bg-black/50"
      >
        Kaydet
      </Button>
    </form>
  );
}
