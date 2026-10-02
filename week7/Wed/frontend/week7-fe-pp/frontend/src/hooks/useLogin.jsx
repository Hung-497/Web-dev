import { useState } from "react";

const useLogin = (url) => {
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setError(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                setError(data.error || data.message || "Login failed");
                return null;
            }

            return await response.json();
        } catch (error) {
            setError(error.message || "Unable to log in. Please try again.");
            return null;
        }
    };

    return { login, error };
};

export default useLogin;
