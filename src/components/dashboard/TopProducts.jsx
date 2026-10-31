import { Card } from "../admin/ui";

export default function TopProducts({ products = [] }) {
    const max = Math.max(1, ...products.map((p) => p.quantity));

    return (
        <Card className="p-5">
            <h2 className="mb-4 text-base font-bold">Top products, 30 days</h2>
            {products.length === 0 ? (
                <p className="text-sm text-gray-600">No sales yet.</p>
            ) : (
                <ul className="space-y-3">
                    {products.map((p) => (
                        <li key={p.productId}>
                            <div className="flex justify-between gap-2 text-sm">
                                <span className="truncate">{p.name}</span>
                                <b>{p.quantity}</b>
                            </div>
                            <div className="mt-1 h-2 rounded-full bg-gray-100">
                                <div className="h-2 rounded-full bg-accent-200" style={{ width: `${(p.quantity / max) * 100}%` }} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}