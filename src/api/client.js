import axios from "axios";
import { clearSession, getAccessToken, saveSession } from "./session";

export const API_URL = import.meta.env.VITE_API_URL;
export const API_VERSION = "v1";
export const API_BASE = `${API_URL}/api/${API_VERSION}`
export const AUTH_LOGOUT_EVENT = "auth:logout";

// withCredentials lets the browser send and receive the httpOnly refresh cookie across origins
export const api = axios.create({ baseURL: API_BASE, timeout: 15000, withCredentials: true });
export const unwrap = (request) => request.then((response) => response.data);

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/refresh"];
let refreshing = null;

export function refreshSession() {
    if (!refreshing) {
        refreshing = axios
            .post(`${API_BASE}/auth/refresh`, null, {
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

    if (error?.response?.status === 429) {
        const seconds = Number(error.response.headers?.["retry-after"]);
        return seconds
            ? `Too many attempts. Try again in ${seconds} seconds.`
            : "Too many attempts. Please try again in a minute.";
    }

    const data = error?.response?.data;

    if (typeof data?.message === "string") return data.message; // services error: 401, 403, 429

    const firstValidation = data?.errors && Object.values(data.errors).flat()[0]; // ASP.NET validation
    return firstValidation ?? data?.title ?? fallback;
}

export function extractFieldErrors(err) {
    const errors = err?.response?.data?.errors ?? err?.data?.errors;
    if (!errors || typeof errors !== "object") return {};

    return Object.fromEntries(
        Object.entries(errors)
            .filter(([key]) => key) // skip model-level errors with an empty key
            .map(([key, messages]) => [
                key.charAt(0).toLowerCase() + key.slice(1),
                Array.isArray(messages) ? messages[0] : messages,
            ])
    );
}

export function getRetryAfter(error) {
    if (error?.response?.status !== 429) return null;
    const seconds = Number(error.response.headers?.["retry-after"]);
    return seconds > 0 ? seconds : 60;
}