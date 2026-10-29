import { Button } from "../ui/button";
import { SheetClose, SheetFooter } from "../ui/sheet";

export default function AdminModalSubmit() {
  return (
    <SheetFooter className="mt-auto px-0">
      <Button type="submit" className="h-auto cursor-pointer p-3">
        Değişiklikleri Kaydet
      </Button>
      <SheetClose asChild>
        <Button
          variant="outline"
          className="h-auto border border-gray-600 p-3 shadow"
        >
          Kapat
        </Button>
      </SheetClose>
    </SheetFooter>
  );
}
