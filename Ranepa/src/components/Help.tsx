import React, { useState } from "react";

export const Help: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data: ", formData); // Просто выводим данные, без отправки
    };

    return (
        <div className="help-outer">
            <div className="help-request-form">
                <h2 className="form-title">Заявка на помощь</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="name">Имя</label>
                        <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Электронная почта</label>
                        <span className="focus-border"></span>
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="message">Сообщение</label>
                        <span className="focus-border"></span>
                    </div>

                    <button type="submit" className="submit-button">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};
