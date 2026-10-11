import axios from "axios";
import { clearSession, getAccessToken, getRefreshToken, saveSession } from "./session";

export const API_URL = import.meta.env.VITE_API_URL;
console.log("QuickCart API URL:", API_URL);
export const AUTH_LOGOUT_EVENT = "auth:logout";

export const api = axios.create({ baseURL: API_URL, timeout: 15000 });
export const unwrap = (request) => request.then((response) => response.data);

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const AUTH_ROUTES = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"];
let refreshing = null;

async function refreshAccessToken() {
    const { data } = await axios.post(`${API_URL}/api/auth/refresh`, {
        refreshToken: getRefreshToken()
    });

    // save in local storage
    return saveSession(data);
}

function forceLogout() {
    clearSession();
    window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT)); // authprovider listens and reset ui
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        if (
            error.response?.status !== 401 ||
            !original ||
            original._retried ||
            AUTH_ROUTES.some((route) => original.url?.includes(route))
        ) {
            return Promise.reject(error);
        }

        // if user failed to get the refresh token then force log out the user
        if (!getRefreshToken()) {
            forceLogout();
            return Promise.reject(error);
        }

        original._retried = true;

        try {
            refreshing ??= refreshAccessToken().finally(() => {
                refreshing = null;
            });

            const accessToken = await refreshing;
            original.headers.Authorization = `Bearer ${accessToken}`;
            return api(original);
        } catch (refreshError) {
            forceLogout();
            return Promise.reject(refreshError);
        }
    }
);

export function getErrorMessage(
    error,
    fallback = "Something wnet wrong. Please try again later."
)
{
    if (error?.code === "ERR_NETWORK") return "Cannot reach server. Check your connection.";
    const data = error?.response?.data;

    if (typeof data?.message === "string") return data.message; // services error: 401, 403, 429

    const firstValidation = data?.error && Object.values(data.errors).flat()[0]; // ASP.NET validation
    return firstValidation ?? data?.title ?? fallback;
}