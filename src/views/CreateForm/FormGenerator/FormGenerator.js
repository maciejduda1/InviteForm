import React from "react";
import styles from "./FormGenerator.module.css";
import FieldGeneratorLayout from "./FieldGenerators/FieldGeneratorLayout/FieldGeneratorLayout";
import Input from "../../../components/input/Input";
import { Formik, Form, Field } from "formik";
import TextArea from "../../../components/TextArea/TextArea";
import PropTypes from "prop-types";
import CheckboxSelect from "../../../components/CheckboxSelect/CheckboxSelect";

const FormGenerator = ({ formFields = [] }) => {
  // const [form, setFormFields] = React.useState();
  const initialValues = {
    title: "",
    fields: []
  };

  return (
    <div className={styles.container}>
      <Formik initialValues={initialValues}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <Form>
            <FieldGeneratorLayout isDeletable={false}>
              <Field label='Tytuł formularza' name='title' component={Input} />
            </FieldGeneratorLayout>
            <FieldGeneratorLayout>
              <Field
                label='Opis wydarzenia'
                name='fields[0]'
                component={TextArea}
              />
            </FieldGeneratorLayout>
            <FieldGeneratorLayout isDeletable={false}>
              <Field
                label='Imię zaproszonego'
                name='title'
                disabled={true}
                component={Input}
              />
            </FieldGeneratorLayout>
            {formFields.map(field => (
              <FieldGeneratorLayout key={field.name}>
                {field.type === "text" && (
                  <Field
                    label={field.label}
                    name={field.name}
                    component={Input}
                  />
                )}
                {field.type === "checkbox" && (
                  <Field
                    label={field.label}
                    name={field.name}
                    component={CheckboxSelect}
                  />
                )}
              </FieldGeneratorLayout>
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

FormGenerator.propTypes = {
  formFields: PropTypes.array.isRequired
};

export default FormGenerator;
