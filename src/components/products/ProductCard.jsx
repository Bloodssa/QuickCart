import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/format";

const ProductCard = ({ product }) => {
    const { id, name, categoryName, price, stockQuantity, images } = product;
    const cover = images?.find((image) => image.isDefault) ?? images[0]?.[0];
    const inStock = stockQuantity > 0;

    return (
        <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-gray-300 bg-white">
            <Link to={`/products/${id}`} className="min-w-0 overflow-hidden rounded-md bg-white">
                <div className="flex aspect-square items-center justify-center overflow-hidden mb-2">
                    {cover ? (
                        <img
                            src={cover.imageUrl}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-contain"
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

                    <p className="text-base  mt-2 font-bold text-neutral-900">
                        {formatPrice(price)}
                    </p>

                    <p className={`mt-1 flex items-center gap-1 text-xs ${inStock ? "text-green-500" : "text-red-500"}`}>
                        {inStock ? "In Stock" : "Out of Stock"}
                    </p>
                </div>
            </Link>
        </article>
    );
}

export default ProductCard;