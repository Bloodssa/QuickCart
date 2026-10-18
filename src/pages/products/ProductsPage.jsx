import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import ProductSection from "../../components/products/ProductSection";
import CategoryFilter from "../../components/CategoryFilter";
import { getProducts } from "../../api/products";
import { useCategories } from "../../queries/categories";

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

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    const sort = searchParams.get("sort");
    const categoryId = searchParams.get("categoryId") ?? "";
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

    const handleCategoryChange = (value) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set("categoryId", value);
        else next.delete("categoryId");
        next.delete("page");
        setSearchParams(next);
    }

    const goToPage = (p) => {
        const next = new URLSearchParams(searchParams);
        next.set("page", p);
        setSearchParams(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <HomeLayout>
            {error && (
                <p role="alert" className="mt-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                </p>
            )}

            <ProductSection
                title={title}
                subtitle={loading ? "Loading…" : error ? null : `${data.totalResults} products`}
                products={data.products}
                isLoading={loading}
                columns={4}
                hideWhenEmpty={false}
                className="mt-10"
                headerAction={
                    <CategoryFilter
                        categories={categories}
                        value={categoryId}
                        onChange={handleCategoryChange}
                        disabled={categoriesLoading}
                    />
                }
                emptyMessage={
                    error ? null : (
                        <div className="rounded-md border border-gray-300 bg-white p-10 text-center min-h-[60vh] flex items-center justify-center flex-col">
                            <p className="font-semibold text-heading">No products found.</p>
                            <p className="mt-1 text-sm text-neutral-500">Try a different category or search.</p>
                        </div>
                    )
                }
            />

            {!loading && !error && totalPages > 1 && (
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
        </HomeLayout>
    );
}

export default ProductsPage;