import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const Login = () => {
    const API_url = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login";
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

            if (response.ok && data.data && data.data.token) {
                localStorage.setItem('token', data.data.token);
                navigate("/table", { replace: true }); 
            } else {
                setError(data.message || 'Ошибка авторизации');
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Ошибка сети');
        }
    }

    return (
        <div className="page page__auth">
            <img src="~/../../public/desert.jpg" alt="desert" className="desert"/>
            <div className="page__auth--form">
                <form method="post" onSubmit={handleSubmit}>
                    <h3 className="w__login">Login Here</h3>

                    <label className="w__username" htmlFor="username">Username</label>
                    <input className="i__username" type="text" placeholder="Login" id="username" name="Login" required />

                    <label className="w__password" htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" name="Password" required />

                    {error && <p>{error}</p>} 

                    <button className="button__login" type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};
