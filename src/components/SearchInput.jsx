import { Search, X } from "lucide-react";

const SearchInput = ({
    value,
    onChange,
    onSubmit,
    placeholder = "Search......",
    label = "Seach",
    className = ""
}) => {
    const handleOnSubmit = (event) => {
        event.preventDefault();
        onSubmit?.(value);
    }

    return (
        <form role="search" onSubmit={handleOnSubmit} className={`relative ${className}`}>
            <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
            />

            <input
                type="text"
                enterKeyHint="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={(event) => event.key === "Escape" && onChange("")}
                aria-label={label}
                placeholder={placeholder}
                className="h-11 w-full rounded-md border border-gray-300 bg-white pr-10 pl-9 text-sm text-heading placeholder:text-neutral-400 focus:border-accent-100 focus:ring-4 focus:ring-accent-100/20 focus:outline-none"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-neutral-400 hover:text-neutral-700"
                >
                    <X size={16} />
                </button>
            )}
        </form>
    );
}

export default SearchInput;