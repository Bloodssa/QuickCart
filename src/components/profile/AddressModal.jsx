import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage, extractFieldErrors } from "../../api/client";
import { useCreateAddress, useUpdateAddress } from "../../queries/addresses";
import FormField from "../form/FormField";

const initialValues = (address) => ({
    recipientName: address?.recipientName ?? "",
    contactNumber: address?.contactNumber ?? "",
    addressLine: address?.addressLine ?? "",
    barangay: address?.barangay ?? "",
    city: address?.city ?? "",
    province: address?.province ?? "",
    postalCode: address?.postalCode ?? "",
    isDefault: address?.isDefault ?? false,
});

// client-side checks
function validate(v) {
    const errors = {};

    if (!v.recipientName) errors.recipientName = "Recipient name is required.";
    if (!/^(09|\+639)\d{9}$/.test(v.contactNumber.replace(/[\s-]/g, ""))) {
        errors.contactNumber = "Enter a valid PH mobile number, e.g. 09123456789.";
    }
    if (!v.addressLine) errors.addressLine = "Street address is required.";
    if (!v.barangay) errors.barangay = "Barangay is required.";
    if (!v.city) errors.city = "City is required.";
    if (!v.province) errors.province = "Province is required.";
    if (!/^\d{4}$/.test(v.postalCode)) errors.postalCode = "Enter a 4-digit postal code.";

    return errors;
}

export default function AddressModal({ address, onClose }) {
    const dialogRef = useRef(null);
    const isEdit = Boolean(address);

    const [values, setValues] = useState(() => initialValues(address));
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");

    const createMutation = useCreateAddress();
    const updateMutation = useUpdateAddress();
    const saving = createMutation.isPending || updateMutation.isPending;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog.open) dialog.showModal();
        dialog.querySelector("input")?.focus();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined })); // clear the error fields while typing
    }

    function handleSubmit(e) {
        e.preventDefault();

        const payload = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
        );

        const found = validate(payload);
        setErrors(found);
        setFormError("");
        if (Object.keys(found).length > 0) return;

        const options = {
            onSuccess: () => {
                toast.success(isEdit ? "Address updated" : "Address added");
                onClose();
            },
            onError: (err) => {
                const fields = extractFieldErrors(err);

                if (Object.keys(fields).length > 0) setErrors(fields); // show errors under each field
                else setFormError(getErrorMessage(err)); // one message at the top if unknown error
            }
        };

        if (isEdit) updateMutation.mutate({ id: address.id, payload }, options);
        else createMutation.mutate(payload, options);
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose(); // click on the dark backdrop
            }}
            aria-labelledby="address-modal-title"
            className="m-auto w-[calc(100%-1rem)] max-w-2xl rounded-md border border-gray-300 bg-white p-0 text-neutral-900 backdrop:bg-black/40"
        >
            <div className="flex items-center justify-between border-b border-gray-300 px-5 py-4">
                <h2 id="address-modal-title" className="text-lg font-bold text-neutral-900">
                    {isEdit ? "Edit address" : "Add new address"}
                </h2>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="rounded-md p-1 text-neutral-500 hover:bg-gray-100 hover:text-neutral-900"
                >
                    <X size={20} aria-hidden="true" />
                </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="max-h-[65vh] space-y-4 overflow-y-auto px-5 md:px-12 py-5">
                    {formError && (
                        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                            {formError}
                        </p>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label="Recipient name"
                            id="recipientName"
                            value={values.recipientName}
                            onChange={handleChange}
                            error={errors.recipientName}
                            autoComplete="name"
                            aria-invalid={Boolean(errors.recipientName)}
                            placeholder="Juan Dela Cruz"
                        />
                        <FormField
                            label="Contact number"
                            id="contactNumber"
                            value={values.contactNumber}
                            onChange={handleChange}
                            error={errors.contactNumber}
                            inputMode="tel"
                            placeholder="09123456789"
                            autoComplete="tel"
                            aria-invalid={Boolean(errors.contactNumber)}
                        />
                    </div>

                    <FormField
                        label="Street address"
                        id="addressLine"
                        value={values.addressLine}
                        onChange={handleChange}
                        error={errors.addressLine}
                        placeholder="House no., street, building"
                        autoComplete="address-line1"
                        aria-invalid={Boolean(errors.addressLine)}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label="Barangay"
                            id="barangay"
                            value={values.barangay}
                            onChange={handleChange}
                            error={errors.barangay}
                            aria-invalid={Boolean(errors.barangay)}
                            placeholder="Barangay 1234 Street"
                        />
                        <FormField
                            label="City / Municipality"
                            id="city"
                            value={values.city}
                            onChange={handleChange}
                            error={errors.city}
                            autoComplete="address-level2"
                            aria-invalid={Boolean(errors.city)}
                            placeholder="Cebu City"
                        />
                        <FormField
                            label="Province"
                            id="province"
                            value={values.province}
                            onChange={handleChange}
                            error={errors.province}
                            autoComplete="address-level1"
                            aria-invalid={Boolean(errors.province)}
                            placeholder="Cebu"
                        />
                        <FormField
                            label="Postal code"
                            id="postalCode"
                            value={values.postalCode}
                            onChange={handleChange}
                            error={errors.postalCode}
                            inputMode="numeric"
                            maxLength={4}
                            autoComplete="postal-code"
                            aria-invalid={Boolean(errors.postalCode)}
                            placeholder="6000"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-neutral-900">
                        <input
                            type="checkbox"
                            checked={values.isDefault}
                            onChange={(e) => setValues((current) => ({ ...current, isDefault: e.target.checked }))}
                            className="size-4 accent-accent-100"
                        />
                        Set as default address
                    </label>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-300 px-5 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-11 rounded-md border border-gray-300 bg-white px-5 text-sm font-semibold text-neutral-900 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="h-11 rounded-md bg-accent-100 px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "Saving…" : "Save address"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}