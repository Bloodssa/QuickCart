import { useState } from "react";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-100";

export default function ProdutGallery({ images = [], name }) {
    const [selectedImageId, setSelectedImageId] = useState(null);

    const defaultImage = images.find(img => img.isDefault) ?? images[0];
    const activeImage = images.find(img => img.id === selectedImageId) ?? defaultImage;

    return (
        <div className="w-full min-w-0">
            <div className="flex h-72 items-center justify-center overflow-hidden rounded-md border border-gray-300 not-odd:md:h-80 lg:h-96">
                {activeImage ? (
                    <img src={activeImage.imageUrl} alt={name} className="h-full w-full object-contain p-4" />
                ) : (
                    <p className="text-sm text-neutral-500">No image available</p>
                )}
            </div>

            {images.length > 1 && (
                <ul className="mt-3 flex flex-wrap gap-3">
                    {images.map((image, index) => {
                        const selected = image.id === activeImage?.id;

                        return (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedImageId(image.id)}
                                    className={`flex size-16 items-center justify-center overflow-hidden rounded-md border bg-gray-50 sm:size-20 ${focusRing} ${
                                        selected ? "border-accent-100" : "border-gray-300 hover:border-accent-200"
                                    }`}
                                >
                                    <img 
                                        loading="lazy" 
                                        className="h-full w-full object-contain p-1.5"
                                        src={image.imageUrl}
                                        alt={name}
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}