import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, LogIn } from "lucide-react";

export default function GuestCartPrompt() {
    const location = useLocation();

    return (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-md border border-dashed border-gray-300 px-4 py-26 text-center">
            <ShoppingCart size={36} aria-hidden="true" className="text-neutral-300" />
            <p className="font-semibold text-heading">Log in to see your cart</p>
            <p className="max-w-sm text-sm text-neutral-500">Sign in to save your cart and access it anytime.</p>

            <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Link
                    to="/login"
                    state={{ from: location }}
                    className="inline-flex items-center gap-2 rounded-md bg-accent-100 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                    <LogIn size={16} aria-hidden="true" />
                    Log in
                </Link>
                <Link to="/register" className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50">
                    Create account
                </Link>
            </div>
        </div>
    );
}