import React from "react";
import PropTypes from "prop-types";
import styles from "../input/Input.module.css";

const TextArea = ({ label, field, ...props }) => {

    return (
        <div className={styles.inputContainer}>
            <textarea
                type="text"
                required
                className={`${styles.Input} ${styles.TextArea}`}
                autoComplete="username"
                {...field}
                {...props}
            />
            <label htmlFor={field.name} className={styles.Label}>
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
