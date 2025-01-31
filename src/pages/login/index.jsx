import { useState } from "react";
import stylesheet from "./login.module.css";
import { Link } from "react-router-dom";
import { login } from "../../services";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({ ...errors, email: null, password: null });

    if (
      !formData.email ||
      formData.email.length < 1 ||
      !formData.email.includes("@") ||
      !formData.email.includes(".")
    ) {
      setErrors({ ...errors, email: "Email is invalid" });
    }
    if (!formData.password) {
      setErrors({ ...errors, password: "Password is required" });
    }

    try {
      const response = await login(formData);
      console.log(response.message);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={stylesheet.container}>
      <div className={stylesheet.leftSection}>
        <div className={stylesheet.logo}>
          <img src="/assets/cuvette.png" alt="logo" />
        </div>
        <img src="/assets/banner.png" alt="banner" />
      </div>

      <div className={stylesheet.rightSection}>
        <div className={stylesheet.topRightButtons}>
          <Link to="/register">
            <button className={stylesheet.signupButton}>Sign Up</button>
          </Link>
          <Link to="/">
            <button className={stylesheet.loginButton}>Login</button>
          </Link>
        </div>

        <header>
          <h1>Login</h1>
        </header>

        <form className={stylesheet.form} onSubmit={handleLogin}>
          <input name="email" value={formData.email} type="text" placeholder="Email" onChange={handleInputChange} />
          <p className={stylesheet.error}>{errors.email}</p>
          <input
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <p className={stylesheet.error}>{errors.password}</p>
          <button type="submit">Sign in</button>
          <p className={stylesheet.footer}>
            Don&apos;t have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
