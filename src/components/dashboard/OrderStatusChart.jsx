import { PieChart } from "@mui/x-charts/PieChart";
import { STATUSES, STATUS_COLORS } from "../../lib/dashboard";

export default function OrderStatusChart({ counts = {}, loading }) {
    if (loading) return <div className="h-52 animate-pulse rounded bg-gray-100" />;

    const data = STATUSES.map((s) => ({ id: s, label: s, value: counts[s] ?? 0, color: STATUS_COLORS[s] }));
    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (total === 0) return <p className="py-10 text-center text-sm text-gray-600">No orders yet.</p>;

    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
            <PieChart
                width={200}
                height={200}
                hideLegend
                series={[{
                    data: data.filter((d) => d.value > 0), // zero slices only add clutter
                    innerRadius: 55,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 45, additionalRadius: -8, color: "#d1d5db" },
                    valueFormatter: ({ value }) => `${value} orders`,
                }]}
            />
            <ul className="space-y-2 text-sm">
                {data.map((d) => (
                    <li key={d.id} className="flex items-center gap-2">
                        <span className="size-3 rounded-sm" style={{ background: d.color }} aria-hidden="true" />
                        <span className="w-24">{d.label}</span>
                        <b>{d.value}</b>
                        <span className="text-gray-600">({Math.round((d.value / total) * 100)}%)</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}