import styles from "./dashboard.module.css";
import Navbar from "../navbar/index.jsx";
import Sidebar from "../Sidebar/index.jsx";
export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.dashboardContainer}>
          {/* Header Section */}
          <div className={styles.header}>
            <h2>
              Total Clicks <span className={styles.clickCount}>1234</span>
            </h2>
          </div>

          {/* Data Cards Section */}
          <div className={styles.cardsContainer}>
            {/* Date-wise Clicks */}
            <div className={styles.card}>
              <h3>Date-wise Clicks</h3>
              <div className={styles.chart}>
                <div className={styles.bar}>
                  <span>21-01-25</span> <div className={styles.barFill} style={{ width: "80%" }}></div>{" "}
                  <span>1234</span>
                </div>
                <div className={styles.bar}>
                  <span>20-01-25</span> <div className={styles.barFill} style={{ width: "70%" }}></div>{" "}
                  <span>1140</span>
                </div>
                <div className={styles.bar}>
                  <span>19-01-25</span> <div className={styles.barFill} style={{ width: "10%" }}></div> <span>134</span>
                </div>
                <div className={styles.bar}>
                  <span>18-01-25</span> <div className={styles.barFill} style={{ width: "2%" }}></div> <span>34</span>
                </div>
              </div>
            </div>

            {/* Click Devices */}
            <div className={styles.card}>
              <h3>Click Devices</h3>
              <div className={styles.chart}>
                <div className={styles.bar}>
                  <span>Mobile</span> <div className={styles.barFill} style={{ width: "50%" }}></div> <span>134</span>
                </div>
                <div className={styles.bar}>
                  <span>Desktop</span> <div className={styles.barFill} style={{ width: "20%" }}></div> <span>40</span>
                </div>
                <div className={styles.bar}>
                  <span>Tablet</span> <div className={styles.barFill} style={{ width: "5%" }}></div> <span>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
