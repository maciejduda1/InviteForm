import React from "react";
import styles from "./Header.module.css";
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className={styles.Header__container}>
    <div className={styles.Header__logo}>
      <img src="https://via.placeholder.com/150x45?text=Logo+of+Md-dev" alt="Logo of Md-Dev">
      </img>
    </div>
    <ul className={styles.Header__list}>
      <li className={styles.Header__listItem}>
        <NavLink to="/" className={styles.Header__link}>Strona główna</NavLink>
      </li>
      <li className={styles.Header__listItem}>
        <a href="https://mddev.pl/" target="_blank" rel="noopener noreferrer" className={styles.Header__link}>Strona autora</a>
      </li>
      <li className={styles.Header__listItem}>
        <a href="https://github.com/maciejduda1/InviteForm" target="_blank" rel="noopener noreferrer" className={styles.Header__link}>
          <i className="fab fa-github-square"></i>Github
        </a>
      </li>
    </ul>
  </div>
);

export default Header;
