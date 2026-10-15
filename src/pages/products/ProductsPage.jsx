import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import ProductSection from "../../components/sections/ProductSection";
import ProductCardSkeleton from "../../components/ProductCardSkeleton";
import { getProducts } from "../../lib/productsApi";

const PAGE_SIZE = 20;

const sortTitle = {
    newest: "New Arrivals",
    popular: "Best Sellers",
    trending: "Trending Now"
};

const ProductsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState({ products: [], totalResults: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sort = searchParams.get("sort");
    const categoryId = searchParams.get("categoryId");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") ?? 1);

    useEffect(() => {
        const controller = new AbortController();

        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getProducts({
                    sort, categoryId, featured, search, page, pageSize: PAGE_SIZE
                }, controller.signal);

                setData(result);
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    setError("Failed to load products.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        load();
        return () => controller.abort();
    }, [sort, categoryId, featured, search, page]);

    const title = categoryId ? data.products[0]?.category ?? "Category" : featured ? "Deals" : sortTitle[sort?.toLocaleLowerCase()] ?? "All Products";

    const totalPages = Math.ceil(data.totalResults / PAGE_SIZE);

    const goToPage = (p) => {
        const next = new URLSearchParams(searchParams);
        next.set("page", p);
        setSearchParams(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <HomeLayout>
            {loading && (
                <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {!loading && !error && data.products.length === 0 && (
                <p className="mt-10 text-neutral-500">
                    No products found.
                </p>
            )}

            {!loading && !error && data.products.length > 0 && (
                <>
                    <ProductSection title={title} products={data.products} columns={4} />

                    {totalPages > 1 && (
                        <div className="my-8 flex items-center justify-center gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => goToPage(page - 1)}
                                className="rounded-md border border-gray-300 px-4 py-2 disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-sm">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                disabled={page >= totalPages}
                                onClick={() => goToPage(page + 1)}
                                className="rounded-md border border-gray-300 px-4 py-2 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </HomeLayout>
    );
}

export default ProductsPage;