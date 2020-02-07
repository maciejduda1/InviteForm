import React from 'react';
import styles from './FormGenerator.module.css';
import FieldGeneratorLayout from './FieldGenerators/FieldGeneratorLayout/FieldGeneratorLayout';
import Input from '../../../components/input/Input';
import { Formik, Form, Field } from 'formik';
import TextArea from '../../../components/TextArea/TextArea';

const FormGenerator = ({ formFields }) => {

    const [form, setFormFields] = React.useState();
    const initialValues = {
        title: '',
        fields: []

    }

    return (
        <div className={styles.container}>
            <Formik
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

                            <FieldGeneratorLayout
                                isDeletable={false}
                            >
                                <Field
                                    label="Tytuł formularza"
                                    name="title"
                                    component={Input}
                                />
                            </FieldGeneratorLayout>
                            <FieldGeneratorLayout>
                                <Field
                                    label="Opis wydarzenia"
                                    name="fields[0]"
                                    component={TextArea}
                                />
                            </FieldGeneratorLayout>
                            <FieldGeneratorLayout isDeletable={false}>
                                <Field
                                    label="Imię zaproszonego"
                                    name="title"
                                    disabled={true}
                                    component={Input}
                                />
                            </FieldGeneratorLayout>
                            <FieldGeneratorLayout>
                                <p>checkbox generator</p>
                            </FieldGeneratorLayout>
                            <FieldGeneratorLayout>
                                <p>Text field generator</p>
                            </FieldGeneratorLayout>
                            <FieldGeneratorLayout>
                                <p>SEND after Validtion</p>
                            </FieldGeneratorLayout>
                        </Form>
                    )}
            </Formik>
        </div>
    );
}

export default FormGenerator;
