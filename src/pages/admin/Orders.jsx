import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { getErrorMessage } from "../../api/client";
import StatusBadge from "../../components/orders/StatusBadge";
import { useAdminOrders } from "../../queries/adminOrders";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatDate, formatPrice } from "../../lib/format";

const PAGE_SIZE = 10;
const COLUMNS = 8;
const STATUSES = ["Pending", "Confirmed", "Processing", "Completed", "Cancelled"];

function SkeletonRows() {
    return Array.from({ length: 5 }, (_, i) => (
        <tr key={i} className="animate-pulse border-b border-gray-200 last:border-0">
            <td colSpan={COLUMNS} className="px-4 py-4">
                <div className="h-10 rounded-md bg-gray-100" />
            </td>
        </tr>
    ));
}

export default function Orders() {
    useDocumentTitle("Orders");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const { data, isPending, error, isPlaceholderData } = useAdminOrders({
        page,
        pageSize: PAGE_SIZE,
        status: status || undefined,
    });

    const orders = data?.orders ?? [];
    const totalResults = data?.totalResults ?? 0;
    const totalPages = data ? Math.max(1, Math.ceil(data.totalResults / data.pageSize)) : 1;

    const errorMessage = error ? getErrorMessage(error) : null;

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setPage(1);
    };

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-heading">Orders</h1>
                    <p className="text-sm text-neutral-500">{isPending ? "Loading…" : `${totalResults} orders`}</p>
                </div>
            </div>

            <div className="mb-4 max-w-sm">
                <select
                    value={status}
                    onChange={handleStatusChange}
                    aria-label="Filter orders by status"
                    className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-accent-100 focus:ring-2 focus:ring-accent-100/20 focus:outline-none"
                >
                    <option value="">All statuses</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            {errorMessage && (
                <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                    {errorMessage}
                </p>
            )}

            <div className="overflow-x-auto rounded-md border border-gray-300 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-300 bg-gray-50 text-neutral-600">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Order</th>
                            <th className="px-4 py-3 font-semibold">Customer</th>
                            <th className="px-4 py-3 font-semibold">Date</th>
                            <th className="px-4 py-3 font-semibold">Items</th>
                            <th className="px-4 py-3 font-semibold">Total</th>
                            <th className="px-4 py-3 font-semibold">Status</th>
                            <th className="px-4 py-3 font-semibold">Payment</th>
                            <th className="px-4 py-3 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className={isPlaceholderData ? "opacity-60" : ""}>
                        {isPending && <SkeletonRows />}

                        {!isPending && !isPlaceholderData && orders.length === 0 && (
                            <tr>
                                <td colSpan={COLUMNS} className="px-4 py-10 text-center text-neutral-500">
                                    {status ? `No ${status.toLowerCase()} orders found.` : "No orders found."}
                                </td>
                            </tr>
                        )}

                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-200 last:border-0">
                                <td className="whitespace-nowrap px-4 py-3 font-semibold text-heading">
                                    {order.orderNumber}
                                </td>
                                <td className="px-4 py-3 text-neutral-600">{order.customerName}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                                    {formatDate(order.orderDate)}
                                </td>
                                <td className="px-4 py-3 text-neutral-700">{order.itemCount}</td>
                                <td className="whitespace-nowrap px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                                <td className="px-4 py-3">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-4 py-3">
                                    <StatusBadge status={order.paymentStatus} />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-1">
                                        <Link
                                            to={`/admin/orders/${order.id}`}
                                            aria-label={`View order ${order.orderNumber}`}
                                            className="rounded-md p-2 text-neutral-600 hover:bg-gray-100"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
                <span>Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                    <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}