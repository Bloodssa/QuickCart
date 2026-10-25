import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdminOrders, getAdminOrder } from "../api/adminOrders";

export const adminOrderKeys = {
    all: ["admin-orders"],
    lists: () => [...adminOrderKeys.all, "list"],
    list: (params) => [...adminOrderKeys.lists(), params],
    detail: (id) => [...adminOrderKeys.all, "detail", String(id)],
};

export const useAdminOrders = (params = {}) =>
    useQuery({
        queryKey: adminOrderKeys.list(params),
        queryFn: ({ signal }) => getAdminOrders(params, signal),
        placeholderData: keepPreviousData,
    });

export const useAdminOrder = (id) =>
    useQuery({
        queryKey: adminOrderKeys.detail(id),
        queryFn: ({ signal }) => getAdminOrder(id, signal),
        enabled: Boolean(id),
    });