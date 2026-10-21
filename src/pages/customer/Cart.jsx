import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "../../api/client";
import CartItemRow from "../../components/cart/CartItemRow";
import CartSummary from "../../components/cart/CartSummary";
import Skeleton from "../../components/ui/Skeleton";
import HomeLayout from "../../layouts/HomeLayout";
import { useCart, useRemoveCartItem, useUpdateCartItem } from "../../queries/cart";

const Cart = () => {
    const { data: cart, isPending, error, refetch } = useCart();

    const updateItem = useUpdateCartItem();
    const removeItem = useRemoveCartItem();

    const busy = updateItem.isPending || removeItem.isPending;

    function handleQuantityChange(item, quantity) {
        updateItem.mutate(
            { itemId: item.id, quantity },
            { onError: (err) => toast.error(getErrorMessage(err)) }
        );
    }

    function handleRemove(item) {
        removeItem.mutate(item.id, {
            onSuccess: () => toast.success(`${item.productName} removed`),
            onError: (err) => toast.error(getErrorMessage(err)),
        });
    }

    return (
        <HomeLayout>
            <h1 className="text-3xl font-bold text-heading">
                Shopping cart
            </h1>

            {/* Skeleton loader */}
            {isPending && (
                <div role="status" className="mt-6 space-y-4">
                    <span className="sr-only">Loading your cart…</span>
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </div>
            )}

            {/* req failed to reach server */}
            {error && (
                <div role="alert" className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {getErrorMessage(error)}{" "}
                    <button type="button" onClick={() => refetch()} className="font-semibold underline">
                        Try again
                    </button>
                </div>
            )}

            {/* empty state */}
            {cart && cart.items.length === 0 && (
                <div className="mt-10 flex flex-col items-center gap-3 rounded-md border border-dashed border-gray-300 py-16 text-center">
                    <ShoppingCart size={36} aria-hidden="true" className="text-neutral-300" />
                    <p className="font-semibold text-heading">Your cart is empty</p>
                    <Link to="/products" className="rounded-md bg-accent-100 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover">
                        Start shopping
                    </Link>
                </div>
            )}

            {cart && cart.items.length > 0 && (
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                    <ul className="divide-y divide-gray-200 rounded-md border border-gray-300 bg-white px-5">
                        {cart.items.map((item) => (
                            <CartItemRow
                                key={item.id}
                                item={item}
                                busy={busy}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                            />
                        ))}
                    </ul>

                    <CartSummary totalItems={cart.totalItems} subTotal={cart.subTotal} />
                </div>
            )}
        </HomeLayout>
    );
};

export default Cart;