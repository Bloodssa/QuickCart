import HomeLayout from "../layouts/HomeLayout";
import HeroSlider from "../components/home/HeroSlider";
import FeatureBar from "../components/home/FeatureBar";
import CategoryGrid from "../components/home/CategoryGrid"
import PromoBanner from "../components/home/PromoBanner";
import CollectionTiles from "../components/home/CollectionTiles";
import ProductShelf from "../components/products/ProductShelf";
import { useAddToCartHandler } from "../hooks/useAddToCartHandler";

const HomePage = () => {
    const handleAddToCart = useAddToCartHandler();

    return (
        <HomeLayout>
            <HeroSlider />
            <FeatureBar />
            <CategoryGrid />

            {/* Featured Section */}
            <ProductShelf
                title="Featured Products"
                params={{ featured: true, page: 1, pageSize: 4 }}
                viewAllLink="/products?featured=true"
                onAddToCart={handleAddToCart}
                columns={4}
            />

            <PromoBanner />

            {/* Trending Section */}
            <ProductShelf
                title="Trending Now"
                params={{ sort: "popular", page: 1, pageSize: 5 }}
                viewAllLink="/products?sort=popular"
                onAddToCart={handleAddToCart}
                columns={5}
            />

            {/* Collections */}
            <CollectionTiles />

            {/* New Arrival Section */}
            <ProductShelf
                title="New Arrivals"
                params={{ sort: "newest", page: 1, pageSize: 4 }}
                viewAllLink="/products?sort=newest"
                onAddToCart={handleAddToCart}
                columns={4}
            />
        </HomeLayout>
    );
};

export default HomePage;