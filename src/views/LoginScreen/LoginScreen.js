import React from 'react';
import styles from './LoginScreen.module.css';
import { Formik, Form, Field } from 'formik';

import Button from '../../components/Button/Button';
import Input from '../../components/input/Input';

import * as firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';

const LoginScreen = () => {

    const initialValues = {
        login: '',
        password: '',
    }

    const loginFaceBook = () => {
        // const ui = new firebase.auth.AuthUI(firebase.auth());
        const provider = new firebase.auth.FacebookAuthProvider();

        // ui.start('#firebaseui-auth-container', {
        //     signInOptions: [
        //         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //     ],
        // });

        firebase.auth().signInWithPopup(provider)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    function handleSubmit(values, actions) {
        // const ui = new firebaseui.auth.AuthUI(firebase.auth());
        // ui.start('#firebaseui-auth-container', {
        //     signInOptions: [
        //         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //     ],
        // });

        console.log(values)

    }

    return (
        <div className={styles.container} id="firebaseui-auth-container">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => handleSubmit(values, actions)}
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
                            <Field
                                simple
                                type="text"
                                name="login"
                                label="Login"
                                component={Input}
                            />
                            <Field
                                simple
                                type="password"
                                name="password"
                                label="Password"
                                component={Input}
                            />
                            <Button
                                type="submit"
                                value="Zaloguj"
                                size="big"
                            />
                            <Button
                                type="button"
                                onClick={loginFaceBook}
                                value="Facebook"
                                size="big"
                            />
                        </Form>
                    )}
            </Formik>
        </div>
    );
}

export default LoginScreen;
