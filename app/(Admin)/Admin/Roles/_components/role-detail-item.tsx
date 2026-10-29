import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { ROLE_CLAIM_LIST } from "@/lib/data";
import { AddRoleType } from "@/types";
import { useForm } from "react-hook-form";

type FormItemType = ReturnType<typeof useForm<AddRoleType>>;

export default function RoleModuleItem({
  itemKey,
  form,
}: {
  itemKey: [keyof typeof ROLE_CLAIM_LIST][number];
  form: FormItemType;
}) {
  const item = ROLE_CLAIM_LIST[itemKey];

  const handleSet = (checked: boolean, value: string) => {
    form.setValue(
      "claims",
      checked
        ? [...form.getValues("claims"), value]
        : form.getValues("claims").filter((a) => a != value),
    );
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.title} İşlemleri</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(item.permissions).map(([key, value], index) => (
          <div
            className="mb-4 flex w-full grid-cols-1 flex-row gap-4"
            key={index}
          >
            <Checkbox
              className="cursor-pointer"
              id={value}
              checked={form.watch("claims")?.includes(value)}
              onCheckedChange={(checked: boolean) => handleSet(checked, value)}
            />
            <FieldLabel className="cursor-pointer capitalize" htmlFor={value}>
              {key}
            </FieldLabel>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
