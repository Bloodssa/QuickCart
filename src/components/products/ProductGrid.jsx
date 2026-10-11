import ProductCard from "./ProductCard"

const ProductGrid = ({
    products = [],
    onAddToCart,
    columns = 4
}) => {
    const columnClasses = {
        2: "grid-cols-2",
        3: "grid-cols-2 sm:grid-cols-3",
        4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    };

    return (
        <div className={`grid ${columnClasses[columns] ?? columnClasses[4]} gap-3 sm:gap-4`}>
            {products.map(((product) => (
                <ProductCard 
                    key={product.id}
                    {...product}
                    onAddToCart={onAddToCart}
                />
            )))}
        </div>
    );
}

export default ProductGrid;