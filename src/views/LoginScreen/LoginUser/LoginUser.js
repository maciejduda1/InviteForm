import React from 'react';
import { Form, Field, Formik } from 'formik';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import styles from './LoginUser.module.css';
import Schema from './Login.schema';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const initialValues = {
	password: '',
	login: '',
};

const LoginUser = () => {
	const [showPassword, toggleShowPassword] = React.useState();

	function login(values, actions) {
		const { login, password } = values;

		firebase
			.auth()
			.signInWithEmailAndPassword(login, password)
			.catch((error) => actions.setSubmiting(false));
	}

	return (
		<Formik
			onSubmit={(values, actions) => login(values, actions)}
			initialValues={initialValues}
			validationSchema={Schema}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				/* and other goodies */
			}) => (
				<Form>
					<div className={styles.iContainer}>
						<Field
							type='text'
							name='login'
							label='Email'
							component={Input}
						/>
						{errors.login && touched.login && (
							<div className={styles.errorContainer}>
								{errors.login}
							</div>
						)}
					</div>
					<div className={styles.iContainer}>
						<Field
							autoComplete='off'
							type={showPassword ? 'text' : 'password'}
							name='password'
							label='Password'
							component={Input}
						/>
						{showPassword ? (
							<i
								onClick={() =>
									toggleShowPassword(!showPassword)
								}
								className={`far fa-eye ${styles.icon}`}
							></i>
						) : (
							<i
								onClick={() =>
									toggleShowPassword(!showPassword)
								}
								className={`far fa-eye-slash ${styles.icon}`}
							></i>
						)}
						{errors.password && touched.password && (
							<div className={styles.errorContainer}>
								{errors.password}
							</div>
						)}
					</div>
					<Button type='submit' value='Zaloguj' size='big' />
				</Form>
			)}
		</Formik>
	);
};

export default LoginUser;
