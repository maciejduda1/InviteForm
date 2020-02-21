import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({ label, name, autoComplete, ...props }) => {

	return (
		<div className={styles.inputContainer}>
			<input
				data-testid="input"
				id={name}
				name={name}
				type='text'
				required
				className={styles.Input}
				autoComplete={autoComplete || 'off'}
				{...props}
			/>
			<label htmlFor={name} className={styles.Label}>
				{label}
			</label>
		</div>
	);
};

Input.propTypes = {
	autoComplete: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

Input.defaultProps = {
	label: 'Nazwa Pola'
}


export default Input;
