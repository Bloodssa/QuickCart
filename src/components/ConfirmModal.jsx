import { useEffect, useRef } from "react";
import { TriangleAlert, X } from "lucide-react";

export default function ConfirmDeleteModal({
    title = "Delete this item?",
    message = "This action cannot be undone.",
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    loading = false,
    onConfirm,
    onClose,
}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog.open) dialog.showModal();
    }, []);

    function handleClose() {
        if (!loading) onClose();
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onCancel={(e) => {
                if (loading) e.preventDefault();
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose(); // click on the dark backdrop
            }}
            className="m-auto w-[calc(100%-1rem)] max-w-md rounded-md border border-gray-300 bg-white p-0 text-neutral-900 backdrop:bg-black/40"
        >
            <div className="flex items-center justify-between border-b border-gray-300 px-5 py-4">
                <h2 id="confirm-delete-title" className="text-lg font-bold text-neutral-900">
                    {title}
                </h2>
                <button
                    type="button"
                    onClick={handleClose}
                    disabled={loading}
                    aria-label="Close"
                    className="rounded-md p-1 text-neutral-500 hover:bg-gray-100 hover:text-neutral-900 disabled:opacity-50"
                >
                    <X size={20} aria-hidden="true" />
                </button>
            </div>

            <div className="flex flex-col items-center px-5 pb-6 pt-6 text-center sm:px-8">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 sm:size-16">
                    <TriangleAlert className="size-7 sm:size-8" aria-hidden="true" />
                </span>

                <p id="confirm-delete-message" className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500 sm:text-base">
                    {message}
                </p>
            </div>

            <div className="flex justify-center gap-3 border-t border-gray-300 px-5 py-4">
                <button
                    type="button"
                    onClick={handleClose}
                    disabled={loading}
                    className="h-11 rounded-md border border-gray-300 bg-white px-5 text-sm font-semibold text-neutral-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {cancelLabel}
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className="h-11 rounded-md bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Deleting…" : confirmLabel}
                </button>
            </div>
        </dialog>
    );
}
