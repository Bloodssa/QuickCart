import { formatPrice } from "../../lib/format";

export default function CartSummary({ totalItems, subTotal }) {
    return (
        <aside className="h-fit rounded-md border border-gray-300 bg-white p-5 lg:sticky lg:top-6">
            <h2 className="font-bold text-neutral-900">Order Summary</h2>

            <dl className="mt-4 space-y-2 text-sm">
                <div className="mt-4 space-y-2 text-sm">
                    <dt className="text-neutral-500">Items</dt>
                    <dd className="font-meduim">{ totalItems }</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-base">
                    <dt className="font-semibold">Subtotal</dt>
                    <dd className="font-bold text-heading">{formatPrice(subTotal)}</dd>
                </div>
            </dl>

            {/* TODO: Order endpoint in backend */}
             <button
                type="button"
                disabled
                className="mt-5 h-11 w-full rounded-md bg-accent-100 text-sm font-semibold text-white opacity-70"
            >
                Proceed to checkout
            </button>
        </aside>
    );
}