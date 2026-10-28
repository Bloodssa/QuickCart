import { api } from "./client";

export const getProducts = async (params, signal) => {
    const { data } = await api.get("/products", {
        params,
        signal,
    });

    return data;
};

export const getProductById = async (id, signal) => {
    const { data } = await api.get(`/products/${id}`, { signal });
    return data;
};

// multipart for images upload of the product
function toFormData({
    name,
    description,
    price,
    stockQuantity,
    categoryId,
    isFeatured,
    images = []
}) {
    const form = new FormData();
    form.append("name", name);
    form.append("description", description ?? "");
    form.append("price", String(price));
    form.append("stockQuantity", String(stockQuantity));
    form.append("categoryId", String(categoryId));
    form.append("isFeatured", String(Boolean(isFeatured)));   // always send it: a missing key reads as false
    images.forEach((file) => form.append("images", file));
    return form;
}

export const createProduct = async (values) => {
    const { data } = await api.post("/products", toFormData(values));
    return data;
};

export const updateProduct = async (id, values) => {
    const { data } = await api.put(
        `/products/${id}`,
        toFormData(values)
    );

    return data;
};

export const adjustProductStock = async ({ id, delta }) => {
    const { data } = await api.patch(`/products/${id}/stock`, { delta });
    return data;
};

export const getStockSummary = async (signal) => {
    const { data } = await api.get("/products/stock-summary", { signal });
    return data;
};

export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const deleteProductImage = (productId, imageId) => api.delete(`/products/${productId}/images/${imageId}`);
export const setDefaultProductImage = (productId, imageId) => api.put(`/products/${productId}/images/${imageId}/default`);