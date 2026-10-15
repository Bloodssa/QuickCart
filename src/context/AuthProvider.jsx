import { useCallback, useEffect, useMemo, useState } from "react";
import { AUTH_LOGOUT_EVENT, refreshSession } from "../lib/api";
import * as authApi from "../lib/authApi";
import { clearSession, hasFreshAccessToken, hasSession, saveSession } from "../lib/session";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // loading only when verifying a left over token
    const [status, setStatus] = useState(() => (hasSession() ? "loading" : "anonymous"));

    const reset = useCallback(() => {
        setUser(null);
        setStatus("anonymous");
    }, []);

    // restore the session on page load the access token is gone after a refresh, the cookie is not
    useEffect(() => {
        if (!hasSession()) return;

        let cancelled = false;

        async function restoreSession() {
            try {
                // a reload inside the 15 minutes needs no refresh at all
                if (!hasFreshAccessToken()) await refreshSession();

                const me = await authApi.me();

                if (cancelled) return;

                setUser(me);
                setStatus("authenticated");
            } catch(error) {
                if (cancelled) return;
                console.error("Could not restore the session:", error);

                // forget the session only when the server rejected it; a network blip shouldn't log you out
                if (error.response?.status === 401) clearSession();
                setUser(null);
                setStatus("anonymous");
            }
        }

        restoreSession();

        return () => {
            cancelled = true;
        };
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
        } catch (e) {
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