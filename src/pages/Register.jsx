import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthForm";
import FormField from "../components/FormField";
import { getErrorMessage } from "../api/client";
import { registerUser } from "../api/auth";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const password = form.get("password");

        if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
            setError("Password must include at least one letter and one number.");
            return;
        }
        if (password !== form.get("confirmPassword")) {
            setError("Passwords do not match.");
            return;
        }

        setError(null);
        setSubmitting(true);
        try {
            const payload = {
                username: form.get("username").trim(),
                fullName: form.get("fullName").trim(),
                email: form.get("email").trim(),
                phone: form.get("phone").trim(),
                password,
            };

            await registerUser(payload);

            await login({
                username: payload.username,
                password: payload.password
            });

            navigate("/", { replace: true, state: { registered: true } });
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AuthShell
            title="Register an Account"
            subtitle="Register to start shopping on QuickCart."
            footer={
                <>
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-heading hover:text-accent-100">
                        Login here
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Full name" id="fullName" placeholder="John Doe" maxLength={150} autoFocus required />
                <FormField label="Username" id="username" placeholder="jdoe" autoComplete="username" minLength={3} maxLength={50} required />
                <FormField label="Email" id="email" type="email" placeholder="jdoe@gmail.com" maxLength={255} required />
                <FormField
                    label="Mobile number"
                    id="phone"
                    type="tel"
                    placeholder="09171234567"
                    pattern="(\+63|0)9[0-9]{9}"
                    title="Philippine mobile number, e.g. 09171234567 or +639171234567"
                    required
                />
                <FormField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    minLength={8}
                    hint="8+ characters, with a letter and a number"
                    required
                />
                <FormField
                    label="Confirm password"
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
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
                    {submitting ? "Creating account…" : "Register"}
                </button>
            </form>
        </AuthShell>
    );
}