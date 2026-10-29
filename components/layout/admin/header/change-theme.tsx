"use client";

import { cn } from "@/lib/utils";
import { BaseComponentType } from "@/types";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ChangeThemeProps = BaseComponentType & {};
export default function ChangeTheme({ className }: ChangeThemeProps) {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "border-input relative flex size-10 items-center justify-center rounded-full border",
        className,
      )}
    >
      <Icon className="size-5" />
    </div>
  );
}
