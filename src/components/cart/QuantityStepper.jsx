import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ value, max, disabled = false, onChange }) {
    const buttonClass = "grid h-full w-9 place-items-center hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";

    return (
        <div className="inline-flex h-9 items-center overflow-hidden rounded-md border border-gray-300">
            <button
                type="button"
                aria-label="Decrease quantity"
                disabled={disabled || value <= 1}
                onClick={() => onChange(value - 1)}
                className={buttonClass}
            >
                <Minus size={14} />
            </button>

            <span aria-live="polite" className="w-8 text-center text-sm font-semibold">
                {value}
            </span>
            <button
                type="button"
                aria-label="Increase quantity"
                disabled={disabled || value >= max}   // limit it based on stock max 99
                onClick={() => onChange(value + 1)}
                className={buttonClass}
            >
                <Plus size={14} />
            </button>
        </div>
    );
}