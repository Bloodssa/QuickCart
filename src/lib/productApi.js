import { api } from "./api";

export const getProducts = async (params, signal) => {
    const { data } = await api.get('/api/products', { params, signal });
    return data;
};

export const getProductById = async (id, signal) => {
    const { data } = await api.get(`/api/products/${id}`, { signal });
    return data;
};