import React from "react";
import { Form, Field, Formik } from "formik";
import Button from "../../../components/Button/Button";
import Input from "../../../components/input/Input";
import styles from '../LoginUser/LoginUser.module.css';

import * as firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
import Schema from "./Register.schema";

const initialValues = {
    confirmPassword: '',
    password: '',
    login: '',
    url: '',
    name: '',
}

const RegisterUser = () => {

    const [showPassword, toggleShowPassword] = React.useState();

    function register(values, actions) {
        const { login, password, name, url } = values
        firebase.auth().createUserWithEmailAndPassword(login, password)
            .then(res => {
                const user = firebase.auth().currentUser
                user.updateProfile({
                    photoURL: url,
                    displayName: name
                })
                    .then((res) => actions.setSubmiting(false))
                    .catch((error) => actions.setSubmiting(false))
            })
            .catch(error => console.log(error))
    }

    return (
        <Formik
            onSubmit={(values, actions) => register(values, actions)}
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
                isValid,
                /* and other goodies */
            }) => (
                    <Form>
                        <div className={styles.iContainer}>
                            <Field simple type='text' name='name' label='Wyświetlane imię' component={Input} />
                            {errors.name && touched.name &&
                                <div className={styles.errorContainer}>
                                    {errors.name}
                                </div>
                            }
                        </div>
                        <div className={styles.iContainer}>
                            <Field simple type='text' name='login' label='Email' component={Input} />
                            {errors.login && touched.login &&
                                <div className={styles.errorContainer}>
                                    {errors.login}
                                </div>
                            }
                        </div>
                        <div className={styles.iContainer}>
                            <Field
                                autoComplete="off"
                                simple
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                label='Password'
                                component={Input}
                            />
                            {showPassword ?
                                <i onClick={() => toggleShowPassword(!showPassword)} className={`far fa-eye ${styles.icon}`}></i> :
                                <i onClick={() => toggleShowPassword(!showPassword)} className={`far fa-eye-slash ${styles.icon}`}></i>
                            }
                            {errors.password && touched.password &&
                                <div className={styles.errorContainer}>
                                    {errors.password}
                                </div>
                            }
                        </div>
                        <div className={styles.iContainer}>
                            <Field
                                autoComplete="off"
                                simple
                                type={showPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                label='Retype Password'
                                component={Input}
                            />
                            {showPassword ?
                                <i onClick={() => toggleShowPassword(!showPassword)} className={`far fa-eye ${styles.icon}`}></i> :
                                <i onClick={() => toggleShowPassword(!showPassword)} className={`far fa-eye-slash ${styles.icon}`}></i>
                            }
                            {errors.confirmPassword && touched.confirmPassword &&
                                <div className={styles.errorContainer}>
                                    {errors.confirmPassword}
                                </div>
                            }
                        </div>
                        <div className={styles.iContainer}>
                            <Field
                                autoComplete="off"
                                simple
                                type={'url'}
                                name='url'
                                label='Url avatara'
                                component={Input}
                            />
                            {errors.url && touched.url &&
                                <div className={styles.errorContainer}>
                                    {errors.url}
                                </div>
                            }
                        </div>
                        <Button disabled={isSubmitting || !isValid} type='submit' value='Zarejestruj' size='big' />
                    </Form>
                )}
        </Formik>
    );
}

export default RegisterUser;
