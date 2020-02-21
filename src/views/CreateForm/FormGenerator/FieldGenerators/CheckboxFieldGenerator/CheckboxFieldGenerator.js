import React from 'react';
import Button from '../../../../../components/Button/Button';
import styles from './CheckboxFieldGenerator.module.css';
import { FieldArray, Field } from 'formik';
import InputGenerator from '../InputGenerator.tsx/InputGenerator';

const CheckboxFieldGenerator = ({ defLabel, field }) => {

    return (
        <>

            <Field
                label="Pytanie do ankiety"
                component={InputGenerator}
                name={`${field.name}.label`}
            />
            <div className={styles.inputsOptionsContainer}>
                <FieldArray
                    name={`${field.name}.options`}
                    render={arrayHelpers => (
                        <>
                            {field.value.options.map((option, index) =>
                                <div className={styles.inputOption} key={index}>
                                    <Field
                                        defLabel={`Odpowiedź do wyboru`}
                                        name={`${field.name}.options[${index}].label`}
                                        component={InputGenerator}
                                    />
                                    <div className={styles.buttonContainer}>
                                        {field.value && field.value.options && field.value.options.length > 1 &&
                                            <Button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)}
                                                size='small'
                                                shape='circle'
                                                value={<i className='fas fa-trash-alt'></i>}
                                            />
                                        }
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                />
            </div>
        </>
    );
}

export default CheckboxFieldGenerator