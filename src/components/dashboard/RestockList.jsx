import { Link } from "react-router-dom";
import { Card } from "../admin/ui";

export default function RestockList({ items = [] }) {
    return (
        <Card className="p-5">
            <h2 className="mb-4 text-base font-bold">Restock soon</h2>
            {items.length === 0 ? (
                <p className="text-sm text-gray-600">Stock levels look fine.</p>
            ) : (
                <ul className="space-y-3 text-sm">
                    {items.map((p) => (
                        <li key={p.id} className="flex justify-between gap-2">
                            <span className="truncate">{p.name}</span>
                            <b className={p.stock === 0 ? "text-red-700" : "text-yellow-800"}>
                                {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                            </b>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/admin/inventory" className="mt-4 inline-block text-sm font-semibold text-accent-300 hover:underline">Adjust stock</Link>
        </Card>
    );
}