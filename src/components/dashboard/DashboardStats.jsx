import { Link } from "react-router-dom";
import { StatCard } from "../admin/ui";
import { formatPrice } from "../../lib/format";
import { deltaText } from "../../lib/dashboard";

export default function DashboardStats({ data: d, loading }) {
    const change = d?.revenueChangePct;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Pending orders" value={d?.pendingOrders} loading={loading}
                hint={d?.staleOrders ? `${d.staleOrders} waiting over 24 hours` : "None waiting over 24 hours"} />
            <StatCard label="Orders today" value={d?.ordersToday} loading={loading}
                hint={d && deltaText(d.ordersToday, d.ordersYesterday)} />
            <StatCard label="Paid revenue, 30 days" value={d && formatPrice(d.revenue30d)} loading={loading}
                hint={change != null ? `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs previous 30 days` : undefined} />
            <StatCard label="Average order value" value={d && formatPrice(d.averageOrderValue)} loading={loading} />
            <StatCard label="Stock alerts" value={d && d.lowStockCount + d.outOfStockCount} loading={loading}
                hint={d && (
                    <>
                        {d.lowStockCount} low, {d.outOfStockCount} out of stock ·{" "}
                        <Link to="/admin/inventory" className="font-semibold text-accent-300 hover:underline">Open inventory</Link>
                    </>
                )} />
            <StatCard label="Customers" value={d?.totalCustomers} loading={loading}
                hint={d && `${d.newCustomers7d} new in the last 7 days`} />
        </div>
    );
}