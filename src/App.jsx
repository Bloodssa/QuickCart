import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Cart from "./pages/Cart";
import { Suspense, lazy } from "react";
import PageLoader from "./components/PageLoader";
import { AdminRoute, GuestRoute, ProtectedRoute } from "./components/RouteGuard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/customer/Profile";
import ProductPage from "./pages/products/ProductPage";
import ScrollToTop from "./components/ScrollToTop";

const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* Public Pages */}
          <Route index element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />

          {/* Guest only page */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Auth required */}
          <Route element={<ProtectedRoute />}>
            <Route path="/me" element={<Profile />} />
          </Route>

          {/* Admin role required */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
