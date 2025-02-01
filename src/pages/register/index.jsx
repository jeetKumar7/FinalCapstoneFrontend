import { useState } from "react";
import { register } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import stylesheet from "./register.module.css";
import { Link } from "react-router-dom";

export default function Register() {
  const notify = () => {
    toast("Succesfully Registered");
  };
  const errorNotify = () => {
    toast.error("Unable to register");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name.trim() || formData.name.length < 3 || !/^[a-zA-Z\s]+$/.test(formData.name)) {
      setErrors({ ...errors, name: "Invalid Name" });
    }

    // Email Validation
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors({ ...errors, email: "Invalid Email" });
    }

    // Phone Validation
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      setErrors({ ...errors, phone: "Invalid Phone" });
    }

    // Password Validation
    if (
      !formData.password.trim() ||
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/\d/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      setErrors({ ...errors, password: "Invalid Password" });
    }

    if (formData.password !== confirmPassword) setErrors.confirmPassword = "Passwords do not match";

    try {
      const response = await register(formData);
      console.log(response.message);
      notify();
    } catch (error) {
      console.log(error);
      errorNotify();
    } finally {
      setLoading(false);
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
          <h1>Join us Today!</h1>
        </header>

        <form className={stylesheet.form} onSubmit={handleRegister}>
          <div className={stylesheet.field}>
            <input value={formData.name} type="text" placeholder="Name" name="name" onChange={handleInputChange} />
            <p className={stylesheet.error}>{errors.name}</p>
          </div>

          <input value={formData.email} name="email" type="text" placeholder="Email" onChange={handleInputChange} />
          <p className={stylesheet.error}>{errors.email}</p>

          <input value={formData.phone} name="phone" type="number" placeholder="Mobile" onChange={handleInputChange} />
          <p className={stylesheet.error}>{errors.phone}</p>

          <input
            value={formData.password}
            name="password"
            type="text"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <p className={stylesheet.error}>{errors.password}</p>

          <input
            value={confirmPassword} // Separate state for confirmPassword
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
          />
          <p className={stylesheet.error}>{errors.confirmPassword}</p>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Create Account"}
          </button>

          <p className={stylesheet.footer}>
            Already have an account? <Link to="/">Login</Link>
          </p>
          {loading && (
            <div className={stylesheet.spinnerContainer}>
              <div className={stylesheet.spin}></div>
              <p>Loading Please Wait...</p>
            </div>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
