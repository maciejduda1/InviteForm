import React from 'react';

const TextFieldGenerator = () => {
    const initialValues = {
        type: 'text'
    }

    return (
        < Formik
            isInitialValid
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
                    <Field
                        component={Select}
                    />
                )}
        </Formik >
    );
}

export default TextFieldGenerator