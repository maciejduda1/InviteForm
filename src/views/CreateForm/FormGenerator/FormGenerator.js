import React from "react";
import FieldGeneratorLayout from "./FieldGenerators/FieldGeneratorLayout/FieldGeneratorLayout";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import InputGenerator from "./FieldGenerators/InputGenerator.tsx/InputGenerator";
import TextFieldGenerator from "./FieldGenerators/TextFieldGenerator";
import Button from "../../../components/Button/Button";
import CheckboxFieldGenerator from "./FieldGenerators/CheckboxFieldGenerator/CheckboxFieldGenerator";
import styles from './FormGenerator.module.css'
import { withRouter } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const FormGenerator = ({ formFields = {}, deleteElement, history, match }) => {

    const initialValues = {
        title: "",
        description: '',
        name: '',
        fields: formFields,
    };

    function handleSubmit(values, actions) {
        const db = firebase.firestore();
        db.collection("forms").add(values)
            .then(res => history.push(`./${res.id}`))
            .catch(error => {
                console.log('Nie udało się')
            })
    }

    return (
        <>
            <Formik
                onSubmit={(values, actions) => handleSubmit(values, actions)}
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
                    setFieldValue
                    /* and other goodies */
                }) => (
                        <div>
                            <div className={styles.container}>
                                <Form>
                                    <FieldGeneratorLayout isDeletable={false} name="title" deleteElement={() => deleteElement('title')}>
                                        <Field defLabel='Tytuł formularza' name='title' component={InputGenerator} />
                                        <div className={styles.descriptionContainer}>
                                            <Field
                                                defLabel='Opis wydarzenia'
                                                name='description'
                                                component={TextFieldGenerator}
                                            />
                                        </div>
                                    </FieldGeneratorLayout>
                                    <FieldGeneratorLayout isDeletable={false} name="name" deleteElement={() => deleteElement('name')}>
                                        <Field
                                            defLabel='Imię uczestnika'
                                            name='name'
                                            component={InputGenerator}
                                        />
                                    </FieldGeneratorLayout>
                                    {Object.keys(formFields).map(key => (
                                        <FieldGeneratorLayout key={key} name={key} deleteElement={() => deleteElement(key)}>
                                            {formFields[key].type === "text" && (
                                                <Field
                                                    name={formFields[key].name}
                                                >
                                                    {({ field, form, meta }) => (
                                                        <InputGenerator
                                                            advanced
                                                            defLabel={formFields[key].label}
                                                            onChange={(e) => setFieldValue(formFields[key].name, {
                                                                ...formFields[key],
                                                                label: e.target.value,
                                                            })}
                                                            field={field}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                            {formFields[key].type === "checkbox" && (
                                                <Field
                                                    name={formFields[key].name}
                                                >
                                                    {({ field, form, meta }) => (
                                                        <CheckboxFieldGenerator
                                                            checkboxFieldData={formFields[key]}
                                                            onChange={(e) => setFieldValue(formFields[key].name, {
                                                                ...formFields[key],
                                                                ...values.fields[key],
                                                                label: e.target.value,
                                                            })}
                                                            defLabel={formFields[key].label}
                                                            field={field}
                                                            form={form}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        </FieldGeneratorLayout>
                                    ))}
                                    <div>
                                        <Button
                                            disabled={isSubmitting}
                                            value="Stwórz formularz"
                                        />
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
            </Formik>
        </>
    );
};

FormGenerator.propTypes = {
    formFields: PropTypes.shape({
        fieldId: PropTypes.string,
        type: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string
    })
};

export default withRouter(FormGenerator);
