import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/navbar/index.jsx";
import Sidebar from "../../components/sidebar/index.jsx";

import { getlinks } from "../../services";
import styles from "./links.module.css";
import EditModal from "../../components/edit/edit.jsx";
import DeleteModal from "../../components/delete/delete.jsx";
import { RxCaretSort } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { SearchContext } from "../../context/SearchContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Links() {
  const [links, setLinks] = useState({ urls: [], total: 0, page: 1, limit: 10 });
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredLinks, setFilteredLinks] = useState([]);
  const { searchQuery } = useContext(SearchContext);
  const [currentHash, setCurrentHash] = useState(null);
  const [currentDeleteHash, setCurrentDeleteHash] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [statusSortOrder, setStatusSortOrder] = useState("asc");

  const openDeleteModal = (hash) => {
    setCurrentDeleteHash(hash);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentDeleteHash(null);
  };

  const openModal = (hash) => {
    setIsModalOpen(true);
    setCurrentHash(hash);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHash(null);
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = links.urls.filter((link) => link.remarks.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredLinks(filtered);
    } else {
      setFilteredLinks(links.urls);
    }
  }, [searchQuery, links.urls]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linksData = await getlinks();
        console.log("Links:", linksData);
        setLinks(linksData);
        setFilteredLinks(linksData.urls);
      } catch (error) {
        console.error("Failed to fetch links:", error);
      }
    };
    fetchLinks();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Copied to clipboard:", text);
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  };

  const handleSort = () => {
    const sortedLinks = [...links.urls].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setLinks({ ...links, urls: sortedLinks });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleStatusSort = () => {
    // UPDATED: Function to handle Status sorting
    const sortedLinks = [...links.urls].sort((a, b) => {
      const isActiveA = !a.expirationTime || new Date(a.expirationTime) > new Date();
      const isActiveB = !b.expirationTime || new Date(b.expirationTime) > new Date();
      return statusSortOrder === "asc" ? isActiveA - isActiveB : isActiveB - isActiveA;
    });
    setLinks({ ...links, urls: sortedLinks });
    setStatusSortOrder(statusSortOrder === "asc" ? "desc" : "asc");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.linksContainer}>
          <div className={styles.linksTableContainer}>
            <table className={styles.linksTable}>
              <thead>
                <tr>
                  <th onClick={handleSort} className={styles.sortableHeader}>
                    Date <RxCaretSort className={styles.sortIcon} />
                  </th>
                  <th>Original Link</th>
                  <th>Short Link</th>
                  <th>Remarks</th>
                  <th>Clicks</th>
                  <th onClick={handleStatusSort} className={styles.sortableHeader}>
                    {" "}
                    {/* UPDATED: Added sorting to Status column */}
                    Status <RxCaretSort className={styles.sortIcon} /> {/* UPDATED: Added sort icon */}
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <tr key={link._id}>
                      <td>{formatDate(link.createdAt)}</td>
                      <td>{link.destinationUrl}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.cellContent}>
                          <span className={styles.urlText}>{`${BACKEND_URL}/api/url/${link.hash}`}</span>
                          <LuCopy
                            className={styles.copyIcon}
                            onClick={() => copyToClipboard(`${BACKEND_URL}/api/url/${link.hash}`)}
                          />
                        </div>
                      </td>
                      <td>{link.remarks}</td>
                      <td>{link.clicks}</td>
                      <td
                        className={
                          !link.expirationTime || new Date(link.expirationTime) > new Date()
                            ? styles.active
                            : styles.inactive
                        }
                      >
                        {!link.expirationTime || new Date(link.expirationTime) > new Date() ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <MdEdit className={styles.editIcon} onClick={() => openModal(link.hash)} />
                        <RiDeleteBinLine className={styles.deleteIcon} onClick={() => openDeleteModal(link.hash)} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No Links Created</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditModal isOpen={isModalOpen} onClose={closeModal} hash={currentHash} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} hash={currentDeleteHash} />
    </div>
  );
}
