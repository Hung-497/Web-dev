import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
    const email = useField("email");
    const password = useField("password");
    const { login, error } = useLogin("/api/users/login");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const user = await login({ email: email.value, password: password.value });

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            console.log("User logged in successfully!");
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p role="alert">{error}</p>}
            <label>
                Email:
                <input
                    {...email}
                    placeholder="Enter your email"
                />
            </label>
            <label>
                Password:
                <input
                    {...password}
                    placeholder="Enter your password"
                />
            </label>
            <button className="login-button" onClick={handleLogin}>Log In</button>
        </div>
    );
    
};


export default Login;

