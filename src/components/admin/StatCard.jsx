// MOCK
export default function StatCard({ label, value, hint, icon: Icon, trend }) {
    const trendColor = trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-neutral-500";

    return (
        <div className="rounded-md border border-gray-300 bg-white p-5">
            <div className="flex items-start justify-between">
                <p className="text-sm text-neutral-500">{label}</p>
                {Icon && (
                    <span className="flex size-9 items-center justify-center rounded-md bg-accent-50 text-accent-100">
                        <Icon size={18} aria-hidden="true" />
                    </span>
                )}
            </div>
            <p className="mt-2 text-2xl font-bold text-heading">{value}</p>
            {hint && (
                <p className="mt-1 text-xs text-neutral-500">
                    {trend !== undefined && (
                        <span className={`mr-1 font-semibold ${trendColor}`}>
                            {trend > 0 ? "+" : ""}{trend}%
                        </span>
                    )}
                    {hint}
                </p>
            )}
        </div>
    );
}