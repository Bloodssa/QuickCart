export default function SelectField({ label, id, error, options = [], loading, placeholder, ...props }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-900">{ label }</label>
            <select
                id={id}
                name={id}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-neutral-900 focus:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-50 disabled:bg-gray-100 disabled:text-gray-500"
                {...props}
            >
                <option value="">{loading ? "Loading…" : placeholder}</option>
                {options.map((o) => (
                    <option key={o.code} value={o.code}>{o.name}</option>
                ))}
            </select>
            {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}