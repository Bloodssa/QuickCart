import axios from "axios";
import { clearSession, getAccessToken, saveSession } from "./session";

export const API_URL = import.meta.env.VITE_API_URL;
export const AUTH_LOGOUT_EVENT = "auth:logout";

// withCredentials lets the browser send and receive the httpOnly refresh cookie across origins
export const api = axios.create({ baseURL: API_URL, timeout: 15000, withCredentials: true });
export const unwrap = (request) => request.then((response) => response.data);

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const AUTH_ROUTES = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"];
let refreshing = null;

export function refreshSession() {
    if (!refreshing) {
        refreshing = axios
            .post(`${API_URL}/api/auth/refresh`, null, {
                withCredentials: true,
            })
            .then(({ data }) => saveSession(data))
            .finally(() => {
                refreshing = null;
            });
    }

    return refreshing;
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

        original._retried = true;

        try {
            const accessToken = await refreshSession(); // coockie freeflight

            original.headers = original.headers ?? {};
            original.headers.Authorization = `Bearer ${accessToken}`;
            return api(original); // replay the request that failed
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

    const firstValidation = data?.errors && Object.values(data.errors).flat()[0]; // ASP.NET validation
    return firstValidation ?? data?.title ?? fallback;
}