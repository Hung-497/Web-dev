import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            console.log("User signed up successfully!");
            setIsAuthenticated(true);
            navigate("/");
        } else {
            console.error("Signup failed");
        }
    };

    return (
        <div className="container m-auto max-w-2xl py-24 ">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 font-bold mb-2 ">Email address:</label>
                        <input className="border rounded w-full py-2 px-3" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Password:</label>
                        <input className="border rounded w-full py-2 px-3" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button id="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Log in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;