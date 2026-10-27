// MOCK
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Card, EmptyState, ErrorState, PageHeader, Pagination, Pill, StatCard, TableSkeleton, Th, inputCls, smallBtn, tdCls } from "../../components/admin/ui";
import { useAdjustStock, useInventory } from "../../queries/admin";

const PAGE_SIZE = 10;
const FILTERS = [
    { value: "all", label: "All" },
    { value: "low", label: "Low stock" },
    { value: "out", label: "Out of stock" },
];

function stockPill(stock, threshold) {
    if (stock <= 0) return <Pill tone="red">Out of stock</Pill>;
    if (stock <= threshold) return <Pill tone="yellow">Low stock</Pill>;
    return <Pill tone="green">In stock</Pill>;
}

function AdjustCell({ product }) {
    const [delta, setDelta] = useState(0);
    const adjust = useAdjustStock();
    const next = product.stock + delta;
    const canApply = delta !== 0 && next >= 0 && !adjust.isPending;

    return (
        <div className="flex items-center justify-end gap-1.5">
            <button type="button" className={smallBtn} aria-label={`Decrease ${product.name}`} onClick={() => setDelta((d) => d - 1)}><Minus size={14} aria-hidden="true" /></button>
            <input type="number" min="0" value={delta} onChange={(e) => setDelta(Number.parseInt(e.target.value, 10) || 0)}
                aria-label={`Stock change for ${product.name}`} className="h-9 w-16 rounded-md border border-gray-300 px-2 text-center text-sm" />
            <button type="button" className={smallBtn} aria-label={`Increase ${product.name}`} onClick={() => setDelta((d) => d + 1)}><Plus size={14} aria-hidden="true" /></button>
            <button type="button" disabled={!canApply}
                onClick={() => adjust.mutate({ productId: product.id, delta, reason: "Manual adjustment" }, { onSuccess: () => setDelta(0) })}
                className="inline-flex h-9 items-center rounded-md bg-accent-300 px-3 text-xs font-semibold text-white hover:bg-accent-hover disabled:opacity-50">
                {adjust.isPending ? "Saving…" : "Apply"}
            </button>
        </div>
    );
}

export default function Inventory() {
    useDocumentTitle("Inventory");
    const [q, setQ] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);

    const { data, isPending, isError, refetch } = useInventory({ search: q || undefined, filter, page, pageSize: PAGE_SIZE });
    const items = data?.items ?? [];
    const totalPages = Math.max(1, Math.ceil((data?.totalResults ?? 0) / PAGE_SIZE));
    const threshold = data?.lowStockThreshold ?? 10;

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full h-15 bg-accent-100 rounded-md flex justify-center items-center text-white font-medium">
                NOTE: MOCK DATA
            </div>
            <PageHeader title="Inventory" subtitle="Adjust stock by an amount so two admins never overwrite each other." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total units" value={data?.summary?.totalUnits?.toLocaleString()} loading={isPending} />
                <StatCard label={`Low stock (${threshold} or fewer)`} value={data?.summary?.lowCount} loading={isPending} />
                <StatCard label="Out of stock" value={data?.summary?.outCount} loading={isPending} />
            </div>

            <Card className="overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 p-4">
                    <label htmlFor="inv-q" className="sr-only">Search products</label>
                    <input id="inv-q" type="search" placeholder="Search product" value={q}
                        onChange={(e) => { setQ(e.target.value); setPage(1); }} className={`${inputCls} max-w-xs flex-1`} />
                    {FILTERS.map((f) => (
                        <button key={f.value} type="button" aria-pressed={filter === f.value}
                            onClick={() => { setFilter(f.value); setPage(1); }}
                            className={`h-9 rounded-full border px-4 text-xs font-semibold ${filter === f.value ? "border-accent-300 bg-accent-50 text-accent-300" : "border-gray-300 hover:bg-gray-50"}`}>
                            {f.label}
                        </button>
                    ))}
                </div>
                {isPending ? <TableSkeleton /> : isError ? <ErrorState onRetry={refetch} /> : items.length === 0 ? (
                    <EmptyState title="No products found" message="Try a different search or filter." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-180 border-collapse">
                            <thead><tr><Th>Product</Th><Th>Category</Th><Th>In stock</Th><Th>Status</Th><Th align="right">Adjust stock</Th></tr></thead>
                            <tbody>
                                {items.map((p) => (
                                    <tr key={p.id}>
                                        <td className={`${tdCls} font-semibold`}>{p.name}</td>
                                        <td className={`${tdCls} text-gray-600`}>{p.categoryName}</td>
                                        <td className={`${tdCls} font-bold`}>{p.stock}</td>
                                        <td className={tdCls}>{stockPill(p.stock, threshold)}</td>
                                        <td className={tdCls}><AdjustCell product={p} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </Card>
        </div>
    );
}
