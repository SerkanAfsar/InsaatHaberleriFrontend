"use client";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type CustomInputProps = {
  iconLeft?: LucideIcon;
  isPassword?: boolean;
} & React.ComponentPropsWithoutRef<typeof Input>;

const CustomInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  CustomInputProps
>(({ isPassword = false, iconLeft, className, ...rest }, ref) => {
  const [inputType, setInputType] = useState<"input" | "password">(
    isPassword ? "password" : "input",
  );
  const LeftIcon = iconLeft || null;
  return (
    <div className="relative block w-full">
      {LeftIcon && (
        <LeftIcon
          size={18}
          className="text-primary absolute top-[50%] left-5 -translate-y-1/2"
        />
      )}
      <Input
        {...rest}
        ref={ref}
        className={cn(
          "placeholder:dark:text-white",
          className,
          iconLeft && "pl-12",
        )}
        type={inputType}
      />
      {isPassword && (
        <div
          onClick={() =>
            setInputType((prev) => (prev == "input" ? "password" : "input"))
          }
          className="text-primary [&>svg]:text-primary absolute top-1/2 right-5 inline-block -translate-y-1/2 cursor-pointer"
        >
          {inputType == "input" ? <Eye size={18} /> : <EyeOff size={18} />}
        </div>
      )}
    </div>
  );
});

CustomInput.displayName = "CustomInput";
export default CustomInput;
