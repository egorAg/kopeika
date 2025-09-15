import { api } from "./client";

export interface LoginResponse {
    user: { id: string; email: string; isActive: string };
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: string;
    refreshExpiresAt: string;
}

export async function register(email: string, password: string) {
    return api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function login(email: string, password: string) {
    const res = await api<LoginResponse>("/auth/login", {
        method: "POST",
        headers: { "user-agent": "frontend-dev" },
        body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);

    return res;
}

export async function refreshToken() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) throw new Error("No refresh token");

    const res = await api<LoginResponse>("/auth/refresh", {
        method: "POST",
        headers: { "user-agent": "frontend-dev" },
        body: JSON.stringify({ refreshToken: refresh }),
    });

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);

    return res;
}

export async function logout() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return;

    await api("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken: refresh }),
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}
