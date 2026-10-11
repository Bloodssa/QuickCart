import { api, unwrap } from "./api"
import { getRefreshToken } from "./session"

export const login = (credentials) => unwrap(api.post("/api/auth/login", credentials));
export const registerUser = (payload) => unwrap(api.post("/api/auth/register", payload));
export const me = () => unwrap(api.get("/api/auth/me"));
export const logout = () => api.post("/api/auth/logout", { refreshToken: getRefreshToken() });
 