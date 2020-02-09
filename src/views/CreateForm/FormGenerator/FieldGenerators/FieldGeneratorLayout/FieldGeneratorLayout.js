import React from "react";
import Button from "../../../../../components/Button/Button";
import styles from "./FieldGeneratorLayout.module.css";
import PropTypes from "prop-types";

const FieldGeneratorLayout = ({ children, isDeletable }) => (
  <div className={styles.container}>
    <div className={styles.component}>{children}</div>
    {isDeletable && (
      <div className={styles.buttonContainer}>
        <Button
          size='small'
          shape='circle'
          value={<i className='fas fa-trash-alt'></i>}
        />
      </div>
    )}
  </div>
);

FieldGeneratorLayout.propTypes = {
  isDeletable: PropTypes.bool
};

FieldGeneratorLayout.defaultProps = {
  isDeletable: true
};

export default FieldGeneratorLayout;
