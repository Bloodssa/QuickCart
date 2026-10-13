import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function FormField({ label, id, hint, type = "text", ...inputProps }) {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";

    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-heading">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={isPassword && visible ? "text" : type}
                    className={`h-11 w-full rounded-md border border-gray-300 bg-white px-4 text-sm text-heading placeholder:text-neutral-400 focus:border-accent-100 focus:ring-4 focus:ring-accent-100/20 focus:outline-none ${isPassword ? "pr-11" : ""}`}
                    {...inputProps}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 px-3.5 text-neutral-400 hover:text-neutral-700"
                    >
                        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
        </div>
    );
}