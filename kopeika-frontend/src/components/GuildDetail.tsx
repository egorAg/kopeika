import { useEffect, useState } from "react";
import { api } from "../api/client";
import CreateChestModal from "./CreateChestModal";

interface GuildUser {
    id: string;
    email: string;
    status: string;
}

interface GuildDetail {
    id: string;
    name: string;
    dailyMinAmount: number;
    balance: number;
    createdAt: string;
    updatedAt: string;
    users: GuildUser[];
}

interface Chest {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: number;
    createdAt: string;
}

function GuildDetail({
                         guildId,
                         onDeleted,
                     }: {
    guildId: string;
    onDeleted: () => void;
}) {
    const [guild, setGuild] = useState<GuildDetail | null>(null);
    const [error, setError] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");

    const [chests, setChests] = useState<Chest[]>([]);
    const [showChestModal, setShowChestModal] = useState(false);

    const loadGuild = async () => {
        try {
            const res = await api<GuildDetail>(`/guilds/${guildId}`);
            setGuild(res);
        } catch (err: any) {
            setError("Ошибка загрузки гильдии: " + err.message);
        }
    };

    const loadChests = async () => {
        try {
            const res = await api<Chest[]>(`/chests/${guildId}/chests`);
            setChests(res);
        } catch (err: any) {
            setError("Ошибка загрузки сундуков: " + err.message);
        }
    };

    useEffect(() => {
        loadGuild();
        loadChests();
    }, [guildId]);

    const renderStatus = (status: string) => {
        let className = "status-badge ";
        if (status === "active") className += "status-active";
        if (status === "inactive") className += "status-inactive";
        if (status === "blocked") className += "status-blocked";
        return <span className={className}>{status}</span>;
    };

    const handleInvite = async () => {
        try {
            await api(`/guilds/${guildId}/users`, {
                method: "POST",
                body: JSON.stringify({ email: inviteEmail }),
            });
            setInviteEmail("");
            loadGuild();
        } catch (err: any) {
            setError("Ошибка приглашения: " + err.message);
        }
    };

    const handleRemoveUser = async (userId: string) => {
        try {
            await api(`/guilds/${guildId}/users/${userId}`, {
                method: "DELETE",
            });
            loadGuild();
        } catch (err: any) {
            setError("Ошибка удаления пользователя: " + err.message);
        }
    };

    const handleDeleteGuild = async () => {
        if (!window.confirm("Удалить гильдию?")) return;
        try {
            await api(`/guilds/${guildId}`, { method: "DELETE" });
            onDeleted();
        } catch (err: any) {
            setError("Ошибка удаления гильдии: " + err.message);
        }
    };

    if (error) return <div className="error">{error}</div>;
    if (!guild) return <div>Загрузка...</div>;

    return (
        <div className="guild-detail">
            <h2>{guild.name}</h2>
            <p>
                <b>Баланс:</b> {guild.balance}
            </p>
            <p>
                <b>Минимум на день:</b> {guild.dailyMinAmount}
            </p>
            <p>
                <b>Создана:</b> {new Date(guild.createdAt).toLocaleString()}
            </p>
            <p>
                <b>Обновлена:</b> {new Date(guild.updatedAt).toLocaleString()}
            </p>

            <button className="delete-guild-btn" onClick={handleDeleteGuild}>
                🗑 Удалить гильдию
            </button>

            <h3>Участники</h3>
            <ul className="user-list">
                {guild.users.map((u) => (
                    <li key={u.id} className="user-card">
                        <span>{u.email}</span>
                        <div>
                            {renderStatus(u.status)}
                            <button
                                className="remove-btn"
                                onClick={() => handleRemoveUser(u.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="invite-form">
                <input
                    className="auth-input"
                    placeholder="Email для приглашения"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                />
                <button className="create-btn" onClick={handleInvite}>
                    Пригласить
                </button>
            </div>

            <h3>Сундуки</h3>
            <div className="sidebar-header">
                <span>Всего: {chests.length}</span>
                <button className="add-btn" onClick={() => setShowChestModal(true)}>
                    +
                </button>
            </div>

            <ul className="guild-list">
                {chests.map((c) => (
                    <li key={c.id} className="guild-card">
                        <b>{c.name}</b> ({c.type})
                        <div className="guild-info">
                            Баланс: {c.balance} {c.currency}
                        </div>
                    </li>
                ))}
            </ul>

            {showChestModal && (
                <CreateChestModal
                    guildId={guildId}
                    onClose={() => setShowChestModal(false)}
                    onCreated={loadChests}
                />
            )}
        </div>
    );
}

export default GuildDetail;
