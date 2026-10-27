// MOCK
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "./admin";

export const adminKeys = {
    all: ["admin"],
    dashboard: () => ["admin", "dashboard"],
    categories: (p) => ["admin", "categories", p],
    inventory: (p) => ["admin", "inventory", p],
    customers: (p) => ["admin", "customers", p],
    customer: (id) => ["admin", "customer", id],
    featured: () => ["admin", "featured"],
    productSearch: (q) => ["admin", "product-search", q],
    report: (p) => ["admin", "report", p],
    me: () => ["admin", "me"],
};

const list = { placeholderData: keepPreviousData };
const errMsg = (e) => e?.message || "Something went wrong. Please try again.";

export const useDashboard = () => useQuery({ queryKey: adminKeys.dashboard(), queryFn: adminApi.dashboard });

export const useCategories = (params) => useQuery({ queryKey: adminKeys.categories(params), queryFn: () => adminApi.categories(params), ...list });
export const useInventory = (params) => useQuery({ queryKey: adminKeys.inventory(params), queryFn: () => adminApi.inventory(params), ...list });
export const useCustomers = (params) => useQuery({ queryKey: adminKeys.customers(params), queryFn: () => adminApi.customers(params), ...list });
export const useCustomer = (id) => useQuery({ queryKey: adminKeys.customer(id), queryFn: () => adminApi.customer(id), enabled: !!id });
export const useFeatured = () => useQuery({ queryKey: adminKeys.featured(), queryFn: adminApi.featured });
export const useProductSearch = (q) =>
    useQuery({ queryKey: adminKeys.productSearch(q), queryFn: () => adminApi.searchProducts(q), enabled: q.trim().length >= 2 });
export const useSalesReport = (params) => useQuery({ queryKey: adminKeys.report(params), queryFn: () => adminApi.salesReport(params), ...list });
export const useMe = () => useQuery({ queryKey: adminKeys.me(), queryFn: adminApi.me });

function useAdminMutation(fn, { invalidate = [], success }) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: () => {
            invalidate.forEach((key) => qc.invalidateQueries({ queryKey: key }));
            if (success) toast.success(success);
        },
        onError: (e) => toast.error(errMsg(e)),
    });
}

export const useSaveCategory = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (c) => (c.id ? adminApi.updateCategory(c) : adminApi.createCategory(c)),
        onSuccess: (_, c) => {
            qc.invalidateQueries({ queryKey: ["admin", "categories"] });
            toast.success(c.id ? "Category updated" : "Category created");
        },
        onError: (e) => toast.error(errMsg(e)),
    });
};
export const useDeleteCategory = () => useAdminMutation(adminApi.deleteCategory, { invalidate: [["admin", "categories"]], success: "Category deleted" });
export const useAdjustStock = () =>
    useAdminMutation(adminApi.adjustStock, { invalidate: [["admin", "inventory"], ["admin", "dashboard"]], success: "Stock updated" });
export const useSetFeatured = () =>
    useAdminMutation(adminApi.setFeatured, { invalidate: [["admin", "featured"], ["admin", "product-search"], ["products"]] });
export const useUpdateMe = () => useAdminMutation(adminApi.updateMe, { invalidate: [["admin", "me"]], success: "Profile saved" });
export const useChangePassword = () => useAdminMutation(adminApi.changePassword, { success: "Password updated" });
