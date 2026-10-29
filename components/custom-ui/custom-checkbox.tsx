"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export type CustomCheckBoxProps = {
  id: number;
  title: string;
  onCheckBox?: (checked: boolean) => void;
  checked: boolean;
  idTitle: string;
};

export default function CustomCheckBox({
  id,
  onCheckBox,
  title,
  checked,
  idTitle,
}: CustomCheckBoxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsChecked(checked);
  }, [checked]);
  return (
    <Field orientation="horizontal" className="cursor-pointer">
      <Checkbox
        key={id.toString()}
        checked={isChecked}
        onCheckedChange={(checked: boolean) => {
          const value = checked === true;
          setIsChecked(value);
          onCheckBox?.(value);
        }}
        id={`${idTitle}:${id.toString()}`}
        name={`${idTitle}:${id.toString()}`}
      />
      <Label className="text-sm" htmlFor={`${idTitle}:${id.toString()}`}>
        {title}
      </Label>
    </Field>
  );
}
