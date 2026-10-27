// MOCK
import { Search } from "lucide-react";

export function SearchInput({ value, onChange, placeholder = "Search…", label }) {
    return (
        <div className="relative w-full max-w-sm">
            <Search size={16} aria-hidden="true" className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label={label ?? placeholder}
                className="h-11 w-full rounded-md border border-gray-300 bg-white pr-3 pl-9 text-sm focus:border-accent-100 focus:ring-2 focus:ring-accent-100/20 focus:outline-none"
            />
        </div>
    );
}

export function Select({ value, onChange, label, options, allLabel }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={label}
            className="h-11 rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-accent-100 focus:ring-2 focus:ring-accent-100/20 focus:outline-none"
        >
            {allLabel && <option value="">{allLabel}</option>}
            {options.map((o) => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
    );
}

export function PrimaryButton({ children, ...props }) {
    return (
        <button
            type="button"
            {...props}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-accent-100 px-4 text-sm font-semibold text-white hover:bg-accent-hover focus:ring-2 focus:ring-accent-100/40 focus:outline-none disabled:opacity-40"
        >
            {children}
        </button>
    );
}

export function SecondaryButton({ children, ...props }) {
    return (
        <button
            type="button"
            {...props}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-neutral-700 hover:bg-gray-50 focus:ring-2 focus:ring-accent-100/20 focus:outline-none disabled:opacity-40"
        >
            {children}
        </button>
    );
}