import { Loader2 } from "lucide-react";

export default function AdminMenuItemLoader() {
  return (
    <div className="border-input flex size-12 items-center justify-center rounded-full border p-4">
      <Loader2 className="animate-spin" />
    </div>
  );
}
