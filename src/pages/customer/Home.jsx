import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { navigate } = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            navigate("/", { replace: true });
        }
    };

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">
                Welcome to QuickCart!
            </h1>
            <p>Browse products and start shopping.</p>

            <p className="mt-10">{user.fullName}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>

            <button
                type="button"
                onClick={handleLogout}
                className="mt-6 rounded border border-gray-300 px-4 py-2 text-neutral-900 font-semibold transition-colors hover:bg-gray-100"
            >
                Log out
            </button>
        </main>
    );
};

export default Home;
