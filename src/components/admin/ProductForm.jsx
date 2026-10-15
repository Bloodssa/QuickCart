import { useState } from "react";
import { Link } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 4 * 1024 * 1024;   // same per-file limit as the API
const MAX_IMAGES = 8;                // UX limit; the API doesn't enforce a count

const inputClass = "h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-heading placeholder:text-neutral-400 focus:border-accent-100 focus:ring-2 focus:ring-accent-100/20 focus:outline-none";

function Field({ label, hint, children }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-heading">{label}</span>
            {children}
            {hint && <span className="mt-1 block text-xs text-neutral-500">{hint}</span>}
        </label>
    );
}

function validatePicked(files, alreadyCount) {
    if (alreadyCount + files.length > MAX_IMAGES) return `A product can have at most ${MAX_IMAGES} images.`;

    const bad = files.find((file) => !IMAGE_TYPES.includes(file.type) || file.size > MAX_BYTES);
    return bad ? `${bad.name}: use a JPG, PNG or WebP image under 4 MB.` : null;
}

export default function ProductForm({
    product,
    categories,
    submitting,
    error,
    imageBusy = false,
    onSubmit,
    onRemoveImage,
    onSetDefaultImage,
}) {
    const isEdit = Boolean(product);
    const existingImages = product?.images ?? [];

    const [newImages, setNewImages] = useState([]);   // [{ id, file, url }]
    const [imageError, setImageError] = useState(null);

    function handlePick(event) {
        const picked = Array.from(event.target.files);
        event.target.value = "";   // lets the same file be picked again later

        const problem = validatePicked(picked, existingImages.length + newImages.length);
        setImageError(problem);
        if (problem) return;

        setNewImages((current) => [
            ...current,
            ...picked.map((file) => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) })),
        ]);
    }

    function handleRemoveNew(id) {
        const target = newImages.find((image) => image.id === id);
        if (target) URL.revokeObjectURL(target.url);   // free the preview's memory
        setNewImages((current) => current.filter((image) => image.id !== id));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!isEdit && newImages.length === 0) {
            setImageError("Add at least one product image.");
            return;
        }

        const form = new FormData(event.currentTarget);   // the file input has no name, so it's not in here
        onSubmit({
            name: form.get("name").trim(),
            description: form.get("description").trim(),
            price: form.get("price"),
            stockQuantity: form.get("stockQuantity"),
            categoryId: form.get("categoryId"),
            isFeatured: form.get("isFeatured") === "on",
            images: newImages.map((image) => image.file),
        });
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
            {/* details */}
            <section className="space-y-5 rounded-md border border-gray-300 bg-white p-5 lg:col-span-2">
                <h2 className="font-bold text-heading">Product details</h2>

                <Field label="Name">
                    <input name="name" defaultValue={product?.name} maxLength={150} required className={inputClass} />
                </Field>

                <Field label="Description">
                    <textarea
                        name="description"
                        defaultValue={product?.description}
                        maxLength={1000}
                        rows={5}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-heading focus:border-accent-100 focus:ring-2 focus:ring-accent-100/20 focus:outline-none"
                    />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Price (PHP)">
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="999999.99"
                            defaultValue={product?.price}
                            required
                            className={inputClass}
                        />
                    </Field>
                    <Field label="Stock quantity">
                        <input
                            name="stockQuantity"
                            type="number"
                            step="1"
                            min="0"
                            defaultValue={product?.stockQuantity ?? 0}
                            required
                            className={inputClass}
                        />
                    </Field>
                </div>

                <Field label="Category">
                    <select name="categoryId" defaultValue={product?.categoryId ?? ""} required className={inputClass}>
                        <option value="" disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </Field>

                <label className="flex items-center gap-2 text-sm font-medium text-heading">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        defaultChecked={product?.isFeatured ?? false}
                        className="size-4 accent-accent-100"
                    />
                    Show in "Featured Products" on the homepage
                </label>
            </section>

            {/* images */}
            <section className="space-y-4 rounded-md border border-gray-300 bg-white p-5">
                <h2 className="font-bold text-heading">Images</h2>

                {existingImages.length > 0 && (
                    <ul className="grid grid-cols-2 gap-3">
                        {existingImages.map((image) => (
                            <li key={image.id} className="relative rounded-md border border-gray-200 p-1.5">
                                <img src={image.imageUrl} alt="" className="aspect-square w-full rounded bg-gray-50 object-contain" />
                                <button
                                    type="button"
                                    onClick={() => onRemoveImage(image.id)}
                                    disabled={imageBusy}
                                    aria-label="Remove image"
                                    className="absolute top-2 right-2 rounded-full bg-white/90 p-1 text-red-600 shadow-sm hover:bg-red-50 disabled:opacity-50"
                                >
                                    <X size={14} />
                                </button>
                                {image.isDefault ? (
                                    <p className="mt-1.5 text-center text-xs font-semibold text-accent-100">Default image</p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => onSetDefaultImage(image.id)}
                                        disabled={imageBusy}
                                        className="mt-1.5 w-full text-center text-xs text-neutral-600 underline hover:text-heading disabled:opacity-50"
                                    >
                                        Make default
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {newImages.length > 0 && (
                    <div>
                        <p className="mb-2 text-xs font-medium text-neutral-500">To upload when you save</p>
                        <ul className="grid grid-cols-3 gap-2">
                            {newImages.map((image) => (
                                <li key={image.id} className="relative">
                                    <img src={image.url} alt="" className="aspect-square w-full rounded-md border border-gray-200 bg-gray-50 object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNew(image.id)}
                                        aria-label="Remove selected image"
                                        className="absolute top-1 right-1 rounded-full bg-white/90 p-0.5 text-red-600 shadow-sm hover:bg-red-50"
                                    >
                                        <X size={14} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-neutral-600 hover:border-accent-100 hover:bg-accent-100/5">
                    <ImagePlus size={24} aria-hidden="true" className="text-neutral-400" />
                    <span>{isEdit ? "Add more images" : "Choose images"}</span>
                    <span className="text-xs text-neutral-400">JPG, PNG or WebP, up to 4 MB each</span>
                    <input type="file" multiple accept={IMAGE_TYPES.join(",")} onChange={handlePick} className="sr-only" />
                </label>

                {imageError && <p role="alert" className="text-sm text-red-600">{imageError}</p>}
            </section>

            {/* actions */}
            <div className="flex flex-wrap items-center gap-3 lg:col-span-3">
                {error && <p role="alert" className="w-full rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

                <button
                    disabled={submitting}
                    className="h-11 rounded-md bg-accent-100 px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                    {submitting ? "Saving…" : isEdit ? "Save changes" : "Create product"}
                </button>
                <Link to="/admin/products" className="h-11 rounded-md border border-gray-300 px-6 text-sm font-semibold leading-11 hover:bg-gray-50">
                    Cancel
                </Link>
            </div>
        </form>
    );
}