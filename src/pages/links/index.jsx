import { useEffect, useState } from "react";
import Navbar from "../navbar/index.jsx";
import Sidebar from "../sidebar/index.jsx";
import { getlinks } from "../../services";
import styles from "./links.module.css";
import Modal from "../../components/edit/edit.jsx";

import { MdEdit } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
import { FaSort } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

export default function Links() {
  const [links, setLinks] = useState({ urls: [], total: 0, page: 1, limit: 10 });
  const [sortOrder, setSortOrder] = useState("asc");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [currentHash, setCurrentHash] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (hash) => {
    setIsModalOpen(true);
    setCurrentHash(hash);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHash(null);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linksData = await getlinks();
        console.log("Links:", linksData);
        setLinks(linksData);
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
                    Date <FaSort className={styles.sortIcon} />
                  </th>
                  <th>Original Link</th>
                  <th>Short Link</th>
                  <th>Remarks</th>
                  <th>Clicks</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {links.urls.length > 0 ? (
                  links.urls.map((link) => (
                    <tr key={link._id}>
                      <td>{new Date(link.createdAt).toLocaleString()}</td>
                      <td>{link.destinationUrl}</td>
                      <td>
                        {link.hash}{" "}
                        <LuCopy
                          className={styles.copyIcon}
                          onClick={() => copyToClipboard(`${BACKEND_URL}/api/url/${link.hash}`)}
                        />
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
                        <RiDeleteBinLine className={styles.deleteIcon} />
                        {/* <button>Delete</button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Loading Links...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} hash={currentHash} />
    </div>
  );
}
