// MOCK
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatDate, formatPrice } from "../../lib/format";
import { Card, EmptyState, ErrorState, ORDER_STATUS_TONE, PageHeader, Pagination, Pill, TableSkeleton, Th, inputCls, tdCls } from "../../components/admin/ui";
import { useCustomer, useCustomers } from "../../queries/admin";

const PAGE_SIZE = 10;

function CustomerPanel({ id }) {
    const { data: c, isPending, isError, refetch } = useCustomer(id);
    if (isPending) return <div className="h-64 animate-pulse rounded bg-gray-100" />;
    if (isError) return <ErrorState onRetry={refetch} />;
    return (
        <div className="flex flex-col gap-4 p-5">
            <div>
                <h2 className="text-lg font-bold">{c.fullName}</h2>
                <p className="text-sm text-gray-600">{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md bg-gray-50 p-3"><p className="text-xs text-gray-600">Orders</p><p className="text-lg font-bold">{c.orderCount}</p></div>
                <div className="rounded-md bg-gray-50 p-3"><p className="text-xs text-gray-600">Paid total</p><p className="text-lg font-bold">{formatPrice(c.totalSpent)}</p></div>
            </div>
            <div>
                <h3 className="mb-2 text-sm font-bold">Saved addresses</h3>
                {c.addresses?.length ? c.addresses.map((a) => (
                    <p key={a.id} className="mb-2 rounded-md border border-gray-300 p-2.5 text-sm text-gray-700">
                        {a.addressLine}, {a.city}{a.isDefault && <> <Pill tone="orange">Default</Pill></>}
                    </p>
                )) : <p className="text-sm text-gray-600">None</p>}
            </div>
            <div>
                <h3 className="mb-2 text-sm font-bold">Recent orders</h3>
                {c.recentOrders?.length ? c.recentOrders.map((o) => (
                    <div key={o.id} className="mb-2 flex items-center justify-between gap-2 text-sm">
                        <Link to={`/admin/orders/${o.id}`} className="font-semibold text-accent-300 hover:underline">{o.orderNumber}</Link>
                        <Pill tone={ORDER_STATUS_TONE[o.status]}>{o.status}</Pill>
                    </div>
                )) : <p className="text-sm text-gray-600">No orders yet</p>}
            </div>
        </div>
    );
}

export default function Customers() {
    useDocumentTitle("Customers");
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);

    const { data, isPending, isError, refetch } = useCustomers({ search: q || undefined, page, pageSize: PAGE_SIZE });
    const items = data?.items ?? [];
    const totalPages = Math.max(1, Math.ceil((data?.totalResults ?? 0) / PAGE_SIZE));

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full h-15 bg-accent-100 rounded-md flex justify-center items-center text-white font-medium">
                NOTE: MOCK DATA
            </div>
            <PageHeader title="Customers" subtitle="Look up a customer and their order history. Read-only." />
            <div className="flex flex-wrap items-start gap-4">
                <Card className="min-w-0 flex-[2_1_520px] overflow-hidden">
                    <div className="border-b border-gray-300 p-4">
                        <label htmlFor="cust-q" className="sr-only">Search customers</label>
                        <input id="cust-q" type="search" placeholder="Search by name or email" value={q}
                            onChange={(e) => { setQ(e.target.value); setPage(1); }} className={`${inputCls} max-w-sm`} />
                    </div>
                    {isPending ? <TableSkeleton /> : isError ? <ErrorState onRetry={refetch} /> : items.length === 0 ? (
                        <EmptyState title="No customers found" />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-150 border-collapse">
                                <thead><tr><Th>Customer</Th><Th>Orders</Th><Th>Total spent</Th><Th>Joined</Th></tr></thead>
                                <tbody>
                                    {items.map((c) => (
                                        <tr key={c.id} className={selected === c.id ? "bg-accent-50" : ""}>
                                            <td className={tdCls}>
                                                <button type="button" onClick={() => setSelected(c.id)} className="text-left">
                                                    <span className="block font-semibold hover:underline">{c.fullName}</span>
                                                    <span className="block text-xs text-gray-600">{c.email}</span>
                                                </button>
                                            </td>
                                            <td className={tdCls}>{c.orderCount}</td>
                                            <td className={tdCls}>{formatPrice(c.totalSpent)}</td>
                                            <td className={tdCls}>{formatDate(c.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                </Card>
                <Card className="min-w-0 flex-[1_1_320px]">
                    {selected ? <CustomerPanel id={selected} /> : <EmptyState title="Select a customer" message="Their details and orders appear here." />}
                </Card>
            </div>
        </div>
    );
}
