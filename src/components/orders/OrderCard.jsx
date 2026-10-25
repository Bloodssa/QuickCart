import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate, formatPrice } from "../../lib/format";

const AUTO_COLLAPSE_AFTER = 1; // collapse if 2 or more prod

export default function OrderCard({ order }) {
    const items = order.items ?? [];
    const [open, setOpen] = useState(items.length <= AUTO_COLLAPSE_AFTER);
    const listId = useId();

    return (
        <li className="rounded-md border border-gray-300 bg-white transition-colors hover:border-accent-100">
            {/* header */}
            <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <Link
                        to={`/orders/${order.id}`}
                        className="block truncate font-semibold text-heading hover:text-accent-100"
                    >
                        Order {order.orderNumber}
                    </Link>
                    <p className="mt-0.5 text-xs text-neutral-500">{formatDate(order.orderDate)}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">Order</span>
                        <StatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">Payment</span>
                        <StatusBadge status={order.paymentStatus} />
                    </div>
                </div>
            </div>

            {/* products collapsable */}
            {items.length > 0 && (
                <div className="border-b border-gray-200">
                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        className="flex w-full items-center justify-between px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-100"
                    >
                        <span>Products ({items.length})</span>
                        <ChevronDown size={18} className={`text-neutral-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    </button>

                    <ul id={listId} hidden={!open} className="divide-y divide-gray-100 px-5 pb-2">
                        {items.map((item) => (
                            <li key={item.productId} className="flex items-center gap-3 py-3">
                                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-300">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            className="h-full w-full object-contain p-1"
                                        />
                                    ) : (
                                        <span className="text-[10px] text-neutral-500">No image</span>
                                    )}
                                </div>
                                <p className="min-w-0 flex-1 line-clamp-2 text-sm font-medium text-heading">
                                    {item.productName}
                                </p>
                                <span className="shrink-0 text-sm text-neutral-500">x{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* footer */}
            <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                    <p className="text-xs text-neutral-500">
                        {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-heading">{formatPrice(order.total)}</p>
                </div>

                <Link to={`/orders/${order.id}`} className="group flex items-center gap-1 text-sm font-semibold text-neutral-500 transition-colors hover:text-accent-100">
                    View details
                    <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </li>
    );
}