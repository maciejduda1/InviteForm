import React from "react";
import { Form, Field } from "formik";
import Button from "../../../components/Button/Button";
import Input from "../../../components/input/Input";

const LoginUser = ({ loginFaceBook }) => (
  <div>
    <Form>
      <Field simple type='text' name='login' label='Login' component={Input} />
      <Field
        simple
        type='password'
        name='password'
        label='Password'
        component={Input}
      />
      <Button type='submit' value='Zaloguj' size='big' />
      <Button
        type='button'
        onClick={loginFaceBook}
        value='Facebook'
        size='big'
      />
    </Form>
  </div>
);

export default LoginUser;
