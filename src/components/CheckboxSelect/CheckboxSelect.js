import * as React from 'react';
import styles from './CheckboxSelect.module.css';

const CheckboxSelect = ({ field, label }) => {

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type="checkbox"
                {...field}
            />
            <label className={styles.label}>
                {label}
            </label>
        </div>
    )
}

export default CheckboxSelect;
