import React from 'react';
import styles from './LoginScreen.module.css';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import FacebookButton from '../../components/FacebookButton/FacebookButton';
import RegisterUser from './RegisterUser/RegisterUser';
import LoginUser from './LoginUser/LoginUser';

const LoginScreen = () => {
	const [loginOrRegister, toggleLoginOrRegister] = React.useState(true);

	const loginFaceBook = () => {
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
	};

	return (
		<div className={styles.container} id='firebaseui-auth-container'>
			{loginOrRegister ? <LoginUser /> : <RegisterUser />}
			<div className={styles.switch}>
				lub{' '}
				<h4
					className={styles.title}
					onClick={() => toggleLoginOrRegister(!loginOrRegister)}
				>
					{loginOrRegister ? 'Zarejestruj' : 'Zaloguj'}
				</h4>
			</div>
			<div>
				<FacebookButton type='button' onClick={loginFaceBook} />
			</div>
		</div>
	);
};

export default LoginScreen;
