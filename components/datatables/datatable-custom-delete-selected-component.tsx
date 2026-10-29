import { Button } from "../ui/button";

import { useCrudData } from "@/hooks/use-queries";
import { MainAdminMenuData } from "@/lib";
import { memo, useEffect } from "react";

function CustomDatatableDeleteRowsComponent({
  idList,
  componentKey,
  callBack,
}: {
  idList: number[];
  componentKey: keyof typeof MainAdminMenuData;
  callBack?: any;
}) {
  const { isSuccess, mutateAsync } = useCrudData(
    `${MainAdminMenuData[componentKey].apiUrl}/DeleteSelectedList`,
    "POST",
    MainAdminMenuData[componentKey].validateKey,
  );
  const handleClick = async () => {
    await mutateAsync(idList);
  };

  useEffect(() => {
    if (isSuccess && callBack) {
      callBack();
    }
  }, [isSuccess, callBack]);

  return (
    <Button
      variant={"default"}
      onClick={handleClick}
      size={"lg"}
      className="ml-auto cursor-pointer"
    >
      Seçili Verileri Sil
    </Button>
  );
}
export default memo(CustomDatatableDeleteRowsComponent);
