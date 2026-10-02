import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";

const Signup = ({ setIsAuthenticated }) => {
    const fullName = useField("text");
    const email = useField("email");
    const password = useField("password");
    const phoneNumber = useField("text");
    const gender = useField("text");
    const date_of_birth = useField("text");
    const accountType = useField("text");
    const { signup, error } = useSignup("/api/users/signup");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const user = await signup({
            fullName: fullName.value,
            email: email.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            gender: gender.value,
            date_of_birth: date_of_birth.value,
            accountType: accountType.value,
        });

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            console.log("User signed up successfully!");
            setIsAuthenticated(true);
            navigate("/");
        }
    };
    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p role="alert">{error}</p>}
            <label>
                Full Name:
                <input
                    {...fullName}
                    placeholder="Full Name"
                ></input>
            </label>

            <label>
                Email:
                <input
                    {...email}
                    placeholder="email"
                ></input>
            </label>

            <label>
                Password:
                <input
                    {...password}
                    placeholder="Password"
                ></input>
            </label>

            <label>
                Phone:
                <input
                    {...phoneNumber}
                    placeholder="392.."
                ></input>
            </label>

            <label>
                Gender:
                <input
                    {...gender}
                    placeholder="Gender"
                ></input>
            </label>

            <label>
                DBO:
                <input
                    {...date_of_birth}
                    placeholder="12.12.1222"
                ></input>
            </label>

            <label>
                 account type:
                <input
                    {...accountType}
                    placeholder="  "
                ></input>
            </label>

            <button className="signup-button" onClick={handleSignup}>Sign Up</button>
        </div>
    )
};

export default Signup;
