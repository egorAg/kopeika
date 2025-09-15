import { useState, useEffect } from "react";
import { register, login, logout } from "../api/auth";
import { api } from "../api/client";

interface UserProfile {
    id: string;
    email: string;
    isActive: string;
}

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [profile, setProfile] = useState<UserProfile | null>(null);

    // при загрузке страницы пробуем взять профиль, если токен есть
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            handleProfile();
        }
    }, []);

    const handleRegister = async () => {
        try {
            const res = await register(email, password);
            setMessage("Зарегистрирован: " + res.email);
        } catch (err: any) {
            setMessage("Ошибка: " + err.message);
        }
    };

    const handleLogin = async () => {
        try {
            const res = await login(email, password);
            console.log(res);
            setMessage("Вошли как: " + res.user.email);
            setProfile(res.user);
        } catch (err: any) {
            setMessage("Ошибка: " + err.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setMessage("Вы вышли из системы");
            setProfile(null);
        } catch (err: any) {
            setMessage("Ошибка: " + err.message);
        }
    };

    const handleProfile = async () => {
        try {
            const me = await api<UserProfile>("/users/me");
            setProfile(me);
            setMessage("Профиль загружен");
        } catch (err: any) {
            setMessage("Ошибка: " + err.message);
            setProfile(null);
        }
    };

    return (
        <div className="auth-container">
            <h2>Авторизация</h2>

            {profile ? (
                <>
                    <p>
                        ✅ Вы вошли как: <b>{profile.email}</b>
                    </p>
                    <div className="auth-buttons">
                        <button onClick={handleProfile}>Обновить профиль</button>
                        <button onClick={handleLogout}>Выйти</button>
                    </div>
                </>
            ) : (
                <div className="auth-form">
                    <input
                        className="auth-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="auth-buttons">
                        <button onClick={handleRegister}>Регистрация</button>
                        <button onClick={handleLogin}>Войти</button>
                    </div>
                </div>
            )}

            {message && <p className="auth-message">{message}</p>}
        </div>
    );
}

export default Auth;
