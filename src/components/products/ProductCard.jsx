import { Link } from "react-router-dom";

const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 2
    }).format(price);
};

const ProductCard = ({
    id,
    name,
    categoryName,
    price,
    imageUrl,
    stockQuantity,
}) => {
    const isInStock = stockQuantity > 0;

    return (
        <Link to={`/products/${id}`} className="min-w-0 overflow-hidden rounded-md border border-gray-300 bg-white">
            <div className="m-2 flex aspect-square items-center justify-center overflow-hidden rounded-md bg-gray-50">
                {imageUrl ? (
                    <img 
                        src={imageUrl}
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

                <h3 className="text-base font-bold text-neutral-900">
                    {name}
                </h3>

                <p className="mt-4 text-base font-bold text-neutral-900">
                    {formatPrice(price)}
                </p>

                <p className={`mt-1 flex items-center gap-1 text-xs ${isInStock ? "text-green-500" : "text-red-500"}`}>
                    {isInStock ? "In Stock" : "Out of Stock"}
                </p>
            </div>
        </Link>
    );
}

export default ProductCard;