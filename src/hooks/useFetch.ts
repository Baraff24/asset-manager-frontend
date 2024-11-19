import { z, Schema } from "zod";
import useSWR, { KeyedMutator } from "swr";

// Define the fetcher function
const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then(res => res.json());

type UseDataFetchingResult<TSchema extends Schema> = {
    error: unknown,
    isLoading: boolean,
    isValidating: boolean,
    mutate: KeyedMutator<any>,
    data: z.infer<TSchema>
}

// Define the hook for fetching data
export const useDataFetching = <TSchema extends Schema>(url: string, schema: TSchema): UseDataFetchingResult<TSchema> => {
    const { data, error, isValidating, mutate } = useSWR(url, fetcher);

    return {
        data: data ? schema.parse(data) : data,
        error,
        isLoading: !data && !error,
        isValidating,
        mutate
    };
};
