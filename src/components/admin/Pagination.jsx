// MOCK
export default function Pagination({ page, totalPages, onChange }) {
    return (
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
                <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => onChange(page - 1)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
                >
                    Previous
                </button>
                <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => onChange(page + 1)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}