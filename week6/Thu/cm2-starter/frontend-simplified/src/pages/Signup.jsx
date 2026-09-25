import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [error, setError] = useState(null);

    const address = {
        "street": street,
        "city": city,
        "zipCode": zipCode
    };


    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        const response = await fetch("/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
                phone_number: phoneNumber,
                gender,
                date_of_birth: dateOfBirth,
                address: address
            })
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
        <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2"> Create an Account </h2>
        <p className="text-center text-gray-500 mb-8"> Join React Jobs and start your journey </p>
        <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2"> Full Name </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2"> Email Address </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2"> Password </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2"> Phone Number</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone number" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2"> Gender </label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>  
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2"> Date of Birth </label>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4"> Address Information </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2"> Street </label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street address" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2"> City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Zip Code</label>
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip code" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSignup} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-200"> Sign Up </button>
        <p className="text-center text-gray-500">
          Already have an account?{" "}

          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  </div>
);
};

export default Signup;