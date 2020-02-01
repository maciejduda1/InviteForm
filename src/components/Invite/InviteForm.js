import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "../input/Input";

const InviteForm = () => {
  return (
    <div>
      <Formik
        render={({ values, errors, touched }) => (
          <Form>
            <Field component={Input} />
          </Form>
        )}
      />
    </div>
  );
};

export default InviteForm;
