import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, EmptyState, Pill, Th, tdCls } from "../admin/ui";
import { ORDER_STATUS_TONE } from "../../lib/dashboard";
import { formatPrice } from "../../lib/format";
import { age } from "../../lib/dashboard";
import { ArrowRight } from "lucide-react";

export default function NeedsActionTable({ orders = [], loading }) {
    const [now] = useState(() => Date.now());

    return (
        <Card className="overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between px-5 py-4">
                <h2 className="text-base font-bold">Needs action{orders.length ? ` (${orders.length})` : ""}</h2>
                <Link to="/admin/orders" className="group inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 transition-colors hover:text-accent-300">
                    <span>All orders</span>
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
            </div>

            {loading ? (
                <div className="mx-5 mb-5 h-32 animate-pulse rounded bg-gray-100" />
            ) : orders.length === 0 ? (
                <EmptyState title="All caught up" message="No orders are waiting for you." />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-135 border-collapse">
                        <thead>
                            <tr>
                                <Th>Order</Th>
                                <Th>Customer</Th>
                                <Th>Total</Th>
                                <Th>Status</Th>
                                <Th>Waiting</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => {
                                const wait = age(o.orderDate, now);
                                return (
                                    <tr key={o.id}>
                                        <td className={tdCls}><Link to={`/admin/orders/${o.id}`} className="font-semibold hover:underline">{o.orderNumber}</Link></td>
                                        <td className={tdCls}>{o.customerName}</td>
                                        <td className={tdCls}>{formatPrice(o.total)}</td>
                                        <td className={tdCls}><Pill tone={ORDER_STATUS_TONE[o.status]}>{o.status}</Pill></td>
                                        <td className={`${tdCls} ${wait.stale ? "font-bold text-red-600" : ""}`}>
                                            {wait.label}{wait.stale && " (overdue)"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
}