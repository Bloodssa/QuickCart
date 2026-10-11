import { NavLink, Outlet } from "react-router-dom";

const links = [{ to: "/admin", label: "Dashboard", end: true }]

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="w-56 border-r bg-gray-50 p-4">
                <p className="mb-4 text-lg font-bold">QuickCart Admin</p>
                <nav className="flex flex-col gap-1 text-sm">
                    {links.map(({ to, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={(isActive) => `rounded px-3 py-2 ${isActive ? "bg-black text-white" : "hover:bg-gray-200"}`}
                        >
                            {label}
                        </NavLink>
                    ))}
                    <NavLink to="/" className="mt-4 px-3 py-2 text-neutral-500 hover:underline">
                        Back to store
                    </NavLink>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;