import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Input from '../../../../../components/input/Input';
import Button from '../../../../../components/Button/Button';
import styles from './CheckboxFieldGenerator.module.css';

const CheckboxFieldGenerator = ({ defLabel, checkboxFieldData, form, ...props }) => {
    const [editMode, setEditMode] = React.useState(false);

    return (
        <>
            {!editMode &&

                <div className={styles.container} onClick={() => setEditMode(true)}>
                    <h2 className={styles.fieldText}>
                        {(props.field.value && props.field.value.label) || 'Zaznacz pasujące odpowiedzi'}
                    </h2>
                    <ul className={styles.list}>
                        {checkboxFieldData.options.map((option, index) =>
                            <li key={index} className={styles.listItem}>
                                <span className={styles.listOptionText}>{(props.field.value && props.field.value.options && props.field.value.options[index] && props.field.value.options[index].label) || `Opcja-${index + 1}`}</span>
                                {checkboxFieldData && checkboxFieldData.options && checkboxFieldData.options.length > 1 &&
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
                                }
                            </li>
                        )}
                    </ul>
                </div>
            }
            {
                editMode &&
                <OutsideClickHandler display="contents" onOutsideClick={() => setEditMode(false)}>
                    <Input
                        label={defLabel || 'Pytanie'}
                        value={(props.field.value && props.field.value.label) || ''}
                        {...props}
                    />
                    <div className={styles.inputsOptionsContainer}>
                        {checkboxFieldData.options.map((option, index) =>
                            <div className={styles.inputOption} key={index}>
                                <Input
                                    name={`${option.name}.options[${index}]`}
                                    label={`Odpowiedź ${index + 1}`}
                                    value={(props.field.value && props.field.value.options && props.field.value.options[index] && props.field.value.options[index].label) || ''}
                                    onChange={(e) => {
                                        const fName = `${option.name}.options[${index}]`
                                        form.setFieldValue(fName, { ...option, label: e.target.value })
                                    }}
                                />
                                <div className={styles.buttonContainer}>
                                    {checkboxFieldData && checkboxFieldData.options && checkboxFieldData.options.length > 1 &&
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
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </OutsideClickHandler>
            }
        </>
    );
}

export default CheckboxFieldGenerator