import { useState } from "react";
import { register } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import stylesheet from "./register.module.css";

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
    <div>
      <header>
        <h1>Join us Today!</h1>
        {/* <h3>Your personal job finder is here</h3> */}
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

        <div>
          <input type="checkbox" name="tos" id="tos" />
          <label htmlFor="tos">By Creating an account. I agree to our terms of use and privacy policy</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create Account"}
        </button>
        {loading && (
          <div className={stylesheet.spinnerContainer}>
            <div className={stylesheet.spin}></div>
            <p>Loading Please Wait...</p>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
