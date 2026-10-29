import { useQueryClient } from "@tanstack/react-query";

export default function useValidateQuery({
  queryKeys,
}: {
  queryKeys: string[];
}) {
  const queryClient = useQueryClient();

  const invalidateQueryFunc = async () => {
    await Promise.all(
      queryKeys.map((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      ),
    );
  };

  return { invalidateQueryFunc };
}
