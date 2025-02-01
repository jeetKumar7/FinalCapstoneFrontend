/* eslint-disable react/prop-types */
import { deleteShortUrl } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./delete.module.css";

export default function DeleteModal({ isOpen, onClose, hash }) {
  const handleDelete = async () => {
    try {
      const response = await deleteShortUrl(hash);
      console.log("Short URL deleted:", response);
      onClose();
      toast.success("URL deleted successfully", {
        position: "bottom-left",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Failed to delete short URL: (in Modal)", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Delete Link</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          <p>Are you sure you want to delete this link?</p>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
