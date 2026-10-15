import { api, unwrap } from "./api";

export const getProducts = async (params, signal) => {
    const { data } = await api.get('/products', { params, signal });
    return data;
};

export const getProductById = async (id, signal) => {
    const { data } = await api.get(`/products/${id}`, { signal });

    return data;
};