import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, Headphones, Tag, ShieldCheck, MoveRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import ProductSection from "../components/sections/ProductSection";

// Images
import heroImage1 from "../assets/images/hero/hero-image.png"
import heroImage2 from "../assets/images/hero/hero-image-2.jpg"
import heroImage3 from "../assets/images/hero/hero-image-3.jpg"
import collectionImage from "../assets/images/hero/collection.jpg"
import bestSellerImage from "../assets/images/hero/best-seller.jpg"
import newArrivalImage from "../assets/images/hero/new-arrival.jpg"
import earbuds from "../assets/images/category/Wireless Earbuds Pro.jpg"
import runningshoes from "../assets/images/category/Running Shoes.jpg"
import laptop from "../assets/images/category/Laptop.jpg"
import bags from "../assets/images/category/Backpack.jpg"



// category
import electonicImage from "../assets/images/category/electronic.jpg"
import gadgetImage from "../assets/images/category/gadgets.jpg"
import homeImage from "../assets/images/category/home.jpg"
import apparelImage from "../assets/images/category/apparel.jpg"
import personalImage from "../assets/images/category/personal.jpg"
import sportsImage from "../assets/images/category/sports.jpg"
import healthImage from "../assets/images/category/health.jpg"
import groceryImage from "../assets/images/category/grocery.jpg"
import toysImage from "../assets/images/category/toys.jpg"
import booksImage from "../assets/images/category/books.jpg"

