import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({ label, ...field }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type='text'
        required
        className={styles.Input}
        autoComplete='username'
        {...field}
      />
      {label && (
        <label htmlFor={field.name} className={styles.Label}>
          {label}
        </label>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  field: PropTypes.any.isRequired
};

export default Input;
