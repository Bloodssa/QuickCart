import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MainLayout = () => {
    const { status, user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b bg-white">
                <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
                    <Link to="/" className="text-lg font-bold">
                        QuickCart
                    </Link>

                    <div className="ml-auto flex items-center gap-4 text-sm">
                        <Link to="/cart">Cart</Link>
                        {status === "authenticated" ? (
                            <>
                                {isAdmin && <Link to="/admin">Admin</Link>}
                                <span className="text-gray-500">{user.fullName}</span>
                                <button onClick={handleLogout} className="rounded border px-3 py-1 hover:bg-gray-100">
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Log in</Link>
                                <Link to="/register" className="rounded bg-black px-3 py-1 text-white">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;