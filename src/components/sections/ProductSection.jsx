import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductGrid from "../products/ProductGrid";

const ProductSection = ({
    title,
    products = [],
    viewAllLink,
    onAddToCart,
    columns = 4
}) => {
    return (
        <section>
            <div className="mb-6 flex itemsend justify-between gap-4">
                <div>
                    <h2 className="font-bold text-2xl md:text-3xl">
                        {title}
                    </h2>
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

            <ProductGrid 
                products={products}
                onAddToCart={onAddToCart}
                columns={columns}
            />
        </section>
    );
}

export default ProductSection;