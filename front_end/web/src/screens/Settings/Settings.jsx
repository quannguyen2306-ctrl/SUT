import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Settings() {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.navHolder}></div>

      <div className={styles.content}>
        <Link to="/auth" className={styles.buttonLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Settings;
