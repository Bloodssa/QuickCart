import { useParams, Link } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useProduct } from "../../hooks/useProducts";

const ProductPage = () => {
    const { id } = useParams();

    const { data: product, isLoading, error } = useProduct(id);

    if (isLoading) return <p>Loading product...</p>;
    if (error || !product) return <p>Product not found.</p>;

    const defaultImage = product.images?.find((image) => image.isDefault)?.imageUrl ?? product.images?.[0]?.imageUrl;

    return (
        <HomeLayout>
            <Link to="/">
                Go back
            </Link>
            <div className="flex flex-col gap-4">
                <img src={defaultImage} alt={product.name} width="200" />

                <h1>Product: {product.name}</h1>
                <p>Category: {product.categoryName}</p>
                <p>Price: ₱{product.price}</p>

                <p className="whitespace-pre-line">
                    Description: {product.description}
                </p>

                <p>Stock: {product.stockQuantity}</p>
            </div>
        </HomeLayout>
    );
};

export default ProductPage;
