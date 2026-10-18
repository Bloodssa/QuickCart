import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import collectionImage from "../../assets/images/hero/collection.jpg";

export default function PromoBanner() {
    return (
        <div
            className="relative my-14 flex h-80 w-full items-center rounded-md bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${collectionImage})` }}
        >
            <div className="relative z-10 max-w-lg p-6 sm:p-10">
                <p className="text-base font-semibold md:text-2xl">New Collections</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Find Your Next Favorite</h2>
                <p className="mt-2 text-sm sm:text-base">Explore quality products at prices you'll love.</p>

                <div className="mt-5">
                    <Link
                        to="/products?sort=newest"
                        className="flex w-fit gap-3 rounded-md bg-white px-4 py-3 font-extrabold text-accent-100 hover:bg-white/80"
                    >
                        Shop Now
                        <MoveRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}