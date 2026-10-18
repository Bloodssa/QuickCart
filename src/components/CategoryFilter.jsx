export default function CategoryFilter({ categories = [], value, onChange, disabled = false }) {
    return (
        <div className="w-full sm:w-60">
            <label htmlFor="category-filter" className="sr-only">
                Filter by category
            </label>
            <select
                id="category-filter"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                disabled={disabled}
                className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-heading focus:border-accent-100 focus:ring-4 focus:ring-accent-100/20 focus:outline-none disabled:opacity-60"
            >
                <option value="">All categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}