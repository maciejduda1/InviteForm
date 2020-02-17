import React from 'react';
import styles from './FacebookButton.module.css'


const FacebookButton = (props) =>
    <button className={styles.button} {...props}>
        <i className={`fab fa-facebook-square ${styles.icon}`}></i> <span>Continue with Facebook</span>
    </button>

export default FacebookButton;
