import styles from "./navbar.module.css";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { getUserDetails } from "../../services";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
export default function Navbar() {
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDetails = await getUserDetails();
        console.log("User Details:", userDetails); // Log the user details to the console
        setUserName(userDetails.name);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserName();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/assets/cuvette.png" alt="logo" />
      </div>

      <div className={styles.greetings}>
        <img src="/assets/sun.png" alt="sun icon" />
        <div>
          <h3>Good Morning, {userName}</h3>
          <p>Tue, Jan 25</p>
        </div>
      </div>

      <button className={styles.createButton} onClick={openModal}>
        <FaPlus className={styles.icon} />
        Create new
      </button>

      <div className={styles.search}>
        <CiSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search by remarks" />
      </div>

      <div className={styles.profile} onClick={toggleDropdown}>
        <img src="/assets/profile.png" alt="profile icon" />
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
