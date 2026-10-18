import { Headphones, ShieldCheck, Tag, Truck } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Quick & reliable shipping right to your door"
    },
    {
        icon: Headphones,
        title: "24/7 Customer Support",
        description: "Dedicated assistance whenever you need it"
    },
    {
        icon: Tag,
        title: "Great Deals",
        description: "Unbeatable discounts on top products"
    },
    {
        icon: ShieldCheck,
        title: "Quality Products",
        description: "100% genuine and high-standard items"
    }
];

const FeatureBar = () => {
    return (
        <div className="w-full border border-gray-300 rounded-md mt-10 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-300">
            {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-6"
                    >
                        <div className="p-3 rounded-lg bg-accent-50 text-accent-100 shrink-0">
                            <Icon className="w-7 h-7 text-accent-100" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">
                                {feature.title}
                            </h4>
                            <p className="text-xs sm:text-xs text-neutral-500 mt-1">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default FeatureBar;