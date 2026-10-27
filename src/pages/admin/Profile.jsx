// MOCK
import { useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { Card, ErrorState, PageHeader, Pill, inputCls, primaryBtn } from "../../components/admin/ui";
import { useChangePassword, useMe, useUpdateMe } from "../../queries/admin";

function ProfileForm({ me }) {
    const [fullName, setFullName] = useState(me.fullName ?? "");
    const [phone, setPhone] = useState(me.phone ?? "");
    const update = useUpdateMe();
    const invalid = fullName.trim().length < 2;

    return (
        <Card className="flex flex-col gap-4 p-6">
            <div className="flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-full bg-accent-50 text-lg font-extrabold text-accent-300" aria-hidden="true">
                    {fullName.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div>
                    <p className="font-bold">{fullName}</p>
                    <Pill tone="orange">Administrator</Pill>
                </div>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); if (!invalid) update.mutate({ fullName: fullName.trim(), phone: phone.trim() }); }}>
                <div>
                    <label htmlFor="p-name" className="text-sm font-semibold">Full name</label>
                    <input id="p-name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={`${inputCls} mt-1.5`} />
                </div>
                <div>
                    <label htmlFor="p-email" className="text-sm font-semibold">Email</label>
                    <input id="p-email" value={me.email} disabled className={`${inputCls} mt-1.5`} />
                    <p className="mt-1 text-xs text-gray-600">Email is your login and cannot be changed here.</p>
                </div>
                <div>
                    <label htmlFor="p-phone" className="text-sm font-semibold">Phone</label>
                    <input id="p-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63" className={`${inputCls} mt-1.5`} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={invalid || update.isPending} className={primaryBtn}>{update.isPending ? "Saving…" : "Save changes"}</button>
                </div>
            </form>
        </Card>
    );
}

function PasswordForm() {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");
    const change = useChangePassword();

    const tooShort = next.length > 0 && (next.length < 8 || !/\d/.test(next));
    const mismatch = confirm.length > 0 && confirm !== next;
    const canSubmit = current && next.length >= 8 && /\d/.test(next) && confirm === next && !change.isPending;

    function submit(e) {
        e.preventDefault();
        if (!canSubmit) return;
        change.mutate({ currentPassword: current, newPassword: next }, {
            onSuccess: () => { setCurrent(""); setNext(""); setConfirm(""); },
        });
    }

    return (
        <Card className="p-6">
            <form onSubmit={submit} className="flex flex-col gap-4">
                <h2 className="text-base font-bold">Change password</h2>
                <div>
                    <label htmlFor="pw-cur" className="text-sm font-semibold">Current password</label>
                    <input id="pw-cur" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} className={`${inputCls} mt-1.5`} />
                </div>
                <div>
                    <label htmlFor="pw-new" className="text-sm font-semibold">New password</label>
                    <input id="pw-new" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={`${inputCls} mt-1.5`} />
                    <p className={`mt-1 text-xs ${tooShort ? "text-red-600" : "text-gray-600"}`}>At least 8 characters, with a number.</p>
                </div>
                <div>
                    <label htmlFor="pw-conf" className="text-sm font-semibold">Confirm new password</label>
                    <input id="pw-conf" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={`${inputCls} mt-1.5`} />
                    {mismatch && <p role="alert" className="mt-1 text-xs text-red-600">Passwords do not match.</p>}
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={!canSubmit} className={primaryBtn}>{change.isPending ? "Updating…" : "Update password"}</button>
                </div>
            </form>
        </Card>
    );
}

export default function Profile() {
    useDocumentTitle("Profile");
    const { data: me, isPending, isError, refetch } = useMe();

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full h-15 bg-accent-100 rounded-md flex justify-center items-center text-white font-medium">
                NOTE: MOCK DATA
            </div>
            <PageHeader title="Profile" subtitle="Your administrator account." />
            {isError ? <ErrorState onRetry={refetch} /> : (
                <div className="grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2">
                    {isPending ? <div className="h-80 animate-pulse rounded-md bg-gray-100" /> : <ProfileForm me={me} />}
                    <PasswordForm />
                </div>
            )}
        </div>
    );
}
