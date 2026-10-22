import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "../../api/client";
import { useAuth } from "../../hooks/useAuth";
import { formatPrice } from "../../lib/format";
import { useAddToCart } from "../../queries/cart";
import QuantityStepper from "../cart/QuantityStepper";
import ProductDescription from "./ProductDescription";

const MAX_PER_ITEM = 99;
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-100";

export default function ProductInfo({
    id,
    name,
    categoryName,
    price,
    stockQuantity,
    description
}) {
    const { status } = useAuth(); // check for user is authenticated
    const navigate = useNavigate();
    const location = useLocation();
    const addToCart = useAddToCart();
    const [quantity, setQuantity] = useState(1);

    const inStock = stockQuantity > 0;
    const lowStock = inStock && stockQuantity <= 10;
    const maxQuantity = Math.min(stockQuantity, MAX_PER_ITEM);
    const safeQuantity = Math.min(Math.max(quantity, 1), Math.max(maxQuantity, 1));

    function handleAddToCart() {
        if (status === "loading") return;

        if (status !== "authenticated") {
            toast.info("Please log in to add items to your cart.");
            navigate("/login", { state: { from: location } });
            return;
        }

        addToCart.mutate(
            { productId: id, quantity: safeQuantity },
            {
                onSuccess: () => toast.success(`${name} added to cart`),
                onError: (err) => toast.error(getErrorMessage(err)),
            },
        );
    }

    return (
        <div className="min-w-0">
            {categoryName && (
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{categoryName}</span>
            )}

            <h1 className="mt-3 text-3xl leading-tight font-bold text-heading">{name}</h1>
            <p className="mt-5 border-t border-gray-200 pt-5 text-3xl font-bold text-heading">
                {formatPrice(price)}
            </p>
            <p role="status" className={`mt-2 text-sm ${inStock && !lowStock ? "text-green-600" : "font-semibold text-red-500"}`}>
                {!inStock? "Out of stock" : lowStock
                        ? `Only ${stockQuantity} left. Don't miss it`
                        : `In stock (${stockQuantity} available)`}
            </p>

            <div className="mt-6 border-t border-gray-200 pt-6">
                {inStock && (
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-heading">Quantity</span>
                        <QuantityStepper
                            value={safeQuantity}
                            max={maxQuantity}
                            disabled={addToCart.isPending}
                            onChange={setQuantity}
                        />
                    </div>
                )}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={!inStock || addToCart.isPending}
                        aria-busy={addToCart.isPending}
                        className={`flex h-11 items-center justify-center gap-2 rounded-md bg-accent-100 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover active:bg-accent-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 ${focusRing}`}
                    >
                        <ShoppingCart size={16} aria-hidden="true" />
                        {addToCart.isPending ? "Adding…" : "Add to cart"}
                    </button>

                    {/* TODO: enable when the order endpoint implemented */}
                    <button
                        type="button"
                        disabled
                        className="h-11 rounded-md border border-gray-300 px-6 text-sm font-semibold text-heading opacity-60 disabled:cursor-not-allowed"
                    >
                        Order now
                    </button>
                </div>
            </div>

            <ProductDescription description={description} />
        </div>
    );
}