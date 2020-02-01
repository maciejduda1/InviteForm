import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({ name, value }) => {
  return (
    <div className={styles.Form__Input_container}>
      <input
        className={styles.Form__Input_component}
        name={name}
        value={value}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Input;
