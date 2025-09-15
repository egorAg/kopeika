import { refreshToken } from "./auth";

const API_URL = "http://localhost:3000";

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("accessToken");

    // Делаем нормальный объект заголовков
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        try {
            await refreshToken();
            const newToken = localStorage.getItem("accessToken");
            if (newToken) {
                headers["Authorization"] = `Bearer ${newToken}`;
            }
            res = await fetch(`${API_URL}${path}`, {
                ...options,
                headers,
            });
        } catch {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            throw new Error("Unauthorized, please login again");
        }
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
    }

    return res.json() as Promise<T>;
}
