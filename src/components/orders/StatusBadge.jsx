const STYLES = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-700",
    Confirmed: "bg-blue-50 text-blue-700 border border-blue-700",
    Processing: "bg-indigo-50 text-indigo-700 border border-indigo-700",
    Completed: "bg-green-50 text-green-700 border border-green-700",
    Paid: "bg-green-50 text-green-700 border border-green-700",
    Failed: "bg-red-50 text-red-600 border border-red-700",
    Cancelled: "bg-red-50 text-red-600 border border-red-700",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${STYLES[status] ?? "bg-gray-100 text-neutral-700"}`}
        >
            {status}
        </span>
    );
}