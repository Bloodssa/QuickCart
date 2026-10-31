import { api } from "./client";

export const getDashboardData = async (signal) => {
    const { data } = await api.get("/admin/dashboard", { signal });
    return data
}