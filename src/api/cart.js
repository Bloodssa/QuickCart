import { api } from "./client";

export const getCart = async (signal) => {
    const { data } = await api.get("/cart", { signal });
    return data;
};

export const addToCart = async ({productId, quantity}) => {
    const { data } = await api.post("/cart/items", { productId, quantity });
    return data;
}

export const updateCartItem = async ({ itemId, quantity }) => {
    const { data } = await api.patch(`/cart/items/${itemId}`, { quantity });
    return data;
}

export const removeCartItem = async (itemId) => {
    const { data } = await api.delete(`/cart/items/${itemId}`);
    return data;
}

// delete all cart items
// unused or test
export const removeCartItems = async () => {
    const { data } = await api.delete("/cart/items");
    return data;
}