import React from "react";
import styles from "./Header.module.css";

const Header = () => (
  <div className={styles.Header__container}>
    <ul className={styles.Header__list}>
      <li className={styles.Header__link}>Wóda</li>
      <li>Dziwki</li>
      <li>Lasery</li>
    </ul>
  </div>
);

export default Header;
