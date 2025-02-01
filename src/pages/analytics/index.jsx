import { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { getAnalytics } from "../../services";
import Navbar from "../../components/navbar/index.jsx";
import Sidebar from "../../components/sidebar/index.jsx";
import { RxCaretSort } from "react-icons/rx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  const sortByTimestamp = () => {
    const sortedData = [...analyticsData].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.timestamp) - new Date(b.timestamp)
        : new Date(b.timestamp) - new Date(a.timestamp);
    });
    setAnalyticsData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.analyticsContainer}>
          <table className={styles.analyticsTable}>
            <thead>
              <tr>
                <th onClick={sortByTimestamp} style={{ cursor: "pointer" }}>
                  Timestamp <RxCaretSort />
                </th>
                <th>Original Link</th>
                <th>Short Link</th>
                <th>IP Address</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((entry) => (
                <tr key={entry._id}>
                  <td>{formatDate(entry.timestamp)}</td>
                  <td>{entry.destinationUrl}</td>
                  <td>{`${BACKEND_URL}/api/url/${entry.shortUrl}`}</td>
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
