import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({ label, value, name, simple, ...props }) => {

	return (
		<div className={styles.inputContainer}>
			<input
				type='text'
				required
				className={styles.Input}
				autoComplete='username'
				{...props.field}
				{...props}
				value={value || (!!simple && props.field.value) || (props.field && props.field.value.label) || ''}
			/>
			{label && (
				<label htmlFor={name || props.field.name || ''} className={styles.Label}>
					{label || 'Nazwa pola'}
				</label>
			)}
		</div>
	);
};

Input.propTypes = {
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default Input;
