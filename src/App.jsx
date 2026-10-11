import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Cart from "./pages/Cart";
import { Suspense, lazy } from "react";
import PageLoader from "./components/PageLoader";
import { AdminRoute, GuestRoute, ProtectedRoute } from "./components/RouteGuard";
import NotFound from "./pages/NotFound";
import Home from "./pages/customer/Home"

const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

function App() {
  return (
    <Suspense fallback={PageLoader}>
      <Routes>
        <Route index element={<HomePage />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute /> }>
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*"element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
