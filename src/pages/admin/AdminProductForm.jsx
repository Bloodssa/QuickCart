import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductForm from "../../components/admin/ProductForm";
import { getErrorMessage } from "../../api/client";
import { useCategories } from "../../queries/categories";
import { useDeleteProductImage, useProduct, useSaveProduct, useSetDefaultImage } from "../../queries/products";

export default function AdminProductForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const { data: categories = [], isPending: categoriesPending } = useCategories();
    const { data: product, isPending: productPending, error: productError } = useProduct(id);
    const save = useSaveProduct();
    const removeImage = useDeleteProductImage();
    const makeDefault = useSetDefaultImage();

    // a disabled query create mode stays pending, so only wait for the product when editing
    if (categoriesPending || (isEdit && productPending)) {
        return <div role="status" className="p-6 text-neutral-500">Loading…</div>;
    }

    if (isEdit && productError) {
        return <p role="alert" className="p-6 text-red-600">{getErrorMessage(productError, "Product not found.")}</p>;
    }

    const handleSubmit = (values) =>
        save.mutate({ id, values }, { onSuccess: () => navigate("/admin/products") });

    const imageError = removeImage.error ?? makeDefault.error;

    return (
        <div className="mx-auto max-w-5xl">
            <Link to="/admin/products" className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to products
            </Link>
            <h1 className="mb-6 text-2xl font-bold text-heading">{isEdit ? "Edit product" : "Add product"}</h1>

            {imageError && (
                <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                    {getErrorMessage(imageError)}
                </p>
            )}

            <ProductForm
                key={product?.id ?? "new"}
                product={isEdit ? product : undefined}
                categories={categories}
                submitting={save.isPending}
                error={save.isError ? getErrorMessage(save.error) : null}
                imageBusy={removeImage.isPending || makeDefault.isPending}
                onSubmit={handleSubmit}
                onRemoveImage={(imageId) => removeImage.mutate({ productId: product.id, imageId })}
                onSetDefaultImage={(imageId) => makeDefault.mutate({ productId: product.id, imageId })}
            />
        </div>
    );
}