import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/format";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
    const { id, name, categoryName, price, stockQuantity, images } = product;
    const cover = images?.find((image) => image.isDefault) ?? images[0]?.[0];
    const inStock = stockQuantity > 0;

    return (
        <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-gray-300 bg-white">
            <Link to={`/products/${id}`} className="min-w-0 overflow-hidden rounded-md bg-white">
                <div className="m-2 flex aspect-square items-center justify-center overflow-hidden rounded-md">
                    {cover ? (
                        <img
                            src={cover.imageUrl}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-contain p-2"
                        />
                    ) : (
                        <p className="text-sm text-neutral-500">No image available</p>
                    )}
                </div>

                <div className="flex flex-col p-3 pt-1">
                    {categoryName && (
                        <span className="mb-1 w-fit max-w-full rounded-md bg-gray-100 px-1.5 py-0.5 text-xs rext-gray-500">
                            {categoryName}
                        </span>
                    )}

                    <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-neutral-900">
                        {name}
                    </h3>

                    <p className="mt-4 text-base font-bold text-neutral-900">
                        {formatPrice(price)}
                    </p>

                    <p className={`mt-1 flex items-center gap-1 text-xs ${inStock ? "text-green-500" : "text-red-500"}`}>
                        {inStock ? "In Stock" : "Out of Stock"}
                    </p>
                </div>
            </Link>
            <div className="mt-auto p-3 pt-0">
                <button
                    type="button"
                    disabled={!inStock}
                    onClick={() => onAddToCart?.(id)}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-100 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                    <ShoppingCart size={16} aria-hidden="true" />
                    Add to cart
                </button>
            </div>
        </article>
    );
}

export default ProductCard;