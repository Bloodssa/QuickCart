import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import heroImage1 from "../../assets/images/hero/hero-image.png"
import heroImage2 from "../../assets/images/hero/hero-image-2.jpg"
import heroImage3 from "../../assets/images/hero/hero-image-3.jpg"

const imageSlides = [heroImage1, heroImage2, heroImage3];
const SLIDE_INTERVAL_MS = 5000;

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageSlides.length);
        }, SLIDE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const prevSlide = () =>  setCurrentIndex((prev) => (prev === 0 ? imageSlides.length - 1 : prev - 1));

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % imageSlides.length);

    return (
        <div className="relative h-120 w-full rounded-md overflow-hidden group">
            <div
                className="flex h-full w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {imageSlides.map((slide, index) => (
                    <div
                        key={index}
                        style={{ backgroundImage: `url(${slide})` }}
                        className="bg-cover bg-center h-full w-full shrink-0 relative"
                    >
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-y-0 left-6 sm:left-10 md:left-14 flex flex-col justify-center max-w-md sm:max-w-lg md:max-w-xl z-10 pr-4">
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans text-neutral-900">
                        Discover Amazing <br /> Products for a Better You
                    </p>
                    <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-xl text-neutral-700">
                        Premium quality, great prices, and fast delivery. <br className="hidden sm:inline" />
                        Shop the things you love, all in one place.
                    </p>

                    <Link to="/products" className="flex gap-2 w-fit mt-4 sm:mt-6 px-5 py-2.5 sm:px-6 sm:py-3 text-white bg-accent-100 font-semibold rounded-md transition-colors duration-200 hover:bg-accent-hover text-sm sm:text-base">
                        <span>Shop Now</span>
                        <MoveRight />
                    </Link>
                </div>
            </div>
            <div className="flex gap-3 items-center justify-center absolute right-0 bottom-0 h-15 w-auto p-2 z-10000">
                {/* Dots */}
                <div className="flex gap-2">
                    {imageSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? "bg-accent-100 w-6" : "bg-white/60 hover:bg-white"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex gap-1.5">
                    <button
                        className="bg-white/70 hover:bg-white text-neutral-400 hover:text-neutral-900 p-2 rounded-lg transition-all duration-200"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        className="bg-white/70 hover:bg-white text-neutral-400 hover:text-neutral-900 p-2 rounded-lg transition-all duration-200"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeroSlider;