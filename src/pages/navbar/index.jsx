import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/assets/cuvette.png" alt="logo" />
      </div>

      <div className={styles.greetings}>
        <img src="/assets/sun.png" alt="sun icon" />
        <div>
          <h3>Good Morning, Anu</h3>
          <p>Tue, Jan 25</p>
        </div>
      </div>

      <button className={styles.createButton}>Create new</button>

      <div className={styles.search}>
        <img src="/assets/search-icon.png" alt="search icon" />
        <input type="text" placeholder="Search by remarks" />
      </div>

      <div className={styles.profile}>
        <img src="/assets/profile.png" alt="profile icon" />
      </div>
    </div>
  );
}
