import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

type CustomSearchProps = {
  className?: string;
};
export function CustomSearch({ className }: CustomSearchProps) {
  return (
    <InputGroup className={cn(className)}>
      <InputGroupInput placeholder="Arama..." />
      <InputGroupAddon align="inline-end" className="mr-2">
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
