import { useState } from "react";
import { api } from "../api/client";

interface CreateChestModalProps {
    guildId: string;
    onClose: () => void;
    onCreated: () => void;
}

function CreateChestModal({ guildId, onClose, onCreated }: CreateChestModalProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState("saving");
    const [currency, setCurrency] = useState("RUB");
    const [balance, setBalance] = useState(0);

    const [goalAmount, setGoalAmount] = useState<number | undefined>();
    const [goalDeadline, setGoalDeadline] = useState<string | undefined>();
    const [creditLimit, setCreditLimit] = useState<number | undefined>();
    const [currentDebt, setCurrentDebt] = useState<number | undefined>();
    const [gracePeriodDays, setGracePeriodDays] = useState<number | undefined>();
    const [monthlyPayment, setMonthlyPayment] = useState<number | undefined>();
    const [percent, setPercent] = useState<number | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();

    const handleCreate = async () => {
        try {
            await api(`/chests/${guildId}/chests`, {
                method: "POST",
                body: JSON.stringify({
                    name,
                    type,
                    currency,
                    balance,
                    goalAmount,
                    goalDeadline,
                    creditLimit,
                    currentDebt,
                    gracePeriodDays,
                    monthlyPayment,
                    percent,
                    endDate,
                }),
            });
            onCreated();
            onClose();
        } catch (err: any) {
            alert("Ошибка создания сундука: " + err.message);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Создать сундук</h2>

                <div className="form-group">
                    <label>Название сундука</label>
                    <input
                        className="auth-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Тип сундука</label>
                    <select
                        className="auth-input"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="saving">Накопительный</option>
                        <option value="debit">Дебетовый</option>
                        <option value="creditCard">Кредитная карта</option>
                        <option value="credit">Кредит</option>
                        <option value="installment">Рассрочка</option>
                        <option value="microloan">Микрозайм</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Валюта</label>
                    <select
                        className="auth-input"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="RUB">RUB</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="CNY">CNY</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Начальный баланс</label>
                    <input
                        className="auth-input"
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(Number(e.target.value))}
                    />
                </div>

                {type === "saving" && (
                    <>
                        <div className="form-group">
                            <label>Целевая сумма</label>
                            <input
                                className="auth-input"
                                type="number"
                                value={goalAmount ?? ""}
                                onChange={(e) => setGoalAmount(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Дата достижения цели</label>
                            <input
                                className="auth-input"
                                type="date"
                                value={goalDeadline ?? ""}
                                onChange={(e) => setGoalDeadline(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {type === "creditCard" && (
                    <>
                        <div className="form-group">
                            <label>Кредитный лимит</label>
                            <input
                                className="auth-input"
                                type="number"
                                value={creditLimit ?? ""}
                                onChange={(e) => setCreditLimit(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Текущий долг</label>
                            <input
                                className="auth-input"
                                type="number"
                                value={currentDebt ?? ""}
                                onChange={(e) => setCurrentDebt(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Льготный период (дни)</label>
                            <input
                                className="auth-input"
                                type="number"
                                value={gracePeriodDays ?? ""}
                                onChange={(e) => setGracePeriodDays(Number(e.target.value))}
                            />
                        </div>
                    </>
                )}

                {(type === "credit" || type === "installment" || type === "microloan") && (
                    <>
                        <div className="form-group">
                            <label>Ежемесячный платёж</label>
                            <input
                                className="auth-input"
                                type="number"
                                value={monthlyPayment ?? ""}
                                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Процентная ставка (%)</label>
                            <input
                                className="auth-input"
                                type="number"
                                value={percent ?? ""}
                                onChange={(e) => setPercent(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Дата окончания кредита</label>
                            <input
                                className="auth-input"
                                type="date"
                                value={endDate ?? ""}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div className="modal-actions">
                    <button className="create-btn" onClick={handleCreate}>
                        Создать
                    </button>
                    <button className="remove-btn" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateChestModal;
