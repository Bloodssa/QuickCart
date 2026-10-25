import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getErrorMessage } from "../../api/client";
import Skeleton from "../../components/ui/Skeleton";
import StatusBadge from "../../components/orders/StatusBadge";
import { useAdminOrder } from "../../queries/adminOrders";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatDate, formatPrice } from "../../lib/format";

export default function AdminOrderDetails() {
    const { id } = useParams();
    const { data: order, isPending, error } = useAdminOrder(id);

    useDocumentTitle(order ? `Order ${order.orderNumber}` : "Order");

    const backLink = (
        <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-accent-100"
        >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to orders
        </Link>
    );

    if (isPending) {
        return (
            <div role="status" className="space-y-4">
                <span className="sr-only">Loading order…</span>
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-48" />
                <Skeleton className="h-32" />
            </div>
        );
    }

    if (error || !order) {
        return (
            <>
                {backLink}
                <div role="alert" className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {error ? getErrorMessage(error) : "Order not found."}
                </div>
            </>
        );
    }

    const { address, payment } = order;

    return (
        <>
            {backLink}

            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Order {order.orderNumber}</h1>
                    <p className="mt-1 text-sm text-neutral-500">Placed on {formatDate(order.orderDate)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">Order</span>
                        <StatusBadge status={order.status} />
                    </div>
                    {payment && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-500">Payment</span>
                            <StatusBadge status={payment.paymentStatus} />
                        </div>
                    )}
                </div>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
                {/* items */}
                <section className="rounded-md border border-gray-300 bg-white px-5">
                    <h2 className="border-b border-gray-200 py-4 font-bold text-neutral-900">
                        Items ({order.items.length})
                    </h2>
                    <ul className="divide-y divide-gray-200">
                        {order.items.map((item) => (
                            <li key={item.productId} className="flex gap-4 py-4">
                                <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-300">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.productName} className="h-full w-full object-contain p-1" />
                                    ) : (
                                        <span className="text-xs text-neutral-500">No image</span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 font-semibold text-neutral-900">{item.productName}</p>
                                    <p className="mt-0.5 text-sm text-neutral-500">
                                        {formatPrice(item.unitPrice)} x {item.quantity}
                                    </p>
                                </div>
                                <p className="shrink-0 font-bold text-neutral-900">{formatPrice(item.subTotal)}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <div className="space-y-6">
                    {/* customer + address */}
                    <section className="rounded-md border border-gray-300 bg-white p-5">
                        <h2 className="font-bold text-neutral-900">Customer</h2>
                        <p className="mt-3 text-sm font-semibold text-neutral-900">{order.customerName}</p>

                        <h3 className="mt-4 text-sm font-semibold text-neutral-900">Delivery address</h3>
                        <p className="mt-1 text-sm text-neutral-700">{address.recipientName}</p>
                        <p className="text-sm text-neutral-500">{address.contactNumber}</p>
                        <p className="mt-1 text-sm text-neutral-500">
                            {address.addressLine}, {address.barangay}, {address.city}, {address.province} {address.postalCode}
                        </p>
                    </section>

                    {/* payment */}
                    {payment && (
                        <section className="rounded-md border border-gray-300 bg-white p-5">
                            <h2 className="font-bold text-neutral-900">Payment</h2>
                            <dl className="mt-3 space-y-2 text-sm">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-neutral-500">Method</dt>
                                    <dd className="font-medium">{payment.paymentMethod}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-neutral-500">Amount</dt>
                                    <dd className="font-medium">{formatPrice(payment.amount)}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-neutral-500">Date</dt>
                                    <dd className="font-medium">{formatDate(payment.transactionDate)}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-neutral-500">Reference</dt>
                                    <dd className="break-all text-right text-xs font-medium">{payment.transactionReference}</dd>
                                </div>
                            </dl>
                        </section>
                    )}

                    {/* summary */}
                    <section className="rounded-md border border-gray-300 bg-white p-5">
                        <h2 className="font-bold text-neutral-900">Order Summary</h2>
                        <dl className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-neutral-500">Subtotal</dt>
                                <dd className="font-medium">{formatPrice(order.subTotal)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-neutral-500">Shipping</dt>
                                <dd className="font-medium">
                                    {order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}
                                </dd>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-3 text-base">
                                <dt className="font-semibold">Total</dt>
                                <dd className="font-bold text-neutral-900">{formatPrice(order.total)}</dd>
                            </div>
                        </dl>
                    </section>
                </div>
            </div>
        </>
    );
}