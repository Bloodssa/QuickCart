// MOCK
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";

export const inputCls =
    "h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-heading placeholder:text-gray-400 focus:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-50 disabled:bg-gray-100 disabled:text-gray-500";
export const primaryBtn =
    "inline-flex h-11 items-center justify-center rounded-md bg-accent-300 px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60";
export const secondaryBtn =
    "inline-flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-5 text-sm font-semibold text-heading transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60";
export const smallBtn =
    "inline-flex h-9 items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-xs font-semibold text-heading hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

export function PageHeader({ title, subtitle, action }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h1 className="text-2xl font-extrabold text-heading">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
}

export function Card({ className = "", children }) {
    return <section className={`rounded-md border border-gray-300 bg-white ${className}`}>{children}</section>;
}

export function StatCard({ label, value, hint, loading }) {
    return (
        <Card className="p-4">
            <p className="text-sm font-semibold text-gray-600">{label}</p>
            {loading ? (
                <div className="mt-2 h-8 w-24 animate-pulse rounded bg-gray-200" />
            ) : (
                <p className="mt-1 text-2xl font-extrabold text-heading">{value}</p>
            )}
            {hint && !loading && <p className="mt-1 text-xs text-gray-600">{hint}</p>}
        </Card>
    );
}

const TONES = {
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    orange: "bg-accent-50 text-accent-300",
    gray: "bg-gray-100 text-gray-700",
};

export function Pill({ tone = "gray", children }) {
    return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${TONES[tone]}`}>{children}</span>;
}

// export const ORDER_STATUS_TONE = {
//     Pending: "yellow",
//     Confirmed: "blue",
//     Processing: "blue",
//     Completed: "green",
//     Cancelled: "red",
// };

export function EmptyState({ title, message }) {
    return (
        <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
            <Inbox size={28} className="text-gray-400" aria-hidden="true" />
            <p className="font-semibold text-heading">{title}</p>
            {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
    );
}

export function TableSkeleton({ rows = 5 }) {
    return (
        <div className="space-y-px" aria-busy="true" aria-label="Loading">
            {Array.from({ length: rows }, (_, i) => (
                <div key={i} className="h-14 animate-pulse bg-gray-100" />
            ))}
        </div>
    );
}

export function ErrorState({ onRetry, message = "Could not load data." }) {
    return (
        <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <p className="text-sm text-gray-600">{message}</p>
            <button type="button" onClick={onRetry} className={secondaryBtn}>
                Try again
            </button>
        </div>
    );
}

export function Pagination({ page, totalPages, onChange }) {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center justify-between border-t border-gray-300 px-4 py-3 text-sm text-gray-600">
            <span>
                Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
                <button type="button" className={smallBtn} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
                    <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <button type="button" className={smallBtn} disabled={page >= totalPages} onClick={() => onChange(page + 1)} aria-label="Next page">
                    <ChevronRight size={16} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

export function Th({ children, align = "left" }) {
    return (
        <th scope="col" className={`border-b border-gray-300 bg-gray-50 px-4 py-3 text-xs font-bold text-gray-600 ${align === "right" ? "text-right" : "text-left"}`}>
            {children}
        </th>
    );
}

export const tdCls = "border-b border-gray-100 px-4 py-3 text-sm";
