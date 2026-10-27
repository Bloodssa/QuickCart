// MOCK
const TONES = {
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-700",
    gray: "bg-gray-100 text-neutral-600",
    accent: "bg-accent-50 text-accent-100",
};

export default function Pill({ tone = "gray", children }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}>
            {children}
        </span>
    );
}