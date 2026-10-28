import { api } from "./client";

export const getCategories = async (signal) => {
    const { data } = await api.get("/categories", { signal });
    return data;
};

export const createCategory = async (values) => {
    const { data } = await api.post("/categories", values);
    return data;
};

export const updateCategory = async ({ id, ...values }) => {
    const { data } = await api.put(`/categories/${id}`, values);
    return data;
};

export const deleteCategory = (id) => api.delete(`/categories/${id}`);