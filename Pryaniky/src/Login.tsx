export const Login = () => {
    
    return(
        <div className="page page__auth">
            <h3>Login Here</h3>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Email or Phone" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />

            <button>Log In</button>
            
        </div>
    );
}