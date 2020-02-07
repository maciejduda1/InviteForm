import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

const Select = ({ options, ...props }) => (
    <select className={styles.select}  {...props}>
        {options.map((option, index) =>
            <option
                value={option.value}
                key={index}
                className={styles.option}>
                {option.label}
            </option>
        )}
    </select>
);

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })).isRequired
}

export default Select;