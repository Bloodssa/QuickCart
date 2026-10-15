import { api } from "./api";

export const getCategories = async (signal) => {
    const { data } = await api.get("/api/categories", { signal });
    return data;
};