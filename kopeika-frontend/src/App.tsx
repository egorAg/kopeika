import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import Sidebar from "./components/Sidebar";
import GuildDetail from "./components/GuildDetail";
import { api } from "./api/client";
import { logout } from "./api/auth";

interface UserProfile {
    id: string;
    email: string;
    isActive: string;
}

interface Guild {
    id: string;
    name: string;
    dailyMinAmount: number;
    balance: number;
    createdAt: string;
}

function App() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [selectedGuild, setSelectedGuild] = useState<string | null>(null);
    const [guilds, setGuilds] = useState<Guild[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            api<UserProfile>("/users/me")
                .then((me) => setProfile(me))
                .catch(() => setProfile(null));
        }
    }, []);

    const loadGuilds = async () => {
        try {
            const res = await api<Guild[]>("/guilds/list");
            setGuilds(res);
        } catch {
            setGuilds([]);
        }
    };

    useEffect(() => {
        if (profile) {
            loadGuilds();
        }
    }, [profile]);

    const handleLogout = async () => {
        await logout();
        setProfile(null);
        setSelectedGuild(null);
        setGuilds([]);
    };

    return (
        <div className="app-bg">
            <div className="app-container">
                <h1 className="app-title">Kopeika Frontend</h1>

                {profile ? (
                    <div className="main-layout">
                        <div className="top-bar">
                            ✅ Вы вошли как: <b>{profile.email}</b>
                            <button className="logout-btn" onClick={handleLogout}>
                                Выйти
                            </button>
                        </div>
                        <div className="layout-body">
                            <Sidebar
                                guilds={guilds}
                                onSelectGuild={(id) => setSelectedGuild(id)}
                                selectedGuild={selectedGuild}
                                reloadGuilds={loadGuilds}
                            />
                            <div className="main-content">
                                {selectedGuild ? (
                                    <GuildDetail
                                        guildId={selectedGuild}
                                        onDeleted={() => {
                                            setSelectedGuild(null);
                                            loadGuilds();
                                        }}
                                    />
                                ) : (
                                    <p>Выберите гильдию из списка.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Auth />
                )}
            </div>
        </div>
    );
}

export default App;
