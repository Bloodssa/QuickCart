import { api } from "./client";

export const getProducts = async (params, signal) => {
    const { data } = await api.get("/api/products", {
        params,
        signal,
    });

    return data;
};

export const getProductById = async (id, signal) => {
    const { data } = await api.get(`/api/products/${id}`, { signal });
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
    const { data } = await api.post("/api/products", toFormData(values));
    return data;
};

export const updateProduct = async (id, values) => {
    const { data } = await api.put(
        `/api/products/${id}`,
        toFormData(values)
    );

    return data;
};

export const deleteProduct = (id) => api.delete(`/api/products/${id}`);
export const deleteProductImage = (productId, imageId) => api.delete(`/api/products/${productId}/images/${imageId}`);
export const setDefaultProductImage = (productId, imageId) => api.put(`/api/products/${productId}/images/${imageId}/default`);