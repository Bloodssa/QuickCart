import { api, unwrap } from "./client";

export const login = (credentials) => unwrap(api.post("/auth/login", credentials));
export const registerUser = (payload) => unwrap(api.post("/auth/register", payload));
export const me = () => unwrap(api.get("/auth/me"));
export const logout = () => api.post("/auth/logout");