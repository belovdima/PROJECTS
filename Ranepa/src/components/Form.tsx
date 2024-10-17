import { useState } from "react";

export const Form = () => {
    // Стейт для хранения данных формы
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        enterprise: "hotel",
    });

    // Обработчик изменения полей формы
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        console.log("Submitted data:", formData); // Выводим данные в консоль
    };
    return (
        <div className="form-outer">
            <div className="application-form">
                <h2>Заполните заявку</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">ФИО</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            placeholder="Введите ваше ФИО"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Почта</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            placeholder="Введите вашу почту"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="enterprise">Тип предприятия</label>
                        <select
                            id="enterprise"
                            name="enterprise"
                            value={formData.enterprise}
                            onChange={handleChange}>
                            <option value="hotel">Отель</option>
                            <option value="restaurant">Ресторан</option>
                            <option value="agency">Турагентство</option>
                            <option value="event">
                                Организация мероприятий
                            </option>
                        </select>
                    </div>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
};
