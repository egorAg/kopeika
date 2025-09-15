import { useState } from "react";
import { api } from "../api/client";

interface Guild {
    id: string;
    name: string;
    dailyMinAmount: number;
    balance: number;
    createdAt: string;
}

function Sidebar({
                     guilds,
                     onSelectGuild,
                     selectedGuild,
                     reloadGuilds,
                 }: {
    guilds: Guild[];
    onSelectGuild: (id: string) => void;
    selectedGuild: string | null;
    reloadGuilds: () => void;
}) {
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [dailyMin, setDailyMin] = useState(1000);

    const handleCreate = async () => {
        try {
            await api<Guild>("/guilds/create", {
                method: "POST",
                body: JSON.stringify({ name, dailyMinAmount: dailyMin }),
            });
            setName("");
            setDailyMin(1000);
            setShowForm(false);
            reloadGuilds();
        } catch (err: any) {
            setError("Ошибка создания: " + err.message);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Мои гильдии</h3>
                <button
                    className="add-btn"
                    onClick={() => setShowForm((prev) => !prev)}
                >
                    +
                </button>
            </div>

            {showForm && (
                <div className="guild-form">
                    <input
                        className="auth-input"
                        placeholder="Название гильдии"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="auth-input"
                        type="number"
                        placeholder="Мин. сумма на день"
                        value={dailyMin}
                        onChange={(e) => setDailyMin(Number(e.target.value))}
                    />
                    <button className="create-btn" onClick={handleCreate}>
                        Создать
                    </button>
                </div>
            )}

            {error && <p className="error">{error}</p>}
            <ul className="guild-list">
                {guilds.map((g) => (
                    <li
                        key={g.id}
                        className={`guild-card ${
                            selectedGuild === g.id ? "guild-selected" : ""
                        }`}
                        onClick={() => onSelectGuild(g.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <b>{g.name}</b>
                        <div className="guild-info">Баланс: {g.balance}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
