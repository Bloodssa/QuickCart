import { useState } from "react";
import { Package } from "lucide-react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../api/client";
import Skeleton from "../ui/Skeleton";
import OrderCard from "../orders/OrderCard";
import { useMyOrders } from "../../queries/orders";

const PAGE_SIZE = 5;

export default function OrdersSection({ label, emptyMessage, status }) {
    const [page, setPage] = useState(1);

    const { data, isPending, isPlaceholderData, error, refetch } = useMyOrders({
        status,
        page,
        pageSize: PAGE_SIZE,
    });

    const orders = data?.orders ?? [];
    const totalPages = Math.max(1, Math.ceil((data?.totalResults ?? 0) / PAGE_SIZE));

    return (
        <div className="p-5 md:p-6">
            <h2 className="text-lg font-bold text-neutral-900">{label}</h2>

            {/* loading */}
            {isPending && (
                <div role="status" className="mt-5 space-y-4">
                    <span className="sr-only">Loading your orders…</span>
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
            )}

            {/* error */}
            {error && (
                <div role="alert" className="mt-5 rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {getErrorMessage(error)}{" "}
                    <button type="button" onClick={() => refetch()} className="font-semibold underline">
                        Try again
                    </button>
                </div>
            )}

            {/* empty */}
            {!isPending && !error && orders.length === 0 && (
                <div className="mt-5 flex flex-col items-center gap-3 rounded-md border border-gray-300 py-14 text-center">
                    <Package size={32} aria-hidden="true" className="text-neutral-500" />
                    <p className="text-sm text-neutral-500">{emptyMessage}</p>
                    <Link
                        to="/products"
                        className="rounded-md bg-accent-100 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                    >
                        Start shopping
                    </Link>
                </div>
            )}

            {/* list */}
            {orders.length > 0 && (
                <ul className={`mt-5 space-y-4 transition-opacity ${isPlaceholderData ? "opacity-60" : ""}`}>
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </ul>
            )}

            {/* pagination */}
            {totalPages > 1 && (
                <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-neutral-500">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        type="button"
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}