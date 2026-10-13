import { Link } from "react-router-dom";

export default function AuthForm({ 
    title, 
    subtitle, 
    footer, 
    children 
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center mb-2">
                    <Link to="/" className="font-sans font-extrabold text-lg md:text-3xl text-neutral-900 shrink-0"><span className="text-accent-300">Quick</span>Cart</Link>
                </div>

                <h1 className="text-center text-3xl font-bold text-heading">{title}</h1>
                {subtitle && <p className="mt-2 text-center text-neutral-500">{subtitle}</p>}

                <div className="mt-6">{children}</div>

                {footer && <p className="mt-6 text-center text-sm text-neutral-500">{footer}</p>}
            </div>
        </main>
    );
}