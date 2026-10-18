import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ProductCardSkeleton";

const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

const gridClass = (columns) => `grid ${columnClasses[columns] ?? columnClasses[4]} gap-3 sm:gap-4`;

export function ProductGrid({ products = [], onAddToCart, columns = 4 }) {
    return (
        <div className={gridClass(columns)}>
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={onAddToCart} 
                />
            ))}
        </div>
    );
}

export function ProductGridSkeleton({ columns = 4, count = columns }) {
    return (
        <div role="status" className={gridClass(columns)}>
            <span className="sr-only">Loading products…</span>
            {Array.from({ length: count }, (_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}