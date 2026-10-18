const SESSION_FLAG = "qc.hasSession";
const TOKEN_KEY = "qc.accessToken";
const EXPIRES_KEY = "qc.accessTokenExpiresAt";

export const hasSession = () => localStorage.getItem(SESSION_FLAG) === "1";

let accessToken = hasSession() ? sessionStorage.getItem(TOKEN_KEY) : null;
let expiresAt = hasSession() ? Number(sessionStorage.getItem(EXPIRES_KEY)) || 0 : 0;

export const getAccessToken = () => accessToken;

// true while the cached token has more than 30 seconds
export const hasFreshAccessToken = () => Boolean(accessToken) && expiresAt - Date.now() > 30_000;

export function saveSession(data)
{
    accessToken = data.accessToken;

    const parsed = Date.parse(data.accessTokenExpiresAtUtc);
    expiresAt = Number.isNaN(parsed) ? Date.now() + 60_000 : parsed;

    sessionStorage.setItem(TOKEN_KEY, accessToken);
    sessionStorage.setItem(EXPIRES_KEY, String(expiresAt));
    localStorage.setItem(SESSION_FLAG, "1");

    return accessToken;
}

export function clearSession()
{
    accessToken = null;
    expiresAt = 0;
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(SESSION_FLAG);
}