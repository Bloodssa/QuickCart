import { Package } from "lucide-react";
import { Link } from "react-router-dom";

// TODO: rendr here if adress endpoint is done
export default function OrdersSection({ label, emptyMessage }) {
    return (
        <div className="p-5 md:p-6">
            <h2 className="text-lg font-bold text-neutral-900">{label}</h2>

            <div className="mt-5 flex flex-col items-center gap-3 rounded-md border border-gray-300 py-14 text-center">
                <Package size={32} aria-hidden="true" className="text-neutral-500" />
                <p className="text-sm text-neutral-500">{emptyMessage}</p>
                <Link
                    to="/products"
                    className="rounded-md bg-accent-100 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                    Start shopping
                </Link>
            </div>
        </div>
    );
}