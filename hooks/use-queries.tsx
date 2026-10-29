import { revalidateKeys } from "@/actions/cache.actions";
import { BaseFetch } from "@/lib/baseFetch";
import { CustomError } from "@/lib/errors";
import { getErrResult, getUnauthorizedUrl } from "@/lib/utils";
import { GetAllDataServiceType, ResponseResult } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { toast } from "react-toastify";

export function useSingleItemById<T>(
  id: number | string,
  url: string,
  validateKey: string,
  enabled: boolean = false,
) {
  const router = useRouter();
  const pathname = usePathname();
  const loader = useTopLoader();

  const { data, error, isPending, isLoading } = useQuery({
    queryKey: [validateKey, { id }],
    queryFn: async () => {
      loader.start();
      const result = await BaseFetch({
        method: "GET",
        url,
        requireToken: true,
      });

      if (!result.success) {
        if (result.statusCode == 401) {
          loader.done();
          return router.push(getUnauthorizedUrl(pathname));
        }
        const err = getErrResult(result.errors);
        loader.done();
        throw new Error(err);
      }
      loader.done();
      return result.entity as T;
    },

    refetchOnWindowFocus: true,
    retry: false,
    enabled,
  });

  return { data, error, isPending, isLoading };
}

export function useGetAllData<EntityType>(
  url: string,
  validateKey: string,
  filter?: GetAllDataServiceType,
  enabled?: boolean,
) {
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams({
    offset: filter?.offset.toString() ?? "0",
    count: filter?.count.toString() ?? "1000",
    globalFilter: filter?.globalFilter ?? "",
    filters: JSON.stringify(filter?.filters),
  });

  if (filter?.sorting) {
    params.append("sorting", JSON.stringify(filter.sorting));
  }

  const queryKey = [validateKey] as any[];

  let lastUrl = url;

  if (filter) {
    lastUrl += `?${params.toString()}`;
    queryKey.push({ filter });
  }
  queryKey.push({ lastUrl });

  const { data, error, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const result: ResponseResult<EntityType> = await BaseFetch({
        method: "GET",
        url: lastUrl,
        requireToken: true,
      });
      if (!result.success) {
        if (result.statusCode == 401) {
          return router.push(getUnauthorizedUrl(pathname));
        }
        const err = getErrResult(result.errors);
        throw new Error(err);
      }

      return {
        data: result.entities,
        rowCount: result.rowCount || 0,
      };
    },

    refetchOnWindowFocus: true,
    retry: false,
    enabled,
  });
  return { data, error, isPending };
}

export function useGetAllDataSingle<EntityType>(
  id: number,
  url: string,
  enabled: boolean,
) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, error, isPending, refetch, isEnabled } = useQuery({
    queryKey: [url, id],
    queryFn: async () => {
      const result: ResponseResult<EntityType> = await BaseFetch({
        method: "GET",
        url,
        requireToken: true,
      });
      if (!result.success) {
        if (result.statusCode == 401) {
          return router.push(getUnauthorizedUrl(pathname));
        }

        const err = getErrResult(result.errors);
        throw new Error(err);
      }

      return {
        data: result.entities as EntityType[],
      };
    },

    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });
  return { data, error, isPending, refetch, isEnabled };
}

export function useCrudData<
  EntityType extends object,
  DataType extends object | undefined,
>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  validateKey?: string | string[],
  cacheKeys?: string[],
  formType: "json" | "formdata" = "json",
  callBack?: () => Promise<void>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const loader = useTopLoader();
  const queryClient = useQueryClient();
  const validateKeys = validateKey
    ? Array.isArray(validateKey)
      ? validateKey
      : [validateKey]
    : [];
  const {
    data: resultData,
    error,
    isPending,
    isSuccess,
    mutateAsync,
  } = useMutation({
    onMutate: async () => {
      loader.start();
      await Promise.all(
        validateKeys.map((key) =>
          queryClient.cancelQueries({ queryKey: [key] }),
        ),
      );
    },
    mutationFn: async (data?: DataType) => {
      const result = await BaseFetch<EntityType, DataType>({
        method,
        url,
        data,
        requireToken: true,
        formType,
      });

      if (!result.success && result.errors) {
        throw new CustomError(result.errors, result.statusCode);
      }

      return result.entity as EntityType;
    },
    onError: (error: CustomError) => {
      const err = getErrResult(error.errorResult);
      toast.error(err || "Bilinmeyen Hata", {
        position: "top-right",
      });
      if (error.statusCode == 401) {
        return router.push(getUnauthorizedUrl(pathname));
      }
    },
    onSuccess: (data: EntityType) => {
      if (method == "POST" || method == "DELETE") {
        const message =
          method == "POST" ? "Kaydetme Başarılı" : "Silme Başarılı";

        toast.success(message, {
          position: "top-right",
        });
      } else {
        toast.warning("Gücelleme Başarılı", { position: "top-right" });
      }
      return data;
    },
    onSettled: async () => {
      await Promise.all(
        validateKeys.map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      );
      if (cacheKeys) {
        await revalidateKeys(cacheKeys);
      }
      if (callBack) {
        await callBack();
      }

      loader.done();
    },
  });

  return { data: resultData, error, isSuccess, isPending, mutateAsync };
}
