import { Button } from "../ui/button";
import { SheetClose, SheetFooter } from "../ui/sheet";

export default function DatatableModalSubmit({
  loading,
}: {
  loading: boolean;
}) {
  return (
    <SheetFooter className="mt-auto px-0">
      <Button
        type="submit"
        disabled={loading}
        className="h-auto cursor-pointer p-3"
      >
        {loading ? "Kaydediliyor" : "Değişiklikleri Kaydet"}
      </Button>
      <SheetClose asChild>
        <Button
          variant="outline"
          disabled={loading}
          className="h-auto border border-gray-600 p-3 shadow"
        >
          Kapat
        </Button>
      </SheetClose>
    </SheetFooter>
  );
}
