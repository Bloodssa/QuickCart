import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { getErrorMessage } from "../lib/api";
import { registerUser } from "../lib/authApi";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const password = form.get("password");

        // validation
        if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
            setError("Password must include at least one letter and one number.");
            return;
        }
        if (password !== form.get("confirmPassword")) {
            setError("Passwords do not match.");
            return;
        }

        setError(null);
        setSubmitting(true)

        try {
            await registerUser({
                username: form.get("username").trim(),
                fullName: form.get("fullName").trim(),
                email: form.get("email"),
                phone: form.get("phone"),
                password
            });
            navigate("/login", { replace: true, state: { registered: true } });
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <title>Register</title>

            <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
                <h1 className="text-2xl font-extrabold text-accent-100">Create Account</h1>

                <FormField label="Full name" id="fullName" maxLength={150} required />
                <FormField label="Username" id="username" autoComplete="username" minLength={3} maxLength={50} required />
                <FormField label="Email" id="email" type="email" maxLength={255} required />

                <FormField
                    label="Mobile number"
                    id="phone"
                    type="tel"
                    pattern="((\+63|0)9[0-9]{9})"
                    required
                    autoComplete="phone"
                />

                <FormField label="Password" id="password" type="password" autoComplete="new-password" minLength={8} required />
                <FormField label="Confirm password" id="confirmPassword" type="password" autoComplete="new-password" required />

                {error && (
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button disabled={submitting} className="w-full rounded bg-accent-100 py-2 text-white disabled:opacity-50">
                    {submitting ? "Creating account…" : "Register"}
                </button>
                <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        Log in
                    </Link>
                </p>
            </form>
        </>
    );
}

export default Register;