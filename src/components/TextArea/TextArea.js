import React from "react";
import PropTypes from "prop-types";
import styles from "../input/Input.module.css";

const TextArea = ({ label, ...props }) => {
    const { value, name } = props.field

    return (
        <div className={styles.inputContainer}>
            <textarea
                type="text"
                required
                className={`${styles.Input} ${styles.TextArea}`}
                autoComplete="username"
                {...props}
                {...props.field}
                value={value || ''}
            />
            <label htmlFor={name} className={styles.Label}>
                {label}
            </label>
        </div>
    );
};

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    field: PropTypes.any.isRequired,
};

export default TextArea;
