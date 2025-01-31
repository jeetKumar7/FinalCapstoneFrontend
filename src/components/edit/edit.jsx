/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./edit.module.css";
import { editShortUrl } from "../../services";
import { fetchShortUrl } from "../../services";

export default function EditModal({ isOpen, onClose, hash }) {
  const [linkExpiration, setLinkExpiration] = useState(true);

  const [formData, setFormData] = useState({
    destinationUrl: "",
    remarks: "",
    expirationTime: null,
  });

  useEffect(() => {
    if (hash) {
      const fetchData = async () => {
        try {
          const data = await fetchShortUrl(hash);
          // const data = await response.json();
          setFormData({
            destinationUrl: data.destinationUrl,
            remarks: data.remarks,
            expirationTime: data.expirationTime,
          });
          console.log("Short URL fetched:", data);
        } catch (error) {
          console.error("Failed to fetch short URL:", error);
        }
      };
      fetchData();
    }
  }, [hash]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editShortUrl(hash, formData);
      console.log("Short URL edited:", response);
      onClose();
    } catch (error) {
      console.error("Failed to edit short URL:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Edit Link</h2>
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
          <button className={styles.clearButton}>Clear</button>
          <button className={styles.createButton} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
