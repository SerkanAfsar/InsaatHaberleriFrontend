import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export type CustomGlobalFilterProps = {
  value: string;
  onChange: (val: string) => void;
  clearFilter: () => void;
  className?: string;
};

export default function CustomGlobalFilter({
  onChange,
  value,
  className,
}: CustomGlobalFilterProps) {
  const [val, setVal] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(val);
    }, 1000);
    return () => clearTimeout(timer);
  }, [val, onChange]);

  return (
    <Input
      className={cn(className)}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      placeholder="Arama..."
    />
  );
}
