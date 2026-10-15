import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProductForm from "../../components/admin/ProductForm";
import {
    useCategories,
    useDeleteProductImage,
    useProduct,
    useSaveProduct,
    useSetDefaultImage,
} from "../../hooks/useProducts";
import { getErrorMessage } from "../../lib/api";

export default function AdminProductFormPage() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    // Fetch categories
    const {
        data: categories = [],
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useCategories();

    // Fetch product only when editing
    const {
        data: product,
        isLoading: productLoading,
        error: productError,
    } = useProduct(id);

    // Product mutations
    const save = useSaveProduct();
    const removeImage = useDeleteProductImage();
    const makeDefault = useSetDefaultImage();

    // Loading state
    if (categoriesLoading || (isEdit && productLoading)) {
        return (
            <div
                role="status"
                className="p-6 text-neutral-500"
            >
                Loading…
            </div>
        );
    }

    // Category loading failed
    if (categoriesError) {
        return (
            <div className="p-6">
                <p role="alert" className="text-red-600">
                    Failed to load categories:{" "}
                    {getErrorMessage(categoriesError)}
                </p>

                <Link
                    to="/admin/products"
                    className="mt-3 inline-block text-sm underline"
                >
                    Back to products
                </Link>
            </div>
        );
    }

    // Product loading failed
    if (isEdit && productError) {
        return (
            <div className="p-6">
                <p role="alert" className="text-red-600">
                    {getErrorMessage(productError) ||
                        "Failed to load product."}
                </p>

                <Link
                    to="/admin/products"
                    className="mt-3 inline-block text-sm underline"
                >
                    Back to products
                </Link>
            </div>
        );
    }

    // Save product
    const handleSubmit = (values) => {
        save.mutate(
            { id, values },
            {
                onSuccess: () => navigate("/admin/products"),
            }
        );
    };

    const imageActionError = removeImage.error ?? makeDefault.error;

    return (
        <div className="mx-auto max-w-5xl">
            <Link
                to="/admin/products"
                className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900"
            >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to products
            </Link>

            <h1 className="mb-6 text-2xl font-bold text-heading">
                {isEdit ? "Edit product" : "Add product"}
            </h1>

            {imageActionError && (
                <p
                    role="alert"
                    className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
                >
                    {getErrorMessage(imageActionError)}
                </p>
            )}

            <ProductForm
                key={product?.id ?? "new"}
                product={product}
                categories={categories}
                submitting={save.isPending}
                error={save.error}
                imageBusy={
                    removeImage.isPending || makeDefault.isPending
                }
                onSubmit={handleSubmit}
                onRemoveImage={(imageId) =>
                    removeImage.mutate({
                        productId: product.id,
                        imageId,
                    })
                }
                onSetDefaultImage={(imageId) =>
                    makeDefault.mutate({
                        productId: product.id,
                        imageId,
                    })
                }
            />
        </div>
    );
}
