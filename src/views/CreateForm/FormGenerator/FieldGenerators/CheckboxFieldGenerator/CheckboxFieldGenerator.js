import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Input from '../../../../../components/input/Input';
import Button from '../../../../../components/Button/Button';
import styles from './CheckboxFieldGenerator.module.css';
import { FieldArray, Field } from 'formik';

const CheckboxFieldGenerator = ({ defLabel, field }) => {
    const [editMode, setEditMode] = React.useState(false);

    return (
        <>
            {!editMode &&

                <div className={styles.container}>
                    <h2 className={styles.fieldText} onClick={() => setEditMode(true)}>
                        {(field.value.label) || 'Zaznacz pasujące odpowiedzi'}
                    </h2>
                    <ul className={styles.list}>
                        {field.value.options.map((option, index) =>
                            <li key={index} className={styles.listItem}>
                                <span onClick={() => setEditMode(true)} className={styles.listOptionText}> {option.label || `Opcja-${index + 1}`}</span>
                                {/* {checkboxFieldData && checkboxFieldData.options && checkboxFieldData.options.length > 1 &&
                                    <Button
                                        onClick={() => {
                                            const fName = `${option.name}.options[${index}]`
                                            form.setFieldValue(fName, { ...option, label: '' })
                                            checkboxFieldData.options.splice(index, 1)
                                        }}
                                        size='small'
                                        shape='circle'
                                        value={<i className='fas fa-trash-alt'></i>}
                                    />
                                } */}
                            </li>
                        )}
                    </ul>
                </div>
            }
            {
                editMode &&
                <OutsideClickHandler display="contents" onOutsideClick={() => setEditMode(false)}>
                    <Field
                        label="Pytanie do ankiety"
                        component={Input}
                        name={`${field.name}.label`}
                        value={field.value.label}
                    />
                    <div className={styles.inputsOptionsContainer}>
                        <FieldArray
                            name={`${field.name}.options`}
                            render={arrayHelpers => (
                                <>
                                    {field.value.options.map((option, index) =>
                                        <div className={styles.inputOption} key={index}>
                                            <Field
                                                label={`Odpowiedź do wyboru`}
                                                name={`${field.name}.options[${index}].label`}
                                                value={field.value.options[index].label}
                                                component={Input}
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
                </OutsideClickHandler>
            }
        </>
    );
}

export default CheckboxFieldGenerator