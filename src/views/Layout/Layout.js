import React from "react";
import styles from "./Layout.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout = ({ children, user }) => {
  return (
    <div className={styles.container}>
      <Header user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
