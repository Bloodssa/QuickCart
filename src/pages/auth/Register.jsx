import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/form/AuthForm";
import FormField from "../../components/form/FormField";
import { useCountdown } from "../../hooks/useCountdown";
import { getErrorMessage, extractFieldErrors, getRetryAfter } from "../../api/client";
import { registerUser } from "../../api/auth";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [fieldErorrs, setFieldErrors] = useState({});
    const [cooldown, setCooldown] = useCountdown();

    function clearFieldErrors(event) {
        const { name } = event.target;
        setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    }

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
                confirmPassword: form.get("confirmPassword"),
            };

            await registerUser(payload);

            await login({
                username: payload.username,
                password: payload.password
            });

            navigate("/", { replace: true, state: { registered: true } });
        } catch (err) {
            const retryAfter = getRetryAfter(err);
            if (retryAfter) {
                setFieldErrors({});
                setError(null);
                setCooldown(retryAfter);
                return;
            }

            const serverErrors = extractFieldErrors(err);
            if (Object.keys(serverErrors).length > 0) {
                setFieldErrors(serverErrors);
                setError(null);
            } else {
                setFieldErrors({});
                setError(getErrorMessage(err));
            }
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
            <form onSubmit={handleSubmit} onChange={clearFieldErrors} className="space-y-5">
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
                <FormField label="Full name" error={fieldErorrs?.fullName} id="fullName" placeholder="John Doe" maxLength={150} autoFocus required />
                <FormField label="Username" error={fieldErorrs?.username} id="username" placeholder="jdoe" autoComplete="username" minLength={3} maxLength={50} />
                <FormField label="Email" error={fieldErorrs?.email} id="email" type="email" placeholder="jdoe@gmail.com" maxLength={255} />
                <FormField
                    label="Mobile number"
                    error={fieldErorrs?.phone}
                    id="phone"
                    type="tel"
                    placeholder="09171234567"
                    pattern="(\+63|0)9[0-9]{9}"
                    title="Philippine mobile number, e.g. 09171234567 or +639171234567"

                />
                <FormField
                    label="Password"
                    error={fieldErorrs?.password}
                    id="password"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    minLength={8}
                    hint="8+ characters, with a letter and a number"

                />
                <FormField
                    label="Confirm password"
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    autoComplete="new-password"
                    error={fieldErorrs?.confirmPassword}
                />
                <button
                    disabled={submitting || cooldown > 0}
                    className="h-12 w-full rounded-md bg-accent-100 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                    {cooldown > 0
                        ? `Try again in ${cooldown}s`
                        : submitting
                            ? "Creating account…"
                            : "Register"
                    }
                </button>
            </form>
        </AuthShell>
    );
}