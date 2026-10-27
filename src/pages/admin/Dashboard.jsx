// MOCK
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatPrice } from "../../lib/format";
import { Card, ErrorState, ORDER_STATUS_TONE, PageHeader, Pill, StatCard, Th, primaryBtn, tdCls } from "../../components/admin/ui";
import { useDashboard } from "../../queries/admin";

const STATUSES = ["Pending", "Confirmed", "Processing", "Completed", "Cancelled"];

function DayBars({ days = [] }) {
    const max = Math.max(1, ...days.map((d) => d.count));
    return (
        <div>
            <div className="flex h-44 items-end gap-3 border-b border-gray-300 px-1">
                {days.map((d, i) => (
                    <div key={d.date} title={`${d.count} orders`} style={{ height: `${(d.count / max) * 100}%` }}
                        className={`min-h-1 flex-1 rounded-t ${i === days.length - 1 ? "bg-accent-300" : "bg-accent-200/60"}`} />
                ))}
            </div>
            <div className="mt-2 flex gap-3 px-1 text-xs text-gray-600">
                {days.map((d) => (
                    <span key={d.date} className="flex-1 text-center">{new Date(d.date).toLocaleDateString("en-PH", { weekday: "short" })}</span>
                ))}
            </div>
        </div>
    );
}

export default function Dashboard() {
    useDocumentTitle("Dashboard");
    const { data: d, isPending, isError, refetch } = useDashboard();

    if (isError) return <ErrorState onRetry={refetch} />;
    const change = d?.revenueChangePct;

    return (
        <div className="flex flex-col gap-6">
            <div className="w-full h-15 bg-accent-100 rounded-md flex justify-center items-center text-white font-medium">
                NOTE: MOCK DATA
            </div>
            <PageHeader
                title="Dashboard"
                subtitle="What needs your attention today."
                action={<Link to="/admin/orders?status=Pending" className={primaryBtn}>Review pending orders</Link>}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Pending orders" value={d?.pendingOrders} hint={d?.staleOrders ? `${d.staleOrders} older than 24 hours` : "All recent"} loading={isPending} />
                <StatCard label="Paid revenue, 30 days" value={d && formatPrice(d.revenue30d)}
                    hint={change != null ? `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs previous 30 days` : undefined} loading={isPending} />
                <StatCard label="Low or out of stock" value={d?.lowStockCount} loading={isPending}
                    hint={<Link to="/admin/inventory" className="font-semibold text-accent-300 hover:underline">Open inventory</Link>} />
                <StatCard label="New customers, 7 days" value={d?.newCustomers7d} hint={d && `${d.totalCustomers} total`} loading={isPending} />
            </div>

            <div className="flex flex-wrap items-stretch gap-4">
                <Card className="min-w-0 flex-[2_1_420px] p-5">
                    <h2 className="mb-5 text-base font-bold">Orders, last 7 days</h2>
                    <DayBars days={d?.ordersByDay} />
                </Card>
                <Card className="min-w-0 flex-[1_1_280px] p-5">
                    <h2 className="mb-4 text-base font-bold">Orders by status</h2>
                    <ul className="space-y-3 text-sm">
                        {STATUSES.map((s) => (
                            <li key={s} className="flex justify-between"><span>{s}</span><b>{d?.ordersByStatus?.[s] ?? 0}</b></li>
                        ))}
                    </ul>
                </Card>
            </div>

            <div className="flex flex-wrap items-start gap-4">
                <Card className="min-w-0 flex-[2_1_420px] overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4">
                        <h2 className="text-base font-bold">Recent orders</h2>
                        <Link to="/admin/orders" className="text-sm font-semibold text-accent-300 hover:underline">View all</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-130 border-collapse">
                            <thead><tr><Th>Order</Th><Th>Customer</Th><Th>Total</Th><Th>Status</Th></tr></thead>
                            <tbody>
                                {(d?.recentOrders ?? []).map((o) => (
                                    <tr key={o.id}>
                                        <td className={tdCls}><Link to={`/admin/orders/${o.id}`} className="font-semibold hover:underline">{o.orderNumber}</Link></td>
                                        <td className={tdCls}>{o.customerName}</td>
                                        <td className={tdCls}>{formatPrice(o.total)}</td>
                                        <td className={tdCls}><Pill tone={ORDER_STATUS_TONE[o.status]}>{o.status}</Pill></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <Card className="min-w-0 flex-[1_1_280px] p-5">
                    <h2 className="mb-4 text-base font-bold">Restock soon</h2>
                    <ul className="space-y-3 text-sm">
                        {(d?.restock ?? []).map((p) => (
                            <li key={p.id} className="flex justify-between gap-2">
                                <span>{p.name}</span>
                                <b className={p.stock === 0 ? "text-red-700" : "text-yellow-800"}>{p.stock} left</b>
                            </li>
                        ))}
                    </ul>
                    <Link to="/admin/inventory" className="mt-4 inline-block text-sm font-semibold text-accent-300 hover:underline">Adjust stock</Link>
                </Card>
            </div>
        </div>
    );
}
