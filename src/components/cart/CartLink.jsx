import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartCount } from "../../queries/cart";

const LINK_STYLES = {
    desktop: "group relative flex items-center justify-center rounded-md px-3 py-2 transition-colors duration-250 hover:bg-accent-100",
    mobile: "relative p-2",
};

export default function CartLink({ variant = "desktop" }) {
    const { data: count = 0 } = useCartCount();

    return (
        <Link
            to="/cart"
            aria-label={count > 0 ? `View shopping cart, ${count} items` : "View shopping cart"}
            className={LINK_STYLES[variant]}
        >
            <ShoppingCart
                className={variant === "desktop" ? "h-5 w-5 text-black transition-colors group-hover:text-white" : "h-5 w-5"}
            />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-accent-100 px-1 text-[11px] leading-5 font-bold text-white ring-2 ring-white">
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </Link>
    );
}