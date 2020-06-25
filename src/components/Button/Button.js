import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ value, type, size, shape, ...props }) => {
	function setSize() {
		if (size === 'normal') return styles.normal;
		if (size === 'big') return styles.big;
		if (size === 'small') return styles.small;
	}

	function setShape() {
		if (shape === 'circle') return styles.circle;
		if (shape === 'rectangle') return styles.rectangle;
	}

	return (
		<button className={`${styles.button} ${setSize()} ${setShape()}`} {...props} type={type}>
			{value}
		</button>
	);
};
Button.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	type: PropTypes.string,
	shape: PropTypes.string,
	size: PropTypes.oneOf(['small', 'normal', 'big']),
};

Button.defaultProps = {
	type: 'submit',
	size: 'normal',
};

export default Button;
