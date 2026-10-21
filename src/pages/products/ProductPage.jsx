import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "../../api/client";
import QuantityStepper from "../../components/cart/QuantityStepper";
import Skeleton from "../../components/ui/Skeleton";
import HomeLayout from "../../layouts/HomeLayout";
import { formatPrice } from "../../lib/format";
import { useAddToCart } from "../../queries/cart";
import { useProduct } from "../../queries/products";

const MAX_PER_ITEM = 99;

// text block: first line is the intro, the lines after it are feature points.
function splitDescription(text = "") {
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    return { intro: lines[0] ?? "", highlights: lines.slice(1) };
}

// highlight text like list text
function Highlight({ line }) {
    const colon = line.indexOf(":");
    if (colon === -1 || colon > 40) return <>{line}</>;

    return (
        <>
            <span className="font-semibold text-heading">{line.slice(0, colon + 1)}</span>
            {line.slice(colon + 1)}
        </>
    );
}

const ProductPage = () => {
    const { id } = useParams();
    const { data: product, isPending, error } = useProduct(id);
    const addToCart = useAddToCart();

    const [selectedImageId, setSelectedImageId] = useState(null);
    const [quantity, setQuantity] = useState(1);

    if (isPending) {
        return (
            <HomeLayout>
                <div role="status" className="grid gap-8 md:grid-cols-2">
                    <span className="sr-only">Loading product…</span>
                    <Skeleton className="aspect-square" />
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-32" />
                    </div>
                </div>
            </HomeLayout>
        );
    }

    if (error || !product) {
        return (
            <HomeLayout>
                <div role="alert" className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {error ? getErrorMessage(error) : "Product not found."}{" "}
                    <Link to="/products" className="font-semibold underline">
                        Back to products
                    </Link>
                </div>
            </HomeLayout>
        );
    }

    const { name, categoryName, price, stockQuantity, description, images = [] } = product;

    const defaultImage = images.find((image) => image.isDefault) ?? images[0];
    const activeImage = images.find((image) => image.id === selectedImageId) ?? defaultImage;

    const inStock = stockQuantity > 0;
    const lowStock = inStock && stockQuantity <= 10;
    const maxQuantity = Math.min(stockQuantity, MAX_PER_ITEM);
    const { intro, highlights } = splitDescription(description);

    function handleAddToCart() {
        addToCart.mutate(
            { productId: product.id, quantity },
            {
                onSuccess: () => toast.success(`${name} added to cart`),
                onError: (err) => toast.error(getErrorMessage(err)),
            },
        );
    }

    return (
        <HomeLayout>
            <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-12">
                {/* Gallery */}
                <div className="w-full">
                    <div className="flex h-72 items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50 md:h-80 lg:h-96">
                        {activeImage ? (
                            <img
                                src={activeImage.imageUrl}
                                alt={name}
                                className="h-full w-full object-contain p-4"
                            />
                        ) : (
                            <p className="text-sm text-neutral-500">No image available</p>
                        )}
                    </div>

                    {images.length > 1 && (
                        <ul className="mt-3 flex gap-3">
                            {images.map((image, index) => {
                                const selected = image.id === activeImage?.id;

                                return (
                                    <li key={image.id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedImageId(image.id)}
                                            aria-label={`Show image ${index + 1} of ${images.length}`}
                                            aria-pressed={selected}
                                            className={`flex size-16 items-center justify-center overflow-hidden rounded-md border bg-gray-50 sm:size-20 ${selected ? "border-accent-100" : "border-gray-300 hover:border-accent-200"
                                                }`}
                                        >
                                            <img src={image.imageUrl} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Info */}
                <div className="min-w-0">
                    {categoryName && (
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                            {categoryName}
                        </span>
                    )}

                    <h1 className="mt-3 text-3xl font-bold leading-tight text-heading">{name}</h1>

                    {intro && <p className="mt-3 text-sm leading-6 text-neutral-600">{intro}</p>}

                    <p className="mt-5 border-t border-gray-200 pt-5 text-3xl font-bold text-heading">
                        {formatPrice(price)}
                    </p>

                    <p
                        className={`mt-2 text-sm ${!inStock ? "font-semibold text-red-500" : lowStock ? "font-semibold text-red-500" : "text-green-600"
                            }`}
                    >
                        {!inStock
                            ? "Out of stock"
                            : lowStock
                                ? `Only ${stockQuantity} left. Don't miss it`
                                : `In stock (${stockQuantity} available)`}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-6">
                        {inStock && (
                            <QuantityStepper
                                value={quantity}
                                max={maxQuantity}
                                disabled={addToCart.isPending}
                                onChange={setQuantity}
                            />
                        )}

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={!inStock || addToCart.isPending}
                            className="flex h-11 min-w-48 flex-1 items-center justify-center gap-2 rounded-md bg-accent-100 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            <ShoppingCart size={16} aria-hidden="true" />
                            {addToCart.isPending ? "Adding…" : "Add to cart"}
                        </button>
                    </div>

                    {highlights.length > 0 && (
                        <section className="mt-8 border-t border-gray-200 pt-6">
                            <h2 className="font-bold text-heading">About this item</h2>
                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600 marker:text-accent-100">
                                {highlights.map((line) => (
                                    <li key={line}>
                                        <Highlight line={line} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
};

export default ProductPage;
