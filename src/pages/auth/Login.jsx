import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../../components/form/AuthForm";
import FormField from "../../components/form/FormField";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage, getRetryAfter } from "../../api/client";
import { useCountdown } from "../../hooks/useCountdown";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Login() {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [password, setPassword] = useState("");
    const [cooldown, setCooldown] = useCountdown();
    useDocumentTitle("Login");
    
    async function handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        setError(null);
        setSubmitting(true);
        try {
            await login({ username: form.get("username").trim(), password: form.get("password") });
        } catch (err) {
            const retryAfter = getRetryAfter(err);
            if (retryAfter) {
                setError(null);
                setPassword("");
                setCooldown(retryAfter);
                return;
            }
            setError(getErrorMessage(err));
            setPassword("");
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
                    Dont have an account? {" "}
                    <Link to="/register" className="font-semibold text-heading hover:text-accent-100">
                        Register here
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {cooldown > 0 && (
                    <p role="alert" className="text-center rounded-md text-red-500 border border-red-500 bg-red-100 px-2 py-3 text-sm">
                        Too many attempts. Try again in {cooldown} second{cooldown === 1 ? "" : "s"}.
                    </p>
                )}
                {error && (
                    <p role="alert" className="text-center rounded-md text-red-500 border border-red-500 bg-red-100 px-2 py-3 text-sm">
                        {error}
                    </p>
                )}
                <FormField label="Username" id="username" placeholder="jdoe" autoComplete="username" autoFocus required />
                <FormField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                />
                <button
                    disabled={submitting || cooldown > 0}
                    className="h-12 w-full rounded-md bg-accent-100 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                    {cooldown > 0
                        ? `Try again in ${cooldown}s`
                        : submitting
                            ? "Logging in…"
                            : "Log in"}
                </button>
            </form>
        </AuthShell>
    );
}