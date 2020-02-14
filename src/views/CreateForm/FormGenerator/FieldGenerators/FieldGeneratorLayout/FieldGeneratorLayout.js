import React from "react";
import Button from "../../../../../components/Button/Button";
import styles from "./FieldGeneratorLayout.module.css";
import PropTypes from "prop-types";

const FieldGeneratorLayout = ({ children, isDeletable, deleteElement }) => (
  <div>
    <div className={styles.container}>
      <div className={styles.component}>{children}</div>
      {isDeletable && (
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            onClick={() => deleteElement()}
            size='small'
            shape='circle'
            value={<i className="fas fa-times"></i>}
          />
        </div>
      )}
    </div>
  </div>
);

FieldGeneratorLayout.propTypes = {
  isDeletable: PropTypes.bool,
  deleteElement: PropTypes.func.isRequired
};

FieldGeneratorLayout.defaultProps = {
  isDeletable: true,
};

export default FieldGeneratorLayout;
