import useSWR, { KeyedMutator } from "swr";
import { ZodSchema } from "zod";
import {fetcher} from "../services";

type UseFetchResult<T> = {
  data: T | null;
  error: unknown;
  isLoading: boolean;
  isValidating: boolean;
  mutate: KeyedMutator<T>;
};

export const useFetch = <T>(url: string, schema: ZodSchema<T>): UseFetchResult<T> => {
  const { data, error, isValidating, mutate } = useSWR(url, fetcher);

  let parsedData: T | null = null;
  if (data) {
    try {
      parsedData = schema.parse(data);
    } catch (parseError) {
      console.error("Data parsing error:", parseError);
      parsedData = null;
    }
  }

  return {
    data: parsedData,
    error,
    isLoading: !data && !error,
    isValidating,
    mutate,
  };
};
