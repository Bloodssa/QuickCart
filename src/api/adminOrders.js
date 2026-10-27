import { api } from "./client";

export const getAdminOrders = async (params, signal) => {
    const { data } = await api.get("/admin/orders", { params, signal });
    return data;
};

export const getAdminOrder = async (id, signal) => {
    const { data } = await api.get(`/admin/orders/${id}`, { signal });
    return data;
};

export const updateAdminOrderStatus = async (id, status, paymentStatus,) => {
    const { data } = await api.put(
        `/admin/orders/${id}/status`,
        {
            status,
            paymentStatus,
        },
    );

    return data;
};