import { BarChart } from "@mui/x-charts/BarChart";
import { formatPrice } from "../../lib/format";
import { ACCENT, shortDate } from "../../lib/dashboard";

const compact = new Intl.NumberFormat("en-PH", { notation: "compact", maximumFractionDigits: 1 });

export default function RevenueChart({ days = [], loading }) {
    if (loading) return <div className="h-72 animate-pulse rounded bg-gray-100" />;
    if (days.length === 0) return <p className="py-10 text-center text-sm text-gray-600">No revenue data yet.</p>;

    const total = days.reduce((s, d) => s + d.revenue, 0);
    const peak = Math.max(...days.map((d) => d.revenue));
    const dataset = days.map((d) => ({ label: shortDate(d.date), revenue: d.revenue }));

    return (
        <div>
            <p className="flex justify-between text-xs text-neutral-500">
                <span>Peak day {formatPrice(peak)}</span>
                <span>Total {formatPrice(total)}</span>
            </p>
            <BarChart
                dataset={dataset}
                height={280}
                hideLegend
                grid={{ horizontal: true }}
                borderRadius={4}
                xAxis={[{
                    dataKey: "label",
                    scaleType: "band",
                    tickPlacement: "middle",
                    tickLabelPlacement: "middle",
                    tickLabelInterval: (_, i) => i % 5 === 0,
                }]}
                yAxis={[{ width: 56, valueFormatter: (v) => `₱${compact.format(v)}` }]}
                series={[{ dataKey: "revenue", label: "Paid revenue", color: ACCENT, valueFormatter: (v) => formatPrice(v ?? 0) }]}
            />
        </div>
    );
}