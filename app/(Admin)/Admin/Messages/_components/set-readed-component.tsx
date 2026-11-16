import CustomElement from "@/components/utils/custom-element";
import { useCrudData } from "@/hooks/use-queries";
import { MainAdminMenuData } from "@/lib";
import { useCallback } from "react";

export default function SetReadedComponent({
  id,
  setOpened,
}: {
  id: number;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const apiUrl = `${MainAdminMenuData.Messages.apiUrl}/${id}`;
  const { mutateAsync, isSuccess, error, isPending } = useCrudData(
    apiUrl,
    "PUT",
    MainAdminMenuData.Messages.validateKey,
  );
  const handleClick = useCallback(async () => {
    await mutateAsync();
    setOpened(false);
  }, [mutateAsync, setOpened]);

  return (
    <CustomElement
      onClick={async () => await handleClick()}
      as="button"
      className="bg-admin-primary mt-auto mb-4 flex w-full cursor-pointer items-center justify-center rounded-md p-4 text-white"
    >
      Okundu Olarak İşaretle
    </CustomElement>
  );
}
