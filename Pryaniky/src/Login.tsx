import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";

export const Login = () => {

    const API_url = "https://test.v5.pryaniky/ru/data/v3/testmethods/docs/login"
    const [formJson, setFormjson] = useState()
    const [error, setError] = useState(null)


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const inputData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(API_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputData.Login,
                    password: inputData.Password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Сохраняем токен
                Navigate('/table'); // Перенаправляем на страницу таблицы
            } else {
                setError(data.message || 'Ошибка авторизации');
            }
        } catch (err) {
            setError('Ошибка сети');
        }

        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token // Добавляем токен в заголовок
            }
        });
    }
    
    return(
        <div className="page page__auth">
            <div className="page__auth--form">
                <form method="post" onSubmit={handleSubmit}>
                    <h3 className="w__login">Login Here</h3>

                    <label className="w__username" htmlFor="username">Username</label>
                    <input type="text" placeholder="Login" id="username" name="Login" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" name="Password" required />

                    {error && <p>{error}</p>} {/* Вывод ошибки */}

                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}