import { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });
  };
  return (
    <section className="section">
      <div className="section-center">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label htmlFor="phone">
            Phone number
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>
    </section>
  );
};

export default Registration;
