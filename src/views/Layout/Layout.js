import React from 'react';
import styles from './Layout.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;
