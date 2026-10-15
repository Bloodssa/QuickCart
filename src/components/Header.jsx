import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { UserRound, ShoppingCart, Search, Menu, X, CircleUserRound } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

const Header = ({ subhead }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isOpenProfile, setProfileOpen] = useState(false);
    const { user, status, logout } = useAuth();
    const isLoading = status === "loading";
    const isLoggedIn = status === "authenticated" && Boolean(user);
    const navigate = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname + location.search;

    const isLinkActive = (path) => currentUrl === path;

    const handleLogout = async () => {
        setProfileOpen(false);
        setMenuOpen(false);

        try {
            await logout();
            navigate("/", { replace: true });
        } catch (err) {
            console.error("Log out failed", err);
        }
    }

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Deals", path: "/products?featured=true" },
        { name: "New Arrivals", path: "/products?sort=newest" },
        { name: "Best Sellers", path: "/products?sort=popular" },
    ];

    return (
        <>
            <header className="relative z-50 w-full border-b border-gray-300 bg-white">
                <div className="container mx-auto flex items-center justify-between px-4 py-2 md:px-8 md:py-4">
                    <div className="flex-4 flex gap-10 items-center">
                        <Link to="/" className="font-sans font-extrabold text-lg md:text-2xl text-neutral-900 shrink-0"><span className="text-accent-300">Quick</span>Cart</Link>

                        {/* Desktop Input serach */}
                        <div className="hidden md:flex relative items-center w-full">
                            <Search className="absolute left-3 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search products, brands and more......"
                                className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900"
                            />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-1 shrink-0">
                        {status === "anonymous" && (
                            <Link to="/login" className="flex gap-2 px-4 py-2 items-center justify-between rounded-md border border-gray-300 hover:bg-accent-100 hover:text-white transition-colors duration-250 group">
                                <UserRound className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                                <span className="font-semibold text-sm">Log In</span>
                            </Link>
                        )}
                        <Link to="/cart" className="relative px-3 py-2 rounded-md hover:bg-accent-100 hover:text-white transition-colors duration-250 group flex items-center justify-center" aria-label="View Shopping Cart">
                            <ShoppingCart className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                        </Link>

                        {isLoggedIn && (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen(!isOpenProfile)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-white font-bold uppercase hover:bg-accent-hover transition-colors"
                                    aria-label="Open profile menu"
                                    aria-expanded={isOpenProfile}
                                >
                                    {user.fullName?.[0] ?? "U"}
                                </button>
                                {isOpenProfile && (
                                    <div className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-lg border border-gray-200 bg-white">
                                        <div className="border-b border-gray-200 px-4 py-4">
                                            <p className="truncate font-semibold text-neutral-900">
                                                {user.fullName}
                                            </p>
                                        </div>

                                        <div className="p-2">
                                            <Link
                                                to="/me"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-gray-100"
                                            >
                                                <CircleUserRound className="h-5 w-5" />
                                                My Profile
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="h-5 w-5" />
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
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

                        {subhead && (
                            <nav className="flex flex-col space-y-2 pt-2 border-t border-gray-300 font-medium text-neutral-900">
                                {navLinks.map(link => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        end
                                        className={
                                            isLinkActive(link.path)
                                                ? "py-1 font-bold text-accent-300 border-b-2 border-accent-300 -mb-px transition-colors"
                                                : "py-1 text-neutral-700 hover:text-accent-300 transition-colors"
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </nav>
                        )}

                        {!isLoading && (
                            <Link to={isLoggedIn ? "/me" : "/login"} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-gray-300 font-semibold text-sm hover:bg-accent-100 hover:text-white transition-colors">
                                <UserRound className="w-5 h-5" />
                                <span>{isLoggedIn ? "Profile" : "Log In"}</span>
                            </Link>
                        )}
                        {isLoggedIn && (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center gap-2 rounded-md border border-red-200 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                            >
                                <LogOut className="h-5 w-5" />
                                Log Out
                            </button>
                        )}
                    </div>
                )}
            </header>

            {/* Desktop sub nav */}
            {subhead && (
                <nav className="hidden md:block border-b border-gray-300">
                    <div className="container mx-auto flex items-center justify-center px-4 py-2 md:px-8 md:py-2 gap-10 font-normal">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end
                                className={
                                    isLinkActive(link.path)
                                        ? "py-1 font-bold text-accent-300 border-b-2 border-accent-300 -mb-px transition-colors"
                                        : "py-1 text-neutral-700 hover:text-accent-300 transition-colors"
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            )}
        </>
    );
}

export default Header;