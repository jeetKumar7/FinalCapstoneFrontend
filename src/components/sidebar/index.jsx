import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

import { RiHome6Line } from "react-icons/ri"; //Home
import { BsLink45Deg } from "react-icons/bs"; //link
import { IoTrendingUpSharp } from "react-icons/io5"; //analytics
import { IoSettingsOutline } from "react-icons/io5"; //gears

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      {/* Menu Items */}
      <ul className={styles.menu}>
        <Link to="/dashboard" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === "/dashboard" ? styles.active : ""}`}>
            <RiHome6Line className={styles.icon} />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link to="/links" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === "/links" ? styles.active : ""}`}>
            <BsLink45Deg className={styles.icon} />
            <span>Links</span>
          </li>
        </Link>

        <Link to="/analytics" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === "/analytics" ? styles.active : ""}`}>
            <IoTrendingUpSharp className={styles.icon} />
            <span>Analytics</span>
          </li>
        </Link>

        <hr className={styles.divider} />
        <Link to="/settings" className={styles.link}>
          <li className={`${styles.menuItem} ${location.pathname === "/settings" ? styles.active : ""}`}>
            <IoSettingsOutline className={styles.icon} />
            <span>Settings</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
