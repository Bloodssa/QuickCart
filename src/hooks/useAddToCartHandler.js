import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "../api/client";
import { useAddToCart } from "../queries/cart";
import { useAuth } from "./useAuth";

export function useAddToCartHandler() {
    const { status } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { mutate } = useAddToCart();

    return useCallback(
        (productId, quantity = 1) => {
            if (status === "loading") return;

            if (status !== "authenticated") {
                navigate("/login", { state: { from: location } });
                return;
            }

            mutate(
                {productId, quantity},
                {
                    onSuccess: () => toast.success("Added to cart"),
                    onError: (error) => toast.error(getErrorMessage(error))
                }
            );
        },
        [status, navigate, location, mutate]
    );
}