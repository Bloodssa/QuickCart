import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../lib/api";

const Login = () => {
    const { navigate } = useNavigate();
    const { login } = useAuth();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setError(null);
        setSubmitting(true);

        try {
            await login({ username: form.get("username"), password: form.get("password") }); // send through axios from login useAuth

            const destination = location.state?.from?.pathname || "/home";

            navigate(destination, { replace: true });
        } catch (e) {
            setError(getErrorMessage(e));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <title>Login</title>

            <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
                <h1 className="text-2xl font-bold">Log in</h1>

                {location.state?.registered && (
                    <p>
                        Account created. Please login.
                    </p>
                )}

                <FormField label="Username" id="username" autoComplete="username" required />
                <FormField label="Password" id="password" type="password" autoComplete="current-password" required />

                {error && (
                    <p role="alert" className="text-sm text-red-500">
                        {error}
                    </p>
                )}

                <button disabled={submitting} className="w-full rounded bg-accent-100 hover:bg-accent-hover transition-colors duration-200 ease-in py-2 text-white disabled:opacity-50">
                    {submitting ? "Logging in..." : "Log in"}
                </button>
                <p>
                    No Account yet?{" "}
                    <Link to="/register" className="underline">
                        Register
                    </Link>
                </p>
            </form>
        </>
    );
}

export default Login;