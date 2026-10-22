import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductGrid, ProductGridSkeleton } from "./ProductGrid";

const ProductSection = ({
    title,
    subtitle,
    products = [],
    viewAllLink,
    columns = 4,
    isLoading = false,
    isError = false,
    headerAction = null, // anything rendered on the right side of the header categoty filter
    hideWhenEmpty = true,
    emptyMessage = null,
    className = "mt-12",
}) => {
    const isEmpty = !isLoading && products.length === 0;

    if (hideWhenEmpty && (isError || isEmpty)) return null;

    return (
        <section className={className}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="font-bold text-2xl md:text-3xl">{title}</h2>
                    {subtitle && <p className="mt-1 text-neutral-500">{subtitle}</p>}
                </div>

                {(headerAction || viewAllLink) && (
                    <div>
                        {headerAction}

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
                )}
            </div>
            
           {isLoading ? (
                <ProductGridSkeleton columns={columns} />
            ) : products.length > 0 ? (
                <ProductGrid
                    products={products}
                    columns={columns}
                />
            ) : (
                emptyMessage
            )}
        </section>
    );
}

export default ProductSection;