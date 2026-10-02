import { useState } from "react";

const useSignup = (url) => {
    const [error, setError] = useState(null);

    const signup = async (newUser) => {
        setError(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                setError(data.error || data.message || "Signup failed");
                return null;
            }

            return await response.json();
        } catch (error) {
            setError(error.message || "Unable to sign up. Please try again.");
            return null;
        }
    };

    return { signup, error };
};

export default useSignup;
