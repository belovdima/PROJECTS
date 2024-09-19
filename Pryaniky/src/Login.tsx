import { FormEvent } from "react";

export const Login = () => {

    const API_url = "https://test.v5.pryaniky/ru/data/v3/testmethods/docs/login"

    function handleSubmit(e:FormEvent){
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())
        console.log(formJson)
    }

    
    return(
        <div className="page page__auth"> 
            <div className="page__auth--form">
                <form method="post" onSubmit={handleSubmit}>
                    <h3 className="w__login">Login Here</h3>

                    <label className="w__username" htmlFor="username">Username</label>
                    <input type="text" placeholder="Login" id="username" name="Login" />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" name="Password"/>
                    <button type="submit">Log In</button>
                </form>
            </div>
            
        </div>
    );
}