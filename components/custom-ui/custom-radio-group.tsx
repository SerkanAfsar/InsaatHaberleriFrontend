"use client";

import { BaseComponentType } from "@/types";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";

export type CustomRadioGropProps = BaseComponentType & {
  items: { name: string; value: string }[];
  title: string;
  value?: string;
  onValueChange?: (value: string) => void;
};
export default function CustomRadioGroup({
  items,
  className,
  title,
  value,
  onValueChange,
}: CustomRadioGropProps) {
  return (
    <RadioGroup
      defaultValue="option-one"
      name={title}
      className={cn(
        "border-input w-full rounded-[10px] border p-3 py-3.5",
        className,
      )}
      value={value}
      onValueChange={onValueChange}
    >
      {items.map((item, index) => {
        return (
          <div key={index} className="flex items-center gap-3">
            <RadioGroupItem value={item.value} id={item.name} />
            <Label htmlFor={item.name}>{item.name}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
