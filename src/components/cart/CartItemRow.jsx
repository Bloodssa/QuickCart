import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/format";
import QuantityStepper from "./QuantityStepper";

const MAX_PER_ITEM = 99;

export default function CartItemRow({ 
    item, 
    busy, 
    onQuantityChange, 
    onRemove
}) {
    const maxQuantity = Math.min(item.stockQuantity, MAX_PER_ITEM);
    const imageSrc = item.imageUrl;

    const outOfStock = item.stockQuantity === 0;
    const overStock = item.quantity > item.stockQuantity;

    return (
        <li className="flex gap-4 py-5">
            <Link
                to={`/products/${item.productId}`}
                className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-50"
            >
                {imageSrc ? (
                    <img src={imageSrc} alt={item.productName} className="h-full w-full object-contain p-1" />
                ) : (
                    <span className="text-xs text-neutral-500">No image</span>
                )}
            </Link>

            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                        <Link to={`/products/${item.productId}`} className="line-clamp-2 font-semibold text-heading hover:text-accent-100">
                            {item.productName}
                        </Link>
                        <p className="mt-0.5 text-sm text-neutral-900">{formatPrice(item.unitPrice)} each</p>
                        <p className={`mt-0.5 text-sm ${item.stockQuantity <= 10 ? "text-red-500 font-semibold" : "text-neutral-500"}`}>Stocks left: {item.stockQuantity} </p>
                    </div>
                    <p className="shrink-0 font-bold text-heading">{formatPrice(item.subTotal)}</p>
                </div>

                <div className="flex items-center justify-between">
                    {outOfStock ? (
                        <p className="text-sm font-medium text-red-600">Out of stock: remove it to continue</p>
                    ) : (
                        <QuantityStepper
                            value={item.quantity}
                            max={maxQuantity}
                            disabled={busy}
                            onChange={(quantity) => onQuantityChange(item, quantity)}
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => onRemove(item)}
                        disabled={busy}
                        aria-label={`Remove ${item.productName}`}
                        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                        <Trash2 size={15} aria-hidden="true" />
                        Remove
                    </button>
                </div>
                {!outOfStock && overStock && (
                    <p className="text-xs font-medium text-amber-600">Only {item.stockQuantity} left. Lower the quantity.</p>
                )}
            </div>
        </li>
    );
}