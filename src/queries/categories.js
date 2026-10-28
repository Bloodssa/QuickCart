import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../api/categories";
import { getErrorMessage } from "../api/client";

export const categoryKeys = { all: ["categories"] };

export const useCategories = () =>
    useQuery({
        queryKey: categoryKeys.all,
        queryFn: ({ signal }) => getCategories(signal),
        staleTime: 10 * 60_000,
    });

function useCategoryMutation(mutationFn, success) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: categoryKeys.all });
            qc.invalidateQueries({ queryKey: ["products"] }); // product cards show category names
            toast.success(success);
        },
        onError: (e) => toast.error(getErrorMessage(e)), // shows the server's message
    });
}

export const useSaveCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (c) => (c.id ? updateCategory(c) : createCategory(c)),
        onSuccess: (_, c) => {
            qc.invalidateQueries({ queryKey: categoryKeys.all });
            qc.invalidateQueries({ queryKey: ["products"] });
            toast.success(c.id ? "Category updated" : "Category created");
        },
        onError: (e) => toast.error(getErrorMessage(e)),
    });
};

export const useDeleteCategory = () => useCategoryMutation(deleteCategory, "Category deleted");