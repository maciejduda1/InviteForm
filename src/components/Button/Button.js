import React from 'react';
import styles from './Button.module.css'
import PropTypes from 'prop-types';

const Button = ({ value, type, ...props }) => <button className={styles.button} {...props} type={type}>{value}</button>


Button.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    type: PropTypes.string,
}

Button.defaultProps = {
    type: 'submit'
}

export default Button;
