import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, updateCartItem, removeCartItem } from "../api/cart";
import { useAuth } from "../hooks/useAuth";

export const cartKeys = { all: ["cart"] };

const cartQueryOptions = queryOptions({
    queryKey: cartKeys.all,
    queryFn: ({ signal }) => getCart(signal)
});

// autth status checker if user is auth dont let unauth user to add to cart
function useCartEnabled() {
    const { status } = useAuth();
    return status === "authenticated";
}

export function useCart() {
    const enabled = useCartEnabled();
    return useQuery({ ...cartQueryOptions, enabled });
}

export function useCartCount() {
    const enabled = useCartEnabled();
    return useQuery({ ...cartQueryOptions, enabled, select: (cart) => cart.totalItems });
}

function useCartMutation(mutationFn) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (cart) => queryClient.setQueryData(cartKeys.all, cart)
    });
}

export const useAddToCart = () => useCartMutation(addToCart);
export const useUpdateCartItem = () => useCartMutation(updateCartItem);

export function useRemoveCartItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId) => removeCartItem(itemId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
    });
}