import { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "../../api/client";
import { useAddresses, useDeleteAddress, useSetDefaultAddress } from "../../queries/addresses";
import Skeleton from "../ui/Skeleton";
import AddressModal from "./AddressModal";
import ConfirmDeleteModal from "../ConfirmModal";

export default function AddressSection({ label }) {
    const { data: addresses = [], isPending, error, refetch } = useAddresses();
    const deleteMutation = useDeleteAddress();
    const defaultMutation = useSetDefaultAddress();

    const [isModalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const busy = deleteMutation.isPending || defaultMutation.isPending;

    function openCreate() {
        setSelected(null);
        setModalOpen(true);
    }

    function openEdit(address) {
        setSelected(address);
        setModalOpen(true);
    }

    function handleDelete(address) {
        deleteMutation.mutate(address.id, {
            onSuccess: () => {
                toast.success("Address deleted");
                setDeleteTarget(null);
            },
            onError: (err) => toast.error(getErrorMessage(err))
        });
    }

    function handleSetDefault(address) {
        defaultMutation.mutate(address.id, {
            onSuccess: () => toast.success("Default address updated"),
            onError: (err) => toast.error(getErrorMessage(err)),
        });
    }

    return (
        <div className="p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-neutral-900">{label}</h2>

                <button
                    type="button"
                    onClick={openCreate}
                    className="flex h-10 items-center gap-2 rounded-md bg-accent-100 px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                    <Plus size={16} aria-hidden="true" />
                    Add address
                </button>
            </div>

            {/* loading */}
            {isPending && (
                <div role="status" className="mt-5 grid gap-4 md:grid-cols-2">
                    <span className="sr-only">Loading your addresses…</span>
                    <Skeleton className="h-36" />
                    <Skeleton className="h-36" />
                </div>
            )}

            {/* error */}
            {error && (
                <div role="alert" className="mt-5 rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {getErrorMessage(error)}{" "}
                    <button type="button" onClick={() => refetch()} className="font-semibold underline">
                        Try again
                    </button>
                </div>
            )}

            {/* empty */}
            {!isPending && !error && addresses.length === 0 && (
                <div className="mt-5 flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 py-14 text-center">
                    <MapPin size={32} aria-hidden="true" className="text-neutral-500" />
                    <p className="font-semibold text-neutral-900">No saved addresses</p>
                    <p className="text-sm text-neutral-500">Add one to speed up checkout.</p>
                </div>
            )}

            {/* list */}
            {addresses.length > 0 && (
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                        <li key={address.id} className="flex flex-col rounded-md border border-gray-300 bg-white p-4">
                            <div className="flex items-start justify-between gap-3">
                                <p className="font-semibold text-neutral-900">{address.recipientName}</p>
                                {address.isDefault && (
                                    <span className="shrink-0 rounded-md bg-accent-50 px-2 py-0.5 text-xs font-semibold text-accent-100">
                                        Default
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-sm text-neutral-500">{address.contactNumber}</p>
                            <p className="mt-1 text-sm text-neutral-500">
                                {address.addressLine}, {address.barangay}, {address.city}, {address.province} {address.postalCode}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-3 text-sm">
                                <button
                                    type="button"
                                    onClick={() => openEdit(address)}
                                    className="rounded-md px-2 py-1 font-semibold text-neutral-900 hover:bg-gray-100"
                                >
                                    Edit
                                </button>
                                {!address.isDefault && (
                                    <button
                                        type="button"
                                        disabled={busy}
                                        onClick={() => handleSetDefault(address)}
                                        className="rounded-md px-2 py-1 font-semibold text-accent-100 hover:bg-accent-50 disabled:opacity-50"
                                    >
                                        Set as default
                                    </button>
                                )}
                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={() => setDeleteTarget(address)}
                                    className="rounded-md px-2 py-1 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* modal for create or edit */}
            {isModalOpen && (
                <AddressModal
                    key={selected?.id ?? "new"}
                    address={selected}
                    onClose={() => setModalOpen(false)}
                />
            )}
            {/* delete modal */}
            {deleteTarget && (
                <ConfirmDeleteModal
                    title="Delete address?"
                    message={`"${deleteTarget.recipientName}" will be permanently removed from your saved addresses.`}
                    loading={deleteMutation.isPending}
                    onConfirm={() => handleDelete(deleteTarget)}
                    onClose={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}