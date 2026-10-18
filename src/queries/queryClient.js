import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60_000, // fresh for 1 min
            gcTime: 10 * 60_000, // unused data is kept 10 mins
            refetchOnReconnect: false,
            retry: (count, error) => (error.response?.status ?? 500) >= 500 && count < 2,   // never retry 4xx status code
        }
    }
});