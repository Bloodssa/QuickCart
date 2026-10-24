import { api } from "./client";

export const getAddresses = async (signal) => {
    const { data } = await api.get("/address", { signal });
    return data;
};

export const getAddressById = async (id, signal) => {
    const { data } = await api.get(`/address/${id}`, { signal });
    return data;
};

export const createAddress = async (payload) => {
    const { data } = await api.post("/address", payload);
    return data;
}

export const updateAddress = async ({ id, payload }) => {
    const { data } = await api.put(`/address/${id}`, payload);
    return data;
}

export const deleteAddress = async (id) => await api.delete(`/address/${id}`);
export const setDefaultAddress = async (id) => await api.patch(`/address/${id}/default`);