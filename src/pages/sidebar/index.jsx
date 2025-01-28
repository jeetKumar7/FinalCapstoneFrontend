import styles from "./sidebar.module.css";
import { FaHome, FaLink, FaChartBar, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* Menu Items */}
      <ul className={styles.menu}>
        <li className={styles.menuItem + " " + styles.active}>
          <FaHome className={styles.icon} />
          <span>Dashboard</span>
        </li>
        <li className={styles.menuItem}>
          <FaLink className={styles.icon} />
          <span>Links</span>
        </li>
        <li className={styles.menuItem}>
          <FaChartBar className={styles.icon} />
          <span>Analytics</span>
        </li>
        <hr className={styles.divider} />
        <li className={styles.menuItem}>
          <FaCog className={styles.icon} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}
