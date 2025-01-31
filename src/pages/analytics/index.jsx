import { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { getAnalytics } from "../../services";
import Navbar from "../navbar/index.jsx";
import Sidebar from "../sidebar/index.jsx";

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Analytics in Page Frontend");
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        setError("Failed to fetch analytics data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.analyticsContainer}>
          <h1>Analytics</h1>
          <table className={styles.analyticsTable}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Destination URL</th>
                <th>Short URL</th>
                <th>IP Address</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((entry) => (
                <tr key={entry._id}>
                  <td>{new Date(entry.timestamp).toLocaleString()}</td>
                  <td>{entry.destinationUrl}</td>
                  <td>{entry.shortUrl}</td>
                  <td>{entry.ipAddress}</td>
                  <td>{entry.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
