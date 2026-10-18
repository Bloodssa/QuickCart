import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import bestSellerImage from "../../assets/images/hero/best-seller.jpg";
import newArrivalImage from "../../assets/images/hero/new-arrival.jpg";

export default function CollectionTiles() {
    return (
        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* New arrivals */}
            <div className="relative isolate flex min-h-48 items-center overflow-hidden rounded-md bg-neutral-900">
                <img src={newArrivalImage} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-center" />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-neutral-900/90 via-neutral-900/60 to-transparent" />

                <div className="max-w-[65%] p-5 sm:p-6">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">New Arrivals</h2>
                    <p className="mt-1 text-sm text-neutral-200">Fresh styles. Updated weekly.</p>
                    <Link
                        to="/products?sort=newest"
                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
                    >
                        Explore
                        <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                </div>
            </div>

            {/* Best sellers */}
            <div className="relative isolate flex min-h-48 items-center overflow-hidden rounded-md bg-orange-50">
                <img src={bestSellerImage} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-center" />

                <div className="max-w-[65%] p-5 sm:p-6">
                    <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Best Sellers</h2>
                    <p className="mt-1 text-sm text-neutral-700">Our customers' favorites.</p>
                    <Link
                        to="/products?sort=popular"
                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-orange-100"
                    >
                        View All
                        <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}