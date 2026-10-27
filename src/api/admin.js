import { api, unwrap } from "./client";
import { mockAdminApi } from "./mock/adminMock";

const realAdminApi = {
    dashboard: () => unwrap(api.get("/admin/dashboard")),

    categories: (params) => unwrap(api.get("/admin/categories", { params })),
    createCategory: (body) => unwrap(api.post("/admin/categories", body)),
    updateCategory: ({ id, ...body }) => unwrap(api.put(`/admin/categories/${id}`, body)),
    deleteCategory: (id) => unwrap(api.delete(`/admin/categories/${id}`)),

    inventory: (params) => unwrap(api.get("/admin/inventory", { params })),
    adjustStock: ({ productId, delta, reason }) =>
        unwrap(api.post(`/admin/inventory/${productId}/adjust`, { delta, reason })),

    customers: (params) => unwrap(api.get("/admin/customers", { params })),
    customer: (id) => unwrap(api.get(`/admin/customers/${id}`)),

    featured: () => unwrap(api.get("/products", { params: { isFeatured: true, pageSize: 24 } })),
    searchProducts: (q) => unwrap(api.get("/products", { params: { search: q, pageSize: 8 } })),
    setFeatured: ({ id, isFeatured }) => unwrap(api.patch(`/admin/products/${id}/featured`, { isFeatured })),

    salesReport: (params) => unwrap(api.get("/admin/reports/sales", { params })),

    me: () => unwrap(api.get("/me")),
    updateMe: (body) => unwrap(api.put("/me", body)),
    changePassword: (body) => unwrap(api.post("/me/password", body)),
};

export const adminApi = import.meta.env.VITE_USE_MOCK === "true" ? mockAdminApi : realAdminApi;