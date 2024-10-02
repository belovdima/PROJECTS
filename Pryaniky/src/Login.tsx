import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const API_url =
        "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login";
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault(); //страница не будет перезагружаться при отправке формы

        const form = e.target as HTMLFormElement; //типизирует форму для работы в TS
        const formData = new FormData(form); //создание formData который содержит все данные из формы в виде пар "ключ-значение"
        const inputData = Object.fromEntries(formData.entries()); //преобразует formData в обычный объект JS для удобства работы

        try {
            const response = await fetch(API_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", //указываем что тело запроса будет в формате JSON
                },
                body: JSON.stringify({
                    username: inputData.Login,
                    password: inputData.Password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.data && data.data.token) {
                localStorage.setItem("token", data.data.token);
                navigate("/table", { replace: true });
            } else {
                setError(data.message || "Ошибка авторизации");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Ошибка сети");
        }
    }

    return (
        <div className="page page__auth">
            <div className="page__auth--form">
                <form method="post" onSubmit={handleSubmit}>
                    <h3 className="w__login">Login</h3>

                    <div className="input__places">
                        <div className="d__username">
                            <label className="w__username" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="i__username"
                                type="text"
                                placeholder="Login"
                                id="username"
                                name="Login"
                                required
                            />
                        </div>
                        <div className="d__password">
                            <label className="w__password" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="i__password"
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="Password"
                                required
                            />
                        </div>
                    </div>

                    {error && <p>{error}</p>}

                    <button className="button__login" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};
