import { formatPrice } from "../../lib/format";

export default function CartSummary({ subTotal, selectedQuantity, disabled, warning, onCheckout }) {
    return (
        <aside className="h-fit rounded-md border border-gray-300 bg-white p-5 lg:sticky lg:top-6">
            <h2 className="font-bold text-neutral-900">Order Summary</h2>

            <dl className="mt-4 space-y-2 text-sm">
                <div className="mt-4 space-y-2 text-sm flex justify-between">
                    <dt className="text-neutral-500">Items selected</dt>
                    <dd className="font-medium">{selectedQuantity}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-base">
                    <dt className="font-semibold">Subtotal</dt>
                    <dd className="font-bold text-heading">{formatPrice(subTotal)}</dd>
                </div>
            </dl>

            {/* TODO: Order endpoint in backend */}
            <button
                type="button"
                disabled={disabled}
                onClick={onCheckout}
                className="mt-5 h-11 w-full rounded-md bg-accent-100 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
                Checkout Now
            </button>

            {warning && <p className="mt-2 text-center text-xs text-amber-600">{warning}</p>}
        </aside>
    );
}