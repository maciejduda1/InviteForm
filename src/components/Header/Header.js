import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import PropTypes from 'prop-types';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Header = ({ user = null }) => {

	function logoutUser() {
		firebase.auth().signOut()
	}


	return (
		<div className={styles.Header__container} data-testid="header">
			<div className={styles.Header__logo}>
				<img
					src='https://via.placeholder.com/150x45?text=Logo+of+Md-dev'
					alt='Logo of Md-Dev'
				></img>
			</div>
			<ul className={styles.Header__list}>
				{user && (
					<>
						<li className={styles.Header__listItem}>
							<NavLink
								to='/myforms'
								exact
								activeClassName={styles.Header__link_active}
								className={styles.Header__link}
							>
								Moje Formularze
              </NavLink>
						</li>
						<li className={styles.Header__listItem}>
							<NavLink
								to='/create'
								exact
								activeClassName={styles.Header__link_active}
								className={styles.Header__link}
							>
								Stwórz formularz
              </NavLink>
						</li>
						<li className={styles.Header__listItem_avatar}>
							<div className={styles.Header__avatarContianer}>
								<img
									className={styles.Header_avatar}
									src={user.photo}
									alt={"data"}
								/>
								<span>Witaj {user.name}</span>
							</div>
						</li>
						<li className={styles.Header__listItem_avatar}>
							<div className={styles.Header__avatarContianer}>
								<Button type="button" value="Wyloguj" onClick={() => logoutUser()} />
							</div>
						</li>
					</>
				)}
				{!user && (
					<>
						<li className={styles.Header__listItem}>
							<NavLink to='/' className={styles.Header__link}>
								Strona główna
              </NavLink>
						</li>
						<li className={styles.Header__listItem}>
							<a
								href='https://mddev.pl/'
								target='_blank'
								rel='noopener noreferrer'
								className={styles.Header__link}
							>
								Strona autora
              </a>
						</li>
						<li className={styles.Header__listItem}>
							<a
								href='https://github.com/maciejduda1/InviteForm'
								target='_blank'
								rel='noopener noreferrer'
								className={styles.Header__link}
							>
								<i className='fab fa-github-square'></i>Github
              </a>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

Header.propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string,
		photo: PropTypes.string,
		uid: PropTypes.string,
		email: PropTypes.string,
	}).isRequired
}

export default Header;
