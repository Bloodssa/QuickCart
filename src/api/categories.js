import { api } from "./client";

export const getCategories = async (signal) => {
    const { data } = await api.get("/categories", { signal });
    return data;
};