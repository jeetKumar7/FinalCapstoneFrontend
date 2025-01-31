import React, { useState } from "react";
import styles from "./Modal.module.css";
import { createShortUrl } from "../services";

export default function Modal({ isOpen, onClose }) {
  const [remarks, setRemarks] = useState("");
  const [linkExpiration, setLinkExpiration] = useState(true);

  const [formData, setFormData] = useState({
    destinationUrl: "",
    remarks: "",
    expirationTime: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createShortUrl(formData);
      console.log("Short URL created:", response);
    } catch (error) {
      console.error("Failed to create short URL:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>New Link</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Destination URL */}
          <label>
            Destination Url <span className={styles.required}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            name="destinationUrl"
            value={formData.destinationUrl}
            onChange={handleInputChange}
          />

          {/* Remarks */}
          <label>
            Remarks <span className={styles.required}>*</span>
          </label>
          <textarea
            type="text"
            name="remarks"
            placeholder="Add remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className={styles.textarea}
          />

          {/* Link Expiration Toggle */}
          <div className={styles.toggleContainer}>
            <label>Link Expiration</label>
            <input
              type="checkbox"
              checked={linkExpiration}
              onChange={() => setLinkExpiration(!linkExpiration)}
              className={styles.toggle}
            />
          </div>

          {/* Date Picker */}
          {linkExpiration && (
            <input
              type="datetime-local"
              name="expirationTime"
              value={formData.expirationTime}
              onChange={handleInputChange}
              className={styles.datepicker}
            />
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.clearButton} onClick={() => setRemarks("")}>
            Clear
          </button>
          <button className={styles.createButton} onClick={handleSubmit}>
            Create new
          </button>
        </div>
      </div>
    </div>
  );
}
