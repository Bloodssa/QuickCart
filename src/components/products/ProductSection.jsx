import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductGrid, ProductGridSkeleton } from "./ProductGrid";

const ProductSection = ({
    title,
    subtitle,
    products = [],
    viewAllLink,
    onAddToCart,
    columns = 4,
    isLoading = false,
    isError = false,
}) => {
    // a failed or empty section disappears instead of breaking the page
    if (isError || (!isLoading && products.length === 0)) return null;

    return (
        <section className="mt-12">
            <div className="mb-6 flex itemsend justify-between gap-4">
                <div>
                    <h2 className="font-bold text-2xl md:text-3xl">{title}</h2>
                    {subtitle && <p className="mt-1 text-neutral-500">{subtitle}</p>}
                </div>

                {viewAllLink && (
                    <Link
                        to={viewAllLink}
                        className="flex shrink-0 items-center gap-1 text-sm font-semibold text-accent-100 transition-colors hover:text-accent-300"
                    >
                        View all
                        <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                )}
            </div>

            {isLoading ? (
                <ProductGridSkeleton columns={columns} />
            ) : (
                <ProductGrid 
                    products={products}
                    onAddToCart={onAddToCart}
                    columns={columns}
                />
            )}
        </section>
    );
}

export default ProductSection;