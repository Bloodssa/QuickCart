import { UserRound, MapPin, Truck, ClipboardList } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const sections = [
    { tab: "details", label: "Account Details", icon: UserRound },
    { tab: "address", label: "Address", icon: MapPin },
    { tab: "on-ship", label: "On Ship Orders", icon: Truck },
    { tab: "history", label: "Order History", icon: ClipboardList },
];

export default function ProfileSidebar({ activeTab, onChange }) {
    const { user } = useAuth();


    return (
        <aside>
            <div className="hidden items-center gap-3 border-b border-gray-300 pb-4 md:flex">
                <div className="bg-accent-100 rounded-full grid size-10 place-items-center text-white font-bold">{user?.fullName?.[0]?.toUpperCase() ?? "U"}</div>
                <p className="min-w-0 truncate text-sm font-semibold text-heading">{user?.fullName}</p>
            </div>

            <nav className="flex gap-2 overflow-x-auto md:mt-4 md:flex-col md:overflow-visible">
                {sections.map((item) => {
                    const Icon = item.icon;
                    const selected = item.tab === activeTab;

                    return (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => onChange(item.tab)}
                            className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-accent-100 ${selected
                                    ? "bg-accent-50 font-semibold text-accent-100"
                                    : "font-medium text-neutral-700 hover:bg-gray-100"
                                }`}
                        >
                            <Icon size={18} aria-hidden="true" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}