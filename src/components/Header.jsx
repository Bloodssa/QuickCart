import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserRound, ShoppingCart, Search, Menu, X } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Categories", path: "/categories" },
        { name: "Deals", path: "/deals" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Best Sellers", path: "/best-sellers" },
    ];

    return (
        <>
            <header className="relative z-50 w-full border-b border-gray-300 bg-white">
                <div className="container mx-auto flex items-center justify-between px-4 py-2 md:px-8 md:py-4">
                    <div className="flex-4 flex gap-10 items-center">
                        <Link to="/" className="font-sans font-extrabold text-lg md:text-2xl text-neutral-900 shrink-0"><span className="text-accent-300">Quick</span>Cart</Link>

                        {/* Desktop Input serach */}
                        <div className="hidden md:flex relative items-center w-full max-w-xl">
                            <Search className="absolute left-3 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search products, brands and more......"
                                className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900"
                            />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        <Link to="/login" className="flex gap-2 px-4 py-2 items-center justify-between rounded-md border border-gray-300 hover:bg-accent-100 hover:text-white transition-colors duration-250 group">
                            <UserRound className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                            <span className="font-semibold text-sm">Log In</span>
                        </Link>
                        <Link to="/cart" className="relative px-3 py-2 rounded-md hover:bg-accent-100 hover:text-white transition-colors duration-250 group flex items-center justify-center" aria-label="View Shopping Cart">
                            <ShoppingCart className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                        </Link>
                    </div>

                    {/* Mobile menu */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link to="/cart">
                            <ShoppingCart className="w-5 h-5" />
                        </Link>
                        <button
                            onClick={() => setMenuOpen(!isMenuOpen)}
                            className="p-2 text-black rounded-md hover:bg-gray-100 focus:outline-none"
                            aria-label="Toggle Navigation"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="absolute left-0 top-full z-50 w-full md:hidden border-b border-gray-300 px-4 pt-3 pb-5 space-y-4 bg-white">
                        {/* Mobile search */}
                        <div className="relative flex items-center w-full">
                            <Search className="absolute left-3 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900"
                            />
                        </div>

                        <nav className="flex flex-col space-y-2 pt-2 border-t border-gray-300 font-medium text-neutral-800">
                            <a href="/" className="py-1.5 hover:text-accent-300">Home</a>
                            <a href="/categories" className="py-1.5 hover:text-accent-300">Categories</a>
                            <a href="/deals" className="py-1.5 hover:text-accent-300">Deals</a>
                            <a href="/new-arrivals" className="py-1.5 hover:text-accent-300">New Arrivals</a>
                            <a href="/best-sellers" className="py-1.5 hover:text-accent-300">Best Sellers</a>
                        </nav>

                        <Link to="/login" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-gray-300 font-semibold text-sm hover:bg-accent-100 hover:text-white transition-colors">
                            <UserRound className="w-5 h-5" />
                            <span>Log In</span>
                        </Link>
                    </div>
                )}
            </header>

            {/* Desktop sub nav */}
            <nav className="hidden md:block border-b border-gray-300">
                <div className="container mx-auto flex px-4 py-2 md:px-8 md:py-2 gap-10 font-normal">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive ? "py-1 font-bold text-accent-300 border-b-2 border-accent-300 -mb-px transition-colors"
                                    : "py-1 text-neutral-700 hover:text-accent-300 transition-colors"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
}

export default Header;