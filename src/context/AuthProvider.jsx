import { useCallback, useEffect, useMemo, useState } from "react";
import { AUTH_LOGOUT_EVENT } from "../lib/api";
import * as authApi from "../lib/authApi";
import { clearSession, getAccessToken, saveSession } from "../lib/session";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children })
{
    const [user, setUser] = useState(null);

    // loading only when verifying a left over token
    const [status, setStatus] = useState(() => (getAccessToken() ? "loading" : "anonymous"));

    const reset = useCallback(() => {
        setUser(null);
        setStatus("anonymous");
    }, []);

    // restore the session on page load
    useEffect(() => {
        if (!getAccessToken()) return;

        let cancelled = false;

        authApi.me()
            .then(me => {
                if (cancelled) return;
                setUser(me);
                setStatus("authenticated");
            })
            .catch(() => {
                if (cancelled) return;
                clearSession();
                setStatus("anonymous");
            });

            return () => {
                cancelled = true;
            }
    }, []);

    // throw by api.js when a token can no longer refresh or expires
    useEffect(() => {
        window.addEventListener(AUTH_LOGOUT_EVENT, reset);
        return () => window.removeEventListener(AUTH_LOGOUT_EVENT, reset)
    }, [reset]);

    const login = useCallback(async (credentials) => {
        saveSession(await authApi.login(credentials));
        const me = await authApi.me();
        setUser(me);
        setStatus("authenticated");

        return me;
    }, []);

    const logout = useCallback(async () => {
        try {
            await authApi.logout(); // revokes token on the backend
        }catch(e) {
            console.error(e);
        }

        clearSession();
        reset();
    }, [reset]);

    const value = useMemo(
        () => ({ user, status, isAdmin: user?.role === "Admin", login, logout }),
        [user, status, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}