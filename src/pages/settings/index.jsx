import styles from "./settings.module.css";
import { editUser, getUserDetails, deleteUser } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../navbar/index.jsx";
import Sidebar from "../sidebar/index.jsx";

import DeleteAccountModal from "../../components/deleteAccount/deleteAccount.jsx";

export default function Settings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        console.log("User Details:", userDetails); // Log the user details to the console
        setFormData({
          name: userDetails.name,
          email: userDetails.email,
          mobile: userDetails.mobile,
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      const response = await editUser(formData);
      setMessage("Changes saved successfully!");
    } catch (error) {
      console.error("Failed to save changes:", error);
      setErrors({ ...errors, form: "Failed to save changes" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Failed to delete account:", error);
      setErrors({ ...errors, form: "Failed to delete account" });
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.editContainer}>
          <form className={styles.form} onSubmit={handleSaveChanges}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            {errors.form && <p className={styles.error}>{errors.form}</p>}
            {message && <p className={styles.success}>{message}</p>}
            <button type="submit" className={styles.saveButton} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
          <button className={styles.deleteButton} onClick={() => setIsDeleteModalOpen(true)}>
            Delete Account
          </button>
        </div>
      </div>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteAccount}
      />
    </div>
  );
}
