import { useCallback, useEffect, useState } from "react";

import { getCategories } from "../lib/categoriesApi";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProductImage,
    setDefaultProductImage,
} from "../lib/productsApi";

const PRODUCTS_CHANGED_EVENT = "quickcart:products-changed";

function getErrorMessage(error) {
    return (
        error.response?.data?.message ??
        error.message ??
        "Something went wrong."
    );
}

// Fetch a list of products
export function useProductList(params = {}) {
    const {
        sort,
        categoryId,
        featured,
        search,
        page = 1,
        pageSize = 20,
    } = params;

    const [data, setData] = useState({
        products: [],
        totalResults: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async (signal) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await getProducts(
                { sort, categoryId, featured, search, page, pageSize },
                signal
            );

            if (!signal?.aborted) {
                setData(result);
            }

            return result;
        } catch (err) {
            if (!signal?.aborted) {
                setError(getErrorMessage(err));
            }

            throw err;
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    }, [sort, categoryId, featured, search, page, pageSize]);

    useEffect(() => {
        const controller = new AbortController();

        const load = () => fetchProducts(controller.signal).catch(() => {});

        load();

        const handleProductsChanged = () => load();

        window.addEventListener(
            PRODUCTS_CHANGED_EVENT,
            handleProductsChanged
        );

        return () => {
            controller.abort();
            window.removeEventListener(
                PRODUCTS_CHANGED_EVENT,
                handleProductsChanged
            );
        };
    }, [fetchProducts]);

    return { data, isLoading, error };
}

// Fetch a single product
export function useProduct(id) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(Boolean(id));
    const [error, setError] = useState(null);

    const fetchProduct = useCallback(async (signal) => {
        if (!id) {
            setData(null);
            setIsLoading(false);
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await getProductById(id, signal);

            if (!signal?.aborted) {
                setData(result);
            }

            return result;
        } catch (err) {
            if (!signal?.aborted) {
                setError(getErrorMessage(err));
            }

            throw err;
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    }, [id]);

    useEffect(() => {
        const controller = new AbortController();

        const load = () => fetchProduct(controller.signal).catch(() => {});

        load();

        const handleProductsChanged = () => load();

        window.addEventListener(
            PRODUCTS_CHANGED_EVENT,
            handleProductsChanged
        );

        return () => {
            controller.abort();
            window.removeEventListener(
                PRODUCTS_CHANGED_EVENT,
                handleProductsChanged
            );
        };
    }, [fetchProduct]);

    return { data, isLoading, error };
}

// Fetch categories
export function useCategories() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadCategories = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await getCategories(controller.signal);

                if (!controller.signal.aborted) {
                    setData(result);
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(getErrorMessage(err));
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadCategories();

        return () => controller.abort();
    }, []);

    return { data, isLoading, error };
}

// Shared logic for product mutations
function useProductMutation(request) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const mutateAsync = useCallback(async (variables) => {
        setIsPending(true);
        setError(null);

        try {
            const result = await request(variables);

            window.dispatchEvent(
                new Event(PRODUCTS_CHANGED_EVENT)
            );

            return result;
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setIsPending(false);
        }
    }, [request]);

    const mutate = useCallback((variables, options = {}) => {
        mutateAsync(variables)
            .then((result) => options.onSuccess?.(result))
            .catch((err) => options.onError?.(err));
    }, [mutateAsync]);

    return { mutate, mutateAsync, isPending, error };
}

// Create a product or update an existing product
export function useSaveProduct() {
    const request = useCallback(({ id, values }) => {
        return id
            ? updateProduct(id, values)
            : createProduct(values);
    }, []);

    return useProductMutation(request);
}

// Delete a product
export function useDeleteProduct() {
    const request = useCallback(
        (id) => deleteProduct(id),
        []
    );

    return useProductMutation(request);
}

// Delete a product image
export function useDeleteProductImage() {
    const request = useCallback(
        ({ productId, imageId }) =>
            deleteProductImage(productId, imageId),
        []
    );

    return useProductMutation(request);
}

// Set the default product image
export function useSetDefaultImage() {
    const request = useCallback(
        ({ productId, imageId }) =>
            setDefaultProductImage(productId, imageId),
        []
    );

    return useProductMutation(request);
}