import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-300 text-neutral-900 font-sans">
            <div className="container mx-auto px-4 py-10 md:px-8 md:py-12">
                <div className="grid grid-cols-1 md:gridd-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-300">
                    <div className="lg:col-span-1 space-y-4">
                        <Link to="/" className="font-sans font-extrabold text-xl justify-center">
                            <span><span className="text-accent-300">Quick</span>Cart</span>
                        </Link>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Your one-stop shop for quality products at great prices.
                        </p>

                        {/* Social Media Link */}
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-neutral-700 hover:bg-accent-300 hover:text-white transition-colors" aria-label="Facebook">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-neutral-700 hover:bg-accent-300 hover:text-white transition-colors" aria-label="Instagram">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-neutral-700 hover:bg-accent-300 hover:text-white transition-colors" aria-label="Twitter">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-neutral-700 hover:bg-accent-300 hover:text-white transition-colors" aria-label="YouTube">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-neutral-900 text-sm">Shop</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/" className="hover:text-accent-300 transition-colors">Home</Link></li>
                            <li><Link to="/categories" className="hover:text-accent-300 transition-colors">Categories</Link></li>
                            <li><Link to="/deals" className="hover:text-accent-300 transition-colors">Deals</Link></li>
                            <li><Link to="/new-arrivals" className="hover:text-accent-300 transition-colors">New Arrivals</Link></li>
                            <li><Link to="/best-sellers" className="hover:text-accent-300 transition-colors">Best Sellers</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-neutral-900 text-sm">Customer Service</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/contact" className="hover:text-accent-300 transition-colors">Contact Us</Link></li>
                            <li><Link to="/shipping" className="hover:text-accent-300 transition-colors">Shipping Info</Link></li>
                            <li><Link to="/returns" className="hover:text-accent-300 transition-colors">Returns</Link></li>
                            <li><Link to="/faq" className="hover:text-accent-300 transition-colors">FAQ</Link></li>
                            <li><Link to="/help" className="hover:text-accent-300 transition-colors">Help Center</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-neutral-900 text-sm">Company</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/about" className="hover:text-accent-300 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-accent-300 transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-accent-300 transition-colors">Blog</Link></li>
                            <li><Link to="/press" className="hover:text-accent-300 transition-colors">Press</Link></li>
                            <li><Link to="/partner" className="hover:text-accent-300 transition-colors">Partner</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-neutral-900 text-sm">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-accent-300 shrink-0 mt-0.5" />
                                <span>6000 Commerce St., Cebu, PH</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-accent-300 shrink-0" />
                                <span>+63 912 345 6789</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-accent-300 shrink-0" />
                                <span>shop@quickcart.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                    <div>
                        © {new Date().getFullYear()} QuickCart. All rights reserved.
                    </div>
                    <div>
                        <Link to="/" className="font-sans font-bold text-neutral-900">
                            <span><span className="text-accent-300">Quick</span>Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;