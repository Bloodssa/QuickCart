import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PageLoader from "./PageLoader";
import { getRedirectPath } from "../lib/redirect";

// auth users only
export function ProtectedRoute()
{
    const { status } = useAuth();
    const location = useLocation();

    if (status === "loading") return <PageLoader />; // load before redirecting a user
    if (status !== "authenticated") return <Navigate to="/login" replace state={{from: location}} />

    return <Outlet />
}

// admin only
export function AdminRoute()
{
    const { status, isAdmin } = useAuth();
    const location = useLocation();

    if (status === "loading") return <PageLoader />
    if (status !== "authenticated") return <Navigate to="/login" replace state={{ from: location }} />
    if (!isAdmin) return <Navigate to="/" replace />

    return <Outlet />
}

// login/register
export function GuestRoute() {
    const { status, isAdmin } = useAuth();
    const location = useLocation();

    if (status === "loading") return <PageLoader />;

    if (status === "authenticated") {
        const fallback = isAdmin ? "/admin" : "/";
        return <Navigate to={getRedirectPath(location.state?.from, fallback)} replace />;
    }

    return <Outlet />;
}