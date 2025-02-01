import styles from "./navbar.module.css";

import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

import { getUserDetails } from "../../services";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
export default function Navbar() {
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");

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

    const updateGreetingAndDate = () => {
      const now = new Date();
      const hours = now.getHours();
      let greetingMessage = "";

      if (hours < 12) {
        greetingMessage = "Good Morning";
      } else if (hours < 18) {
        greetingMessage = "Good Afternoon";
      } else {
        greetingMessage = "Good Evening";
      }

      const options = { weekday: "short", month: "short", day: "numeric" };
      const formattedDate = now.toLocaleDateString(undefined, options);

      setGreeting(greetingMessage);
      setCurrentDate(formattedDate);
    };

    updateGreetingAndDate();
    const intervalId = setInterval(updateGreetingAndDate, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <img src="/assets/cuvette.png" alt="logo" />
          </div>

          <div className={styles.greetings}>
            <img src="/assets/sun.png" alt="sun icon" />
            <div>
              <h3>
                {greeting}, {userName}
              </h3>
              <p>{currentDate}</p>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.createButton} onClick={openModal}>
            <GoPlus className={styles.icon} />
            <p>Create new</p>
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
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