const HomePage = () => {
    const imageSlides = [heroImage1, heroImage2, heroImage3];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [imageSlides.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? imageSlides.length - 1 : prev - 1));
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % imageSlides.length);
    }

    const features = [
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Quick & reliable shipping right to your door"
        },
        {
            icon: Headphones,
            title: "24/7 Customer Support",
            description: "Dedicated assistance whenever you need it"
        },
        {
            icon: Tag,
            title: "Great Deals",
            description: "Unbeatable discounts on top products"
        },
        {
            icon: ShieldCheck,
            title: "Quality Products",
            description: "100% genuine and high-standard items"
        }
    ];

    // dummy categories
    const categories = [
        { id: 1, name: "Electronics & Gadgets", image: electonicImage },
        { id: 2, name: "Mobiles & Tablets", image: gadgetImage },
        { id: 3, name: "Home & Living", image: homeImage },
        { id: 4, name: "Fashion & Apparel", image: apparelImage },
        { id: 5, name: "Beauty & Personal Care", image: personalImage },
        { id: 6, name: "Sports & Fitness", image: sportsImage },
        { id: 7, name: "Health & Wellness", image: healthImage },
        { id: 8, name: "Groceries & Essentials", image: groceryImage },
        { id: 9, name: "Toys, Kids & Baby", image: toysImage },
        { id: 10, name: "Books & Stationery", image: booksImage },
    ];

    // Static product
    const featuredProducts = [
        {
            id: 1,
            name: "Wireless Earbuds Pro",
            category: "Electronics",
            price: 2499,
            imageUrl: earbuds,
            rating: 4.7,
            reviewCount: 124,
            stockQuantity: 25,
        },
        {
            id: 2,
            name: "Running Shoes",
            category: "Fashion",
            price: 1899,
            imageUrl: runningshoes,
            rating: 4.5,
            reviewCount: 89,
            stockQuantity: 12,
        },
        {
            id: 3,
            name: "Laptop 14-inch Intel Core i5",
            category: "Electronics",
            price: 24990,
            imageUrl: laptop,
            rating: 4.8,
            reviewCount: 203,
            stockQuantity: 8,
        },
        {
            id: 4,
            name: "Casual Backpack",
            category: "Bags",
            price: 1299,
            imageUrl: bags,
            rating: 4.6,
            reviewCount: 67,
            stockQuantity: 0,
        },
    ];

    const handleAddToCart = (productId) => {
        console.log("Add product to cart:", productId);
    };

    return (
        <HomeLayout>
            <div className="relative h-120 w-full rounded-md overflow-hidden group">
                <div
                    className="flex h-full w-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {imageSlides.map((slide, index) => (
                        <div
                            key={index}
                            style={{ backgroundImage: `url(${slide})` }}
                            className="bg-cover bg-center h-full w-full shrink-0 relative"
                        >
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-y-0 left-6 sm:left-10 md:left-14 flex flex-col justify-center max-w-md sm:max-w-lg md:max-w-xl z-10 pr-4">
                    <div className="flex flex-col justify-center">
                        <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans text-neutral-900">
                            Discover Amazing <br /> Products for a Better You
                        </p>
                        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-xl text-neutral-700">
                            Premium quality, great prices, and fast delivery. <br className="hidden sm:inline" />
                            Shop the things you love, all in one place.
                        </p>

                        <Link to="/products" className="flex gap-2 w-fit mt-4 sm:mt-6 px-5 py-2.5 sm:px-6 sm:py-3 text-white bg-accent-100 font-semibold rounded-md transition-colors duration-200 hover:bg-accent-hover text-sm sm:text-base">
                            <span>Shop Now</span>
                            <MoveRight />
                        </Link>
                    </div>
                </div>
                <div className="flex gap-3 items-center justify-center absolute right-0 bottom-0 h-15 w-auto p-2 z-10000">
                    {/* Dots */}
                    <div className="flex gap-2">
                        {imageSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? "bg-accent-100 w-6" : "bg-white/60 hover:bg-white"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-1.5">
                        <button
                            className="bg-white/70 hover:bg-white text-neutral-400 hover:text-neutral-900 p-2 rounded-lg transition-all duration-200"
                            onClick={prevSlide}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            className="bg-white/70 hover:bg-white text-neutral-400 hover:text-neutral-900 p-2 rounded-lg transition-all duration-200"
                            onClick={nextSlide}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full border border-gray-300 rounded-md mt-10 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-300">
                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-6"
                        >
                            <div className="p-3 rounded-lg bg-accent-50 text-accent-100 shrink-0">
                                <Icon className="w-7 h-7 text-accent-100" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">
                                    {feature.title}
                                </h4>
                                <p className="text-xs sm:text-xs text-neutral-500 mt-1">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <section className="mt-13">
                <h1 className="font-bold text-3xl">Shop by Category</h1>
                <p className="text-neutral-500 mt-1 text-base">
                    Browse our top categories
                </p>

                <div className="mt-4 border border-gray-300 rounded-md overflow-hidden bg-white">
                    <div className="category-grid -mr-px -mb-px grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to=""
                                className="flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-white hover:bg-gray-50 transition-colors group cursor-pointer"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-200">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <span className="font-semibold text-neutral-800 text-sm sm:text-base group-hover:text-accent-100 transition-colors">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <ProductSection
                title="Featured Products"
                products={featuredProducts}
                viewAllLink="/products"
                onAddToCart={handleAddToCart}
                columns={4}
            />

            <div
                className="w-full h-80 my-14 rounded-md bg-cover bg-center relative text-white flex items-center"
                style={{ backgroundImage: `url(${collectionImage})` }}
            >
                <div className="relative z-10 max-w-lg p-6 sm:p-10">
                    <p className="text-base md:text-2xl font-semibold">
                        New Collections
                    </p>
                    <h2 className="mt-2 text-5xl font-bold sm:text-base">
                        Find Your Next Favorite
                    </h2>
                    <p className="mt-2 text-sm sm:text-base">
                        Explore quality products at prices you'll love.
                    </p>

                    <div className="mt-5">
                        <Link to="/products" className="w-fit flex gap-3 px-4 py-3 bg-white text-accent-100 rounded-md font-extrabold hover:bg-white/80">
                            Shop Now
                            <MoveRight />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trending Section */}
            <ProductSection
                title="Trending Now"
                products={featuredProducts}
                viewAllLink="/products"
                onAddToCart={handleAddToCart}
                columns={5}
            />

            {/* Collections */}
            <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative isolate flex min-h-48 items-center overflow-hidden rounded-md bg-neutral-900">
                    <img
                        src={newArrivalImage}
                        alt="New Arrival"
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 -z-10 bg-linear-to-r from-neutral-900/90 via-neutral-900/60 to-transparent" />

                    <div className="max-w-[65%] p-5 sm:p-6">
                        <h2 className="text-xl font-bold text-white sm:text-2xl">
                            New Arrivals
                        </h2>
                        <p className="mt-1 text-sm text-neutral-200">
                            Fresh styles. Updated weekly.
                        </p>
                        <Link
                            to="/products?sort=newest"
                            className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
                        >
                            Explore
                            <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                    </div>
                </div>

                {/* Best Sellers */}
                <div className="relative isolate flex min-h-48 items-center overflow-hidden rounded-md bg-orange-50">
                    <img
                        src={bestSellerImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                    />

                    <div className="max-w-[65%] p-5 sm:p-6">
                        <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                            Best Sellers
                        </h2>
                        <p className="mt-1 text-sm text-neutral-700">
                            Our customers' favorites.
                        </p>
                        <Link
                            to="/products?sort=popular"
                            className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-orange-100"
                        >
                            View All
                            <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* New Arrival Section */}
            <ProductSection
                title="New Arrivals"
                products={featuredProducts}
                viewAllLink="/products"
                onAddToCart={handleAddToCart}
                columns={4}
            />
        </HomeLayout>
    );
};

export default HomePage;