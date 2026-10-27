// MOCK
import { useMemo, useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatDate, formatPrice } from "../../lib/format";
import { Card, EmptyState, ErrorState, PageHeader, Pagination, Pill, StatCard, TableSkeleton, Th, inputCls, secondaryBtn, tdCls } from "../../components/admin/ui";
import { useSalesReport } from "../../queries/admin";

const PAGE_SIZE = 10;
const PRESETS = [
    { label: "Today", days: 0 },
    { label: "7 days", days: 6 },
    { label: "30 days", days: 29 },
];
const PAY_TONE = { Paid: "green", Pending: "yellow", Failed: "red" };

const iso = (d) => d.toISOString().slice(0, 10);
function rangeFor(days) {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - days);
    return { from: iso(from), to: iso(to) };
}

function downloadCsv(rows) {
    const head = ["Date", "Order", "Payment method", "Payment status", "Total"];
    const body = rows.map((r) => [r.date, r.orderNumber, r.paymentMethod, r.paymentStatus, r.total]);
    const csv = [head, ...body].map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "sales-report.csv" });
    a.click();
    URL.revokeObjectURL(url);
}

export default function Reports() {
    useDocumentTitle("Sales Reports");
    const [range, setRange] = useState(() => rangeFor(29));
    const [page, setPage] = useState(1);

    const params = useMemo(() => ({ ...range, page, pageSize: PAGE_SIZE }), [range, page]);
    const { data, isPending, isError, refetch } = useSalesReport(params);
    const rows = data?.transactions ?? [];
    const totalPages = Math.max(1, Math.ceil((data?.totalResults ?? 0) / PAGE_SIZE));
    const days = data?.revenueByDay ?? [];
    const max = Math.max(1, ...days.map((d) => d.revenue));
    const invalidRange = range.from > range.to;

    function setPreset(d) { setRange(rangeFor(d)); setPage(1); }
    function setDate(key, value) { setRange((r) => ({ ...r, [key]: value })); setPage(1); }

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full h-15 bg-accent-100 rounded-md flex justify-center items-center text-white font-medium">
                NOTE: MOCK DATA
            </div>
            <PageHeader title="Sales Reports" subtitle="Basic transaction records for a date range."
                action={<button type="button" className={secondaryBtn} disabled={rows.length === 0} onClick={() => downloadCsv(rows)}>Export this page (CSV)</button>} />

            <Card className="flex flex-wrap items-center gap-2 p-4">
                {PRESETS.map((p) => (
                    <button key={p.label} type="button" onClick={() => setPreset(p.days)}
                        className="h-9 rounded-full border border-gray-300 px-4 text-xs font-semibold hover:bg-gray-50">{p.label}</button>
                ))}
                <span className="flex-1" />
                <label htmlFor="r-from" className="text-sm font-semibold">From</label>
                <input id="r-from" type="date" value={range.from} max={range.to} onChange={(e) => setDate("from", e.target.value)} className={`${inputCls} w-auto`} />
                <label htmlFor="r-to" className="text-sm font-semibold">To</label>
                <input id="r-to" type="date" value={range.to} min={range.from} onChange={(e) => setDate("to", e.target.value)} className={`${inputCls} w-auto`} />
            </Card>
            {invalidRange && <p role="alert" className="text-sm text-red-600">"From" must be on or before "To".</p>}

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <StatCard label="Paid revenue" value={data && formatPrice(data.summary.paidRevenue)} loading={isPending} />
                <StatCard label="Orders" value={data?.summary.orders} loading={isPending} />
                <StatCard label="Average order" value={data && formatPrice(data.summary.averageOrder)} loading={isPending} />
                <StatCard label="Cancelled" value={data?.summary.cancelled} loading={isPending} />
            </div>

            <div className="flex flex-wrap items-start gap-4">
                <Card className="min-w-0 flex-[2_1_420px] p-5">
                    <h2 className="mb-4 text-base font-bold">Revenue per day</h2>
                    {days.length === 0 ? <p className="text-sm text-gray-600">No data in this range.</p> : (
                        <div className="flex h-44 items-end gap-1.5 border-b border-gray-300">
                            {days.map((d) => (
                                <div key={d.date} title={`${d.date}: ${formatPrice(d.revenue)}`} style={{ height: `${(d.revenue / max) * 100}%` }} className="min-h-1 flex-1 rounded-t bg-accent-200/60" />
                            ))}
                        </div>
                    )}
                </Card>
                <Card className="min-w-0 flex-[1_1_280px] p-5">
                    <h2 className="mb-3 text-base font-bold">Top products</h2>
                    <ul className="space-y-3 text-sm">
                        {(data?.topProducts ?? []).map((p) => (
                            <li key={p.productId} className="flex justify-between gap-2"><span>{p.name}</span><b>{p.quantity} sold</b></li>
                        ))}
                    </ul>
                </Card>
            </div>

            <Card className="overflow-hidden">
                <h2 className="px-5 py-4 text-base font-bold">Transactions</h2>
                {isPending ? <TableSkeleton /> : isError ? <ErrorState onRetry={refetch} /> : rows.length === 0 ? (
                    <EmptyState title="No transactions in this range" />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-160 border-collapse">
                            <thead><tr><Th>Date</Th><Th>Order</Th><Th>Payment</Th><Th>Payment status</Th><Th align="right">Total</Th></tr></thead>
                            <tbody>
                                {rows.map((r) => (
                                    <tr key={r.orderNumber}>
                                        <td className={tdCls}>{formatDate(r.date)}</td>
                                        <td className={`${tdCls} font-semibold`}>{r.orderNumber}</td>
                                        <td className={tdCls}>{r.paymentMethod}</td>
                                        <td className={tdCls}><Pill tone={PAY_TONE[r.paymentStatus]}>{r.paymentStatus}</Pill></td>
                                        <td className={`${tdCls} text-right`}>{formatPrice(r.total)}</td>
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
