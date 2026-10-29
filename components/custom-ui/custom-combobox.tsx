"use client";

import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

import { CustomComboboxProps } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export function CustomCombobox({
  onChange,
  value,
  items,
  placeHolder,
  className,
  error,
  setFirst,
  icon,
}: CustomComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const Icon = icon ? (LucideIcons[icon] as any) : undefined;

  const newItems = setFirst ? [{ id: 0, value: "Seçiniz" }, ...items] : items;

  const mainValue = value
    ? newItems.find((item) => item.id === value)?.value
    : placeHolder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={cn(className, error && "relative border-red-500")}
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-auto w-full justify-between p-3 hover:bg-white/80"
        >
          <div className="flex flex-1 items-center gap-2">
            {Icon && <Icon className="text-primary/60 size-5 shrink-0" />}
            <span
              className={cn(icon && "h-[90%] border-l border-gray-500/50 pl-2")}
            >
              {mainValue ?? placeHolder}
            </span>
          </div>
          <LucideIcons.ChevronsUpDown
            className={cn("opacity-50", error && "text-red-500")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-(--radix-popover-trigger-width) p-0")}>
        <Command>
          <CommandInput placeholder={placeHolder} className="h-9" />
          <CommandList>
            <CommandEmpty>Sonuç Bulunamadı</CommandEmpty>
            <CommandGroup>
              {newItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange?.(
                      items.find((a) => a.value == currentValue)?.id || 0,
                    ); // 🔥 RHF buradan yakalar
                    setOpen(false);
                  }}
                >
                  {item.value}
                  <LucideIcons.Check
                    className={cn(
                      "ml-auto",
                      value === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
