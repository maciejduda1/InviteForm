import React from "react";
import { Form, Field, Formik } from "formik";
import Button from "../../../components/Button/Button";
import Input from "../../../components/input/Input";
import styles from '../LoginUser/LoginUser.module.css';

const initialValues = {
    confirmPassword: '',
    password: '',
    login: ''
}

const RegisterUser = () => {

    const [showPassword, toggleShowPassword] = React.useState();

    function register(values, actions) {
        console.log(values)
    }

    return (
        <Formik
            onSubmit={(values, actions) => register(values, actions)}
            initialValues={initialValues}
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
                        <Field simple type='text' name='login' label='Login' component={Input} />
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
                        </div>
                        <Button type='submit' value='Zaloguj' size='big' />
                    </Form>
                )}
        </Formik>
    );
}

export default RegisterUser;
