import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthShell from "../components/AuthForm";
import FormField from "../components/FormField";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../lib/api";

export default function Login() {
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
            await login({ username: form.get("username").trim(), password: form.get("password") });
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AuthShell
            title="Welcome back"
            subtitle="Log in to continue shopping."
            footer={
                <>
                    Dont have an account?  
                    <Link to="/register" className="font-semibold text-heading hover:text-accent-100">
                        Register here
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {location.state?.registered && (
                    <p role="status" className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
                        Account created. Please log in.
                    </p>
                )}
                <FormField label="Username" id="username" placeholder="jdoe" autoComplete="username" autoFocus required />
                <FormField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                    required
                />
                {error && (
                    <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </p>
                )}
                <button
                    disabled={submitting}
                    className="h-12 w-full rounded-md bg-accent-100 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                    {submitting ? "Logging in…" : "Log in"}
                </button>
            </form>
        </AuthShell>
    );
}