import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/SideBar";
import AdminHeader from "../components/admin/AdminHeader";

const LG_BREAKPOINT = 1024; // matches Tailwind's lg

const AdminLayout = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(() => window.innerWidth >= LG_BREAKPOINT);
    const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= LG_BREAKPOINT);

    // Open by default on large screens, closed on mobile (same as the Vue layout)
    useEffect(() => {
        const checkScreenSize = () => {
            const large = window.innerWidth >= LG_BREAKPOINT;
            setIsLargeScreen(large);
            setSidebarOpen(large);
        };

        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    // Clicking a link should only close the sidebar on mobile
    const handleNavigate = () => {
        if (!isLargeScreen) closeSidebar();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onNavigate={handleNavigate} />

            <AdminHeader
                isSidebarOpen={sidebarOpen}
                isLargeScreen={isLargeScreen}
                onToggleSidebar={toggleSidebar}
            />

            <main
                className={`h-auto pb-20 pt-24 transition-all duration-300 ease-in-out ${isLargeScreen && sidebarOpen ? "lg:pl-60" : "pl-0"
                    }`}
            >
                <div className="mx-auto space-y-6 px-4 md:px-6 lg:max-w-6xl lg:px-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;