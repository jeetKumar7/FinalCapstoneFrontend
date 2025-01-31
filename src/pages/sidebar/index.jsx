import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";
import { FaHome, FaLink, FaChartBar, FaCog } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      {/* Menu Items */}
      <ul className={styles.menu}>
        <li className={`${styles.menuItem} ${location.pathname === "/" ? styles.active : ""}`}>
          <Link to="/dashboard" className={styles.link}>
            <FaHome className={styles.icon} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`${styles.menuItem} ${location.pathname === "/links" ? styles.active : ""}`}>
          <Link to="/links" className={styles.link}>
            <FaLink className={styles.icon} />
            <span>Links</span>
          </Link>
        </li>
        <li className={`${styles.menuItem} ${location.pathname === "/analytics" ? styles.active : ""}`}>
          <Link to="/analytics" className={styles.link}>
            <FaChartBar className={styles.icon} />
            <span>Analytics</span>
          </Link>
        </li>
        <hr className={styles.divider} />
        <li className={`${styles.menuItem} ${location.pathname === "/settings" ? styles.active : ""}`}>
          <Link to="/settings" className={styles.link}>
            <FaCog className={styles.icon} />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
