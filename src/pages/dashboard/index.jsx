import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Navbar from "../../components/navbar/index.jsx";
import Sidebar from "../../components/sidebar/index.jsx";
import { getTotalClicks, getDateWiseClicks, getDeviceWiseClicks } from "../../services";

export default function Dashboard() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [dateWiseClicks, setDateWiseClicks] = useState([]);
  const [deviceWiseClicks, setDeviceWiseClicks] = useState([]);

  useEffect(() => {
    const fetchTotalClicks = async () => {
      try {
        const data = await getTotalClicks();
        setTotalClicks(data.totalClicks);
      } catch (error) {
        console.error("Failed to fetch total clicks:", error);
      }
    };

    const fetchDateWiseClicks = async () => {
      try {
        const data = await getDateWiseClicks();
        console.log("Date-wise Clicks:", data);
        setDateWiseClicks(data);
      } catch (error) {
        console.error("Failed to fetch date-wise clicks:", error);
      }
    };

    const fetchDeviceWiseClicks = async () => {
      try {
        const data = await getDeviceWiseClicks();
        console.log("Device-wise Clicks:", data);
        setDeviceWiseClicks(data);
      } catch (error) {
        console.error("Failed to fetch device-wise clicks:", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchTotalClicks();
      fetchDateWiseClicks();
      fetchDeviceWiseClicks();
    } else {
      console.error("User is not logged in");
    }
  }, []);

  const deviceNameMapping = {
    phone: "Mobile",
    desktop: "Desktop",
    tablet: "Tablets",
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.dashboardContainer}>
          {/* Header Section */}
          <div className={styles.header}>
            <h2>
              Total Clicks <span className={styles.clickCount}>{totalClicks}</span>
            </h2>
          </div>

          {/* Data Cards Section */}
          <div className={styles.cardsContainer}>
            {/* Date-wise Clicks */}
            <div className={styles.card}>
              <h3>Date-wise Clicks</h3>
              <div className={styles.chart}>
                {dateWiseClicks.map((entry) => (
                  <div className={styles.bar} key={entry._id}>
                    <span>{entry._id}</span>
                    <div className={styles.barFill} style={{ width: `${entry.clicks}%` }}></div>
                    <span>{entry.clicks}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Click Devices */}
            <div className={styles.card}>
              <h3>Click Devices</h3>
              <div className={styles.chart}>
                {deviceWiseClicks.length > 0 ? (
                  deviceWiseClicks.map((entry) => (
                    <div className={styles.bar} key={entry._id}>
                      <span>{deviceNameMapping[entry._id] || entry._id}</span>
                      <div className={styles.barFill} style={{ width: `${entry.clicks}%` }}></div>
                      <span>{entry.clicks}</span>
                    </div>
                  ))
                ) : (
                  <div>No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
