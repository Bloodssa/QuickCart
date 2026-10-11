const ACCESS_KEY = "qc.accessToken";
const REFRESH_KEY = "qc.refreshToken";

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export function saveSession(data)
{
    const accessToken = data.accessToken ?? data.token;
    localStorage.setItem(ACCESS_KEY, accessToken);

    if (data.refreshToken) localStorage.setItem(REFRESH_KEY, data.refreshToken);
    return accessToken;
}

export function clearSession()
{
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
}