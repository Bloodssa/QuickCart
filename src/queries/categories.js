import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";

export const categoryKeys = { all: ["categories"] }

export const useCategories = () => 
    useQuery({
        queryKey: categoryKeys.all,
        queryFn: ({ signal }) => getCategories(signal),
        staleTime: 10 * 60_000
    });